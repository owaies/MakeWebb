import React from 'react';
import { motion } from 'motion/react';

interface SceneIndicatorProps {
  currentScene: number; // 1 to 8
  onSelectScene: (sceneIndex: number) => void;
}

const SCENE_NAMES = [
  '01 HERO',
  '02 MANIFESTO',
  '03 CAPABILITIES',
  '04 SELECTED WORK',
  '05 THE FOUNDERS',
  '06 PHILOSOPHY',
  '07 TECHNOLOGY',
  '08 CONTACT',
];

export const SceneIndicator: React.FC<SceneIndicatorProps> = ({
  currentScene,
  onSelectScene,
}) => {
  return (
    <aside aria-label="Scene Navigator" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none">
      <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>SCENE 0{currentScene} / 08</span>
      </div>

      <nav aria-label="Scenes list" className="flex flex-col gap-2.5 items-end">
        {SCENE_NAMES.map((name, idx) => {
          const sceneNumber = idx + 1;
          const isActive = currentScene === sceneNumber;

          return (
            <button
              key={name}
              onClick={() => onSelectScene(sceneNumber)}
              className="group flex items-center gap-3 py-0.5 text-right transition-all cursor-pointer"
            >
              <span
                className={`font-mono text-[10px] tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-white font-medium translate-x-0 opacity-100'
                    : 'text-slate-400 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {name}
              </span>

              <div className="relative flex items-center justify-center w-4 h-4">
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#38bdf8]'
                      : 'w-1 h-1 bg-white/20 group-hover:bg-white/60'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="scene-active-ring"
                    className="absolute inset-0 rounded-full border border-cyan-400/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
