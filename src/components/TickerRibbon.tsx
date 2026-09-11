import React from 'react';

export const TickerRibbon: React.FC = () => {
  const items = [
    'ANDROID',
    'WINDOWS',
    'AI / ML',
    'PRODUCT ENGINEERING',
    '3D INTERACTION',
    'WEB DESIGN',
    'CLOUD ARCHITECTURE',
    'NEXT-GEN UI/UX',
  ];

  return (
    <div className="w-full py-5 overflow-hidden border-y border-blue-500/15 bg-[#03081c]/60 backdrop-blur-md relative my-6">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#02050f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#02050f] to-transparent z-10 pointer-events-none" />

      {/* Marquee Row */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex items-center space-x-8 animate-[marquee_25s_linear_infinite]">
          {[...items, ...items, ...items].map((text, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span className="text-cyan-400 text-xs sm:text-sm drop-shadow-[0_0_8px_#38bdf8]">
                ◆
              </span>
              <span className="text-xs sm:text-sm tracking-[0.25em] font-bold text-slate-300 font-['Outfit'] hover:text-white transition-colors cursor-default">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
