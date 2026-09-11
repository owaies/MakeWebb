import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, ShieldCheck, Sparkles, Eye, Hand, ShoppingBag, BookOpen, Layers, Terminal } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { StudioProject } from '../types';

interface ProjectCardProps {
  project: StudioProject;
  index: number;
}

const TRANSITION_WORDS = [
  'INTELLIGENCE.',
  'EXPERIENCE.',
  'INTERACTION.',
  'SYSTEMS.',
  'DESIGN.',
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;
    setRotateX(rX);
    setRotateY(rY);
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative group rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#080a10]/80 border border-white/[0.09] hover:border-white/25 backdrop-blur-2xl transition-colors duration-500 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] select-none"
      data-cursor="VIEW"
    >
      {/* Dynamic Cursor-Tracking Ambient Lighting */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${lightPos.x}%`,
          top: `${lightPos.y}%`,
          background: `radial-gradient(circle, ${project.accent}33 0%, transparent 70%)`,
          opacity: isHovered ? 0.7 : 0.2,
        }}
      />

      {/* Massive Architectural Watermark Number */}
      <div className="absolute top-2 right-6 font-display font-black text-8xl sm:text-9xl lg:text-[14rem] text-white/[0.025] select-none pointer-events-none leading-none">
        {project.code.split('/')[1]?.trim() || `0${index + 1}`}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Metadata & Narrative */}
        <div className={`lg:col-span-5 flex flex-col justify-between h-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div>
            {/* Spec Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-cyan-400 font-bold">
                {project.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-300">
                {project.type}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.status}
              </span>
            </div>

            {/* Project Title with Typography Shift */}
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>

            {/* Technology Stack Spec */}
            <div className="font-mono text-xs text-slate-400 tracking-wider mt-3 uppercase">
              {project.technology}
            </div>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-slate-300 mt-5 leading-relaxed">
              {project.description}
            </p>

            {/* Production Telemetry */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-[11px] text-cyan-300 mt-6 tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{project.stats}</span>
            </div>
          </div>

          {/* Primary Action Button: VIEW PROJECT ↗ */}
          <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <span>VIEW PROJECT ↗</span>
            </a>

            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline-block">
              {project.url.replace('https://', '').replace('/', '')}
            </span>
          </div>
        </div>

        {/* Right Column: Live Interactive Mockup Showcase */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl p-1 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer group/mockup"
          >
            <div className="relative rounded-[14px] bg-[#06080d] border border-white/10 p-5 sm:p-7 overflow-hidden min-h-[320px] sm:min-h-[380px] flex flex-col justify-between">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="font-mono text-[10px] text-slate-400 tracking-wider truncate max-w-[220px]">
                  {project.url.replace('https://', '')}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/mockup:text-cyan-400 transition-colors" />
              </div>

              {/* Dynamic Mockup Viewports based on project domain */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                {project.previewType === 'ai-tracker' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                      <span>PIPELINE ANALYTICS</span>
                      <span className="text-cyan-400">ACTIVE INTELLIGENCE</span>
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
                        <BookOpen className="w-3.5 h-3.5" /> PROCTORING AI ONLINE
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
                        <Eye className="w-3 h-3" /> YOLOv8 RETICLE SCANNING
                      </span>
                      <span>CONFIDENCE: 98.6%</span>
                    </div>
                    <div className="relative flex-1 my-2">
                      <div className="absolute top-2 left-4 w-28 h-20 border-2 border-emerald-400/80 rounded-md bg-emerald-400/10 p-1">
                        <span className="font-mono text-[8px] bg-emerald-400 text-black px-1 font-bold">
                          OBJECT [99.2%]
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
                      <span>EDGE TENSOR INFERENCE</span>
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
                      <span>PINCH_GESTURE_DETECTED</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Interactive Launch Trigger */}
              <div className="w-full py-2.5 rounded-lg bg-white/[0.04] group-hover/mockup:bg-cyan-400 group-hover/mockup:text-black border border-white/10 text-center font-mono text-[10px] text-slate-300 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 font-semibold">
                <span>OPEN LIVE INTERFACE</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { projects } = useStudioData();

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-24">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SCENE 05 / SELECTED WORK</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-[-0.04em] text-white uppercase">
              SELECTED WORK
            </h2>
          </div>

          <div className="sm:text-right max-w-md">
            <p className="font-mono text-xs sm:text-sm text-slate-400 uppercase tracking-wider">
              A curated catalog of production deployments.
            </p>
            <div className="font-mono text-[10px] text-cyan-400 mt-1">
              [ 05 VERIFIED SYSTEMS · INTERACTIVE DEMOS ]
            </div>
          </div>
        </div>

        {/* Cinematic Scroll Flow with Monumental Transition Typography */}
        <div className="space-y-24 sm:space-y-36">
          {projects.map((project, index) => {
            const transitionWord = TRANSITION_WORDS[index];

            return (
              <React.Fragment key={project.id}>
                {/* The Project Card */}
                <ProjectCard project={project} index={index} />

                {/* SCENE 06: Monumental Statement Between Projects */}
                {transitionWord && (
                  <div className="py-12 sm:py-20 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center"
                    >
                      <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-[-0.05em] text-white/[0.08] hover:text-white/20 transition-colors uppercase leading-none block">
                        {transitionWord}
                      </span>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
