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

const slots = {
  x: [-1.45, -0.72, 0, 0.72, 1.45],
  y: [32, 5, -10, 5, 32],
  z: [0, 170, 430, 170, 0],
  rotate: [22, 10, 0, -10, -22],
  scale: [0.66, 0.86, 1.03, 0.86, 0.66],
  opacity: [0.35, 0.78, 1, 0.78, 0.35],
};

function slotValue(values: number[], t: number) {
  const n = values.length;
  const x = ((t % n) + n) % n;
  const a = Math.floor(x);
  const b = (a + 1) % n;
  const f = x - a;
  return values[a] + (values[b] - values[a]) * f;
}

function WorkStage() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.7 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => setActive(Math.round(v * 4) % 5));
    return unsubscribe;
  }, [progress]);

  return (
    <section ref={ref} id="work" className="exact-work">
      <div className="exact-work-sticky">
        <div className="exact-work-head">
          <span>MAKEWEBB / 002</span>
          <span>WORK / {String(active + 1).padStart(2, '0')}</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="exact-type exact-type-one">DESIGN THAT SHIPS.</div>
        <div className="exact-type exact-type-two">PROMISES TO SPEED WITH EVERY INTERFACE.</div>

        <div className="exact-orbit">
          {work.map((item, i) => {
            const t = useTransform(progress, (v) => v * 5 + i);
            const x = useTransform(t, (v) => `${slotValue(slots.x, v) * 28}vw`);
            const y = useTransform(t, (v) => slotValue(slots.y, v));
            const z = useTransform(t, (v) => slotValue(slots.z, v));
            const rotate = useTransform(t, (v) => slotValue(slots.rotate, v));
            const scale = useTransform(t, (v) => slotValue(slots.scale, v));
            const opacity = useTransform(t, (v) => slotValue(slots.opacity, v));
            return (
              <motion.a
                key={item.title}
                href="#contact"
                className={`exact-work-card accent-${item.accent.toLowerCase()}`}
                style={{ x, y, z, rotateY: rotate, scale, opacity }}
              >
                <div className="exact-card-top"><span>{item.tag}</span><ArrowUpRight size={13} /></div>
                <div className="exact-card-art">
                  <div className="exact-card-window">
                    <span>MW / {String(i + 1).padStart(2, '0')}</span>
                    <b>{i === 0 ? 'Summarise the thread' : i === 1 ? 'Browse our templates' : i === 2 ? 'See what the model sees' : i === 3 ? 'Crafted for elegance' : 'Ship it on a Tuesday'}</b>
                    <i />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <div className="exact-card-foot"><span>{item.tech}</span><span>VIEW ↗</span></div>
              </motion.a>
            );
          })}
        </div>

        <div className="exact-work-button">EXPLORE THE COLLECTION</div>

        <motion.div
          className="exact-beyond"
          style={{
            opacity: useTransform(progress, [0.76, 0.88, 0.98], [0, 1, 1]),
            y: useTransform(progress, [0.76, 0.88], ['100%', '0%']),
          }}
        >
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
