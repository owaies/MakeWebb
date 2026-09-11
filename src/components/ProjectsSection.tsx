import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/websiteData';

export const ProjectsSection: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  return (
    <section id="projects" className="relative py-16 md:py-24 border-t border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 font-mono uppercase">
              02 / SELECTED WORK
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-white font-['Outfit']">
              Featured Builds
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-300">
            A sample of high-performance mobile, web, and native software developed for our visionary partners.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-blue-400/30 to-slate-900/50 hover:from-cyan-400/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div className="rounded-[23px] bg-[#07122b]/95 p-6 flex flex-col justify-between h-full border border-blue-500/20 group-hover:border-cyan-400/40 transition-colors">
                {/* Image Showcase */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-blue-500/20 bg-slate-950 mb-5">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07122b] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 border border-cyan-400/40 text-cyan-300 backdrop-blur-md">
                      {proj.platform}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Metrics & Action */}
                <div className="mt-6 pt-4 border-t border-blue-500/15 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 font-mono">
                    {proj.metrics}
                  </span>
                  <button
                    onClick={onStartProject}
                    className="w-8 h-8 rounded-full bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-400/60 transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
