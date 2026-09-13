import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const projects = [
  ['AI JOB TRACKER', 'AI PRODUCT', 'AI · ANALYTICS', 'purple'],
  ['E-EXAMINER', 'EDTECH', 'WEB · ASSESSMENTS', 'silver'],
  ['WORLD OBJECT DETECTOR', 'COMPUTER VISION', 'VISION · PYTHON', 'green'],
  ['SILSILA BURQA HOUSE', 'E-COMMERCE', 'COMMERCE · WEB', 'lilac'],
  ['HAND GESTURE CONTROLLER', 'INTERACTION', 'VISION · MOTION', 'blue'],
] as const;
const caps = [
  ['01', 'AI / MACHINE LEARNING', 'Intelligent systems and practical automation.'],
  ['02', 'WEB APPLICATIONS', 'Fast, resilient products designed around people.'],
  ['03', 'COMPUTER VISION', 'Real-time visual intelligence and interaction.'],
  ['04', 'DATA SYSTEMS', 'Pipelines, analytics and information architecture.'],
  ['05', 'UI / UX', 'Interfaces with hierarchy, clarity and motion.'],
  ['06', 'INTERACTIVE 3D', 'Spatial experiences for the modern web.'],
];
const slot = { x: [-1.65, -0.82, 0, 0.82, 1.65], y: [24, 5, -8, 5, 24], z: [0, 150, 360, 150, 0], ry: [22, 9, 0, -9, -22], rz: [4, 2, 0, -2, -4], scale: [0.68, 0.86, 1, 0.86, 0.68] };
function clamp(v: number, a = 0, b = 1) { return Math.max(a, Math.min(b, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function cyc(values: number[], t: number) { const n = values.length; const x = ((t % n) + n) % n; const a = Math.floor(x); const b = (a + 1) % n; return lerp(values[a], values[b], x - a); }
type ProgressValue = ReturnType<typeof useScroll>['scrollYProgress'];
type Project = typeof projects[number];
function CardFace({ title, tag, tech, accent, index }: { title: string; tag: string; tech: string; accent: string; index: number }) { return <><div className="mw-card-top"><span>{tag}</span><ArrowUpRight size={14} /></div><div className={`mw-card-art mw-art-${accent}`}><div className="mw-card-ui"><span>MAKEWEBB / {String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{index === 0 ? 'Systems that answer first.' : index === 1 ? 'Assess. Understand. Improve.' : index === 2 ? 'See what the model sees.' : index === 3 ? 'Crafted for digital commerce.' : 'Interfaces that respond.'}</small><i /></div></div><h3>{title}</h3><div className="mw-card-foot"><span>{tech}</span><span>VIEW ↗</span></div></>; }
function pathTransform(x: number, y: number, z: number, ry: number, rz: number, scale: number) { return `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}px), ${z}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`; }
function PersistentHeroCard({ progress }: { progress: ProgressValue }) {
  const transform = useTransform(progress, p => {
    if (p < 0.28) { const t = clamp(p / 0.28); const e = t * t * (3 - 2 * t); return pathTransform(lerp(29, 0, e), lerp(-8, 0, e), lerp(90, 360, e), lerp(-7, 0, e), lerp(0, -2, e), lerp(1.08, 1, e)); }
    const orbit = clamp((p - 0.28) / 0.58); const t = 2 + orbit * 5.4;
    return pathTransform(cyc(slot.x, t) * 22.5, cyc(slot.y, t), cyc(slot.z, t), cyc(slot.ry, t), cyc(slot.rz, t), cyc(slot.scale, t));
  });
  return <motion.a href="#contact" className="mw-card mw-persistent-card mw-accent-purple" style={{ transform }}><CardFace title={projects[0][0]} tag={projects[0][1]} tech={projects[0][2]} accent={projects[0][3]} index={0} /></motion.a>;
}
function OrbitCard({ index, progress }: { index: number; progress: ProgressValue }) {
  const transform = useTransform(progress, p => { const formation = clamp((p - 0.16) / 0.18); const orbit = clamp((p - 0.28) / 0.58); const t = 2 + orbit * 5.4 + index; const lift = (1 - formation) * 72; const scale = cyc(slot.scale, t) * lerp(0.76, 1, formation); return pathTransform(cyc(slot.x, t) * 22.5, cyc(slot.y, t) + lift, cyc(slot.z, t), cyc(slot.ry, t), cyc(slot.rz, t), scale); });
  const opacity = useTransform(progress, p => 0.98 * clamp((p - 0.16) / 0.12));
  const project = projects[index] as Project;
  return <motion.a href="#contact" className={`mw-card mw-orbit-card mw-accent-${project[3]}`} style={{ transform, opacity }}><CardFace title={project[0]} tag={project[1]} tech={project[2]} accent={project[3]} index={index} /></motion.a>;
}
function CinematicScene() {
  const ref = useRef<HTMLElement | null>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] }); const progress = scrollYProgress; const [state, setState] = useState('HERO');
  useEffect(() => progress.on('change', p => setState(p < 0.28 ? 'HERO' : p < 0.84 ? 'ORBIT' : 'RETURN')), [progress]);
  const white = useTransform(progress, [0, 0.10, 0.18, 0.34, 0.90, 0.96], [0, 0, 0.15, 1, 1, 0]);
  const black = useTransform(progress, [0.56, 0.61, 0.66], [0, 1, 0]); const blackY = useTransform(progress, [0.56, 0.61, 0.66], ['100%', '0%', '-100%']);
  const type1 = useTransform(progress, [0.25, 0.40, 0.58], ['120vw', '0vw', '-125vw']); const type1o = useTransform(progress, [0.25, 0.30, 0.54, 0.60], [0, 1, 1, 0]);
  const type2 = useTransform(progress, [0.48, 0.62, 0.80], ['-120vw', '0vw', '120vw']); const type2o = useTransform(progress, [0.48, 0.54, 0.74, 0.82], [0, 1, 1, 0]);
  const heroOpacity = useTransform(progress, [0.12, 0.30, 0.84, 0.96], [1, 0, 0, 1]);
  return <section ref={ref} id="work" className="mw-cinematic"><div className="mw-sticky"><motion.div className="mw-white-stage" style={{ opacity: white }} /><motion.div className="mw-hero-layer" style={{ opacity: heroOpacity }}><div className="mw-meta"><span>MAKEWEBB / 001 · DIGITAL PRODUCT STUDIO</span><span>AI · WEB · DATA · EXPERIENCE</span></div><div className="mw-hero-copy"><small>MAKEWEBB / 2026</small><h1>Systems that<br /><em>answer first.</em></h1><p>We design and build intelligent digital products across web, apps, AI, data and interactive experiences.</p></div><div className="mw-hero-bottom"><span>✦</span><span>SCROLL / EXPLORE</span></div></motion.div><div className="mw-stage-head"><span>MAKEWEBB / 002</span><span>{state} / ONE CARD</span><span>SCROLL TO EXPLORE</span></div><div className="mw-card-anchor"><PersistentHeroCard progress={progress} />{[1,2,3,4].map(i => <OrbitCard key={i} index={i} progress={progress} />)}</div><motion.div className="mw-type mw-type-one" style={{ x: type1, opacity: type1o }}>DESIGN THAT SHIPS.</motion.div><motion.div className="mw-type mw-type-two" style={{ x: type2, opacity: type2o }}>PROMISES TO SPEED WITH EVERY INTERFACE.</motion.div><div className="mw-collection-pill">EXPLORE THE COLLECTION</div><motion.div className="mw-beyond" style={{ opacity: black, y: blackY }}><div><span>MAKEWEBB / 003</span><h2>Beyond<br /><em>every limit.</em></h2></div></motion.div></div></section>;
}
function OtherSections() { return <><section id="capabilities" className="mw-section mw-dark"><div className="mw-inner"><span className="mw-kicker">MAKEWEBB / 004 · CAPABILITIES</span><h2>BUILDING<br /><em>WHAT MOVES.</em></h2><div className="mw-cap-grid">{caps.map(c => <article key={c[0]}><span>{c[0]}</span><h3>{c[1]}</h3><p>{c[2]}</p></article>)}</div></div></section><section id="founders" className="mw-section mw-paper"><div className="mw-inner"><span className="mw-kicker">MAKEWEBB / 005 · FOUNDERS</span><h2>PEOPLE<br /><em>BEHIND THE SYSTEM.</em></h2><div className="mw-founders"><article><img src="/founders/owaies.jpg" /><span>FOUNDER · AI / ML</span><h3>MOHAMMED OWAIES</h3></article><article><img src="/founders/afaf.jpg" /><span>FOUNDER · WEB / APPS</span><h3>MOHAMMED AFAF HASSAN</h3></article></div></div></section><section className="mw-section mw-purple"><div className="mw-inner"><span className="mw-kicker">MAKEWEBB / 006 · TECHNOLOGY</span><div className="mw-techwords">AI <i>ML</i> DATA PYTHON NEXT.JS REACT JAVASCRIPT COMPUTER VISION UI/UX WEB APPS AUTOMATION</div></div></section><section id="contact" className="mw-section mw-contact"><div className="mw-inner"><span className="mw-kicker">MAKEWEBB / 007 · CONTACT</span><h2>BUILD<br /><em>WHAT'S NEXT.</em></h2><p>Have a product, system or impossible interface in mind? Let's make it real.</p><a href="mailto:makewebb@gmail.com">START A PROJECT ↗</a></div></section><footer className="mw-footer"><b>MAKEWEBB</b><span>DIGITAL PRODUCT STUDIO · 2026</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></footer></>; }
export default function MakeWebbCinematic() { const [menu,setMenu]=useState(false); const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); return <div className="mw-cinematic-site"><header className="mw-nav"><button className="mw-logo" onClick={()=>go('work')}><b>MW</b> MAKEWEBB</button><nav><button onClick={()=>go('work')}>WORK</button><button onClick={()=>go('capabilities')}>CAPABILITIES</button><button onClick={()=>go('founders')}>FOUNDERS</button><button onClick={()=>go('contact')}>CONTACT</button></nav><button className="mw-start" onClick={()=>go('contact')}>GET STARTED</button><button className="mw-menu" onClick={()=>setMenu(true)}><Menu size={17}/></button></header>{menu&&<div className="mw-mobile-menu"><button onClick={()=>setMenu(false)}><X/></button>{['work','capabilities','founders','contact'].map(x=><button key={x} onClick={()=>{setMenu(false);go(x)}}>{x.toUpperCase()}</button>)}</div>}<main><CinematicScene/><OtherSections/></main></div>; }
