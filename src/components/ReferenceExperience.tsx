import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './reference-experience.css';

const work = [
  { id: '01', title: 'AI Job Tracker', type: 'AI PRODUCT', tech: 'Next.js · AI · Analytics', href: 'https://ai-job-application-tracker-rose.vercel.app' },
  { id: '02', title: 'E-Examiner', type: 'EXAM PLATFORM', tech: 'Web App · Assessments · Exams', href: 'https://e-examiner.vercel.app/' },
  { id: '03', title: 'World Object Detector', type: 'COMPUTER VISION', tech: 'Python · Vision · Detection', href: 'https://world-object-detector.netlify.app/' },
  { id: '04', title: 'Silsila Burqa House', type: 'E-COMMERCE', tech: 'Web · Commerce · Product Experience', href: 'https://silsilaburqahouse.web.app' },
  { id: '05', title: 'Hand Gesture Controller', type: 'COMPUTER VISION', tech: 'Python · Hand Tracking · Interaction', href: 'https://handgesturecontroller.netlify.app/' },
];

const founders = [
  { id: '01', name: 'Mohammed Owaies', role: 'AI / ML ENGINEER', focus: 'AI · ML · DATA', image: '/public/founder/owaies.png', portfolio: 'https://owaies-portfolio.base44.app', github: 'https://github.com/owaies', linkedin: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398', email: 'owaies786@gmail.com', phone: '7619329863' },
  { id: '02', name: 'Mohammed Afaf Hassan', role: 'WEB DEVELOPER', focus: 'WEB · APPS · UI/UX', image: '/public/founder/afaf.png', portfolio: 'https://afaf.base44.app', github: 'https://github.com/afaf-app', linkedin: 'https://www.linkedin.com/in/mansafaf', email: 'kingahassan786@gmail.com', phone: '8073818817' },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-.5, .5], [4, -4]), { stiffness: 180, damping: 25 });
  const ry = useSpring(useTransform(px, [-.5, .5], [-5, 5]), { stiffness: 180, damping: 25 });
  const onMove = (e: React.PointerEvent) => {
    if (!ref.current || e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - .5);
    py.set((e.clientY - r.top) / r.height - .5);
  };
  return <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={() => { px.set(0); py.set(0); }} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className={className}>{children}</motion.div>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return <>
    <nav className="mw-nav">
      <button className="mw-brand" onClick={() => go('hero')} aria-label="MakeWebb home"><span className="mw-brand-mark">MW</span><span>MAKEWEBB</span></button>
      <div className="mw-nav-links">
        {['work','capabilities','founders','studio'].map((x) => <button key={x} onClick={() => go(x)}>{x === 'work' ? 'WORK' : x === 'capabilities' ? 'CAPABILITIES' : x === 'founders' ? 'FOUNDERS' : 'STUDIO'}</button>)}
      </div>
      <a className="mw-nav-cta" href="mailto:owaies786@gmail.com">CONTACT <ArrowUpRight size={12}/></a>
      <button className="mw-menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={18}/> : <Menu size={18}/>}</button>
    </nav>
    {open && <div className="mw-mobile-menu">{['work','capabilities','founders','studio'].map(x => <button key={x} onClick={() => go(x)}>{x.toUpperCase()}</button>)}<a href="mailto:owaies786@gmail.com">CONTACT ↗</a></div>}
  </>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] });
  const y = useTransform(scrollYProgress, [0,1], [0,-110]);
  const scale = useTransform(scrollYProgress, [0,.9], [1,.86]);
  return <section ref={ref} id="hero" className="mw-hero">
    <div className="mw-hero-glow" />
    <motion.div style={{ y, scale }} className="mw-hero-copy">
      <div className="mw-kicker">MW / 001 · DIGITAL PRODUCT STUDIO</div>
      <h1><span>Systems that</span><span>answer first</span></h1>
      <p>Intelligent products, interfaces and data experiences built for the next layer of the web.</p>
      <div className="mw-actions"><a className="mw-pill light" href="#work">VIEW WORK ↗</a><a className="mw-pill dark" href="#founders">MEET THE FOUNDERS ↓</a></div>
    </motion.div>
    <TiltCard className="mw-hero-object">
      <div className="mw-orb-shell"><div className="mw-orb-core"/><div className="mw-orb-ring r1"/><div className="mw-orb-ring r2"/><span className="mw-orb-label">LIVE<br/>INTELLIGENCE</span></div>
    </TiltCard>
    <div className="mw-hero-foot"><span>AI · WEB · DATA · COMPUTER VISION</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>;
}

