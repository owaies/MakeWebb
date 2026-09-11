import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Zap, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SCENE 04 / STUDIO MANIFESTO</span>
          </div>
          <span>MAKEWEBB CORE THESIS</span>
        </div>

        {/* Monumental Editorial Headline with Dynamic Word Depths */}
        <div className="space-y-2 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.92] text-white uppercase"
          >
            WE DON'T JUST
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] leading-[0.92] uppercase text-slate-400"
          >
            BUILD WEBSITES.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display font-black text-5xl sm:text-7xl md:text-9xl lg:text-[8.5rem] tracking-[-0.04em] leading-[0.9] uppercase text-gradient-glow pt-2"
          >
            WE BUILD EXPERIENCES.
          </motion.div>
        </div>

        {/* Supporting Editorial Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 sm:mt-24 pt-12 border-t border-white/[0.08]">
          <div className="lg:col-span-6">
            <p className="font-sans text-xl sm:text-2xl md:text-3xl text-slate-200 font-light leading-relaxed tracking-tight">
              MakeWebb combines artificial intelligence, engineering, data and design to create
              digital products that feel as intelligent as they function.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                01. ARTIFICIAL REASONING
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Embedding autonomous machine learning into everyday user experiences to predict, adapt, and empower.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                02. SPATIAL ELEGANCE
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Sculpting depth, light caustics, and liquid motion to transcend static templates into living digital art.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                03. ZERO COMPROMISE
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Sub-30ms execution pipelines, native TypeScript type-safety, and production-hardened microservices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                04. MEASURABLE IMPACT
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2 leading-relaxed">
                Building scalable digital equity for founders and enterprises with uncompromising craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
