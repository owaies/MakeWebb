import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';

export interface CarouselCardData {
  id: string;
  badgeLeft: string;
  badgeRight?: string;
  title: string;
  description: string;
  footerPrimary: string;
  footerSecondary?: string;
  theme: 'live' | 'studio' | 'ops' | 'vision' | 'finance' | 'chrome' | 'luxe';
  linkUrl: string;
}

export const CAROUSEL_CARDS: CarouselCardData[] = [
  {
    id: '01',
    badgeLeft: '• Live session',
    badgeRight: 'LIVE',
    title: 'Summarise the thread',
    description: 'Autonomous multi-modal synthesis with real-time reasoning and context retention.',
    footerPrimary: 'Context assembled',
    footerSecondary: '42 ms latency',
    theme: 'live',
    linkUrl: 'https://ai-job-application-tracker-rose.vercel.app',
  },
  {
    id: '02',
    badgeLeft: 'Templates',
    badgeRight: 'synapse.studio',
    title: 'Browse our templates',
    description: 'Sixty starting points, each one already wired to your data and design systems.',
    footerPrimary: 'UI / UX · Product Systems',
    footerSecondary: 'v4.2 Production',
    theme: 'studio',
    linkUrl: 'https://e-examiner.vercel.app/',
  },
  {
    id: '03',
    badgeLeft: 'Ops',
    badgeRight: 'synapse.ops',
    title: 'Ship it on a Tuesday',
    description: 'Rollouts, evals, telemetry and rollbacks orchestrated from a single command panel.',
    footerPrimary: 'DevOps · Infrastructure',
    footerSecondary: '99.99% Uptime',
    theme: 'ops',
    linkUrl: 'https://world-object-detector.netlify.app/',
  },
  {
    id: '04',
    badgeLeft: 'Vision',
    badgeRight: 'omni.vision',
    title: 'See what the model sees',
    description: 'Pixel-level spatial activations and real-time bounding telemetry for every decision.',
    footerPrimary: 'Computer Vision · Python',
    footerSecondary: '60 FPS Pipeline',
    theme: 'vision',
    linkUrl: 'https://handgesturecontroller.netlify.app/',
  },
  {
    id: '05',
    badgeLeft: 'Assistant',
    badgeRight: 'atlas.finance',
    title: 'The ultimate engine for lending',
    description: 'Ask once. It gathers the dossier, the credit risk model, and compliance paperwork.',
    footerPrimary: 'Autonomous AI Agents',
    footerSecondary: 'Encrypted Vault',
    theme: 'finance',
    linkUrl: 'https://ai-job-application-tracker-rose.vercel.app',
  },
  {
    id: '06',
    badgeLeft: 'Recall',
    badgeRight: 'core.neural',
    title: 'Zero-friction memory',
    description: 'Dynamic associative embeddings with continuous indexing across all touchpoints.',
    footerPrimary: 'Neural Core · Vector DB',
    footerSecondary: '1.2M Tokens/s',
    theme: 'chrome',
    linkUrl: 'https://silsilaburqahouse.web.app',
  },
  {
    id: '07',
    badgeLeft: 'Commerce',
    badgeRight: 'silsila.luxe',
    title: 'Crafted for elegance',
    description: 'Immersive luxury apparel storefronts with cinematic typography and friction-free flow.',
    footerPrimary: 'E-Commerce · Next.js',
    footerSecondary: 'Global Shipping',
    theme: 'luxe',
    linkUrl: 'https://silsilaburqahouse.web.app',
  },
];

interface InfiniteCarousel3DProps {
  onExploreClick?: () => void;
}

