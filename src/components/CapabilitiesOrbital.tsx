import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Network, ArrowRight, Play, Pause } from 'lucide-react';
import { CAPABILITIES } from '../data/websiteData';
import { CapabilityItem } from '../types';

export const CapabilitiesOrbital: React.FC = () => {
  const [activeCap, setActiveCap] = useState<CapabilityItem>(CAPABILITIES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.35) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  return (
    <section
      id="capabilities"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SCENE 06 / ORBITAL MATRIX</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white uppercase">
              TECHNOLOGY & CAPABILITIES
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono text-[10px] text-slate-300 uppercase tracking-widest transition-colors"
            >
              {isRotating ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isRotating ? 'PAUSE ORBIT' : 'RESUME ORBIT'}</span>
            </button>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline-block">
              08 NODES ACTIVE
            </span>
          </div>
        </div>

        {/* 3D Spatial Orbital Viewport & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Orbital System Canvas Representation */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* SVG Connecting Web of Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <defs>
                <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle
                cx="50%"
                cy="50%"
                r="180"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 6"
              />
              <circle
                cx="50%"
                cy="50%"
                r="120"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
              />
            </svg>

            {/* Center Master Nucleus */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-white/[0.04] border border-white/20 backdrop-blur-2xl flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase font-semibold">
                MAKEWEBB
              </span>
              <span className="font-display font-black text-xs text-white uppercase tracking-wider mt-0.5">
                NUCLEUS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mt-1" />
            </div>

            {/* Orbiting Capability Nodes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {CAPABILITIES.map((cap, index) => {
                // Calculate position along ellipse
                const currentRad = ((cap.angle + rotationAngle) * Math.PI) / 180;
                const radiusX = 180;
                const radiusY = 135;
                const x = Math.cos(currentRad) * radiusX;
                const y = Math.sin(currentRad) * radiusY;
                const isSelected = activeCap.id === cap.id;

                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCap(cap)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`pointer-events-auto absolute p-2.5 sm:p-3.5 rounded-xl border backdrop-blur-xl transition-all duration-300 group cursor-pointer shadow-lg ${
                      isSelected
                        ? 'bg-white text-black border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-110 z-30'
                        : 'bg-black/80 text-white border-white/10 hover:border-white/30 hover:bg-white/10 z-20'
                    }`}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-cyan-600' : 'bg-cyan-400'
                        }`}
                      />
                      <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold">
                        {cap.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Node Deep Inspector */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeCap.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeCap.category} DISCIPLINE
                </span>
                <span className="text-slate-400">NODE 0{CAPABILITIES.findIndex((c) => c.id === activeCap.id) + 1}</span>
              </div>

              {/* Capability Name */}
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mt-6">
                {activeCap.name}
              </h3>

              {/* Description */}
              <p className="font-sans text-base text-slate-300 mt-4 leading-relaxed">
                {activeCap.description}
              </p>

              {/* Telemetry Metric Gauge */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mt-8">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase">
                  <span>SYSTEM METRIC</span>
                  <span className="text-emerald-400">VERIFIED BENCHMARK</span>
                </div>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {activeCap.metrics}
                </div>
              </div>

              {/* Interactive Quick Nodes Selector (Mobile & Desktop Access) */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <div className="font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-3">
                  DIRECT NODE SELECTION
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CAPABILITIES.map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => setActiveCap(cap)}
                      className={`p-2 rounded-lg font-mono text-[9px] tracking-wider uppercase text-center transition-all truncate ${
                        activeCap.id === cap.id
                          ? 'bg-cyan-400 text-black font-bold'
                          : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'
                      }`}
                    >
                      {cap.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
