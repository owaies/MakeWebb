import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  ExternalLink,
  Check,
  AlertCircle,
  Eye,
  Sliders,
  Layers,
  Palette,
} from 'lucide-react';
import { StudioProject } from '../../types';

interface ProjectFormModalProps {
  isOpen: boolean;
  project: StudioProject | null;
  onClose: () => void;
  onSave: (formData: Omit<StudioProject, 'id'>) => Promise<void>;
  nextSuggestedCode: string;
}

const ACCENT_PRESETS = [
  { name: 'Cyan Neon', hex: '#38bdf8' },
  { name: 'Emerald AI', hex: '#34d399' },
  { name: 'Indigo Core', hex: '#818cf8' },
  { name: 'Purple Synth', hex: '#c084fc' },
  { name: 'Rose Quantum', hex: '#fb7185' },
  { name: 'Amber Glow', hex: '#fbbf24' },
];

const PREVIEW_TYPES: { id: StudioProject['previewType']; label: string; desc: string }[] = [
  {
    id: 'ai-tracker',
    label: 'AI Pipeline & Funnel',
    desc: 'Simulated neural stages, token throughput & latency visualizer',
  },
  {
    id: 'examiner',
    label: 'Online Assessment & Code',
    desc: 'Terminal IDE simulation with syntax tests and runner metrics',
  },
  {
    id: 'detector',
    label: 'Computer Vision Reticle Scan',
    desc: 'HUD targeting reticle, bounding frames & confidence ratings',
  },
  {
    id: 'ecommerce',
    label: 'Luxury Fashion Showcase',
    desc: 'Editorial luxury storefront layout with interactive product badge',
  },
  {
    id: 'gesture',
    label: 'Hand Gesture Skeleton',
    desc: 'Kinematic 21-point hand tracking skeleton canvas',
  },
];

const CATEGORY_PRESETS = [
  'AI PRODUCT',
  'WEB PLATFORM',
  'MOBILE APPLICATION',
  'COMPUTER VISION',
  'E-COMMERCE EXPERIENCE',
  'DATA PLATFORM',
];

