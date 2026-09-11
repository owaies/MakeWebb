import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const WORK = [
  { index: '#01', title: 'Logan', meta: 'Architecture · Webcore', year: '2021', tone: 'violet' },
  { index: '#02', title: 'Zumar', meta: 'Web Creation · Development', year: '2024', tone: 'copper' },
  { index: '#03', title: 'Nova', meta: 'Brand · Motion · Web', year: '2024', tone: 'blue', href: 'https://world-object-detector.netlify.app/' },
  { index: '#04', title: 'Kiln', meta: 'Product · Interface', year: '2025', tone: 'bronze' },
  { index: '#05', title: 'Meridian', meta: 'Systems · Identity', year: '2026', tone: 'slate' },
] as const;

const toneStyles: Record<string, string> = {
  violet: 'from-violet-500/30 via-fuchsia-500/10 to-transparent',
  copper: 'from-orange-500/25 via-amber-300/10 to-transparent',
  blue: 'from-blue-500/25 via-indigo-400/10 to-transparent',
  bronze: 'from-amber-700/25 via-orange-300/10 to-transparent',
  slate: 'from-slate-400/20 via-blue-500/10 to-transparent',
};

function SpatialCard({ item, index, progress }: { item: typeof WORK[number]; index: number; progress: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 24 });
  const reflectionX = useTransform(pointerX, [-0.5, 0.5], [-80, 80]);
  const reflectionY = useTransform(pointerY, [-0.5, 0.5], [-80, 80]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    pointerX.set((e.clientX - r.left) / r.width - 0.5);
    pointerY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setHovered(false);
  };

  const distance = Math.abs(index - 2);
  const scale = useTransform(progress, [0, 0.5, 1], [1 - distance * 0.025, 1.06 - distance * 0.035, 1 - distance * 0.025]);
  const opacity = useTransform(progress, [0, 0.5, 1], [1 - distance * 0.11, 1, 1 - distance * 0.11]);
  const x = useTransform(progress, [0, 0.5, 1], [(index - 2) * 34, (index - 2) * 4, (index - 2) * -28]);

  const content = (
    <motion.div
      ref={ref}
      style={{ scale, opacity, x, rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handleLeave}
      className="relative h-[min(68vh,610px)] min-h-[420px] w-[min(76vw,520px)] shrink-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0d12]/90 shadow-[0_35px_100px_rgba(0,0,0,0.55)] backdrop-blur-[20px] will-change-transform md:w-[min(46vw,520px)]"
      data-cursor="VIEW"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneStyles[item.tone]} opacity-80`} />
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/[0.035] blur-3xl" />
      <motion.div
        className="pointer-events-none absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_55%)] blur-2xl"
        animate={{ opacity: hovered ? 0.7 : 0 }}
        style={{ x: reflectionX, y: reflectionY }}
      />

      <div className="absolute inset-5 rounded-[18px] border border-white/[0.06] bg-black/[0.12]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9">
        <div className="flex items-start justify-between font-mono text-[10px] tracking-[0.2em] text-white/45">
          <span>{item.index}</span>
          <span>{item.year}</span>
        </div>

        <div className="relative">
          <div className="mb-7 h-px w-16 bg-white/25" />
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">SELECTED WORK</div>
          <h3 className="mt-3 font-display text-[clamp(4rem,8vw,7rem)] font-medium leading-[0.82] tracking-[-0.065em] text-white">{item.title}</h3>
          <div className="mt-7 flex items-end justify-between gap-5 border-t border-white/[0.08] pt-5">
            <span className="max-w-[230px] text-sm leading-6 text-white/55">{item.meta}</span>
            {item.href && (
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] tracking-[0.14em] text-white transition-transform duration-300 group-hover:translate-x-1">
                View project <ArrowUpRight size={13} />
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-white/30">
          <span>MW / CANVAS</span>
          <span>0{index + 1} / 05</span>
        </div>
      </div>
    </motion.div>
  );

  return item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block shrink-0">{content}</a> : <div className="shrink-0">{content}</div>;
}

export const PortfolioCanvas: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(2);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const trackX = useTransform(scrollYProgress, [0.05, 0.72], ['7vw', '-22vw']);
  const headingY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [70, 0, -20, -100]);
  const fieldOpacity = useTransform(scrollYProgress, [0.62, 0.78, 0.94], [0, 0.55, 1]);
  const fieldScale = useTransform(scrollYProgress, [0.62, 0.95], [0.82, 1.05]);

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-[230vh] overflow-hidden bg-[#07080c] text-white">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.div style={{ y: headingY }} className="relative z-30 px-6 pt-24 sm:px-10 sm:pt-28">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between font-mono text-[10px] tracking-[0.24em] text-white/45">
            <span>SELECTED WORK</span>
            <span className="hidden sm:block">SPATIAL PORTFOLIO / 05</span>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-[48%] z-20 h-[62vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[120px]" />

        <motion.div style={{ x: trackX }} className="relative z-10 mt-auto mb-auto flex items-center gap-5 px-6 sm:gap-8 sm:px-10 md:gap-10">
          {WORK.map((item, index) => (
            <div key={item.index} onMouseEnter={() => setActive(index)}>
              <SpatialCard item={item} index={index} progress={scrollYProgress} />
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-6 right-6 z-30 flex items-end justify-between sm:left-10 sm:right-10">
          <div className="font-mono text-[9px] tracking-[0.16em] text-white/30">SCROLL TO MOVE THROUGH THE CANVAS</div>
          <div className="flex items-center gap-2">
            {WORK.map((item, index) => (
              <motion.span key={item.index} animate={{ width: active === index ? 24 : 5, opacity: active === index ? 1 : 0.3 }} className="h-1 rounded-full bg-white" />
            ))}
          </div>
        </div>

        <motion.div style={{ opacity: fieldOpacity, scale: fieldScale }} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/45"
              style={{ left: `${8 + ((i * 37) % 84)}%`, top: `${12 + ((i * 53) % 72)}%` }}
              animate={{ x: [0, (i % 2 ? 1 : -1) * 28, 0], y: [0, (i % 3 - 1) * 22, 0], opacity: [0.15, 0.65, 0.15] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
            />
          ))}
          <div className="absolute left-[18%] top-[28%] h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-[14%] bottom-[22%] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[18vh] bg-gradient-to-b from-transparent to-[#050608]" />
    </section>
  );
};

export default PortfolioCanvas;
