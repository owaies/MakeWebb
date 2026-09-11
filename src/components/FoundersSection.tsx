import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Check,
  Upload,
  Sparkles,
  Camera,
  Cpu,
  Layers,
  Copy,
} from 'lucide-react';
import { FOUNDERS } from '../data/websiteData';
import { Founder } from '../types';

interface FounderCardProps {
  founder: Founder;
  index: number;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, index }) => {
  const isOwaies = founder.id === 'owaies';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    const saved = localStorage.getItem(`makewebb_founder_photo_${founder.id}`);
    if (saved) return saved;
    return founder.photoUrl || (isOwaies ? '/founders/owaies.jpg' : '/founders/afaf.jpg');
  });
  const [imageError, setImageError] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoSrc(result);
        setImageError(false);
        try {
          localStorage.setItem(`makewebb_founder_photo_${founder.id}`, result);
        } catch {
          // Ignore quota limits on localStorage
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl p-6 sm:p-10 bg-[#07090f]/90 border border-white/[0.09] hover:border-white/25 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col justify-between group"
      data-cursor="PORTRAIT"
    >
      {/* Background Ambient Color Splash */}
      <div
        className="absolute -top-36 -right-36 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity duration-700"
        style={{ backgroundColor: founder.accentColor }}
      />

      <div>
        {/* Editorial Top Bar HUD */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08] font-mono text-[10px] tracking-[0.25em] uppercase">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: founder.accentColor, boxShadow: `0 0 10px ${founder.accentColor}` }}
            />
            <span className="text-white font-bold">
              {isOwaies ? 'MW / 01 · FOUNDER' : 'MW / 02 · FOUNDER'}
            </span>
          </div>

          <span className="text-slate-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            {founder.focus}
          </span>
        </div>

        {/* Large Editorial Portrait Frame */}
        <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 mb-8 group/portrait">
          {/* Subtle Technical Corner Reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40 z-20 pointer-events-none" />

          {/* Real Photo or Cinematic Architectural Fallback */}
          {!imageError ? (
            <img
              src={photoSrc}
              alt={founder.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover/portrait:filter-none group-hover/portrait:scale-105 transition-all duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full relative flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0c101a] to-[#04060a]">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border border-white/15"
                style={{ backgroundColor: `${founder.accentColor}15` }}
              >
                {isOwaies ? (
                  <Cpu className="w-10 h-10 text-cyan-400" />
                ) : (
                  <Layers className="w-10 h-10 text-indigo-400" />
                )}
              </div>
              <div className="font-display font-black text-xl text-white uppercase tracking-wider">
                {founder.name}
              </div>
              <div className="font-mono text-xs text-slate-400 mt-1 uppercase">
                {founder.role}
              </div>

              {/* In-Card Upload Trigger to place the provided photograph */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 font-mono text-[10px] text-white tracking-wider uppercase transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>LOAD FOUNDER PHOTO</span>
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Quick upload icon on portrait hover */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload / Change Portrait Photo"
            className="absolute top-4 right-4 z-30 p-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/20 text-slate-300 hover:text-white backdrop-blur-md opacity-0 group-hover/portrait:opacity-100 transition-opacity cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          {/* Portrait Mask Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between font-mono text-[10px] tracking-widest text-white/90">
            <div>
              <span className="text-cyan-400 block font-semibold">{isOwaies ? 'AI / ML ARCHITECT' : 'WEB ARCHITECT'}</span>
              <span className="text-slate-400 text-[9px]">{founder.focus}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-[9px]">
              CANONICAL
            </span>
          </div>
        </div>

        {/* Founder Name & Title */}
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
          {founder.name}
        </h3>
        <div className="font-mono text-xs sm:text-sm text-cyan-300 tracking-wider uppercase mt-1">
          {founder.role}
        </div>

        {/* Tagline Narrative */}
        <p className="font-sans text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          {founder.tagline}
        </p>

        {/* Tech Highlights */}
        <div className="mt-6 flex flex-wrap gap-2">
          {founder.techHighlights.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[10px] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Hub & Contact Channels */}
      <div className="pt-8 mt-8 border-t border-white/[0.08] space-y-4">
        {/* Primary Portfolio Launch */}
        <a
          href={founder.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-2xl bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
        >
          <span>VIEW {founder.name.split(' ')[1]}'S PORTFOLIO</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Quick Channels Strip */}
        <div className="grid grid-cols-4 gap-2">
          <a
            href={founder.github}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={() => handleCopy(founder.email, `${founder.id}-email`)}
            className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={`Copy Email: ${founder.email}`}
          >
            {copiedField === `${founder.id}-email` ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => handleCopy(founder.phone, `${founder.id}-phone`)}
            className="py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={`Copy Phone: ${founder.phone}`}
          >
            {copiedField === `${founder.id}-phone` ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Phone className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Direct Text Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 pt-1">
          <span className="truncate">{founder.email}</span>
          <span>+91 {founder.phone}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const FoundersSection: React.FC = () => {
  return (
    <section
      id="founders"
      className="relative min-h-screen px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SCENE 07 / THE FOUNDERS</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white uppercase">
              THE PEOPLE BEHIND THE SYSTEM
            </h2>
          </div>

          <div className="sm:text-right max-w-sm font-mono text-xs text-slate-400 uppercase tracking-wider">
            <span>FOUNDING PARTNERS · ARCHITECTS · BUILDERS</span>
            <span className="block text-[10px] text-cyan-400 mt-1">AUTHORITATIVE PROFILES</span>
          </div>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {FOUNDERS.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
