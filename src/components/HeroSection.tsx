import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Activity } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenProjectModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenProjectModal,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Top Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase pt-2"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>EST. 2026 / DIGITAL PRODUCT STUDIO</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>NEURAL ENGINES ACTIVE</span>
          </div>
          <span className="text-white/20">|</span>
          <span>AWARDS-GRADE CREATIVE DEV</span>
        </div>
      </motion.div>

      {/* Center Monumental Typography Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center my-auto py-8">
        {/* Monogram Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-6 sm:mb-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 font-semibold uppercase">
            SCENE 01 / LIQUID SCULPTURE
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="font-mono text-[10px] tracking-widest text-slate-400">
            MW MONOGRAM 3D
          </span>
        </motion.div>

        {/* Huge Title: MAKEWEBB */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-[-0.04em] leading-[0.88] text-white uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
            MAKEWEBB
          </span>
        </motion.h1>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg sm:text-2xl md:text-3xl text-slate-200 font-medium tracking-tight mt-6 sm:mt-8 max-w-2xl mx-auto"
        >
          We build intelligent digital experiences.
        </motion.p>

        {/* Secondary Disciplines: AI · WEB · DATA · DESIGN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.35em] text-cyan-400/90 uppercase mt-4 sm:mt-5"
        >
          <span>AI</span>
          <span className="text-white/30">•</span>
          <span>WEB</span>
          <span className="text-white/30">•</span>
          <span>DATA</span>
          <span className="text-white/30">•</span>
          <span>DESIGN</span>
        </motion.div>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          <button
            onClick={onOpenProjectModal}
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>DISCUSS AN ENGAGEMENT</span>
          </button>

          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-mono text-xs tracking-[0.2em] uppercase backdrop-blur-xl transition-all duration-300"
          >
            <span>VIEW SHOWCASE</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </motion.div>
      </div>

      {/* Understated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center pt-6"
      >
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-slate-400 hover:text-white uppercase transition-colors"
        >
          <span>SCROLL TO EXPLORE ↓</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 via-cyan-400/80 to-transparent group-hover:h-12 transition-all duration-300" />
        </button>
      </motion.div>
    </section>
  );
};
