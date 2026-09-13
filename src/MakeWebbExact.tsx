import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const work = [
  { title: 'AI JOB TRACKER', tag: 'AI PRODUCT', tech: 'AI · ANALYTICS', accent: 'PURPLE' },
  { title: 'E-EXAMINER', tag: 'EDTECH', tech: 'WEB · ASSESSMENTS', accent: 'SILVER' },
  { title: 'WORLD OBJECT DETECTOR', tag: 'COMPUTER VISION', tech: 'VISION · PYTHON', accent: 'GREEN' },
  { title: 'SILSILA BURQA HOUSE', tag: 'E-COMMERCE', tech: 'COMMERCE · WEB', accent: 'LILAC' },
  { title: 'HAND GESTURE CONTROLLER', tag: 'INTERACTION', tech: 'VISION · MOTION', accent: 'BLUE' },
];

const capabilities = [
  ['01', 'AI / MACHINE LEARNING', 'Intelligent systems and practical automation.'],
  ['02', 'WEB APPLICATIONS', 'Fast, resilient products designed around people.'],
  ['03', 'COMPUTER VISION', 'Real-time visual intelligence and interaction.'],
  ['04', 'DATA SYSTEMS', 'Pipelines, analytics and information architecture.'],
  ['05', 'UI / UX', 'Interfaces with hierarchy, clarity and motion.'],
  ['06', 'INTERACTIVE 3D', 'Spatial experiences for the modern web.'],
];