export const InfiniteCarousel3D: React.FC<InfiniteCarousel3DProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Viewport width state for responsive card geometry
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Smooth animation values stored in refs for 60fps GPU performance without React re-render churn
  const progressRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.00045);
  const targetVelocityRef = useRef<number>(0.00045);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsive geometry: compact, elegant sizing that fits cleanly on all devices
  const isMobile = viewportWidth <= 640;
  const isTablet = viewportWidth > 640 && viewportWidth <= 1024;

  const cardWidth = isMobile ? 220 : isTablet ? 255 : 285;
  const cardHeight = isMobile ? 290 : isTablet ? 335 : 365;
  const horizontalRadius = isMobile
    ? Math.min(viewportWidth * 0.44, 185)
    : isTablet
    ? Math.min(viewportWidth * 0.42, 330)
    : Math.min(viewportWidth * 0.40, 480);
  const zDepth = isMobile ? 120 : isTablet ? 150 : 190;
  const maxRotationY = isMobile ? 28 : 34;

  // Main 60fps animation loop using direct DOM transform manipulation
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = Math.min(now - lastTimestamp, 32);
      lastTimestamp = now;

      if (!isDraggingRef.current) {
        if (prefersReducedMotion) {
          velocityRef.current = 0;
        } else {
          // Autonomous motion when not hovering, gentle slowdown when hovered
          const naturalVelocity = isHoveredRef.current ? 0.00012 : 0.00045;
          targetVelocityRef.current = naturalVelocity;
          // Smooth spring damping back to natural cruising speed
          velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.04;
        }

        progressRef.current += velocityRef.current * (dt / 16.666);
      }

      // Continuous loop progress in [0, 1)
      const currentProgress = ((progressRef.current % 1) + 1) % 1;
      const numCards = CAROUSEL_CARDS.length;

      // Update each card's 3D transform directly on DOM nodes for maximum GPU performance
      for (let i = 0; i < numCards; i++) {
        const cardEl = cardElementsRef.current[i];
        if (!cardEl) continue;

        // Position on carousel ring from 0 to 1
        const rawOffset = i / numCards - currentProgress;
        // Wrap offset to [-0.5, 0.5] centered at viewer's focal point
        const normalizedOffset = ((rawOffset % 1) + 1.5) % 1 - 0.5;

        // Distance from center focal point: 0 is center, 1 is the wrap boundary
        const dist = Math.abs(normalizedOffset) * 2;

        // Angle along front arc: -PI/2 to +PI/2
        const angle = normalizedOffset * Math.PI;

        // 3D Cartesian coordinates along elliptical cylindrical trajectory
        const x = Math.sin(angle) * horizontalRadius;
        // Cosine curve: front card has positive Z, wings recede backwards
        const z = (Math.cos(angle) - 0.7) * zDepth;
        // Inward perspective rotation
        const rotateY = -Math.sin(angle) * maxRotationY;
        // Scale: Center is 1.02, edges scale down gracefully
        const scale = Math.max(0.78, 1.02 - Math.pow(dist, 1.2) * 0.24);

        // Opacity smoothly drops to 0 at dist >= 0.62 (well before wrap boundary 1.0)
        // This ensures zero popping, zero jumping, and zero teleportation artifacts
        const fadeThreshold = 0.62;
        const opacity = dist < fadeThreshold ? Math.max(0, 1 - Math.pow(dist / fadeThreshold, 2)) : 0;

        // Depth layering
        const zIndex = Math.round((1 - dist) * 100);

        if (opacity <= 0.01) {
          cardEl.style.opacity = '0';
          cardEl.style.visibility = 'hidden';
          cardEl.style.pointerEvents = 'none';
        } else {
          cardEl.style.visibility = 'visible';
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.zIndex = `${zIndex}`;
          cardEl.style.transform = `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          cardEl.style.pointerEvents = dist < 0.28 ? 'auto' : 'none';

          // Shadow intensity based on proximity to camera
          const shadowAlpha = (0.35 * (1 - dist * 0.6)).toFixed(2);
          cardEl.style.boxShadow = `0 24px 60px -10px rgba(0, 0, 0, ${shadowAlpha}), 0 0 0 1px rgba(255, 255, 255, 0.12)`;
        }

        // Highlight active center card
        if (dist < 0.15) {
          cardEl.setAttribute('data-active', 'true');
        } else {
          cardEl.removeAttribute('data-active');
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [horizontalRadius, zDepth, maxRotationY, prefersReducedMotion]);

  // Pointer & Touch drag interactions with momentum
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    dragDistanceRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const deltaX = e.clientX - lastXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);

    // Convert pixel delta to progress delta
    const progressDelta = -deltaX / (horizontalRadius * 4.2);
    progressRef.current += progressDelta;

    // Compute instantaneous velocity for momentum flick
    velocityRef.current = progressDelta / (dt / 16.666);

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    // Limit max velocity after flick
    velocityRef.current = Math.max(Math.min(velocityRef.current, 0.015), -0.015);
  };

  // Wheel velocity boost
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      progressRef.current += e.deltaX * 0.00025;
      velocityRef.current = e.deltaX * 0.00008;
    } else if (Math.abs(e.deltaY) > 5 && e.shiftKey) {
      progressRef.current += e.deltaY * 0.00025;
      velocityRef.current = e.deltaY * 0.00008;
    }
  }, []);

  // Card click: if clicked card is not in center, rotate it to center; if already center, follow link
  const handleCardClick = (index: number, url: string, e: React.MouseEvent) => {
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      return;
    }

    const numCards = CAROUSEL_CARDS.length;
    const currentProgress = ((progressRef.current % 1) + 1) % 1;
    const rawOffset = index / numCards - currentProgress;
    const normalizedOffset = ((rawOffset % 1) + 1.5) % 1 - 0.5;

    // If card is not in center, rotate it to center smoothly
    if (Math.abs(normalizedOffset) > 0.06) {
      e.preventDefault();
      const targetProgress = progressRef.current + normalizedOffset;
      const startProg = progressRef.current;
      const startTime = performance.now();
      const duration = 450;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        progressRef.current = startProg + (targetProgress - startProg) * easeOutCubic(t);
        if (t < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="projects"
      className="carousel-showcase-section relative overflow-hidden bg-[#f5f4f6] text-[#09090b] select-none"
      onWheel={handleWheel}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* 1. Header Meta Bar */}
      <div className="carousel-meta-bar max-w-[1240px] mx-auto px-[6vw] pt-8 sm:pt-10 pb-2 flex items-center justify-between">
        <span className="ref-meta">MW / 002 · 3D INFINITE ARCHITECTURE</span>
        <span className="ref-meta text-black/50 hidden sm:inline-block">
          CONTINUOUS ROTATION · DRAG TO EXPLORE
        </span>
      </div>

      {/* 2. Background Display Typography (Subtle depth plane) */}
      <div
        className="carousel-bg-text-wrapper pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="carousel-bg-text text-[clamp(3.5rem,8.5vw,8.5rem)] font-bold uppercase tracking-[-0.08em] leading-[0.8] text-black/[0.035] whitespace-nowrap text-center font-display select-none">
          DESIGN THAT SHIPS
          <br />
          WITH SPEED.
        </div>
      </div>

      {/* 3. The 3D Perspective Stage */}
      <div
        ref={containerRef}
        className="carousel-3d-stage relative z-10 w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          height: `${cardHeight + 40}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="carousel-3d-track relative w-0 h-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {CAROUSEL_CARDS.map((card, idx) => {
            return (
              <div
                key={card.id}
                ref={(el) => (cardElementsRef.current[idx] = el)}
                onClick={(e) => handleCardClick(idx, card.linkUrl, e)}
                className={`carousel-3d-card group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between transition-[filter] duration-200 cursor-pointer overflow-hidden ${
                  card.theme === 'live'
                    ? 'bg-gradient-to-br from-[#160b29] via-[#0d071a] to-[#06030c] text-white border border-purple-500/30'
                    : card.theme === 'studio'
                    ? 'bg-gradient-to-br from-[#181920] via-[#101116] to-[#08080c] text-white border border-white/15'
                    : card.theme === 'ops'
                    ? 'bg-gradient-to-br from-[#0f1a18] via-[#091110] to-[#040807] text-white border border-emerald-500/30'
                    : card.theme === 'vision'
                    ? 'bg-gradient-to-br from-[#0b1626] via-[#070e19] to-[#03070d] text-white border border-cyan-500/30'
                    : card.theme === 'finance'
                    ? 'bg-gradient-to-br from-[#1c0f26] via-[#120919] to-[#08040d] text-white border border-fuchsia-500/30'
                    : card.theme === 'chrome'
                    ? 'bg-gradient-to-br from-[#1b1c24] via-[#121318] to-[#0a0a0d] text-white border border-slate-300/30 shadow-xl'
                    : 'bg-gradient-to-br from-[#1e1710] via-[#130e09] to-[#0a0704] text-white border border-amber-500/30'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Specular Card Reflection Overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[18px] sm:rounded-[22px] bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.08] opacity-75" />

                {/* Card Top Row: Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-mono font-semibold tracking-wider uppercase border border-white/10">
                    {card.theme === 'live' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    )}
                    <span>{card.badgeLeft}</span>
                  </div>

                  {card.badgeRight && (
                    <div
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider uppercase font-bold ${
                        card.badgeRight === 'LIVE'
                          ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                          : 'bg-white/10 text-white/70 border border-white/10'
                      }`}
                    >
                      {card.badgeRight}
                    </div>
                  )}
                </div>

                {/* Card Center Content */}
                <div className="relative z-10 my-auto py-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-medium text-[19px] sm:text-[22px] leading-[1.08] tracking-[-0.04em] text-white">
                      {card.title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-white text-black shadow flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <ArrowRight size={12} />
                    </div>
                  </div>

                  <p className="mt-2 text-[11px] sm:text-[12px] leading-[1.5] text-white/70 line-clamp-2">
                    {card.description}
                  </p>

                  {/* Dynamic Graphic Mini-Bar */}
                  {card.theme === 'live' ? (
                    <div className="mt-3 p-2 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-purple-900/60 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 w-3/4 animate-pulse" />
                      </div>
                      <span className="text-[8px] font-mono text-purple-300">Live AI</span>
                    </div>
                  ) : card.theme === 'chrome' ? (
                    <div className="mt-3 p-2 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-between text-[8px] font-mono font-semibold">
                      <span>SPECS: 1.2M OPS</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                  ) : (
                    <div className="mt-3 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-[8px] font-mono font-medium text-white/60">
                      <span>MW PRODUCT CORE</span>
                      <ExternalLink size={10} className="text-white/40" />
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-wider uppercase text-white/55">
                  <span className="font-semibold text-white/80">{card.footerPrimary}</span>
                  {card.footerSecondary && (
                    <span className="opacity-80">{card.footerSecondary}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Center Action Pill Button ("Explore the collection") */}
      <div className="carousel-cta-wrapper relative z-20 flex flex-col items-center justify-center pt-4 pb-8 sm:pb-12">
        <button
          onClick={onExploreClick}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111] text-white text-[10px] font-mono font-semibold tracking-wider uppercase shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-black/10"
        >
          <span>Explore the collection</span>
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <div className="mt-2.5 flex items-center gap-2 text-[8px] sm:text-[9px] font-mono text-black/40">
          <span>DRAG TO ROTATE</span>
          <span>·</span>
          <span>TAP CARD TO FOCUS</span>
        </div>
      </div>
    </section>
  );
};
