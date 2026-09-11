import React, { useState } from 'react';
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Monitor,
  Cpu,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DETAILED_SERVICES } from '../data/websiteData';

interface ServicesSectionProps {
  onSelectServiceForProject: (serviceTitle: string) => void;
  selectedServiceId?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForProject,
  selectedServiceId,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    selectedServiceId || 'websites'
  );

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'websites':
      case 'web':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'android-apps':
      case 'android':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'windows-software':
      case 'windows':
        return <Monitor className="w-5 h-5 text-sky-400" />;
      case 'ai-ml':
      case 'ai':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  const activeService =
    DETAILED_SERVICES.find((s) => s.id === activeTab) || DETAILED_SERVICES[0];

  return (
    <section id="services" className="relative py-16 md:py-24">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-blue-500/15">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 font-mono uppercase">
              01 / SERVICES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-['Outfit'] leading-none">
              One studio. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300">
                Many surfaces.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Explore the capabilities behind the build. Select a service to see what we ship, how we build it and how long it typically takes.
          </p>
        </div>

        {/* Interactive Layout: Left Tabs & Right Module Preview */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Services List */}
          <div className="lg:col-span-4 space-y-3">
            {DETAILED_SERVICES.map((srv) => {
              const isActive = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-900/60 to-cyan-950/40 border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                      : 'bg-[#060f26]/60 border-slate-800/80 hover:border-blue-500/40 hover:bg-[#0a183d]/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-400">
                      {srv.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center">
                      {getServiceIcon(srv.id)}
                    </div>
                    <span
                      className={`text-base font-bold font-['Outfit'] transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {srv.title.split('&')[0]}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Service Module Preview */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-b from-cyan-400/40 via-blue-600/30 to-blue-950/50 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <div className="rounded-[22px] bg-[#07122b]/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 border border-cyan-500/20">
                {/* Module Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-500/15">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950/90 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                      {getServiceIcon(activeService.id)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                        {activeService.number} / SERVICE MODULE
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Outfit']">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  {/* Delivery Timeline Pill */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/70 border border-blue-400/30 text-xs sm:text-sm font-medium text-cyan-300">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{activeService.deliveryTime}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeService.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-6">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-['Outfit'] flex items-center gap-2 mb-3">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Core Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeService.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 border border-slate-700/80 text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grid: Key Features & Deliverables */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-blue-500/15">
                  {/* Features */}
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-['Outfit'] flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Key Capabilities
                    </span>
                    <ul className="space-y-2.5">
                      {activeService.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-['Outfit'] flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      What We Ship
                    </span>
                    <ul className="space-y-2.5">
                      {activeService.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2 shadow-[0_0_6px_#38bdf8]" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="mt-8 pt-6 border-t border-blue-500/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-['Outfit']">Ready to launch?</span>
                    <span className="text-sm font-semibold text-white">Let's blueprint your {activeService.title.split('&')[0]} product</span>
                  </div>
                  <button
                    onClick={() => onSelectServiceForProject(activeService.title)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                  >
                    <span>Request This Build</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
