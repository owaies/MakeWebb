'use client';

import { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowDownRight, ArrowUpRight, Code2, Compass, Linkedin, Mail, Menu, Move3d, PenTool, Rocket, Wrench, X } from 'lucide-react';
import { BuildStatusTerminal, InteractiveHeroVisual, ProjectGallery, ServicesExplorer, TechStackOrbit } from './interactive-experience';

const people = [
  { name:'Mohammed Owaies', role:'AI / ML Engineer', image:'https://raw.githubusercontent.com/owaies/MakeWebb/main/public/team/owaies.jpg', github:'https://github.com/owaies', linkedin:'https://www.linkedin.com/in/mohammed-owaies-507b4a398', portfolio:'https://owaies-portfolio.base44.app', phone:'7619329863', email:'owaies786@gmail.com', tag:'AI · ML · Engineering' },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', image:'https://raw.githubusercontent.com/owaies/MakeWebb/main/public/team/afaf.jpg', github:'https://github.com/afaf-app', linkedin:'https://www.linkedin.com/in/mansafaf', portfolio:'https://afaf.base44.app', phone:'8073818817', email:'kingahassan786@gmail.com', tag:'Web · Frontend · Full-stack' },
];
const process = [
  { num:'01', title:'Discover', text:'Clarify the problem, audience, goals and technical constraints.', icon:Compass },
  { num:'02', title:'Design', text:'Turn the idea into an interface, interaction system and visual direction.', icon:PenTool },
  { num:'03', title:'Build', text:'Engineer the product with clean architecture, responsive UI and real-world performance.', icon:Wrench },
  { num:'04', title:'Launch', text:'Test, polish, deploy and keep improving from actual user feedback.', icon:Rocket },
];

function TiltCard({ children, className='' }: { children:React.ReactNode; className?:string }) {
  const [rotation,setRotation] = useState({x:0,y:0});
  return <div className={`tilt-card ${className}`} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;setRotation({x:-y*10,y:x*12});}} onPointerLeave={()=>setRotation({x:0,y:0})} style={{transform:`perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`}}>{children}</div>;
}

function useAnimeMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroTargets = document.querySelectorAll('.hero-copy .eyebrow, .hero-copy h1, .hero-copy .hero-text, .hero-copy .hero-actions');
    animate(heroTargets,{opacity:[0,1],y:[28,0],duration:850,delay:stagger(110),ease:'out(4)'});
    const marquee=document.querySelector('.marquee div');
    if(marquee) animate(marquee,{translateX:['0%','-50%'],duration:30000,loop:true,ease:'linear'});
    const revealTargets=document.querySelectorAll('.section-head, .service-card, .person-card, .process-item, .contact-card, .interactive-block');
    const observers:IntersectionObserver[]=[];
    revealTargets.forEach(element=>{const node=element as HTMLElement;node.style.opacity='0';node.style.transform='translateY(34px)';const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;observer.disconnect();animate(node,{opacity:[0,1],y:[34,0],duration:850,ease:'out(4)'});},{threshold:.08});observer.observe(node);observers.push(observer);});
    return()=>observers.forEach(observer=>observer.disconnect());
  },[]);
}

