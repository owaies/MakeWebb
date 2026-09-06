'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowUpRight, Code2, Linkedin, Mail, Menu, X } from 'lucide-react';
import { BuildStatusTerminal, ProjectGallery, ServicesExplorer, TechStackOrbit } from './interactive-experience';
import { ArchitecturePipeline, CursorContextBridge, LogoSystem, MakeWebbLogo, ProcessJourney, ProjectConfigurator, SkillConstellation } from './studio-features';
import HeroReference from './hero-reference-optimized';

const people = [
  { name:'Mohammed Owaies', role:'AI / ML Engineer', image:'/team/file_000000002d308211b0a2203107625baf.png', github:'https://github.com/owaies', linkedin:'https://www.linkedin.com/in/mohammed-owaies-507b4a398', portfolio:'https://owaies-portfolio.base44.app', phone:'7619329863', email:'owaies786@gmail.com', tag:'AI · ML · Engineering' },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', image:'/team/file_000000001c20821185b00fb24f8c0312.png', github:'https://github.com/afaf-app', linkedin:'https://www.linkedin.com/in/mansafaf', portfolio:'https://afaf.base44.app', phone:'8073818817', email:'kingahassan786@gmail.com', tag:'Web · Frontend · Full-stack' },
];

function TiltCard({ children, className='' }: { children:React.ReactNode; className?:string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x:0, y:0 });
  const current = useRef({ x:0, y:0 });
  const render = () => {
    frame.current = null;
    const node = ref.current;
    if (!node) return;
    current.current.x += (target.current.x - current.current.x) * 0.18;
    current.current.y += (target.current.y - current.current.y) * 0.18;
    node.style.transform = `perspective(1200px) rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`;
    if (Math.abs(target.current.x - current.current.x) > 0.01 || Math.abs(target.current.y - current.current.y) > 0.01) frame.current = requestAnimationFrame(render);
  };
  const schedule = () => { if (!frame.current) frame.current = requestAnimationFrame(render); };
  const onPointerMove = (event:React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.current.x = -(((event.clientY - rect.top) / rect.height) - .5) * 5;
    target.current.y = (((event.clientX - rect.left) / rect.width) - .5) * 7;
    schedule();
  };
  const reset = () => { target.current.x = 0; target.current.y = 0; schedule(); };
  return <div ref={ref} className={`tilt-card ${className}`} onPointerMove={onPointerMove} onPointerLeave={reset} onBlur={reset} style={{willChange:'transform'}}>{children}</div>;
}

