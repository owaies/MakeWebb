import React, { useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { CentralThreeDCube } from './ThreeDAssets';
import { TEAM_MEMBERS } from '../data/websiteData';
import { FloatingThickPhotoFrame } from './FloatingThickPhotoFrame';

// Technology brand icons
const TechLogos = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <span className="text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase font-['Outfit'] mb-4">
        TRUSTED BY INNOVATORS
      </span>
      <div className="grid grid-cols-4 gap-4 sm:gap-6 text-center">
        {/* Next.js */}
        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 180 180">
              <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
                <circle cx="90" cy="90" fill="black" r="90" />
              </mask>
              <g mask="url(#mask0)">
                <circle cx="90" cy="90" data-circle="true" fill="black" r="90" />
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                <rect fill="white" height="72" width="12" x="115" y="54" />
              </g>
            </svg>
          </div>
          <span className="text-xs text-slate-300 font-medium">Next.js</span>
        </div>

        {/* React */}
        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <svg className="w-5 h-5 text-cyan-400" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
              <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
              <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
          <span className="text-xs text-slate-300 font-medium">React</span>
        </div>

        {/* Android */}
        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4114 13.8533 8.1 12 8.1s-3.5902.3114-5.1367.8497L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.152 5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
            </svg>
          </div>
          <span className="text-xs text-slate-300 font-medium">Android</span>
        </div>

        {/* Windows */}
        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <svg className="w-5 h-5 text-blue-400 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.902-1.8" />
            </svg>
          </div>
          <span className="text-xs text-slate-300 font-medium">Windows</span>
        </div>
      </div>
    </div>
  );
};

export const CenterShowcase: React.FC<{
  onSelectMember?: (memberId: string) => void;
  onOpenProjectModal: () => void;
}> = ({ onOpenProjectModal }) => {
  const [isFloatingEnabled, setIsFloatingEnabled] = useState(true);

  const owaies = TEAM_MEMBERS[0];
  const afaf = TEAM_MEMBERS[1];

  return (
    <section id="team" className="relative py-12 md:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Floating 3D Control Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 flex justify-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.2)] text-xs text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>3D Floating Photo Frames</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Move cursor over frames for spatial tilt & optical glare</span>
          <button
            onClick={() => setIsFloatingEnabled(!isFloatingEnabled)}
            className="ml-1 sm:ml-2 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-cyan-400/40 text-[11px] font-semibold text-cyan-300 hover:text-white transition-colors cursor-pointer"
          >
            {isFloatingEnabled ? 'Pause Float' : 'Resume Float'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT PROFILE CARD - Mohammed Owaies (Angled Inward from Left) */}
          <div className="lg:col-span-5">
            <FloatingThickPhotoFrame
              member={owaies}
              tiltDirection="left"
              onOpenProjectModal={onOpenProjectModal}
              isFloatingEnabled={isFloatingEnabled}
            />
          </div>

          {/* CENTER 3D CUBE & TECH LOGOS */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0">
            <CentralThreeDCube />
            <TechLogos />
          </div>

          {/* RIGHT PROFILE CARD - Mohammed Afaf Hassan (Angled Inward from Right) */}
          <div className="lg:col-span-5">
            <FloatingThickPhotoFrame
              member={afaf}
              tiltDirection="right"
              onOpenProjectModal={onOpenProjectModal}
              isFloatingEnabled={isFloatingEnabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
