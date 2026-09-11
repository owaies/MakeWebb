import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, ExternalLink, Cpu, Globe, Check, Copy, Sparkles, Layers } from 'lucide-react';
import { FOUNDERS } from '../data/websiteData';

export const FoundersSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section
      id="founders"
      className="relative min-h-screen px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SCENE 05 / LEADERSHIP</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white uppercase">
              THE PEOPLE BEHIND THE SYSTEM
            </h2>
          </div>

          <div className="sm:text-right max-w-sm font-mono text-xs text-slate-400 uppercase tracking-wider">
            FOUNDING PARTNERS · ARCHITECTS · BUILDERS
          </div>
        </div>

        {/* Two Sophisticated Profile Compositions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {FOUNDERS.map((founder, index) => {
            const isOwaies = founder.id === 'owaies';

            return (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.2 }}
                className="relative rounded-3xl p-8 sm:p-10 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                {/* Background Ambient Aura */}
                <div
                  className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                  style={{ backgroundColor: founder.accentColor }}
                />

                <div>
                  {/* Visual Atmosphere Header & Tag */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: founder.accentColor, boxShadow: `0 0 10px ${founder.accentColor}` }}
                      />
                      <span className="font-mono text-xs font-bold text-white tracking-[0.2em] uppercase">
                        {founder.role}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                      {founder.focus}
                    </span>
                  </div>

                  {/* Founder Name */}
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    {founder.name}
                  </h3>

                  {/* Tagline */}
                  <p className="font-sans text-base text-slate-300 mt-4 leading-relaxed">
                    {founder.tagline}
                  </p>

                  {/* Bespoke Visual Environment Simulation Card */}
                  <div className="relative rounded-2xl bg-black/60 border border-white/10 p-5 my-8 overflow-hidden">
                    {isOwaies ? (
                      /* AI / Data Environment */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400">
                          <span className="flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" /> NEURAL STRUCTURE OVERLAY
                          </span>
                          <span>TENSORS: 4.8B PARAMETERS</span>
                        </div>
                        {/* Abstract neural topology visual */}
                        <div className="h-24 relative flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan-950/20 via-transparent to-indigo-950/20 rounded-xl border border-cyan-500/20">
                          <div className="flex flex-col gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                            <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
                            <span className="w-2 h-2 rounded-full bg-cyan-400/40" />
                          </div>
                          <div className="flex-1 border-t border-dashed border-cyan-400/30 mx-4 relative">
                            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black border border-cyan-400/40 font-mono text-[8px] text-cyan-300">
                              WEIGHT_FLOW
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                            <span className="w-2 h-2 rounded-full bg-indigo-400/60" />
                            <span className="w-2 h-2 rounded-full bg-indigo-400/40" />
                          </div>
                        </div>
                        <div className="font-mono text-[9px] text-slate-400">
                          LATENT SPACE CLUSTERING · MULTI-AGENT INFERENCE ENGINE
                        </div>
                      </div>
                    ) : (
                      /* Web / UI Design-Grid Environment */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-mono text-[10px] text-indigo-400">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" /> INTERFACE MATRIX & DESIGN TOKENS
                          </span>
                          <span>DOM LATENCY: 0.8ms</span>
                        </div>
                        {/* Abstract browser grid visual */}
                        <div className="h-24 relative grid grid-cols-3 gap-2 p-2 bg-gradient-to-r from-indigo-950/20 via-transparent to-blue-950/20 rounded-xl border border-indigo-500/20">
                          <div className="rounded-lg bg-white/[0.04] border border-white/10 p-2 flex flex-col justify-between">
                            <span className="font-mono text-[8px] text-indigo-300">FLEX_HERO</span>
                            <div className="w-full h-1.5 bg-indigo-400/40 rounded-full" />
                          </div>
                          <div className="rounded-lg bg-white/[0.04] border border-white/10 p-2 flex flex-col justify-between">
                            <span className="font-mono text-[8px] text-indigo-300">GRID_SPATIAL</span>
                            <div className="w-full h-1.5 bg-cyan-400/40 rounded-full" />
                          </div>
                          <div className="rounded-lg bg-white/[0.04] border border-white/10 p-2 flex flex-col justify-between">
                            <span className="font-mono text-[8px] text-indigo-300">CANVAS_3D</span>
                            <div className="w-full h-1.5 bg-white/40 rounded-full" />
                          </div>
                        </div>
                        <div className="font-mono text-[9px] text-slate-400">
                          SUB-PIXEL COMPOSITING · ADAPTIVE FLUID VIEWPORT ENGINE
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Core Technical Highlights */}
                  <div className="mb-8">
                    <div className="font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-3">
                      CORE SPECIALIZATIONS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {founder.techHighlights.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[10px] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Hub & Verified Profiles */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
                  {/* Primary Portfolio Launch */}
                  <a
                    href={founder.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <span>OPEN {founder.name.split(' ')[1]}'S PORTFOLIO</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  {/* Channels Bar */}
                  <div className="grid grid-cols-4 gap-2">
                    {/* GitHub */}
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors group"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors group"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    {/* Email with copy */}
                    <button
                      onClick={() => handleCopy(founder.email, `${founder.id}-email`)}
                      className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative"
                      title={`Copy email: ${founder.email}`}
                    >
                      {copiedKey === `${founder.id}-email` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                    </button>

                    {/* Phone with copy */}
                    <button
                      onClick={() => handleCopy(founder.phone, `${founder.id}-phone`)}
                      className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative"
                      title={`Copy phone: ${founder.phone}`}
                    >
                      {copiedKey === `${founder.id}-phone` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Direct Contact Metadata */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 pt-1">
                    <span className="truncate">{founder.email}</span>
                    <span>+91 {founder.phone}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
