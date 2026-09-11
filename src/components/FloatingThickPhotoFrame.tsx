import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
  Check,
  Copy,
  Camera,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { TeamMember } from '../types';

interface FloatingThickPhotoFrameProps {
  member: TeamMember;
  tiltDirection: 'left' | 'right'; // 'left' tilts inward to right, 'right' tilts inward to left
  onOpenProjectModal: () => void;
  isFloatingEnabled?: boolean;
}

export const FloatingThickPhotoFrame: React.FC<FloatingThickPhotoFrameProps> = ({
  member,
  tiltDirection,
  onOpenProjectModal,
  isFloatingEnabled = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageKey = `makewebb_photo_${member.id}`;

  // Custom photo state with localStorage persistence
  const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return member.photoUrl;
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // 3D Tilt State
  const defaultRotateY = tiltDirection === 'left' ? 5.5 : -5.5;
  const defaultRotateX = 1.2;
  const [rotateX, setRotateX] = useState(defaultRotateX);
  const [rotateY, setRotateY] = useState(defaultRotateY);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  // Save to localStorage when currentPhoto changes
  const updatePhoto = (photoData: string) => {
    setCurrentPhoto(photoData);
    try {
      localStorage.setItem(storageKey, photoData);
    } catch {
      // ignore storage quota errors if image is very large
    }
  };

  // Smooth mouse movement tracking for 3D parallax and glare
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg based on distance from center)
    const rotX = -((y - centerY) / centerY) * 9;
    const rotY = ((x - centerX) / centerX) * 11 + defaultRotateY;

    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(defaultRotateX);
    setRotateY(defaultRotateY);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updatePhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePhoto(member.photoUrl);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="relative w-full py-4 select-none"
      style={{
        perspective: '1400px',
      }}
    >
      {/* Hidden file input to upload custom photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Floating 3D Frame Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-transform duration-300 ease-out ${
          isFloatingEnabled && !isHovered
            ? tiltDirection === 'left'
              ? 'animate-[floating-left_6s_ease-in-out_infinite]'
              : 'animate-[floating-right_6s_ease-in-out_infinite]'
            : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
          }`,
        }}
      >
        {/* ========================================================= */}
        {/* 1. OUTER THICK GLASS SLAB RIM & CASING                     */}
        {/* ========================================================= */}
        <div className="relative rounded-[32px] p-[10px] sm:p-[14px] bg-gradient-to-b from-cyan-400/35 via-blue-600/20 to-blue-950/50 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.25)] group">
          {/* Top Edge Specular Reflection (Simulates 20mm thick crystal block top edge) */}
          <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />
          <div className="absolute top-2 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent pointer-events-none z-20" />

          {/* ========================================================= */}
          {/* PROTRUDING GLASS SIDE TABS / WINGS (As in reference image) */}
          {/* ========================================================= */}
          {/* Left Extended Glass Tab */}
          <div className="absolute -left-3.5 sm:-left-4 top-[42%] -translate-y-1/2 w-4 sm:w-4.5 h-20 rounded-l-2xl bg-gradient-to-r from-cyan-400/35 via-blue-500/20 to-transparent border-l-2 border-y border-cyan-300/60 backdrop-blur-xl shadow-[-5px_0_18px_rgba(56,189,248,0.35)] pointer-events-none flex items-center justify-start pl-1">
            <div className="w-1 h-8 rounded-full bg-cyan-300/50" />
          </div>

          {/* Right Extended Glass Tab */}
          <div className="absolute -right-3.5 sm:-right-4 top-[42%] -translate-y-1/2 w-4 sm:w-4.5 h-20 rounded-r-2xl bg-gradient-to-l from-cyan-400/35 via-blue-500/20 to-transparent border-r-2 border-y border-cyan-300/60 backdrop-blur-xl shadow-[5px_0_18px_rgba(56,189,248,0.35)] pointer-events-none flex items-center justify-end pr-1">
            <div className="w-1 h-8 rounded-full bg-cyan-300/50" />
          </div>

          {/* Bottom Caustic Glow Pill */}
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-3 bg-cyan-400/30 blur-md rounded-full pointer-events-none" />

          {/* Dynamic Interactive Glare Sheen across the glass surface */}
          <div
            className="absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(56, 189, 248, 0.08) 35%, transparent 70%)`,
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          {/* ========================================================= */}
          {/* 2. INNER GLASS TRAY CHASSIS                                */}
          {/* ========================================================= */}
          <div className="relative rounded-[22px] bg-gradient-to-b from-[#07132e]/95 via-[#060f26]/95 to-[#020718]/98 backdrop-blur-3xl p-5 sm:p-7 border border-cyan-500/30 overflow-hidden shadow-inner">
            {/* Ambient inner nebula stars & glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header Tag + Top Right Glass Button */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 relative z-10">
              <span className="text-xs sm:text-[13px] font-semibold tracking-widest text-slate-300 uppercase font-['Outfit'] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                {member.categoryTag}
              </span>

              {/* Glass Squircle Arrow Button (as shown in reference) */}
              <button
                onClick={onOpenProjectModal}
                className="w-9 h-9 rounded-xl bg-gradient-to-b from-blue-900/80 to-slate-950/80 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer group/btn"
                title="Start project with this founder"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>

            {/* ========================================================= */}
            {/* 3. THE FLOATING THICK PHOTO FRAME (Central Showcase Item) */}
            {/* ========================================================= */}
            <div
              className="mt-5 relative w-full group/photo"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Outer Thick Glass Bevel of the Photo Frame */}
              <div
                className={`relative rounded-2xl p-[3px] transition-all duration-300 ${
                  isDraggingOver
                    ? 'bg-gradient-to-b from-cyan-300 via-sky-400 to-blue-500 shadow-[0_0_35px_rgba(56,189,248,0.7)] scale-[1.02]'
                    : 'bg-gradient-to-b from-cyan-400/60 via-blue-500/30 to-blue-900/50 shadow-[0_0_25px_rgba(56,189,248,0.3)]'
                }`}
              >
                {/* Photo Glass Aperture Container */}
                <div className="relative w-full h-64 sm:h-76 rounded-[14px] overflow-hidden bg-gradient-to-b from-[#0b1736] via-[#050b1a] to-[#02050f] border border-cyan-400/25">
                  {/* The Portrait Image */}
                  <img
                    src={currentPhoto}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                  />

                  {/* Drag and Drop Active Overlay */}
                  {isDraggingOver && (
                    <div className="absolute inset-0 bg-blue-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-30 border-2 border-dashed border-cyan-300 rounded-[14px] animate-pulse">
                      <Camera className="w-10 h-10 text-cyan-300 mb-2" />
                      <span className="text-sm font-bold text-white font-['Outfit']">
                        Drop {member.name.split(' ')[1] || member.name}'s Photo Here
                      </span>
                      <span className="text-xs text-cyan-200 mt-1">
                        Replaces portrait instantly in this 3D frame
                      </span>
                    </div>
                  )}

                  {/* Studio Lighting Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040c22] via-transparent to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-950/40 pointer-events-none" />

                  {/* Top Specular Glare across the photo glass */}
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/15 to-transparent pointer-events-none opacity-40" />

                  {/* Photo Customizer Pill Button (Floating in top right of photo frame) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity z-20">
                    {currentPhoto !== member.photoUrl && (
                      <button
                        onClick={handleResetPhoto}
                        className="p-1.5 rounded-lg bg-slate-950/80 border border-cyan-400/40 text-cyan-300 hover:text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                        title="Reset to default portrait"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950/85 border border-cyan-400/50 text-cyan-300 hover:text-white hover:border-cyan-300 backdrop-blur-md flex items-center gap-1.5 text-[11px] font-medium transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
                      title={`Upload photo for ${member.name}`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  {/* Co-Founder Glass Capsule Badge (positioned right at the lower edge of portrait) */}
                  <div className="absolute bottom-3.5 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-900/90 to-blue-950/90 text-cyan-200 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {member.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. FOUNDER INFORMATION                                   */}
            {/* ========================================================= */}
            <div className="mt-5 space-y-1.5 relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Outfit']">
                {member.name}
              </h3>
              <div className="text-sm sm:text-base font-semibold text-cyan-400 tracking-wide font-['Outfit']">
                {member.role}
              </div>
              <p className="text-sm text-slate-300 pt-1 leading-relaxed">
                {member.tagline}
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="mt-5 pt-4 border-t border-cyan-500/15 space-y-2.5 relative z-10">
              {/* Phone */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 group/item">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2.5 hover:text-cyan-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono tracking-wider">{member.phone}</span>
                </a>
                <button
                  onClick={() => handleCopy(member.phone, `${member.id}-phone`)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  title="Copy phone"
                >
                  {copiedField === `${member.id}-phone` ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover/item:opacity-100" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 group/item">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2.5 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="truncate font-mono">{member.email}</span>
                </a>
                <button
                  onClick={() => handleCopy(member.email, `${member.id}-email`)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  title="Copy email"
                >
                  {copiedField === `${member.id}-email` ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover/item:opacity-100" />
                  )}
                </button>
              </div>
            </div>

            {/* Social / Portfolio Pill Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 relative z-10">
              <a
                href="#services"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Portfolio</span>
              </a>
              <a
                href={member.githubUrl || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/70 hover:text-white hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] transition-all"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>
              <a
                href={member.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/70 hover:text-white hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