export default function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  useAnimeMotion();
  return <main>
    <nav className="nav shell"><a className="brand" href="#top" onClick={()=>setMenuOpen(false)}><span className="brand-mark"><Move3d size={17}/></span><span>MAKEWEBB</span></a><div className={`nav-links ${menuOpen?'open':''}`}><a href="#services" onClick={()=>setMenuOpen(false)}>Services</a><a href="#work" onClick={()=>setMenuOpen(false)}>Studio</a><a href="#process" onClick={()=>setMenuOpen(false)}>Process</a><a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></div><a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={16}/></a><button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button></nav>
    <section className="hero shell" id="top"><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> DIGITAL PRODUCT STUDIO</div><h1>We build digital<br/><em>worlds</em> that work.</h1><p className="hero-text">Websites, Android apps, Windows software and AI-powered products. Designed with intent. Engineered for the real world.</p><div className="hero-actions"><a className="button primary" href="#contact">Build something <ArrowUpRight size={17}/></a><a className="text-link" href="#work">Explore the studio <ArrowDownRight size={17}/></a></div></div><div className="hero-stage" aria-label="Interactive 3D MakeWebb experience"><InteractiveHeroVisual/></div></section>
    <div className="marquee"><div>WEB DESIGN <span>✦</span> ANDROID <span>✦</span> WINDOWS <span>✦</span> AI / ML <span>✦</span> PRODUCT ENGINEERING <span>✦</span> 3D INTERACTION <span>✦</span> WEB DESIGN <span>✦</span> ANDROID <span>✦</span></div></div>
    <section className="section shell" id="services"><div className="section-head"><div><span className="section-number">01 / SERVICES</span><h2>One studio.<br/><span>Many surfaces.</span></h2></div><p>Explore the capabilities behind the build. Select a service to see what we ship, how we build it and how long it typically takes.</p></div><div className="interactive-block"><ServicesExplorer/></div></section>
    <section className="section shell interactive-section" id="work"><div className="interactive-block"><div className="interactive-kicker">02 / SELECT PROJECT</div><h2 className="interactive-section-title">Work with <span>depth.</span></h2><ProjectGallery/></div><div className="interactive-block"><div className="interactive-kicker">03 / TECHNOLOGY SYSTEM</div><h2 className="interactive-section-title">The stack <span>orbits.</span></h2><TechStackOrbit/></div><div className="interactive-block"><div className="interactive-kicker">04 / BUILD STATUS</div><h2 className="interactive-section-title">From idea to <span>online.</span></h2><BuildStatusTerminal/></div></section>
    <section className="section studio-section" id="studio"><div className="shell"><div className="section-head studio-head"><div><span className="section-number">05 / THE STUDIO</span><h2>Two minds.<br/><span>One build system.</span></h2></div><p>MakeWebb brings together AI/ML engineering and web development to move ideas from concept to shipped product.</p></div><div className="people-grid">{people.map(p=><TiltCard className="person-card" key={p.name}><div className="person-image-wrap"><img src={p.image} alt={p.name} className="person-image"/><div className="image-grid"/></div><div className="person-info"><span className="person-tag">{p.tag}</span><h3>{p.name}</h3><p>{p.role}</p><div className="person-links"><a href={p.portfolio} target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={14}/></a><a href={p.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={p.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14}/></a></div></div></TiltCard>)}</div></div></section>
    <section className="section shell" id="process"><div className="section-head"><div><span className="section-number">06 / PROCESS</span><h2>Ideas need<br/><span>a route.</span></h2></div><p>No mystery handoffs. Every project gets a visible path from first conversation to launch.</p></div><div className="process-grid">{process.map(({num,title,text,icon:Icon})=><div className="process-item" key={num}><span className="process-number">{num}</span><span className="process-icon"><Icon size={20}/></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
    <section className="contact-section shell" id="contact"><div className="contact-card"><div className="contact-orb"><Code2 size={42}/><span/></div><div className="contact-copy"><span className="section-number">07 / CONTACT</span><h2>Have an idea?<br/><em>Let's make it real.</em></h2><p>Tell us what you are building. We will figure out the best shape for it.</p></div><div className="contact-actions"><span className="contact-prompt">CHOOSE WHO TO CONTACT</span><a className="contact-person-button" href="mailto:owaies786@gmail.com" aria-label="Email Mohammed Owaies"><span><strong>Mohammed Owaies</strong><small>AI / ML Engineer</small></span><Mail size={19}/></a><a className="contact-person-button" href="mailto:kingahassan786@gmail.com" aria-label="Email Mohammed Afaf Hassan"><span><strong>Mohammed Afaf Hassan</strong><small>Web Developer</small></span><Mail size={19}/></a></div></div></section>
    <footer className="footer shell"><span>© {new Date().getFullYear()} MAKEWEBB</span><span>BUILT WITH INTENT · INDIA</span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
