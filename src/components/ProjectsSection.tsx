import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, ShieldCheck, Sparkles, Terminal, Eye, Hand, ShoppingBag, BookOpen } from 'lucide-react';
import { STUDIO_PROJECTS } from '../data/websiteData';
import { StudioProject } from '../types';

export const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SCENE 03 / PROJECT ARCHIVE</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-[-0.04em] text-white uppercase">
              SELECTED WORK
            </h2>
          </div>

          <div className="sm:text-right max-w-md">
            <p className="font-mono text-xs sm:text-sm text-slate-400 uppercase tracking-wider">
              Digital systems built to move ideas forward.
            </p>
            <div className="font-mono text-[10px] text-slate-400 mt-1">
              [ 05 VERIFIED DEPLOYMENTS · REAL TIME ACCESS ]
            </div>
          </div>
        </div>

        {/* Large Interactive Editorial Panels (Vertical Storytelling Stack) */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {STUDIO_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="relative group rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              >
                {/* Background Ambient Radial Glow */}
                <div
                  className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 opacity-20 group-hover:opacity-40"
                  style={{ backgroundColor: project.accent }}
                />

                {/* Oversized Subtle Background Number */}
                <div className="absolute top-4 right-8 font-display font-black text-8xl sm:text-9xl lg:text-[13rem] text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.code.split('/')[1]?.trim() || `0${index + 1}`}
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Text & Metadata Column */}
                  <div className={`lg:col-span-5 flex flex-col justify-between h-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      {/* Technical Header Pills */}
                      <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.2em] uppercase">
                        <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-cyan-400 font-bold">
                          {project.code}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400">
                          {project.type}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {project.status}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight group-hover:text-gradient-glow transition-all duration-300">
                        {project.title}
                      </h3>

                      {/* Technology Spec */}
                      <div className="font-mono text-xs text-slate-400 tracking-wider mt-3 uppercase">
                        {project.technology}
                      </div>

                      {/* Deep Description */}
                      <p className="font-sans text-sm sm:text-base text-slate-300 mt-5 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Metrics Banner */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[11px] text-cyan-300 mt-6 tracking-wide">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{project.stats}</span>
                      </div>
                    </div>

                    {/* Launch Action */}
                    <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        <span>LAUNCH PROJECT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                        HOSTED DEPLOYMENT ↗
                      </span>
                    </div>
                  </div>

                  {/* Interactive Visual Case Study Mockup */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl p-1 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                      <div className="relative rounded-[14px] bg-[#07090e] border border-white/10 p-5 sm:p-7 overflow-hidden min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
                        {/* Browser Top Bar Mock */}
                        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 tracking-wider truncate max-w-[200px] sm:max-w-xs">
                            {project.url.replace('https://', '')}
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>

                        {/* Interactive Simulated UI State inside the Case Study */}
                        <div className="py-6 flex-1 flex flex-col justify-center">
                          {project.previewType === 'ai-tracker' && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                                <span>PIPELINE ANALYTICS</span>
                                <span className="text-cyan-400">STATUS: RECRUITING ACTIVE</span>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                  <div className="font-mono text-[9px] text-slate-400">APPLICATIONS</div>
                                  <div className="font-mono text-xl font-bold text-white mt-1">142</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                  <div className="font-mono text-[9px] text-slate-400">INTERVIEWS</div>
                                  <div className="font-mono text-xl font-bold text-cyan-400 mt-1">28</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                  <div className="font-mono text-[9px] text-slate-400">OFFER RATE</div>
                                  <div className="font-mono text-xl font-bold text-emerald-400 mt-1">18.4%</div>
                                </div>
                              </div>
                              <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[78%]" />
                              </div>
                            </div>
                          )}

                          {project.previewType === 'examiner' && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                                <span className="flex items-center gap-1.5 text-purple-400">
                                  <BookOpen className="w-3.5 h-3.5" /> PROCTORING ONLINE
                                </span>
                                <span className="text-white font-bold">TIME LEFT: 42:15</span>
                              </div>
                              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                <div className="font-mono text-[10px] text-slate-400 uppercase">QUESTION 14 OF 50</div>
                                <div className="text-sm font-medium text-slate-200 mt-2">
                                  Analyze algorithmic complexity for distributed real-time state synchronization:
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-[11px]">
                                  <div className="p-2 rounded-lg bg-white/[0.05] border border-purple-500/40 text-purple-300">
                                    [A] O(log N) Vector Clocks
                                  </div>
                                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10 text-slate-400">
                                    [B] O(N^2) Full Gossip
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {project.previewType === 'detector' && (
                            <div className="relative rounded-xl bg-black/60 border border-white/10 p-4 h-48 flex flex-col justify-between overflow-hidden">
                              <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> RETICLE SCANNING
                                </span>
                                <span>CONFIDENCE: 98.6%</span>
                              </div>
                              {/* Simulated Bounding Boxes */}
                              <div className="relative flex-1 my-2">
                                <div className="absolute top-2 left-4 w-28 h-20 border-2 border-emerald-400/80 rounded-md bg-emerald-400/10 p-1">
                                  <span className="font-mono text-[8px] bg-emerald-400 text-black px-1 font-bold">
                                    PERSON [99.2%]
                                  </span>
                                </div>
                                <div className="absolute bottom-2 right-6 w-32 h-16 border-2 border-cyan-400/80 rounded-md bg-cyan-400/10 p-1">
                                  <span className="font-mono text-[8px] bg-cyan-400 text-black px-1 font-bold">
                                    DISPLAY [97.8%]
                                  </span>
                                </div>
                              </div>
                              <div className="font-mono text-[9px] text-slate-400 flex justify-between">
                                <span>FPS: 60.0</span>
                                <span>YOLOv8 EDGE TENSOR</span>
                              </div>
                            </div>
                          )}

                          {project.previewType === 'ecommerce' && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between font-mono text-xs text-amber-400">
                                <span className="flex items-center gap-1.5">
                                  <ShoppingBag className="w-3.5 h-3.5" /> LUXURY CATALOG LOOKBOOK
                                </span>
                                <span className="text-white">HAUTE COUTURE</span>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
                                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-amber-950/40 to-neutral-900 border border-amber-500/20 mb-2" />
                                  <div className="font-mono text-[9px] text-white">ROYAL SILK</div>
                                  <div className="font-mono text-[10px] text-amber-400 mt-0.5">EXCLUSIVE</div>
                                </div>
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
                                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-white/10 mb-2" />
                                  <div className="font-mono text-[9px] text-white">MIDNIGHT NIDA</div>
                                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">LIMITED</div>
                                </div>
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
                                  <div className="w-full h-16 rounded-lg bg-gradient-to-br from-stone-900 to-neutral-950 border border-white/10 mb-2" />
                                  <div className="font-mono text-[9px] text-white">EMBROIDERED</div>
                                  <div className="font-mono text-[10px] text-amber-400 mt-0.5">SIGNATURE</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {project.previewType === 'gesture' && (
                            <div className="relative rounded-xl bg-black/60 border border-white/10 p-4 h-48 flex flex-col justify-between overflow-hidden">
                              <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400">
                                <span className="flex items-center gap-1">
                                  <Hand className="w-3.5 h-3.5" /> SKELETON RECOGNITION
                                </span>
                                <span>21 LANDMARKS TRACKED</span>
                              </div>
                              {/* Vector Skeleton Simulation */}
                              <div className="relative flex-1 flex items-center justify-center">
                                <div className="relative w-28 h-24 flex items-center justify-center">
                                  <div className="absolute w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8]" />
                                  <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                                  <div className="absolute top-0 right-4 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                                  <div className="absolute bottom-3 left-4 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                                  <div className="absolute bottom-1 right-3 w-1.5 h-1.5 rounded-full bg-cyan-300" />
                                </div>
                              </div>
                              <div className="font-mono text-[9px] text-slate-400 flex justify-between">
                                <span>INPUT: OPTICAL SENSOR</span>
                                <span>GESTURE: PINCH_CLICK</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Interactive Direct URL Trigger */}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center font-mono text-[10px] text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                          <span>VISIT LIVE AT {project.url.replace('https://', '').replace('/', '')}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
