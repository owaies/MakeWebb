import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Phase 1: MW Monogram (0 to 600ms)
    const t1 = setTimeout(() => setPhase(2), 600);
    // Phase 2: MAKEWEBB (600ms to 1300ms)
    const t2 = setTimeout(() => setPhase(3), 1300);
    // Phase 3: DIGITAL PRODUCT STUDIO (1300ms to 1900ms)
    const t3 = setTimeout(() => {
      setPhase(4);
      setIsDone(true);
      if (onLoadingComplete) onLoadingComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#08090B] flex flex-col items-center justify-center select-none overflow-hidden"
          onClick={() => {
            setIsDone(true);
            if (onLoadingComplete) onLoadingComplete();
          }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Center Monogram & Typography Reveal */}
          <div className="relative flex flex-col items-center justify-center text-center px-6">
            {/* Phase 1: MW Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/20 flex items-center justify-center font-display font-black text-xl text-white tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6"
            >
              MW
            </motion.div>

            {/* Phase 2: MAKEWEBB Typography Reveal */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                animate={
                  phase >= 2
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '100%', opacity: 0, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.04em] text-white uppercase"
              >
                MAKEWEBB
              </motion.h1>
            </div>

            {/* Phase 3: DIGITAL PRODUCT STUDIO & Precision Line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center mt-3 space-y-3"
            >
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-slate-400 uppercase">
                DIGITAL PRODUCT STUDIO
              </span>
            </motion.div>
          </div>

          {/* Minimal Bottom Skip Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 font-mono text-[9px] tracking-widest text-slate-500 uppercase cursor-pointer hover:opacity-100 transition-opacity"
          >
            CLICK ANYWHERE TO ENTER
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
