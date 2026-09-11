import React from 'react';
import { ArrowUpRight, ShieldCheck, Zap, Code2, Users } from 'lucide-react';

export const AboutSection: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const pillars = [
    {
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      title: 'Full-Surface Engineering',
      desc: 'We do not stop at web. We build native Android apps, Windows desktop systems, and integrated AI backbones.',
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: 'Sub-Second Performance',
      desc: 'Modern digital experiences require frictionless speed. Every millisecond of interaction latency is optimized.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Direct Founder Collaboration',
      desc: 'Work directly with Mohammed Owaies & Mohammed Afaf Hassan from architecture blueprint to deployment.',
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      title: 'Product-First Mindset',
      desc: 'We engineer with product traction, revenue, and scale in mind — turning raw ideas into tangible market assets.',
    },
  ];

  return (
    <section id="about" className="relative py-16 md:py-24 border-t border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-cyan-400 font-mono uppercase">
              ABOUT MAKEWEBB
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-['Outfit'] leading-tight">
              Crafting Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300">
                Digital Experiences.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              MakeWebb is a modern software studio founded to bridge the gap between creative visual artistry and robust engineering. Founded by <strong className="text-white">Mohammed Owaies</strong> (AI/ML Engineer) and <strong className="text-white">Mohammed Afaf Hassan</strong> (Web Developer), we construct unified ecosystems that run everywhere users live — browsers, mobile devices, desktop workstations, and autonomous AI agents.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <span>Initiate A Collaboration</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Cards: Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#07122b]/80 border border-blue-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all shadow-[0_0_20px_rgba(37,99,235,0.1)]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
