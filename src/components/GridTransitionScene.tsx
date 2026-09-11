import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Globe, Layers } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export const GridTransitionScene: React.FC = () => {
  const { siteSettings } = useStudioData();

  const latencyStat = siteSettings?.latencyStat || '14ms';
  const fpsStat = siteSettings?.fpsStat || '60 FPS';
  const vitalsStat = siteSettings?.vitalsStat || '99.8%';
  const topologyStat = siteSettings?.topologyStat || 'V3 / TS';

  return (
    <section
      id="grid-morph"
      className="relative min-h-[70vh] flex flex-col justify-center px-6 sm:px-12 py-24 border-t border-b border-white/[0.06] overflow-hidden select-none"
    >
      {/* Background Subtle Coordinate Lines */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Scene 02 Tag */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SCENE 02 / GRID MORPH</span>
          </div>
          <span className="font-mono text-slate-400">LAT: 12.9716° N / LON: 77.5946° E</span>
        </div>

        {/* Editorial Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white leading-[1.05] uppercase">
              PRECISION <br />
              <span className="text-slate-400">MEETS FLUIDITY.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl mt-6 leading-relaxed">
              We deconstruct complex machine intelligence and architectural engineering into
              crystalline, intuitive digital surfaces. Every pixel is calculated; every interaction is physical.
            </p>
          </div>

          {/* Telemetry Matrix Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-[9px] tracking-widest uppercase">LATENCY</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white tracking-tight">{latencyStat}</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1 uppercase">Edge Inference Benchmark</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-[9px] tracking-widest uppercase">PIPELINE</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white tracking-tight">{fpsStat}</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1 uppercase">Continuous GPU Render</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-[9px] tracking-widest uppercase">CORE VITALS</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white tracking-tight">{vitalsStat}</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1 uppercase">Lighthouse Metric SLA</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-[9px] tracking-widest uppercase">TOPOLOGY</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white tracking-tight">{topologyStat}</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1 uppercase">Fully Typed Architecture</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