const STATUS_PRESETS = [
  'PRODUCTION ACTIVE',
  'IN DEVELOPMENT',
  'BETA ACCESS',
  'EXPERIMENTAL LAB',
  'STABLE RELEASE',
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
  nextSuggestedCode,
}) => {
  const [formData, setFormData] = useState<Omit<StudioProject, 'id'>>({
    code: nextSuggestedCode,
    title: '',
    type: 'AI PRODUCT',
    technology: 'Next.js 15 · AI · Cloud Engine',
    url: 'https://',
    description: '',
    status: 'PRODUCTION ACTIVE',
    stats: 'Enterprise Scale · High Precision',
    accent: '#38bdf8',
    previewType: 'ai-tracker',
    orderIndex: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    if (project) {
      setFormData({
        code: project.code || nextSuggestedCode,
        title: project.title || '',
        type: project.type || 'AI PRODUCT',
        technology: project.technology || '',
        url: project.url || '',
        description: project.description || '',
        status: project.status || 'PRODUCTION ACTIVE',
        stats: project.stats || '',
        accent: project.accent || '#38bdf8',
        previewType: project.previewType || 'ai-tracker',
        orderIndex: project.orderIndex ?? 0,
      });
    } else {
      setFormData({
        code: nextSuggestedCode,
        title: '',
        type: 'AI PRODUCT',
        technology: 'Next.js 15 · AI · Cloud Engine',
        url: 'https://',
        description: '',
        status: 'PRODUCTION ACTIVE',
        stats: 'Enterprise Scale · High Precision',
        accent: '#38bdf8',
        previewType: 'ai-tracker',
        orderIndex: 0,
      });
    }
    setErrorMessage(null);
  }, [project, nextSuggestedCode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.title.trim()) {
      setErrorMessage('Project Title is required.');
      return;
    }
    if (!formData.code.trim()) {
      setErrorMessage('Project Code (e.g. MW / 006) is required.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Description is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save project to Firestore.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040508]/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#090b10] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-hidden text-left"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: formData.accent }}
              />
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">
                  {project ? `EDIT PROJECT · ${project.code}` : 'CREATE NEW PORTFOLIO PROJECT'}
                </h3>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  FIRESTORE DOCUMENT SPECIFICATION
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Switcher for Mobile / Small Screens */}
              <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10 sm:hidden">
                <button
                  type="button"
                  onClick={() => setPreviewTab('form')}
                  className={`px-3 py-1 rounded-lg font-mono text-[10px] uppercase transition-colors ${
                    previewTab === 'form' ? 'bg-white text-black font-bold' : 'text-slate-400'
                  }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`px-3 py-1 rounded-lg font-mono text-[10px] uppercase transition-colors ${
                    previewTab === 'preview' ? 'bg-white text-black font-bold' : 'text-slate-400'
                  }`}
                >
                  Preview
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form Content / Split View */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Fields (Left 7 Columns on Large Screens) */}
            <form
              id="project-crud-form"
              onSubmit={handleSubmit}
              className={`lg:col-span-7 space-y-4 ${
                previewTab === 'preview' ? 'hidden sm:block' : 'block'
              }`}
            >
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Code & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    PROJECT CODE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="MW / 006"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-cyan-400 font-mono text-xs font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Autonomous Vision Engine"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-display text-sm font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    CATEGORY / TYPE
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    list="category-suggestions"
                    placeholder="AI PRODUCT"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <datalist id="category-suggestions">
                    {CATEGORY_PRESETS.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    STATUS BADGE
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    list="status-suggestions"
                    placeholder="PRODUCTION ACTIVE"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-emerald-400 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <datalist id="status-suggestions">
                    {STATUS_PRESETS.map((st) => (
                      <option key={st} value={st} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Technology Stack & Live URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    TECHNOLOGY SPEC
                  </label>
                  <input
                    type="text"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    placeholder="Next.js 15 · PyTorch · Vision"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                    LIVE URL / DEMO LINK
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://make-webb.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-cyan-400 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                  EDITORIAL DESCRIPTION *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the product architecture, user outcomes, and digital craft..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 font-sans text-xs focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
                />
              </div>

              {/* Performance Metric / Stats */}
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                  BENCHMARK STATS / TELEMETRY BADGE
                </label>
                <input
                  type="text"
                  value={formData.stats}
                  onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                  placeholder="e.g. 14ms Inference Latency · 99.4% Parsing Precision"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Accent Color Selection with Quick Palettes */}
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                  <span>ACCENT COLOR & GLOW</span>
                  <span className="text-white font-bold">{formData.accent}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="color"
                    value={formData.accent}
                    onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                    className="w-9 h-9 rounded-xl bg-transparent border border-white/20 cursor-pointer"
                  />
                  {ACCENT_PRESETS.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setFormData({ ...formData, accent: preset.hex })}
                      className={`px-2.5 py-1.5 rounded-lg border font-mono text-[10px] flex items-center gap-1.5 transition-all ${
                        formData.accent.toLowerCase() === preset.hex.toLowerCase()
                          ? 'border-white bg-white/15 text-white'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Simulation Widget Selector */}
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1.5">
                  INTERACTIVE SHOWCASE PREVIEW COMPONENT
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREVIEW_TYPES.map((pt) => {
                    const isSelected = formData.previewType === pt.id;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, previewType: pt.id })}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-cyan-400/60 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                            : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase text-white">
                            {pt.label}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <span className="font-sans text-[10px] text-slate-400 mt-1 line-clamp-2">
                          {pt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>

            {/* Live Visual Card Preview (Right 5 Columns on Large Screens) */}
            <div
              className={`lg:col-span-5 flex flex-col justify-between space-y-4 ${
                previewTab === 'form' ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LIVE CARD PREVIEW</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase">
                    SCENE 03 RENDER
                  </span>
                </div>

                {/* Simulated Project Card */}
                <div className="relative rounded-2xl p-6 bg-white/[0.03] border border-white/15 overflow-hidden shadow-2xl backdrop-blur-xl">
                  {/* Accent Glow */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors"
                    style={{ backgroundColor: formData.accent }}
                  />

                  {/* Header badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-400 font-bold">
                      {formData.code || 'MW / 000'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300">
                      {formData.type || 'AI PRODUCT'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[9px]">
                      {formData.status || 'ACTIVE'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-extrabold text-2xl text-white tracking-tight leading-snug">
                    {formData.title || 'Untitled Case Study'}
                  </h4>

                  {/* Tech stack */}
                  <div className="font-mono text-[11px] text-slate-400 mt-2 uppercase tracking-wide">
                    {formData.technology || 'Technology Stack Specification'}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {formData.description || 'Project editorial description will render here with high typographic legibility...'}
                  </p>

                  {/* Stats badge */}
                  <div className="mt-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[10px] text-cyan-300 flex items-center justify-between">
                    <span>{formData.stats || 'Benchmark Metrics'}</span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: formData.accent }}
                    />
                  </div>

                  {/* Action Link Mock */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500">PREVIEW: {formData.previewType}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-400">
                      <span>EXPLORE</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Firestore Document Metadata Box */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.08] font-mono text-[10px] text-slate-400 space-y-1">
                <div className="text-white font-bold uppercase tracking-wider mb-1">
                  FIRESTORE TARGET
                </div>
                <div>Collection: <span className="text-cyan-400">/projects</span></div>
                <div>Document ID: <span className="text-slate-300">{project ? project.id : 'Auto-generated (addDoc)'}</span></div>
                <div>Created At: <span className="text-slate-300">{project?.createdAt ? new Date(project.createdAt).toLocaleString() : 'Now (Timestamp)'}</span></div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/[0.08] flex items-center justify-between bg-black/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>

            <button
              type="submit"
              form="project-crud-form"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'WRITING TO FIRESTORE...' : project ? 'UPDATE PROJECT' : 'CREATE PROJECT'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
