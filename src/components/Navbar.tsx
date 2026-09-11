import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Sparkles, Shield } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface NavbarProps {
  onOpenProjectModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjectModal,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const { currentUser, isAdmin } = useStudioData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-5 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Monogram & Name */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-3.5 text-left focus:outline-none cursor-pointer"
          >
            {/* MW Monogram Badge */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl group-hover:border-cyan-400/40 group-hover:bg-white/[0.08] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-xs font-bold tracking-widest text-white">
                MW
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-[0.2em] text-white uppercase leading-none">
                MAKEWEBB
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase mt-1">
                STUDIO / 2026
              </span>
            </div>
          </button>

          {/* Center: Minimal Luxury Navigation System */}
          <nav className="hidden md:flex items-center gap-7 px-6 py-2.5 rounded-full bg-black/50 border border-white/[0.08] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => handleNavClick('projects')}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase relative group cursor-pointer"
            >
              WORK
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavClick('capabilities')}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase relative group cursor-pointer"
            >
              CAPABILITIES
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavClick('founders')}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase relative group cursor-pointer"
            >
              FOUNDERS
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavClick('philosophy')}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase relative group cursor-pointer"
            >
              PHILOSOPHY
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="font-mono text-[11px] tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase relative group cursor-pointer"
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Right Action: Inquire / Modal & Admin Portal */}
          <div className="flex items-center gap-2.5">
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                isAdmin
                  ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Open MakeWebb Firebase Admin Portal"
            >
              <Shield className="w-3 h-3 text-cyan-400" />
              <span className="hidden lg:inline">ADMIN</span>
              {isAdmin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            </button>

            <button
              onClick={onOpenProjectModal}
              className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-cyan-300 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.5)] focus:outline-none cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase font-bold">
                START A PROJECT ↗
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 bg-[#050608]/95 flex flex-col justify-between p-8 md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white">
                  MW
                </div>
                <span className="font-display font-bold tracking-widest text-white">
                  MAKEWEBB
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto">
              <span className="font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                SCENE DIRECTORY
              </span>
              {[
                { id: 'hero', label: '01 / HERO' },
                { id: 'about', label: '02 / MANIFESTO' },
                { id: 'capabilities', label: '03 / CAPABILITIES' },
                { id: 'projects', label: '04 / SELECTED WORK' },
                { id: 'founders', label: '05 / THE FOUNDERS' },
                { id: 'philosophy', label: '06 / PHILOSOPHY' },
                { id: 'technology', label: '07 / TECHNOLOGY' },
                { id: 'contact', label: '08 / CONTACT' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="font-display text-2xl font-bold tracking-wider text-left text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full py-3.5 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold tracking-[0.2em] uppercase"
              >
                START A PROJECT ↗
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>ADMIN CONSOLE</span>
              </button>

              <p className="font-mono text-[9px] tracking-widest text-slate-400 text-center uppercase">
                MAKEWEBB DIGITAL PRODUCT STUDIO · 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
