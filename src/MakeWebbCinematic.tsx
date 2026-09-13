import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type ProgressValue = ReturnType<typeof useScroll>['scrollYProgress'];

function clamp(v: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pathTransform(x: number, y: number, z: number, ry: number, rz: number, scale: number) {
  return `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}px), ${z}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
}

function CardFace() {
  return <>
    <div className="mw-card-top"><span>AI PRODUCT</span><ArrowUpRight size={14} /></div>
    <div className="mw-card-art mw-art-purple">
      <div className="mw-card-ui">
        <span>MAKEWEBB / 01</span>
        <strong>AI JOB<br />TRACKER</strong>
        <small>Systems that answer first.</small>
        <i />
      </div>
    </div>
    <h3>AI JOB TRACKER</h3>
    <div className="mw-card-foot"><span>AI · ANALYTICS</span><span>VIEW ↗</span></div>
  </>;
}

function DiagnosticCard({
  progress,
  cardRef,
}: {
  progress: ProgressValue;
  cardRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const transform = useTransform(progress, p => {
    const stops = [
      { p: 0.00, x: 22, y: 0, z: 0, ry: 0, rz: 0, scale: 1 },
      { p: 0.25, x: 10, y: 0, z: 20, ry: 0, rz: 0, scale: 0.98 },
      { p: 0.50, x: 0, y: 0, z: 45, ry: 0, rz: 0, scale: 0.95 },
      { p: 0.75, x: 0, y: 0, z: 70, ry: 16, rz: 0, scale: 0.91 },
      { p: 1.00, x: -12, y: 0, z: 85, ry: -18, rz: 0, scale: 0.88 },
    ];

    const q = clamp(p);
    for (let i = 1; i < stops.length; i += 1) {
      if (q <= stops[i].p) {
        const a = stops[i - 1];
        const b = stops[i];
        const t = (q - a.p) / (b.p - a.p);
        return pathTransform(
          lerp(a.x, b.x, t),
          lerp(a.y, b.y, t),
          lerp(a.z, b.z, t),
          lerp(a.ry, b.ry, t),
          lerp(a.rz, b.rz, t),
          lerp(a.scale, b.scale, t),
        );
      }
    }

    const last = stops[stops.length - 1];
    return pathTransform(last.x, last.y, last.z, last.ry, last.rz, last.scale);
  });

  return <motion.a
    ref={cardRef}
    href="#contact"
    className="mw-card mw-persistent-card mw-accent-purple"
    style={{ transform }}
    aria-label="AI Job Tracker"
  >
    <CardFace />
  </motion.a>;
}

type DebugSnapshot = {
  progress: number;
  scrollY: number;
  documentScrollTop: number;
  stickyTop: number;
  stickyHeight: number;
  cardLeft: number;
  cardTop: number;
  cardWidth: number;
  cardHeight: number;
  opacity: string;
  visibility: string;
  position: string;
  overflow: string;
  transform: string;
  ancestors: string[];
};

const initialDebug: DebugSnapshot = {
  progress: 0,
  scrollY: 0,
  documentScrollTop: 0,
  stickyTop: 0,
  stickyHeight: 0,
  cardLeft: 0,
  cardTop: 0,
  cardWidth: 0,
  cardHeight: 0,
  opacity: '1',
  visibility: 'visible',
  position: 'sticky',
  overflow: 'visible',
  transform: 'none',
  ancestors: [],
};

function CinematicDebugPanel({
  progress,
  stickyRef,
  cardRef,
}: {
  progress: ProgressValue;
  stickyRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const [debug, setDebug] = useState<DebugSnapshot>(initialDebug);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const sticky = stickyRef.current;
      const card = cardRef.current;

      if (sticky && card) {
        const stickyRect = sticky.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const stickyStyle = getComputedStyle(sticky);
        const cardStyle = getComputedStyle(card);

        const ancestors: string[] = [];
        let node: Element | null = sticky;
        while (node) {
          const style = getComputedStyle(node);
          const className = node instanceof HTMLElement && typeof node.className === 'string'
            ? node.className.trim().replace(/\s+/g, '.')
            : '';
          const label = className ? `.${className}` : node.tagName.toLowerCase();

          ancestors.push(
            `${label} | pos:${style.position} ov:${style.overflow} x:${style.overflowX} y:${style.overflowY} ` +
            `transform:${style.transform} filter:${style.filter} perspective:${style.perspective} ` +
            `contain:${style.contain} will:${style.willChange}`,
          );

          if (node === document.documentElement) break;
          node = node.parentElement;
        }

        setDebug({
          progress: Number(progress.get().toFixed(3)),
          scrollY: Math.round(window.scrollY),
          documentScrollTop: Math.round(document.documentElement.scrollTop),
          stickyTop: Number(stickyRect.top.toFixed(1)),
          stickyHeight: Number(stickyRect.height.toFixed(1)),
          cardLeft: Number(cardRect.left.toFixed(1)),
          cardTop: Number(cardRect.top.toFixed(1)),
          cardWidth: Number(cardRect.width.toFixed(1)),
          cardHeight: Number(cardRect.height.toFixed(1)),
          opacity: cardStyle.opacity,
          visibility: cardStyle.visibility,
          position: stickyStyle.position,
          overflow: stickyStyle.overflow,
          transform: stickyStyle.transform,
          ancestors,
        });
      }

      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [cardRef, progress, stickyRef]);

  return <aside className="mw-debug-panel" aria-label="Cinematic debug diagnostics">
    <b>CINEMATIC DEBUG</b>
    <div>progress: {debug.progress.toFixed(2)}</div>
    <div>scrollY: {debug.scrollY}</div>
    <div>document.scrollTop: {debug.documentScrollTop}</div>
    <div>sticky.top: {debug.stickyTop}</div>
    <div>sticky.height: {debug.stickyHeight}</div>
    <div>card.left: {debug.cardLeft}</div>
    <div>card.top: {debug.cardTop}</div>
    <div>card.width: {debug.cardWidth}</div>
    <div>card.height: {debug.cardHeight}</div>
    <div>opacity: {debug.opacity}</div>
    <div>visibility: {debug.visibility}</div>
    <div>position: {debug.position}</div>
    <div>overflow: {debug.overflow}</div>
    <div>sticky.transform: {debug.transform}</div>
    <details>
      <summary>ANCESTOR CHAIN</summary>
      {debug.ancestors.map((entry, index) => (
        <div key={`${entry}-${index}`} className="mw-debug-chain">{entry}</div>
      ))}
    </details>
  </aside>;
}

function CinematicScene() {
  const ref = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return <section ref={ref} id="work" className="mw-cinematic">
    <div ref={stickyRef} className="mw-sticky">
      <div className="mw-hero-layer">
        <div className="mw-meta">
          <span>MAKEWEBB / DEBUG · STICKY FOUNDATION</span>
          <span>390 × 844 TEST</span>
        </div>
        <div className="mw-hero-copy">
          <small>MAKEWEBB / 2026</small>
          <h1>Systems that<br /><em>answer first.</em></h1>
          <p>Sticky foundation diagnostic. The hero stays pinned while the AI JOB TRACKER card moves inside the viewport.</p>
        </div>
        <div className="mw-hero-bottom"><span>✦</span><span>SCROLL / DIAGNOSTIC</span></div>
      </div>

      <div className="mw-card-anchor">
        <DiagnosticCard progress={scrollYProgress} cardRef={cardRef} />
      </div>

      <CinematicDebugPanel
        progress={scrollYProgress}
        stickyRef={stickyRef}
        cardRef={cardRef}
      />
    </div>
  </section>;
}

export default function MakeWebbCinematic() {
  return <div className="mw-cinematic-site"><main><CinematicScene /></main></div>;
}
