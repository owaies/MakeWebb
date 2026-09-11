import React from 'react';

// Brand Logo - 3D faceted MakeWebb "M"
export const MakeWebbLogoIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 36,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="mwGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="mwGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <linearGradient id="mwGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Outer polygon frame / faceted 3D M */}
    <rect
      x="4"
      y="4"
      width="40"
      height="40"
      rx="12"
      fill="#0B132B"
      stroke="url(#mwGrad1)"
      strokeWidth="1.5"
    />
    <path
      d="M13 32V16L24 25L35 16V32"
      stroke="url(#mwGrad2)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#logoGlow)"
    />
    <path
      d="M13 32V16L24 25L35 16V32"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.85"
    />
  </svg>
);

// Central Floating 3D Glass Cube with Internal Glowing "M" and Orbital Rings
export const CentralThreeDCube: React.FC = () => {
  return (
    <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
      {/* Background Volumetric Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 via-cyan-500/25 to-indigo-600/30 blur-2xl animate-pulse-glow" />

      {/* 3D Tilted Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-52 h-20 md:w-64 md:h-24 rounded-[100%] border border-cyan-400/50 shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-orbit"
          style={{ transform: 'rotate(-25deg)' }}
        >
          {/* Orbital glowing satellite particle */}
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] absolute -top-1 left-1/4" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div
          className="w-56 h-20 md:w-68 md:h-24 rounded-[100%] border border-indigo-400/40"
          style={{ transform: 'rotate(35deg)' }}
        />
      </div>

      {/* Isometric 3D Glass Cube SVG */}
      <svg
        className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] animate-float-slow"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cubeTop" x1="80" y1="18" x2="80" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="25" y1="65" x2="80" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="80" y1="65" x2="135" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cubeBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="cubeCoreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Face */}
        <polygon
          points="80,20 132,50 80,80 28,50"
          fill="url(#cubeTop)"
          stroke="url(#cubeBevel)"
          strokeWidth="1.5"
          className="backdrop-blur-md"
        />

        {/* Left Face */}
        <polygon
          points="28,50 80,80 80,140 28,110"
          fill="url(#cubeLeft)"
          stroke="url(#cubeBevel)"
          strokeWidth="1.5"
        />

        {/* Right Face */}
        <polygon
          points="80,80 132,50 132,110 80,140"
          fill="url(#cubeRight)"
          stroke="url(#cubeBevel)"
          strokeWidth="1.5"
        />

        {/* Internal Glowing Neon "M" emblem floating inside the glass cube */}
        <g filter="url(#cubeCoreGlow)">
          <path
            d="M58 98V72L80 86L102 72V98"
            stroke="#38bdf8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58 98V72L80 86L102 72V98"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

// 01 Web Design & Development - 3D Glass Browser Window Graphic
export const WebBrowser3DGraphic: React.FC = () => (
  <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
    <svg
      className="w-48 h-32 drop-shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-transform duration-500 group-hover:scale-105"
      viewBox="0 0 190 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="browserGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0c1a3b" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="codeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="codeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* 3D Tilted Glass Browser Window */}
      <g transform="rotate(-6 95 65)">
        {/* Outer beveled glass window */}
        <rect
          x="15"
          y="15"
          width="160"
          height="100"
          rx="12"
          fill="url(#browserGlass)"
          stroke="#60a5fa"
          strokeWidth="1.75"
        />
        {/* Top Title Bar */}
        <rect x="15" y="15" width="160" height="24" rx="12" fill="#0f1f4b" fillOpacity="0.8" />
        {/* 3 Window Control Dots (red, yellow, green) as seen in reference */}
        <circle cx="30" cy="27" r="4" fill="#f43f5e" />
        <circle cx="42" cy="27" r="4" fill="#fbbf24" />
        <circle cx="54" cy="27" r="4" fill="#10b981" />

        {/* URL / search bar */}
        <rect x="70" y="22" width="90" height="10" rx="5" fill="#1e293b" fillOpacity="0.8" />

        {/* Content glowing purple and cyan horizontal bars */}
        <rect x="28" y="48" width="105" height="8" rx="4" fill="url(#codeGrad1)" filter="drop-shadow(0 0 6px #a855f7)" />
        <rect x="28" y="62" width="75" height="8" rx="4" fill="url(#codeGrad2)" filter="drop-shadow(0 0 6px #38bdf8)" />
        <rect x="28" y="76" width="125" height="6" rx="3" fill="#64748b" fillOpacity="0.6" />
        <rect x="28" y="88" width="95" height="6" rx="3" fill="#475569" fillOpacity="0.6" />

        {/* Right side floating glass card/widget inside browser */}
        <rect
          x="118"
          y="52"
          width="42"
          height="38"
          rx="6"
          fill="#1d4ed8"
          fillOpacity="0.3"
          stroke="#38bdf8"
          strokeWidth="1"
        />
      </g>
    </svg>
  </div>
);

