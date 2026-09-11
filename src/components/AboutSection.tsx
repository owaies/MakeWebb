import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Zap, Shield, ArrowDown } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  return (
    <section
      id="manifesto"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] overflow-hidden select-none"
    >
      {/* Subtle Floating Ambient Coordinates */}
      <div className="absolute top-20 right-12 font-mono text-[9px] text-cyan-400/40 tracking-[0.3em] uppercase hidden md:block">
        SYS.MANIFESTO // LAT 12.9716° N • LON 77.5946° E
      </div>
      <div className="absolute bottom-20 left-12 font-mono text-[9px] text-slate-500/40 tracking-[0.3em] uppercase hidden md:block">
        TRANSCENDING STATIC MEDIUMS
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCENE 03 / STUDIO MANIFESTO</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(1)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-all ${
                activeStep === 1
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              01
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-all ${
                activeStep === 2
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              02
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-all ${
                activeStep === 3
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              03
            </button>
          </div>
        </div>

        {/* Monumental Editorial Statements (Interactive & Scroll-aware) */}
        <div className="space-y-16 sm:space-y-24">
          {/* Statement 01 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            onViewportEnter={() => setActiveStep(1)}
            className="group relative"
          >
            <div className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-cyan-400/50" />
              <span>THE DEPARTURE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.9] text-slate-300 uppercase">
              WE DON'T JUST
              <span className="block text-slate-400">BUILD WEBSITES.</span>
            </h2>
          </motion.div>

          {/* Statement 02 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            onViewportEnter={() => setActiveStep(2)}
            className="group relative"
          >
            <div className="font-mono text-xs text-indigo-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-indigo-400/50" />
              <span>THE TRANSFORMATION</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.9] uppercase">
              <span className="text-white block">WE BUILD</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 block">
                INTELLIGENT
              </span>
              <span className="text-white block">PRODUCTS.</span>
            </h2>
          </motion.div>

          {/* Statement 03 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            onViewportEnter={() => setActiveStep(3)}
            className="group relative"
          >
            <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-emerald-400/50" />
              <span>THE TRAJECTORY</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.9] uppercase text-white">
              <span className="text-slate-400 block">FROM</span>
              <span className="text-white block">IDEA</span>
              <span className="text-slate-400 block">TO</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 block">
                EXPERIENCE.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Supporting Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pt-12 border-t border-white/[0.08]">
          <div className="lg:col-span-5">
            <p className="font-sans text-xl sm:text-2xl text-slate-300 font-light leading-relaxed tracking-tight">
              MAKEWEBB synthesizes artificial intelligence, computer vision, data architecture, and bespoke UI/UX into unified digital ecosystems designed to endure.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-cyan-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                01. AUTONOMOUS INTELLIGENCE
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Embedding machine learning and multi-modal models directly into live consumer and enterprise loops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-indigo-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                02. SPATIAL ELEGANCE
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Kinetic typography, fluid physics, and depth composition to make every viewport memorable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-emerald-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                03. ZERO COMPROMISE
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Sub-30ms event execution, 100/100 Core Web Vitals, and battle-tested cloud backends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-amber-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                04. MEASURABLE IMPACT
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Engineering high-velocity platforms that convert vision into defensible digital equity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
