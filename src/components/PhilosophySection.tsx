import React from 'react';
import { motion } from 'motion/react';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none overflow-hidden"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-16">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>SCENE 08 / STUDIO PHILOSOPHY</span>
          </div>
          <span className="hidden sm:inline-block">THREE CORE BELIEFS</span>
        </div>

        {/* Dramatic Typography-Driven Statements */}
        <div className="space-y-16 sm:space-y-24">
          {/* Statement 01 */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="font-mono text-xs text-indigo-400 tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-indigo-400/50" />
              <span>PRINCIPLE 01</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-[-0.04em] leading-[0.92] text-white uppercase">
              IDEAS DESERVE
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                BETTER INTERFACES.
              </span>
            </h2>
          </motion.div>

          {/* Statement 02 */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-cyan-400/50" />
              <span>PRINCIPLE 02</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-[-0.04em] leading-[0.92] uppercase">
              <span className="text-white block">DATA SHOULD</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 block">
                BECOME DECISIONS.
              </span>
            </h2>
          </motion.div>

          {/* Statement 03 */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-emerald-400/50" />
              <span>PRINCIPLE 03</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-[-0.04em] leading-[0.92] text-white uppercase">
              TECHNOLOGY SHOULD
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
                FEEL HUMAN.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