function Manifesto() {
  return <section id="studio" className="mw-manifesto">
    <div className="mw-meta">01 / THE IDEA</div>
    <div className="mw-manifesto-stage">
      <motion.h2 initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once:true }} transition={{ duration: .9 }}>We don't just<br/>build websites.</motion.h2>
      <div className="mw-floating-surface surface-a"><span>INTELLIGENCE</span><small>systems that learn</small></div>
      <div className="mw-floating-surface surface-b"><span>EXPERIENCE</span><small>interfaces that move</small></div>
      <div className="mw-floating-surface surface-c"><span>DATA</span><small>decisions that matter</small></div>
    </div>
    <div className="mw-manifesto-bottom"><span>DESIGN · ENGINEERING · INTELLIGENCE</span><strong>BEYOND EVERY LIMIT</strong></div>
  </section>;
}

function Capabilities() {
  const items = ['AI / MACHINE LEARNING','DATA SYSTEMS','COMPUTER VISION','WEB APPLICATIONS','UI / UX','INTERACTIVE EXPERIENCES','AUTOMATION','DIGITAL PRODUCTS'];
  return <section id="capabilities" className="mw-capabilities"><div className="mw-meta">02 / CAPABILITIES</div><div className="mw-cap-head"><h2>Build beyond<br/><em>every limit.</em></h2><p>From intelligent models to tactile interfaces, we design the systems behind memorable digital products.</p></div><div className="mw-cap-list">{items.map((x,i)=><motion.div key={x} className="mw-cap-row" initial={{ opacity:0, x:-30 }} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.05}}><span>0{i+1}</span><strong>{x}</strong><span>↗</span></motion.div>)}</div></section>;
}

function Work() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] });
  const x = useTransform(scrollYProgress, [.05,.8], ['4vw','-38vw']);
  return <section ref={ref} id="work" className="mw-work"><div className="mw-meta">03 / SELECTED WORK</div><div className="mw-work-title"><h2>A library<br/>that keeps <em>growing.</em></h2><span>SCROLL HORIZONTALLY ↓</span></div><motion.div style={{ x }} className="mw-work-track">{work.map((p,i)=><a href={p.href} target="_blank" rel="noreferrer" key={p.id} className="mw-work-card-wrap"><TiltCard className={`mw-work-card tone-${i}`}><div className="mw-card-top"><span>MW / {p.id}</span><span>{i===4?'2026':i===3?'2025':'2024'}</span></div><div className="mw-card-visual"><div className="mw-mini-window"><div/><div/><div/></div><div className="mw-mini-glow"/></div><div className="mw-card-bottom"><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.tech}</p></div><span className="mw-card-arrow">↗</span></div></TiltCard></a>)}</motion.div><div className="mw-archive">SEE THE FULL ARCHIVE <ArrowUpRight size={13}/></div></section>;
}

function Founders() {
  return <section id="founders" className="mw-founders"><div className="mw-meta">04 / THE FOUNDERS</div><div className="mw-founder-grid">{founders.map((f,i)=><article className="mw-founder" key={f.id}><div className="mw-founder-image">{f.image && <img src={f.image} alt={f.name}/>}<div className="mw-image-wash"/></div><div className="mw-founder-info"><span>MW / {f.id}</span><h2>{f.name}</h2><strong>{f.role}</strong><p>{f.focus}</p><div className="mw-founder-links"><a href={f.portfolio} target="_blank" rel="noreferrer">PORTFOLIO ↗</a><a href={f.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={f.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={`mailto:${f.email}`}>EMAIL ↗</a></div></div></article>)}</div></section>;
}

function CTA() {
  return <section className="mw-cta"><div className="mw-cta-glow"/><div className="mw-meta">05 / START SOMETHING</div><h2>Build beyond<br/><span>every limit.</span></h2><p>Have an idea? Let's build the experience it deserves.</p><div className="mw-actions"><a className="mw-pill light" href="mailto:owaies786@gmail.com">START A PROJECT ↗</a><a className="mw-pill dark" href="#work">VIEW WORK ↓</a></div><div className="mw-chrome"><div className="chrome-inner"/><div className="chrome-cut"/></div></section>;
}

function Footer() { return <footer className="mw-footer"><div><div className="mw-footer-brand">MAKEWEBB</div><p>DIGITAL PRODUCT STUDIO</p></div><div className="mw-footer-links"><a href="#work">WORK</a><a href="#capabilities">CAPABILITIES</a><a href="#founders">FOUNDERS</a><a href="mailto:owaies786@gmail.com">CONTACT ↗</a></div><div className="mw-footer-bottom"><span>AI · WEB · DATA · EXPERIENCE</span><span>© 2026 MAKEWEBB · BUILT WITH INTENT.</span></div></footer>; }

export default function ReferenceExperience() {
  useEffect(() => { document.documentElement.style.scrollBehavior = 'smooth'; return () => { document.documentElement.style.scrollBehavior = ''; }; }, []);
  return <div className="mw-reference"><Nav/><main><Hero/><Manifesto/><Capabilities/><Work/><Founders/><CTA/></main><Footer/></div>;
}
