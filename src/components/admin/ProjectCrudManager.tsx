import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Copy,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Eye,
  Check,
  AlertCircle,
  ArrowUpDown,
  Layers,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  List,
} from 'lucide-react';
import { StudioProject } from '../../types';
import { ProjectFormModal } from './ProjectFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface ProjectCrudManagerProps {
  projects: StudioProject[];
  onCreateProject: (project: Omit<StudioProject, 'id'>) => Promise<string>;
  onUpdateProject: (id: string, updates: Partial<StudioProject>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  onSeedDefaults: () => Promise<void>;
}

export const ProjectCrudManager: React.FC<ProjectCrudManagerProps> = ({
  projects,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onSeedDefaults,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'order' | 'code' | 'title' | 'date'>('order');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StudioProject | null>(null);
  const [deletingProject, setDeletingProject] = useState<StudioProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Derive all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.type) set.add(p.type.trim());
    });
    return ['ALL', ...Array.from(set)];
  }, [projects]);

  // Filtered and Sorted projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesCategory =
          selectedCategory === 'ALL' ||
          project.type?.toLowerCase() === selectedCategory.toLowerCase();

        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          project.title?.toLowerCase().includes(q) ||
          project.code?.toLowerCase().includes(q) ||
          project.technology?.toLowerCase().includes(q) ||
          project.description?.toLowerCase().includes(q) ||
          project.status?.toLowerCase().includes(q);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'code') {
          return (a.code || '').localeCompare(b.code || '');
        }
        if (sortBy === 'date') {
          return (b.createdAt || 0) - (a.createdAt || 0);
        }
        return (a.orderIndex ?? 0) - (b.orderIndex ?? 0);
      });
  }, [projects, searchQuery, selectedCategory, sortBy]);

  // Suggested code for next project (e.g. MW / 006)
  const nextSuggestedCode = useMemo(() => {
    const nextNum = projects.length + 1;
    return `MW / 00${nextNum}`;
  }, [projects.length]);

  // Handler: Open Create Modal
  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEdit = (project: StudioProject) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  // Handler: Clone / Duplicate Project
  const handleCloneProject = (project: StudioProject) => {
    const nextNum = projects.length + 1;
    const cloned: StudioProject = {
      ...project,
      id: '',
      code: `MW / 00${nextNum}`,
      title: `${project.title} (Copy)`,
      orderIndex: projects.length,
    };
    setEditingProject(cloned);
    setIsFormModalOpen(true);
  };

  // Handler: Save Project (Create or Update)
  const handleSaveProject = async (formData: Omit<StudioProject, 'id'>) => {
    try {
      if (editingProject && editingProject.id) {
        await onUpdateProject(editingProject.id, formData);
        showToast('success', `Project "${formData.title}" updated in Firestore.`);
      } else {
        await onCreateProject(formData);
        showToast('success', `Project "${formData.title}" created successfully.`);
      }
    } catch (err: any) {
      showToast('error', err?.message || 'Firestore mutation failed.');
      throw err;
    }
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      await onDeleteProject(deletingProject.id);
      showToast('success', `Project "${deletingProject.title}" deleted.`);
      setDeletingProject(null);
    } catch (err: any) {
      showToast('error', err?.message || 'Failed to delete project.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler: Reorder Shift
  const handleShiftOrder = async (project: StudioProject, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex((p) => p.id === project.id);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const targetProject = projects[targetIndex];
    try {
      await onUpdateProject(project.id, { orderIndex: targetIndex });
      await onUpdateProject(targetProject.id, { orderIndex: currentIndex });
      showToast('success', `Reordered ${project.code}`);
    } catch (err: any) {
      showToast('error', 'Reorder failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between shadow-lg ${
              toastMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {toastMessage.type === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{toastMessage.text}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs px-2"
            >
              DISMISS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
              PROJECTS MANAGEMENT
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 font-mono text-[10px] font-bold text-cyan-400">
              {projects.length} TOTAL
            </span>
          </div>
          <p className="font-mono text-xs text-slate-400 mt-0.5">
            Full CRUD control over digital product case studies displayed on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {projects.length === 0 && (
            <button
              onClick={async () => {
                try {
                  await onSeedDefaults();
                  showToast('success', 'Showcase projects seeded to Firestore.');
                } catch (err: any) {
                  showToast('error', err.message);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-white uppercase transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>SEED DEFAULTS</span>
            </button>
          )}

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>ADD PROJECT</span>
          </button>
        </div>
      </div>

      {/* Search, Filter, and View Controls */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, title, tech stack..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Pills & Sorting */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 font-mono text-[10px] uppercase focus:outline-none"
          >
            <option className="bg-[#090b10]" value="order">Sort: Custom Order</option>
            <option className="bg-[#090b10]" value="code">Sort: Code</option>
            <option className="bg-[#090b10]" value="title">Sort: Title</option>
            <option className="bg-[#090b10]" value="date">Sort: Date Added</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white/[0.03] p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/15 text-cyan-400' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white/15 text-cyan-400' : 'text-slate-400'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10">
          <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="font-display font-bold text-lg text-white uppercase">
            {searchQuery || selectedCategory !== 'ALL' ? 'NO MATCHING PROJECTS FOUND' : 'NO PROJECTS IN DATABASE'}
          </h4>
          <p className="font-sans text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'ALL'
              ? 'Try adjusting your search criteria or clearing active filters.'
              : 'Add your first project or populate initial default showcase items.'}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            {searchQuery || selectedCategory !== 'ALL' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-white uppercase"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold uppercase"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              {/* Top Accent bar & Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-80"
                style={{ backgroundColor: project.accent || '#38bdf8' }}
              />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/10 font-mono text-[10px] font-bold text-cyan-400">
                      {project.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.04] font-mono text-[9px] text-slate-400 uppercase">
                      {project.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Reorder Buttons (only in order sort mode) */}
                    {sortBy === 'order' && (
                      <div className="flex items-center">
                        <button
                          onClick={() => handleShiftOrder(project, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleShiftOrder(project, 'down')}
                          disabled={idx === filteredProjects.length - 1}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[9px] text-emerald-400 font-bold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-display font-bold text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h4>

                {/* Tech Highlights */}
                <div className="font-mono text-[11px] text-slate-400 mt-1 uppercase tracking-wide">
                  {project.technology}
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Telemetry / Stats */}
                {project.stats && (
                  <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-[10px] text-cyan-300">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span>{project.stats}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="font-mono text-[10px] text-slate-500 flex items-center gap-2">
                  <span>PREVIEW: {project.previewType}</span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>URL</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Duplicate / Clone Button */}
                  <button
                    onClick={() => handleCloneProject(project)}
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Clone project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/20 text-cyan-300 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeletingProject(project)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/40 border-b border-white/10 text-slate-400 text-[10px] uppercase">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Title & Tech</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Preview</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-bold text-cyan-400 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                      <span>{project.code}</span>
                    </div>
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <div className="font-display font-bold text-white text-sm truncate">
                      {project.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {project.technology}
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300 text-[11px] whitespace-nowrap">
                    {project.type}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 text-[10px] whitespace-nowrap">
                    {project.previewType}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                          title="Open live URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleCloneProject(project)}
                        className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingProject(project)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Form Modal (Create / Edit) */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        project={editingProject}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        nextSuggestedCode={nextSuggestedCode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProject)}
        project={deletingProject}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProject(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};
