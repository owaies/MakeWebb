import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  WebBrowser3DGraphic,
  AndroidPhone3DGraphic,
  WindowsApp3DGraphic,
  AIChip3DGraphic,
} from './ThreeDAssets';
import { SERVICE_CARDS } from '../data/websiteData';

interface ServiceCardsRowProps {
  onSelectService: (serviceId: string) => void;
}

export const ServiceCardsRow: React.FC<ServiceCardsRowProps> = ({ onSelectService }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const renderGraphic = (type: string) => {
    switch (type) {
      case 'browser':
        return <WebBrowser3DGraphic />;
      case 'android':
        return <AndroidPhone3DGraphic />;
      case 'windows':
        return <WindowsApp3DGraphic />;
      case 'ai':
        return <AIChip3DGraphic />;
      default:
        return <WebBrowser3DGraphic />;
    }
  };

  return (
    <section className="relative py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_CARDS.map((card) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => onSelectService(card.id)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-[28px] p-[8px] bg-gradient-to-b from-cyan-400/35 via-blue-600/20 to-blue-950/50 backdrop-blur-2xl border border-cyan-400/35 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(56,189,248,0.2)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(56,189,248,0.4)] transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Top Edge Specular Reflection (Thick Glass Bevel) */}
                <div className="absolute -top-[1px] left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

                {/* Left & Right Protruding Glass Tabs */}
                <div className="absolute -left-2.5 top-[40%] -translate-y-1/2 w-3 h-10 rounded-l-lg bg-cyan-400/30 border-l border-y border-cyan-300/50 backdrop-blur-md shadow-[-3px_0_10px_rgba(56,189,248,0.3)] pointer-events-none" />
                <div className="absolute -right-2.5 top-[40%] -translate-y-1/2 w-3 h-10 rounded-r-lg bg-cyan-400/30 border-r border-y border-cyan-300/50 backdrop-blur-md shadow-[3px_0_10px_rgba(56,189,248,0.3)] pointer-events-none" />

                {/* Inner Card Body */}
                <div className="rounded-[18px] bg-gradient-to-b from-[#081432]/95 via-[#060f26]/95 to-[#020718]/98 backdrop-blur-2xl p-5 sm:p-6 flex flex-col justify-between h-full border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors duration-300">
                  {/* Top Row: Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400/90 uppercase">
                      {card.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_#38bdf8] transition-all" />
                  </div>

                  {/* 3D Graphic Graphic Showcase */}
                  <div className="py-4 flex items-center justify-center">
                    {renderGraphic(card.iconType)}
                  </div>

                  {/* Bottom Content: Title, Description, Bottom Right Arrow */}
                  <div className="pt-2 flex items-end justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Right Arrow in Glass Squircle */}
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-b from-blue-900/80 to-slate-950/80 border border-cyan-400/40 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