export default function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  return <main>
  <CursorContextBridge />
  <nav className="nav shell"><a className="brand" href="#top" onClick={()=>setMenuOpen(false)} data-cursor="VIEW"><MakeWebbLogo compact={false}/></a><div className={`nav-links ${menuOpen?'open':''}`}><a href="#top" onClick={()=>setMenuOpen(false)} data-cursor="EXPLORE">Home</a><a href="#studio" onClick={()=>setMenuOpen(false)} data-cursor="EXPLORE">About</a><a href="#services" onClick={()=>setMenuOpen(false)} data-cursor="EXPLORE">Services</a><a href="#work" onClick={()=>setMenuOpen(false)} data-cursor="EXPLORE">Projects</a><a href="#studio" onClick={()=>setMenuOpen(false)} data-cursor="EXPLORE">Team</a><a href="#contact" onClick={()=>setMenuOpen(false)} data-cursor="OPEN">Contact</a></div><a className="nav-cta" href="#configurator" data-cursor="OPEN">Start a Project <ArrowUpRight size={16}/></a><button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} data-cursor="VIEW">{menuOpen?<X/>:<Menu/>}</button></nav>
  <div className="hero-reference-composition">
    <HeroReference />
  </div>
  <div className="marquee"><div>WEB DESIGN <span>✦</span> ANDROID <span>✦</span> WINDOWS <span>✦</span> AI / ML <span>✦</span> PRODUCT ENGINEERING <span>✦</span> 3D INTERACTION <span>✦</span> WEB DESIGN <span>✦</span> ANDROID <span>✦</span></div></div>
  <section className="section shell" id="services"><div className="section-head"><div><span className="section-number">01 / SERVICES</span><h2>One studio.<br/><span>Many surfaces.</span></h2></div><p>Explore the capabilities behind the build. Select a service to see what we ship, how we build it and how long it typically takes.</p></div><div className="interactive-block"><ServicesExplorer/></div></section>
  <section className="section shell interactive-section" id="work"><div className="interactive-block"><div className="interactive-kicker">02 / SELECT PROJECT</div><h2 className="interactive-section-title">Work with <span>depth.</span></h2><ProjectGallery/></div><div className="interactive-block"><div className="interactive-kicker">03 / TECHNOLOGY SYSTEM</div><h2 className="interactive-section-title">The stack <span>orbits.</span></h2><TechStackOrbit/></div><div className="interactive-block"><div className="interactive-kicker">04 / BUILD STATUS</div><h2 className="interactive-section-title">From idea to <span>online.</span></h2><BuildStatusTerminal/></div></section>
  <section className="section shell" id="process"><div className="section-head"><div><span className="section-number">05 / HOW WE BUILD</span><h2>Ideas need<br/><span>a route.</span></h2></div><p>Scroll through the route. Each stage changes the visual system so the process feels like a journey, not a checklist.</p></div><ProcessJourney/></section>
  <section className="section shell" id="architecture"><div className="section-head"><div><span className="section-number">06 / ARCHITECTURE</span><h2>How we<br/><span>build.</span></h2></div><p>One connected pipeline from the first spark to production. Hover or tap a layer to see what is happening under the surface.</p></div><ArchitecturePipeline/></section>
  <section className="section shell" id="brand"><div className="section-head"><div><span className="section-number">07 / BRAND SYSTEM</span><h2>One mark.<br/><span>Many sizes.</span></h2></div><p>The MAKEWEBB identity is intentionally simple: a compact M/W silhouette designed to stay recognizable from favicon to full wordmark.</p></div><LogoSystem/></section>
  <section className="section studio-section" id="studio"><div className="shell"><div className="section-head studio-head"><div><span className="section-number">08 / THE STUDIO</span><h2>Two minds.<br/><span>One build system.</span></h2></div><p>MakeWebb brings together AI/ML engineering and web development to move ideas from concept to shipped product.</p></div><div className="people-grid">{people.map(p=><TiltCard className="person-card" key={p.name}><div className="person-image-wrap"><Image src={p.image} alt={p.name} className="person-image" fill sizes="(max-width: 900px) 100vw, 50vw" quality={82}/><div className="image-grid"/></div><div className="person-info"><span className="person-tag">{p.tag}</span><h3>{p.name}</h3><p>{p.role}</p><SkillConstellation person={p.name}/><div className="person-links"><a href={p.portfolio} target="_blank" rel="noreferrer" data-cursor="OPEN">Portfolio <ArrowUpRight size={14}/></a><a href={p.github} target="_blank" rel="noreferrer" data-cursor="OPEN">GitHub <ArrowUpRight size={14}/></a><a href={p.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN"><Linkedin size={14}/></a></div></div></TiltCard>)}</div></div></section>
  <section className="section shell" id="configurator"><div className="section-head"><div><span className="section-number">09 / START A PROJECT</span><h2>Configure<br/><span>the build.</span></h2></div><p>Choose the shape, budget and pace. Your selections turn into a ready-to-send project brief in one click.</p></div><ProjectConfigurator/></section>
  <section className="contact-section shell" id="contact"><div className="contact-card"><div className="contact-orb"><Code2 size={42}/><span/></div><div className="contact-copy"><span className="section-number">10 / CONTACT</span><h2>Have an idea?<br/><em>Let's make it real.</em></h2><p>Prefer a direct conversation? Choose who you want to reach at MakeWebb.</p></div><div className="contact-actions"><span className="contact-prompt">CHOOSE WHO TO CONTACT</span><a className="contact-person-button" href="mailto:owaies786@gmail.com" aria-label="Email Mohammed Owaies" data-cursor="OPEN"><span><strong>Mohammed Owaies</strong><small>AI / ML Engineer</small></span><Mail size={19}/></a><a className="contact-person-button" href="mailto:kingahassan786@gmail.com" aria-label="Email Mohammed Afaf Hassan" data-cursor="OPEN"><span><strong>Mohammed Afaf Hassan</strong><small>Web Developer</small></span><Mail size={19}/></a></div></div></section>
  <footer className="footer shell"><span>© {new Date().getFullYear()} MAKEWEBB</span><span>BUILT WITH INTENT · INDIA</span><a href="#top" data-cursor="VIEW">BACK TO TOP ↑</a></footer>
</main>; }
