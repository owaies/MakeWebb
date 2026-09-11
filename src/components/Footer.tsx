import React from 'react';
import { Phone, Mail, ArrowUp, ArrowUpRight } from 'lucide-react';
import { MakeWebbLogoIcon } from './ThreeDAssets';
import { TEAM_MEMBERS } from '../data/websiteData';

export const Footer: React.FC<{ onOpenStartProject: () => void; onNavigate: (id: string) => void }> = ({
  onOpenStartProject,
  onNavigate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const owaies = TEAM_MEMBERS[0];
  const afaf = TEAM_MEMBERS[1];

  return (
    <footer id="contact" className="relative pt-16 pb-12 border-t border-blue-500/20 bg-[#020511] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-t from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Banner Cards */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Owaies Quick Connect */}
          <div className="p-6 rounded-2xl bg-[#061026]/90 border border-cyan-500/30 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
                CO-FOUNDER • AI & ML
              </span>
              <h4 className="text-xl font-bold text-white font-['Outfit'] mt-1">
                {owaies.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Available for AI integration, data science & architecture consultations.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <a
                href={`tel:${owaies.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{owaies.phone}</span>
              </a>
              <a
                href={`mailto:${owaies.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{owaies.email}</span>
              </a>
            </div>
          </div>

          {/* Afaf Quick Connect */}
          <div className="p-6 rounded-2xl bg-[#061026]/90 border border-blue-500/30 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-blue-400 uppercase">
                CO-FOUNDER • WEB & MOBILE
              </span>
              <h4 className="text-xl font-bold text-white font-['Outfit'] mt-1">
                {afaf.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Available for full-stack web, Android apps & Windows software projects.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <a
                href={`tel:${afaf.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{afaf.phone}</span>
              </a>
              <a
                href={`mailto:${afaf.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{afaf.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-blue-500/15">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MakeWebbLogoIcon size={34} />
              <span className="text-2xl font-black text-white tracking-tight font-['Outfit']">
                MakeWebb
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              We design and develop modern digital experiences with 3D, AI and next-gen technologies across Web, Android, and Windows.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenStartProject}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 border border-blue-400/40 hover:border-cyan-300 transition-colors shadow-md"
              >
                <span>Launch an Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-4">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About', 'Services', 'Projects', 'Team'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h5 className="text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-4">
              Platforms
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Web Design & Apps</li>
              <li>Android Native Mobile</li>
              <li>Windows Desktop</li>
              <li>AI & Machine Learning</li>
              <li>3D & Interactive WebGL</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MakeWebb. All rights reserved. Built with React & Tailwind CSS.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