// 02 Android App Development - 3D Glass Phone Graphic
export const AndroidPhone3DGraphic: React.FC = () => (
  <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
    <svg
      className="w-40 h-36 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-transform duration-500 group-hover:scale-105"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#081432" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g transform="rotate(8 80 70)">
        {/* Smartphone body */}
        <rect
          x="35"
          y="10"
          width="90"
          height="120"
          rx="18"
          fill="url(#phoneGrad)"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        {/* Screen inner container */}
        <rect
          x="42"
          y="20"
          width="76"
          height="100"
          rx="12"
          fill="#07122b"
          fillOpacity="0.9"
          stroke="#1e40af"
          strokeWidth="1"
        />
        {/* Camera notch / pill */}
        <rect x="68" y="24" width="24" height="4" rx="2" fill="#60a5fa" fillOpacity="0.6" />

        {/* Glowing Android Robot on screen */}
        <g transform="translate(62, 50)" filter="drop-shadow(0 0 8px #38bdf8)">
          {/* Head */}
          <path d="M6 14C6 7.37 11.37 2 18 2C24.63 2 30 7.37 30 14H6Z" fill="#38bdf8" />
          {/* Eyes */}
          <circle cx="13" cy="8" r="1.5" fill="#07122b" />
          <circle cx="23" cy="8" r="1.5" fill="#07122b" />
          {/* Antennae */}
          <line x1="11" y1="3" x2="8" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="3" x2="28" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Body */}
          <rect x="6" y="17" width="24" height="18" rx="3" fill="#38bdf8" />
          {/* Arms */}
          <rect x="1" y="17" width="3.5" height="13" rx="1.75" fill="#38bdf8" />
          <rect x="31.5" y="17" width="3.5" height="13" rx="1.75" fill="#38bdf8" />
        </g>
      </g>
    </svg>
  </div>
);

// 03 Windows App Development - 3D Glass Windows Tiles Graphic
export const WindowsApp3DGraphic: React.FC = () => (
  <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
    <svg
      className="w-44 h-36 drop-shadow-[0_0_22px_rgba(59,130,246,0.55)] transition-transform duration-500 group-hover:scale-105"
      viewBox="0 0 170 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="winTileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* 4 Angled 3D Isometric Windows Panes */}
      <g transform="translate(15, 10)">
        {/* Top Left Pane */}
        <polygon
          points="20,40 65,30 65,65 20,70"
          fill="url(#winTileGrad)"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 6px rgba(56,189,248,0.5))"
        />
        {/* Top Right Pane */}
        <polygon
          points="73,28 128,15 128,58 73,65"
          fill="url(#winTileGrad)"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 8px rgba(56,189,248,0.5))"
        />
        {/* Bottom Left Pane */}
        <polygon
          points="20,76 65,72 65,107 20,98"
          fill="url(#winTileGrad)"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 6px rgba(56,189,248,0.5))"
        />
        {/* Bottom Right Pane */}
        <polygon
          points="73,72 128,66 128,110 73,114"
          fill="url(#winTileGrad)"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 8px rgba(56,189,248,0.5))"
        />
      </g>
    </svg>
  </div>
);

// 04 AI Integration - 3D Glass Microchip Graphic
export const AIChip3DGraphic: React.FC = () => (
  <div className="relative w-full h-36 flex items-center justify-center overflow-hidden">
    <svg
      className="w-44 h-36 drop-shadow-[0_0_24px_rgba(129,140,248,0.6)] transition-transform duration-500 group-hover:scale-105"
      viewBox="0 0 170 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#312e81" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="dieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <g transform="rotate(-5 85 70)">
        {/* Connection Pins around all sides */}
        {/* Top Pins */}
        <line x1="55" y1="20" x2="55" y2="32" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="20" x2="70" y2="32" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="20" x2="85" y2="32" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="20" x2="100" y2="32" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="115" y1="20" x2="115" y2="32" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bottom Pins */}
        <line x1="55" y1="108" x2="55" y2="120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="108" x2="70" y2="120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="108" x2="85" y2="120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="108" x2="100" y2="120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="115" y1="108" x2="115" y2="120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left Pins */}
        <line x1="28" y1="45" x2="40" y2="45" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="60" x2="40" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="75" x2="40" y2="75" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="90" x2="40" y2="90" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Pins */}
        <line x1="130" y1="45" x2="142" y2="45" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="60" x2="142" y2="60" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="75" x2="142" y2="75" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="130" y1="90" x2="142" y2="90" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />

        {/* Processor Outer Body */}
        <rect
          x="40"
          y="32"
          width="90"
          height="76"
          rx="12"
          fill="url(#chipGrad)"
          stroke="#818cf8"
          strokeWidth="2"
        />

        {/* Inner Silicon Die */}
        <rect
          x="55"
          y="44"
          width="60"
          height="52"
          rx="8"
          fill="url(#dieGrad)"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />

        {/* Luminous "AI" text in center */}
        <text
          x="85"
          y="76"
          fill="#ffffff"
          fontSize="24"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
          filter="drop-shadow(0 0 8px #38bdf8)"
          letterSpacing="1"
        >
          AI
        </text>
      </g>
    </svg>
  </div>
);

// Floating ambient mini-cube for atmospheric background
export const AmbientFloatingCube: React.FC<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size = 48, className = '', style }) => (
  <div
    className={`absolute pointer-events-none drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] ${className}`}
    style={style}
  >
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,8 52,20 30,32 8,20" fill="#38bdf8" fillOpacity="0.5" stroke="#7dd3fc" strokeWidth="1" />
      <polygon points="8,20 30,32 30,52 8,40" fill="#1e3a8a" fillOpacity="0.7" stroke="#60a5fa" strokeWidth="1" />
      <polygon points="30,32 52,20 52,40 30,52" fill="#0f172a" fillOpacity="0.8" stroke="#60a5fa" strokeWidth="1" />
      {/* Mini "M" */}
      <path d="M22 38V28L30 33L38 28V38" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" strokeLinecap="round" />
    </svg>
  </div>
);
