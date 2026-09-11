import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Shield,
  Database,
  Layers,
  Settings,
  Mail,
  User as UserIcon,
  LogOut,
  Sparkles,
  Check,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { StudioProject, SiteSettings } from '../types';
import { ProjectCrudManager } from './admin/ProjectCrudManager';
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  loginDemoAdmin,
  logoutUser,
} from '../services/firebaseService';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const {
    projects,
    siteSettings,
    inquiries,
    currentUser,
    isAdmin,
    createProject,
    updateProject,
    deleteProject,
    saveSiteSettings,
    seedDefaultProjects,
    updateInquiryStatus,
    deleteInquiry,
  } = useStudioData();

  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'inquiries' | 'database'>('projects');

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Settings form states
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Sync settings when siteSettings update
  React.useEffect(() => {
    if (siteSettings) {
      setSettingsForm(siteSettings);
    }
  }, [siteSettings]);

  if (!isOpen) return null;

  const formatAuthError = (err: any) => {
    const msg = err?.message || String(err);
    if (msg.includes('auth/operation-not-allowed') || err?.code === 'auth/operation-not-allowed') {
      return 'This provider is disabled in your Firebase project. In AI Studio Firebase, Google Sign-In is configured by default. Please click "SIGN IN WITH GOOGLE", or enable Email/Password and Anonymous in Firebase Console > Authentication > Sign-in method.';
    }
    return msg;
  };

  // Handle Authentication
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
    } catch (err: any) {
      setAuthError(formatAuthError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setAuthError(formatAuthError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoAdmin = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await loginDemoAdmin();
    } catch (err: any) {
      setAuthError(formatAuthError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      await saveSiteSettings(settingsForm);
      setSavedSettingsSuccess(true);
      setTimeout(() => setSavedSettingsSuccess(false), 3000);
    } catch (err: any) {
      alert('Error updating settings: ' + err.message);
    } finally {
      setSettingsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#040507]/90 backdrop-blur-2xl transition-opacity"
      />

      {/* Main Admin Console Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-6xl h-[92vh] rounded-3xl bg-[#07090e] border border-white/10 shadow-[0_25px_90px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden z-10"
      >
        {/* Top Header Bar */}
        <header className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                MW
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm tracking-wider text-white uppercase">
                    MAKEWEBB STUDIO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[9px] font-mono font-bold text-cyan-400 uppercase">
                    FIREBASE CONSOLE
                  </span>
                </div>
                <div className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FIRESTORE CLOUD ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && currentUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-slate-300">
                <UserIcon className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[150px]">{currentUser.email || 'Admin User'}</span>
              </div>
            )}

            {isAdmin && (
              <button
                onClick={() => logoutUser()}
                className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close Console & Return to Website"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        {!isAdmin ? (
          /* ========================================== */
          /* LOGIN VIEW (AUTHENTICATION)                */
          /* ========================================== */
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                ADMIN AUTHENTICATION
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-2">
                Sign in to manage MakeWebb portfolio projects, dynamic site copy, and incoming client briefs.
              </p>

              {authError && (
                <div className="mt-4 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 font-mono text-[11px] text-red-300 flex flex-col gap-2 text-left">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                  {authError.includes('Firebase Console') && (
                    <a
                      href="https://console.firebase.google.com/project/gen-lang-client-0094041024/authentication/providers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-[10px] font-mono tracking-wider transition-colors w-fit self-start"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>OPEN FIREBASE SIGN-IN PROVIDERS</span>
                    </a>
                  )}
                </div>
              )}

              {/* Primary: Google Sign In (Default active provider in AI Studio Firebase) */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={authLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white text-black hover:bg-cyan-300 font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
                    />
                  </svg>
                  <span>SIGN IN WITH GOOGLE</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-2 font-mono text-[9px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DEFAULT ACTIVE PROVIDER</span>
                </div>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-center">
                  <span className="px-3 bg-[#07090e] font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    ADDITIONAL PROVIDERS (REQUIRE CONSOLE ACTIVATION)
                  </span>
                </div>
              </div>

              {/* Instant 1-Click Demo Admin Button */}
              <div>
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ONE-CLICK DEMO (ANONYMOUS)</span>
                </button>
                <span className="font-mono text-[9px] text-slate-500 block mt-1">
                  Requires "Anonymous" enabled in Firebase Authentication
                </span>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleEmailAuth} className="mt-4 space-y-3 text-left">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@makewebb.com"
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {authMode === 'login' ? 'SIGN IN WITH EMAIL' : 'CREATE ADMIN ACCOUNT'}
                </button>
                <span className="font-mono text-[9px] text-slate-500 block text-center">
                  Requires "Email/Password" enabled in Firebase Authentication
                </span>
              </form>

              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="mt-3 font-mono text-[10px] text-slate-400 hover:text-white uppercase transition-colors"
              >
                {authMode === 'login' ? 'Need to register with email?' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        ) : (
          /* ========================================== */
          /* MAIN AUTHENTICATED ADMIN CONSOLE           */
          /* ========================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Vertical Navigation Menu */}
            <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] p-4 flex md:flex-col gap-2 shrink-0 bg-black/20 overflow-x-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wider uppercase transition-all text-left ${
                  activeTab === 'projects'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>PROJECTS ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex-1 md:flex-initial flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs tracking-wider uppercase transition-all text-left ${
                  activeTab === 'inquiries'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>INQUIRIES</span>
                </div>
                {inquiries.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    activeTab === 'inquiries' ? 'bg-black text-cyan-400' : 'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {inquiries.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wider uppercase transition-all text-left ${
                  activeTab === 'settings'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>DYNAMIC COPY</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wider uppercase transition-all text-left ${
                  activeTab === 'database'
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>DATABASE & SYNC</span>
              </button>

              <div className="hidden md:block mt-auto pt-4 border-t border-white/[0.08]">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block">
                    FIRESTORE REAL-TIME
                  </span>
                  <div className="font-mono text-[10px] text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>onSnapshot Active</span>
                  </div>
                  <span className="font-mono text-[8px] text-slate-400 block mt-1 truncate">
                    ID: ai-studio-makewebb...
                  </span>
                </div>
              </div>
            </nav>

            {/* Right Pane (Tab Content) */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* TAB 1: PROJECTS (FULL CRUD INTERFACE) */}
              {activeTab === 'projects' && (
                <ProjectCrudManager
                  projects={projects}
                  onCreateProject={createProject}
                  onUpdateProject={updateProject}
                  onDeleteProject={deleteProject}
                  onSeedDefaults={seedDefaultProjects}
                />
              )}

              {/* TAB 2: INQUIRIES & LEADS */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                      CLIENT INQUIRIES & LEADS
                    </h4>
                    <p className="font-mono text-xs text-slate-400">
                      Submissions received via the Start Project Engagement modal.
                    </p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10">
                      <Mail className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                      <div className="font-display font-bold text-lg text-white">NO INQUIRIES LOGGED YET</div>
                      <p className="font-sans text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        When visitors submit the "Start Project" modal or engagement form on the site, their briefs will appear here instantly.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
                        >
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-lg text-white">
                                  {inq.name}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase ${
                                    inq.status === 'new'
                                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                      : inq.status === 'contacted'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-white/10 text-slate-400'
                                  }`}
                                >
                                  {inq.status}
                                </span>
                              </div>

                              <div className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 font-mono text-xs">
                              <a
                                href={`mailto:${inq.email}`}
                                className="flex items-center gap-2 text-cyan-400 hover:underline"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{inq.email}</span>
                              </a>
                              {inq.phone && (
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="flex items-center gap-2 text-slate-300 hover:underline"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{inq.phone}</span>
                                </a>
                              )}
                            </div>

                            {/* Parameters */}
                            <div className="flex flex-wrap items-center gap-2 mt-4">
                              <span className="font-mono text-[10px] text-slate-400 uppercase">
                                DISCIPLINES:
                              </span>
                              {inq.disciplines?.map((d) => (
                                <span
                                  key={d}
                                  className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[10px] text-slate-300"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-3 font-mono text-[11px] text-slate-400">
                              <div>BUDGET: <strong className="text-white">{inq.budget}</strong></div>
                              <div>TIMELINE: <strong className="text-white">{inq.timeline}</strong></div>
                            </div>

                            {/* Brief message */}
                            {inq.message && (
                              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] font-sans text-xs text-slate-300 leading-relaxed">
                                {inq.message}
                              </div>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-400 uppercase">
                                SET STATUS:
                              </span>
                              {(['new', 'contacted', 'archived'] as const).map((st) => (
                                <button
                                  key={st}
                                  onClick={() => updateInquiryStatus(inq.id, st)}
                                  className={`px-2.5 py-1 rounded-lg font-mono text-[9px] uppercase transition-all ${
                                    inq.status === st
                                      ? 'bg-white text-black font-bold'
                                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() => {
                                if (confirm('Delete this inquiry record?')) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-2 text-red-400 hover:text-red-300"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: DYNAMIC COPY & SITE SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                        DYNAMIC SITE COPY & TELEMETRY
                      </h4>
                      <p className="font-mono text-xs text-slate-400">
                        Changes update live across the entire MakeWebb website in real-time.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={settingsSaving}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    >
                      {savedSettingsSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-black" />
                          <span>SAVED TO FIRESTORE!</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>{settingsSaving ? 'SAVING...' : 'PUBLISH CHANGES'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hero Section Copy */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase block">
                      SCENE 01 / HERO SECTION
                    </span>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                        TOP TELEMETRY BADGE
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroTag || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroTag: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                        MAIN TITLE HEADLINE
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroHeadline || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-display text-sm focus:outline-none focus:border-cyan-400 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                        SUPPORTING THESIS / SUBTITLE
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroSubtitle || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                        DISCIPLINES TEXT
                      </label>
                      <input
                        type="text"
                        value={settingsForm.disciplinesText || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, disciplinesText: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-cyan-400 font-mono text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Scene 02 Telemetry Metrics */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <span className="font-mono text-xs font-bold text-indigo-400 tracking-wider uppercase block">
                      SCENE 02 / TELEMETRY METRICS
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          LATENCY
                        </label>
                        <input
                          type="text"
                          value={settingsForm.latencyStat || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, latencyStat: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          PIPELINE FPS
                        </label>
                        <input
                          type="text"
                          value={settingsForm.fpsStat || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, fpsStat: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          CORE VITALS
                        </label>
                        <input
                          type="text"
                          value={settingsForm.vitalsStat || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, vitalsStat: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          TOPOLOGY
                        </label>
                        <input
                          type="text"
                          value={settingsForm.topologyStat || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, topologyStat: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scene 04 Manifesto */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <span className="font-mono text-xs font-bold text-white tracking-wider uppercase block">
                      SCENE 04 / STUDIO MANIFESTO
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          LINE 1
                        </label>
                        <input
                          type="text"
                          value={settingsForm.manifestoPrefix || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, manifestoPrefix: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-display text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          LINE 2
                        </label>
                        <input
                          type="text"
                          value={settingsForm.manifestoMiddle || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, manifestoMiddle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-display text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          LINE 3 (GLOWING)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.manifestoHighlight || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, manifestoHighlight: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-cyan-400 font-display text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                        MANIFESTO EDITORIAL STATEMENT
                      </label>
                      <textarea
                        rows={3}
                        value={settingsForm.manifestoDescription || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, manifestoDescription: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Contact Direct Lines */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider uppercase block">
                      SCENE 07 / FOUNDERS CONTACT
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          PRIMARY CONTACT EMAIL
                        </label>
                        <input
                          type="email"
                          value={settingsForm.contactEmail || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          OWAIES PHONE
                        </label>
                        <input
                          type="text"
                          value={settingsForm.owaiesPhone || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, owaiesPhone: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 uppercase mb-1">
                          AFAF PHONE
                        </label>
                        <input
                          type="text"
                          value={settingsForm.afafPhone || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, afafPhone: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 4: DATABASE & SYNC */}
              {activeTab === 'database' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h4 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                      FIRESTORE DATABASE MANAGEMENT
                    </h4>
                    <p className="font-mono text-xs text-slate-400">
                      Cloud schema, synchronization utilities, and seed controls.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-white uppercase">
                          SEED DEFAULT SHOWCASE PROJECTS
                        </div>
                        <p className="font-sans text-xs text-slate-400 mt-1">
                          Populates the Firestore `projects` collection with the original 5 showcase case studies (AI Job Tracker, E-Examiner, Object Detector, Silsila Burqa House, Hand Gesture Controller).
                        </p>
                      </div>

                      <button
                        onClick={async () => {
                          if (confirm('Re-seed initial 5 default projects into Firestore?')) {
                            await seedDefaultProjects();
                            alert('Default projects successfully seeded!');
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 font-mono text-xs text-white uppercase tracking-wider transition-colors shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>SEED DEFAULTS</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-3">
                      FIRESTORE CONFIGURATION
                    </span>
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                      <div>Project ID: <span className="text-cyan-400">gen-lang-client-0094041024</span></div>
                      <div>Named Database: <span className="text-cyan-400">ai-studio-makewebb-146fed6a-3978-4fe7-b14b-f7dabe35b563</span></div>
                      <div>Auth Provider: <span className="text-cyan-400">Firebase Authentication (Google & Email)</span></div>
                      <div>Security Rules: <span className="text-emerald-400">Deployed (Public Read, Admin Write)</span></div>
                      <div>Status: <span className="text-emerald-400">ONLINE & SYNCHRONIZING</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