const sceneCards = [
  [
    ['AI JOB TRACKER', 'AI PRODUCT', 'Find signal before the noise.'],
    ['E-EXAMINER', 'EDTECH', 'Assess. Understand. Improve.'],
    ['WORLD OBJECT DETECTOR', 'COMPUTER VISION', 'See what the model sees.'],
    ['SILSILA BURQA HOUSE', 'E-COMMERCE', 'Crafted for digital commerce.'],
    ['HAND GESTURE CONTROLLER', 'INTERACTION', 'Interfaces that respond.'],
  ],
  [
    ['INTELLIGENT SYSTEMS', 'AI / ML', 'Systems that answer first.'],
    ['PRODUCT EXPERIENCES', 'WEB / APPS', 'Interfaces made to move.'],
    ['REAL-TIME VISION', 'COMPUTER VISION', 'Perception becomes interaction.'],
    ['DATA IN MOTION', 'DATA', 'Turn information into direction.'],
    ['NEXT INTERFACE', 'EXPERIMENTAL', 'Built for what comes next.'],
  ],
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Device({ label, index, small = false }: { label: string; index: number; small?: boolean }) {
  return (
    <motion.div
      className={`exact-device exact-device-${index} ${small ? 'exact-device-small' : ''}`}
      animate={{ y: [0, index === 1 ? -9 : 7, 0] }}
      transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className={`exact-screen exact-screen-${index}`}>
        <span>MAKEWEBB</span>
        <strong>{label}</strong>
        <i />
      </div>
    </motion.div>
  );
}

const slotsA = {
  x: [-1.72, -0.86, 0, 0.86, 1.72],
  y: [28, 5, -12, 5, 28],
  z: [0, 170, 460, 170, 0],
  rotate: [24, 11, 0, -11, -24],
  scale: [0.64, 0.86, 1.04, 0.86, 0.64],
  opacity: [0.32, 0.78, 1, 0.78, 0.32],
};

const slotsB = {
  x: [-1.35, -0.64, 0, 0.64, 1.35],
  y: [12, -8, 5, -8, 12],
  z: [35, 250, 500, 250, 35],
  rotate: [30, 8, 0, -8, -30],
  scale: [0.7, 0.9, 1.08, 0.9, 0.7],
  opacity: [0.48, 0.86, 1, 0.86, 0.48],
};

function circularValue(values: number[], t: number) {
  const n = values.length;
  const x = ((t % n) + n) % n;
  const a = Math.floor(x);
  const b = (a + 1) % n;
  const f = x - a;
  return values[a] + (values[b] - values[a]) * f;
}

function mixSlot(a: number[], b: number[], t: number, index: number) {
  const av = circularValue(a, index);
  const bv = circularValue(b, index);
  return av + (bv - av) * t;
}

function WorkCard({
  item,
  index,
  progress,
  scene,
}: {
  item: (typeof work)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
  scene: number;
}) {
  const orbit = useTransform(progress, v => v * 3.1 + index * 0.92);
  const arrangement = useTransform(progress, v => Math.max(0, Math.min(1, (v - 0.43) / 0.24)));
  const entrance = useTransform(progress, v => Math.max(0, Math.min(1, v / 0.16)));
  const x = useTransform([orbit, arrangement], ([o, a]) => `${mixSlot(slotsA.x, slotsB.x, Number(a), Number(o)) * 25.5}vw`);
  const y = useTransform([orbit, arrangement, entrance], ([o, a, e]) => mixSlot(slotsA.y, slotsB.y, Number(a), Number(o)) + (1 - Number(e)) * 120);
  const z = useTransform([orbit, arrangement], ([o, a]) => mixSlot(slotsA.z, slotsB.z, Number(a), Number(o)));
  const rotate = useTransform([orbit, arrangement], ([o, a]) => mixSlot(slotsA.rotate, slotsB.rotate, Number(a), Number(o)));
  const scale = useTransform([orbit, arrangement, entrance], ([o, a, e]) => mixSlot(slotsA.scale, slotsB.scale, Number(a), Number(o)) * (0.72 + Number(e) * 0.28));
  const opacity = useTransform([orbit, arrangement, entrance], ([o, a, e]) => mixSlot(slotsA.opacity, slotsB.opacity, Number(a), Number(o)) * Number(e));
  const cardScene = scene === 0 ? sceneCards[0][index] : sceneCards[1][index];

  return (
    <motion.a
      href="#contact"
      className={`exact-work-card accent-${item.accent.toLowerCase()}`}
      style={{ x, y, z, rotateY: rotate, scale, opacity }}
    >
      <div className="exact-card-top"><span>{cardScene[1]}</span><ArrowUpRight size={13} /></div>
      <div className="exact-card-art">
        <div className="exact-card-window">
          <span>MW / {String(index + 1).padStart(2, '0')}</span>
          <b>{cardScene[0]}</b>
          <small>{cardScene[2]}</small>
          <i />
        </div>
      </div>
      <h3>{cardScene[0]}</h3>
      <div className="exact-card-foot"><span>{item.tech}</span><span>VIEW ↗</span></div>
    </motion.a>
  );
}

function WorkStage() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.7 });
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on('change', v => setScene(v > 0.48 ? 1 : 0));
    return unsubscribe;
  }, [progress]);

  const whiteShift = useTransform(progress, [0, 0.4, 0.62, 0.82, 1], [0, 0, 1, 0, 0]);
  const blackSection = useTransform(progress, [0.76, 0.86, 0.98], [0, 1, 1]);
  const blackY = useTransform(progress, [0.76, 0.86], ['100%', '0%']);
  const typeOneX = useTransform(progress, [0.22, 0.39, 0.55], ['115vw', '0vw', '-125vw']);
  const typeOneOpacity = useTransform(progress, [0.2, 0.25, 0.54, 0.58], [0, 1, 1, 0]);
  const typeTwoX = useTransform(progress, [0.55, 0.69, 0.82], ['-125vw', '0vw', '120vw']);
  const typeTwoOpacity = useTransform(progress, [0.53, 0.58, 0.78, 0.84], [0, 1, 1, 0]);
  const secondBg = useTransform(whiteShift, v => `rgba(239,237,241,${Number(v) * 0.78})`);

  return (
    <section ref={ref} id="work" className="exact-work">
      <div className="exact-work-sticky">
        <motion.div className="exact-work-bg-shift" style={{ opacity: whiteShift }} />
        <div className="exact-work-head">
          <span>MAKEWEBB / 002</span>
          <span>WORK / CINEMATIC SYSTEM</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <motion.div className="exact-type exact-type-one" style={{ x: typeOneX, opacity: typeOneOpacity }}>
          DESIGN THAT SHIPS.
        </motion.div>
        <motion.div className="exact-type exact-type-two" style={{ x: typeTwoX, opacity: typeTwoOpacity }}>
          SPEED WITH EVERY INTERFACE.
        </motion.div>

        <div className="exact-orbit">
          {work.map((item, i) => (
            <WorkCard key={item.title} item={item} index={i} progress={progress} scene={scene} />
          ))}
        </div>

        <div className="exact-work-button">EXPLORE THE COLLECTION</div>

        <motion.div className="exact-beyond" style={{ opacity: blackSection, y: blackY }}>
          <div className="exact-beyond-copy">
            <span>MAKEWEBB / 003</span>
            <h2>Beyond<br /><em>every limit.</em></h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function MakeWebbExact() {
  const [menu, setMenu] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22 });
  const sy = useSpring(my, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 8);
      my.set((e.clientY / window.innerHeight - 0.5) * 6);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <div className="exact-site">
      <header className="exact-nav">
        <button className="exact-brand" onClick={() => go('hero')}><b>MW</b> MAKEWEBB</button>
        <nav><button onClick={() => go('work')}>WORK</button><button onClick={() => go('capabilities')}>CAPABILITIES</button><button onClick={() => go('founders')}>FOUNDERS</button><button onClick={() => go('contact')}>CONTACT</button></nav>
        <button className="exact-start" onClick={() => go('contact')}>GET STARTED</button>
        <button className="exact-menu-button" onClick={() => setMenu(true)}><Menu size={16} /></button>
      </header>

      {menu && <div className="exact-menu"><button onClick={() => setMenu(false)}><X /></button><div>{['work', 'capabilities', 'founders', 'contact'].map(x => <button key={x} onClick={() => { setMenu(false); go(x); }}>{x.toUpperCase()}</button>)}</div></div>}

      <main>
        <section id="hero" className="exact-hero">
          <div className="exact-hero-meta"><span>MAKEWEBB / 001 · DIGITAL PRODUCT STUDIO</span><span>AI · WEB · DATA · EXPERIENCE</span></div>
          <div className="exact-hero-body">
            <div className="exact-hero-copy">
              <small>MAKEWEBB / 2026</small>
              <h1>Systems that<br /><em>answer first.</em></h1>
              <p>We design and build intelligent digital products across web, apps, AI, data and interactive experiences.</p>
              <div><button onClick={() => go('work')}>VIEW WORK ↗</button><button onClick={() => go('contact')}>START A PROJECT</button></div>
            </div>
            <motion.div className="exact-hero-devices" style={{ x: sx, y: sy }}>
              <Device index={0} label="INTELLIGENT" />
              <Device index={1} label="SYSTEMS THAT ANSWER FIRST" />
              <Device index={2} label="VISION" />
              <span className="exact-star">✦</span>
            </motion.div>
          </div>
          <div className="exact-hero-bottom"><span>✦</span><span>SCROLL / EXPLORE</span></div>
        </section>

        <WorkStage />

        <section id="capabilities" className="exact-capabilities">
          <div className="exact-inner"><div className="exact-section-meta"><span>MAKEWEBB / 004</span><span>CAPABILITIES</span></div><h2>BEYOND<br /><em>EVERY LIMIT.</em></h2><div className="exact-cap-grid">{capabilities.map(c => <article key={c[0]}><span>{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></article>)}</div></div>
        </section>

        <section id="founders" className="exact-founders">
          <div className="exact-inner"><div className="exact-section-meta"><span>MAKEWEBB / 005</span><span>FOUNDERS</span></div><h2>PEOPLE<br /><em>BEHIND THE SYSTEM.</em></h2><div className="exact-founder-grid"><article><img src="/founders/owaies.jpg" /><span>FOUNDER · AI / ML</span><h3>MOHAMMED OWAIES</h3></article><article><img src="/founders/afaf.jpg" /><span>FOUNDER · WEB / APPS</span><h3>MOHAMMED AFAF HASSAN</h3></article></div></div>
        </section>

        <section className="exact-tech"><div className="exact-inner"><span>MAKEWEBB / 006 · TECHNOLOGY</span><div>AI <i>ML</i> DATA PYTHON NEXT.JS REACT JAVASCRIPT COMPUTER VISION UI/UX WEB APPS AUTOMATION</div></div></section>

        <section id="contact" className="exact-contact"><div className="exact-inner"><span>MAKEWEBB / 007 · CONTACT</span><h2>BUILD<br /><em>WHAT'S NEXT.</em></h2><p>Have a product, system or impossible interface in mind? Let's make it real.</p><button onClick={() => window.location.href = 'mailto:makewebb@gmail.com'}>START A PROJECT ↗</button></div><div className="exact-ring"><i /></div></section>
      </main>
      <footer className="exact-footer"><b>MAKEWEBB</b><span>DIGITAL PRODUCT STUDIO · 2026</span><button onClick={() => go('hero')}>BACK TO TOP ↑</button></footer>
    </div>
  );
}
