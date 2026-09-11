import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AmbientFloatingCube } from './ThreeDAssets';

interface HeroSectionProps {
  onBuildTogether: () => void;
  onViewWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildTogether,
  onViewWork,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-12 md:pt-14 md:pb-16 overflow-hidden">
      {/* Background Glows & Nebula */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-gradient-to-b from-blue-600/20 via-cyan-500/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating 3D Ambient Cubes (Left & Right as seen in image) */}
      <AmbientFloatingCube
        size={54}
        className="top-6 left-6 md:left-24 animate-float-slow opacity-80"
      />
      <AmbientFloatingCube
        size={46}
        className="top-24 left-12 md:left-36 animate-float-reverse opacity-70"
      />
      <AmbientFloatingCube
        size={58}
        className="top-10 right-8 md:right-28 animate-float-slow opacity-85"
      />
      <AmbientFloatingCube
        size={42}
        className="top-36 right-14 md:right-44 animate-float-reverse opacity-60"
      />

      {/* Vertical Atmospheric Typographic Columns */}
      <div className="hidden lg:flex flex-col space-y-4 absolute left-8 xl:left-14 top-20 text-[13px] tracking-[0.25em] font-semibold text-slate-400/70 select-none uppercase pointer-events-none font-['Outfit']">
        <span>PEOPLE</span>
        <span>IDEAS</span>
        <span>TECHNOLOGY</span>
        <span>IMPACT</span>
      </div>

      <div className="hidden lg:flex flex-col space-y-4 absolute right-8 xl:right-14 top-20 text-[13px] tracking-[0.25em] font-semibold text-slate-400/70 select-none uppercase pointer-events-none text-right font-['Outfit']">
        <span>MODERN</span>
        <span>SCALABLE</span>
        <span>BEAUTIFUL</span>
        <span>TOGETHER</span>
      </div>

      {/* Main Center Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center justify-center">
          <div className="inline-flex items-center px-6 py-1.5 rounded-full border border-blue-400/40 bg-blue-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-blue-200 uppercase font-['Outfit']">
              BUILDING A BETTER DIGITAL WORLD
            </span>
          </div>
        </div>

        {/* Main Title Block */}
        <div className="mt-7 sm:mt-9 space-y-1 sm:space-y-2">
          {/* Brand Wordmark */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
            MakeWebb
          </h1>

          {/* Sub-headline lines */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Web. Android. Windows.
          </h2>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Ideas into real products.
          </h2>
        </div>

        {/* Subtitle Description */}
        <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
          We design and develop modern digital experiences with 3D, AI and next-gen technologies.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-4">
          {/* Primary Action Button */}
          <button
            onClick={onBuildTogether}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.55)] cursor-pointer"
          >
            <span>Let's Build Together</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={onViewWork}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-slate-900/70 border border-slate-700/80 hover:border-blue-400/70 hover:bg-slate-800/80 transition-all duration-300 shadow-[0_0_20px_rgba(30,41,59,0.5)] cursor-pointer"
          >
            <span>View Our Work</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
