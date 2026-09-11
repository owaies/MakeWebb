import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Cpu, Database, Eye, Globe, Layout, Layers, Terminal, Boxes } from 'lucide-react';
import { CAPABILITIES } from '../data/websiteData';
import { CapabilityItem } from '../types';

const ICONS_MAP: Record<string, React.ReactNode> = {
  'cap-01': <Cpu className="w-5 h-5" />,
  'cap-02': <Database className="w-5 h-5" />,
  'cap-03': <Eye className="w-5 h-5" />,
  'cap-04': <Globe className="w-5 h-5" />,
  'cap-05': <Layout className="w-5 h-5" />,
  'cap-06': <Layers className="w-5 h-5" />,
  'cap-07': <Terminal className="w-5 h-5" />,
  'cap-08': <Boxes className="w-5 h-5" />,
};

export const CapabilitiesOrbital: React.FC = () => {
  const [hoveredCap, setHoveredCap] = useState<CapabilityItem | null>(null);
  const [selectedCap, setSelectedCap] = useState<CapabilityItem>(CAPABILITIES[0]);
  const [viewMode, setViewMode] = useState<'spatial' | 'orbital'>('spatial');
  const [rotationAngle, setRotationAngle] = useState(0);

  React.useEffect(() => {
    if (viewMode !== 'orbital') return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [viewMode]);

  return (
    <section
      id="capabilities"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none overflow-hidden"
    >
      {/* Dynamic Background Ambient Lighting */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background:
            hoveredCap?.category === 'AI'
              ? 'radial-gradient(circle, #38bdf8 0%, transparent 70%)'
              : hoveredCap?.category === 'Engineering'
              ? 'radial-gradient(circle, #818cf8 0%, transparent 70%)'
              : 'radial-gradient(circle, #34d399 0%, transparent 70%)',
          top: '20%',
          left: '30%',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SCENE 04 / STUDIO CAPABILITIES</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white uppercase">
              CAPABILITIES & SYSTEMS
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-400 mt-2 max-w-xl">
              Spatial objects engineered to transform raw ambition into high-velocity digital equity.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setViewMode('spatial')}
              className={`px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all ${
                viewMode === 'spatial'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SPATIAL MATRIX
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all ${
                viewMode === 'orbital'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D ORBITAL
            </button>
          </div>
        </div>

        {/* VIEW 1: SPATIAL OBJECTS MATRIX */}
        {viewMode === 'spatial' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CAPABILITIES.map((cap) => {
              const isHovered = hoveredCap?.id === cap.id;
              const isSelected = selectedCap.id === cap.id;

              return (
                <motion.div
                  key={cap.id}
                  onMouseEnter={() => {
                    setHoveredCap(cap);
                    setSelectedCap(cap);
                  }}
                  onMouseLeave={() => setHoveredCap(null)}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`group relative p-6 sm:p-7 rounded-2xl border backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[300px] ${
                    isHovered || isSelected
                      ? 'bg-white/[0.05] border-cyan-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
                      : 'bg-white/[0.015] border-white/[0.08] hover:border-white/20'
                  }`}
                  data-cursor="EXPLORE"
                >
                  {/* Subtle Corner Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
                      isHovered ? 'opacity-100 bg-cyan-400/20' : 'opacity-0'
                    }`}
                  />

                  {/* Card Header: Number + Category */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase pb-4 border-b border-white/[0.06]">
                      <span className="text-cyan-400 font-bold">{cap.number}</span>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span>{cap.category}</span>
                      </div>
                    </div>

                    {/* Capability Title (Typography shifts on hover) */}
                    <div className="mt-5 transition-transform duration-300 group-hover:translate-x-1">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-colors">
                        {ICONS_MAP[cap.id] || <Sparkles className="w-4 h-4" />}
                      </div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                        {cap.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  {/* Secondary Information (Appears & reacts on hover) */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      <span className="text-slate-400">TECHNOLOGY:</span>{' '}
                      <span className="text-slate-200 font-medium">{cap.technology}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3 font-mono text-[9px] tracking-widest uppercase">
                      <span className="text-emerald-400">{cap.metrics}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: 3D ORBITAL MATRIX */}
        {viewMode === 'orbital' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
              <div className="absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

              {/* Orbital Rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
                <circle cx="50%" cy="50%" r="130" fill="none" stroke="rgba(255,255,255,0.08)" />
              </svg>

              {/* Center Nucleus */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-white/[0.04] border border-white/20 backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(56,189,248,0.25)]">
                <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase font-semibold">
                  MAKEWEBB
                </span>
                <span className="font-display font-black text-xs text-white uppercase tracking-wider mt-0.5">
                  CORE MATRIX
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mt-1.5" />
              </div>

              {/* Orbiting Capability Nodes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {CAPABILITIES.map((cap) => {
                  const currentRad = ((cap.angle + rotationAngle) * Math.PI) / 180;
                  const radiusX = 200;
                  const radiusY = 145;
                  const x = Math.cos(currentRad) * radiusX;
                  const y = Math.sin(currentRad) * radiusY;
                  const isSelected = selectedCap.id === cap.id;

                  return (
                    <button
                      key={cap.id}
                      onClick={() => setSelectedCap(cap)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className={`pointer-events-auto absolute p-2.5 sm:p-3 rounded-xl border backdrop-blur-xl transition-all duration-300 group cursor-pointer shadow-lg ${
                        isSelected
                          ? 'bg-white text-black border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-110 z-30'
                          : 'bg-black/80 text-white border-white/10 hover:border-white/30 hover:bg-white/10 z-20'
                      }`}
                    >
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-600' : 'bg-cyan-400'}`} />
                        <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold">
                          {cap.number} {cap.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orbital Active Inspector */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCap.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] font-mono text-[10px] tracking-[0.2em] uppercase">
                    <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedCap.category} CAPABILITY
                    </span>
                    <span className="text-slate-400">{selectedCap.number} OF 08</span>
                  </div>

                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mt-6">
                    {selectedCap.name}
                  </h3>

                  <p className="font-sans text-base text-slate-300 mt-4 leading-relaxed">
                    {selectedCap.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mt-6">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">CORE TECHNOLOGY</div>
                    <div className="font-mono text-sm text-cyan-300 font-medium mt-1">{selectedCap.technology}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mt-3">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">SYSTEM METRIC</div>
                    <div className="font-mono text-lg font-bold text-emerald-400 mt-1">{selectedCap.metrics}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
