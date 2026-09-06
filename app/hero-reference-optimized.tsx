'use client';

import Image from 'next/image';
import { useEffect, useSyncExternalStore } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone, Globe } from 'lucide-react';
import HeroThreeScene from './hero-r3f-scene';

const people = [
  { name:'Mohammed Owaies', role:'AI/ML Engineer', tag:'AI · ML · DATA', image:'/team/file_000000002d308211b0a2203107625baf.png', phone:'7619329863', email:'owaies786@gmail.com', portfolio:'https://owaies-portfolio.base44.app', github:'https://github.com/owaies', linkedin:'https://www.linkedin.com/in/mohammed-owaies-507b4a398', accent:'blue' },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', tag:'WEB · APPS · UI/UX', image:'/team/file_000000001c20821185b00fb24f8c0312.png', phone:'8073818817', email:'kingahassan786@gmail.com', portfolio:'https://afaf.base44.app', github:'https://github.com/afaf-app', linkedin:'https://www.linkedin.com/in/mansafaf', accent:'violet' },
];

const services = [
  ['01','Web Design & Development','Modern, fast and scalable web experiences','browser'],
  ['02','Android App Development','Powerful mobile apps for real users','phone'],
  ['03','Windows App Development','Desktop apps with modern technology','windows'],
  ['04','AI Integration','Smarter products with AI/ML','chip'],
] as const;

function useMobileHero() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia('(max-width: 800px)');
      media.addEventListener('change', onStoreChange);
      return () => media.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia('(max-width: 800px)').matches,
    () => false,
  );
}

function FounderCardDesktop({ person }: { person: typeof people[number] }) {
  return <article className={`hero-founder-card ${person.accent}`}>
    <div className="hero-founder-photo"><Image src={person.image} alt={person.name} fill sizes="(max-width: 650px) 92vw, 30vw" priority quality={82}/><span className="hero-founder-corner">↗</span><span className="hero-founder-label">{person.tag}</span></div>
    <div className="hero-founder-body">
      <span className="hero-founder-badge">Co-Founder</span>
      <h2>{person.name}</h2><p className="hero-founder-role">{person.role}</p>
      <p className="hero-founder-description">Building modern digital products with engineering, design and next-gen technology.</p>
      <div className="hero-founder-contact"><span><Phone size={13}/>{person.phone}</span><span><Mail size={13}/>{person.email}</span></div>
      <div className="hero-founder-links"><a href={person.portfolio} target="_blank" rel="noreferrer"><Globe size={14}/>Portfolio</a><a href={person.github} target="_blank" rel="noreferrer"><Github size={14}/>GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14}/>LinkedIn</a></div>
    </div>
  </article>;
}

function FounderCardMobile({ person }: { person: typeof people[number] }) {
  return <article className="hero-mobile-founder-card">
    <div className="hero-mobile-founder-photo"><Image src={person.image} alt={person.name} fill sizes="(max-width: 800px) calc(100vw - 32px), 390px" priority quality={82}/><span className="hero-mobile-founder-corner">↗</span><span className="hero-mobile-founder-label">{person.tag}</span></div>
    <div className="hero-mobile-founder-body">
      <span className="hero-mobile-founder-badge">Co-Founder</span>
      <h2>{person.name}</h2>
      <p className="hero-mobile-founder-role">{person.role}</p>
      <p className="hero-mobile-founder-description">Building modern digital products with engineering, design and next-gen technology.</p>
      <div className="hero-mobile-founder-contact"><a href={`tel:${person.phone}`}><Phone size={12}/>{person.phone}</a><a href={`mailto:${person.email}`}><Mail size={12}/>{person.email}</a></div>
      <div className="hero-mobile-founder-links"><a href={person.portfolio} target="_blank" rel="noreferrer"><Globe size={13}/>Portfolio</a><a href={person.github} target="_blank" rel="noreferrer"><Github size={13}/>GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={13}/>LinkedIn</a></div>
    </div>
  </article>;
}

function ServiceVisual({ kind }: { kind: string }) {
  if(kind==='browser') return <div className="service-visual browser-visual"><i/><b/><b/><b/></div>;
  if(kind==='phone') return <div className="service-visual phone-visual"><span/><i/></div>;
  if(kind==='windows') return <div className="service-visual windows-visual"><b/><b/><b/><b/></div>;
  return <div className="service-visual chip-visual"><strong>AI</strong><i/><i/><i/><i/></div>;
}

function MobileServiceVisual({ kind }: { kind: string }) {
  if(kind==='browser') return <div className="hero-mobile-service-visual hero-mobile-browser"><i/><b/><b/><b/></div>;
  if(kind==='phone') return <div className="hero-mobile-service-visual hero-mobile-phone"><span/><i/></div>;
  if(kind==='windows') return <div className="hero-mobile-service-visual hero-mobile-windows"><b/><b/><b/><b/></div>;
  return <div className="hero-mobile-service-visual hero-mobile-chip"><strong>AI</strong><i/><i/><i/><i/></div>;
}

function HeroGlassCube(){
  return <div className="hero-glass-cube" aria-hidden="true">
    <div className="hero-glass-cube-shadow"/>
    <div className="hero-glass-cube-orbit orbit-x"/><div className="hero-glass-cube-orbit orbit-y"/>
    <div className="hero-glass-cube-body">
      <span className="cube-face cube-front">M/W</span><span className="cube-face cube-back">3D</span><span className="cube-face cube-right">AI</span><span className="cube-face cube-left">WEB</span><span className="cube-face cube-top">BUILD</span><span className="cube-face cube-bottom">∞</span>
    </div>
  </div>;
}

function MobileMWObject(){
  return <div className="hero-mobile-object" aria-hidden="true">
    <div className="hero-mobile-object-orbit hero-mobile-object-orbit-x"/>
    <div className="hero-mobile-object-orbit hero-mobile-object-orbit-y"/>
    <div className="hero-mobile-object-shadow"/>
    <div className="hero-mobile-object-cube"><span>M/W</span></div>
  </div>;
}

function MobileHero(){
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const copy = document.querySelectorAll<HTMLElement>('.hero-mobile-copy > *');
    const object = document.querySelector<HTMLElement>('.hero-mobile-object');
    const founders = document.querySelectorAll<HTMLElement>('.hero-mobile-founder-card');
    const serviceCards = document.querySelectorAll<HTMLElement>('.hero-mobile-service-card');
    animate(copy, { opacity:[0,1], y:[22,0], duration:650, delay:stagger(55), ease:'out(4)' });
    if (object) animate(object, { opacity:[0,1], y:[18,0], scale:[.94,1], duration:760, delay:240, ease:'out(4)' });
    animate(founders, { opacity:[0,1], y:[30,0], duration:620, delay:stagger(90, {start:420}), ease:'out(4)' });
    animate(serviceCards, { opacity:[0,1], y:[24,0], duration:520, delay:stagger(65, {start:720}), ease:'out(4)' });
  }, []);

  return <section className="hero-mobile" id="top">
    <div className="hero-mobile-background"><HeroThreeScene/></div>
    <div className="hero-mobile-content">
      <div className="hero-mobile-copy">
        <div className="hero-mobile-eyebrow"><span className="pulse"/> BUILDING A BETTER DIGITAL WORLD</div>
        <h1><strong>MakeWebb</strong><em>Web. Android. Windows.</em><span>Ideas into real products.</span></h1>
        <p>We design and develop modern digital experiences with 3D, AI and next-gen technologies.</p>
        <div className="hero-mobile-actions"><a className="button primary" href="#configurator">Let's Build Together <ArrowUpRight size={15}/></a><a className="hero-mobile-work-link" href="#work">View Our Work <ArrowDownRight size={15}/></a></div>
        <div className="hero-mobile-trust"><small>TRUSTED BY INNOVATORS</small><div><span>Ⓝ Next.js</span><span>⚛ React</span><span>▣ Android</span><span>⊞ Windows</span></div></div>
      </div>
      <MobileMWObject/>
      <div className="hero-mobile-founders">
        {people.map(person => <FounderCardMobile person={person} key={person.name}/>)}
      </div>
      <div className="hero-mobile-services">
        {services.map(([index,title,text,kind]) => <a href="#services" className="hero-mobile-service-card" key={index}><MobileServiceVisual kind={kind}/><span>{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={14}/></a>)}
      </div>
    </div>
  </section>;
}

function DesktopHero(){
  return <section className="hero-reference-shell shell" id="top">
    <div className="hero-reference-stage"><HeroThreeScene/></div>
    <div className="hero-glass-cube-wrap"><HeroGlassCube/></div>
    <div className="hero-founder-layer"><FounderCardDesktop person={people[0]}/><FounderCardDesktop person={people[1]}/></div>
    <div className="hero-reference-copy">
      <div className="eyebrow"><span className="pulse"/> BUILDING A BETTER DIGITAL WORLD</div>
      <h1><strong>MakeWebb</strong><em>Web. Android. Windows.</em><span>Ideas into real products.</span></h1>
      <p className="hero-text">We design and develop modern digital experiences<br className="desktop-break"/> with 3D, AI and next-gen technologies.</p>
      <div className="hero-actions hero-reference-actions"><a className="button primary" href="#configurator">Let's Build Together <ArrowUpRight size={16}/></a><a className="text-link" href="#work">View Our Work <ArrowDownRight size={16}/></a></div>
      <div className="hero-trust"><small>TRUSTED BY INNOVATORS</small><div><span>Ⓝ Next.js</span><span>⚛ React</span><span>▣ Android</span><span>⊞ Windows</span></div></div>
    </div>
    <div className="hero-float-copy hero-float-left">PEOPLE<br/>IDEAS<br/>TECHNOLOGY<br/>IMPACT</div>
    <div className="hero-float-copy hero-float-right">MODERN<br/>SCALABLE<br/>BEAUTIFUL<br/>TOGETHER</div>
    <div className="hero-service-strip shell">
      {services.map(([index,title,text,kind]) => <a href="#services" className="hero-service-card" key={index}><ServiceVisual kind={kind}/><span className="service-mini-index">{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={16}/></a>)}
    </div>
  </section>;
}

export default function HeroReferenceOptimized(){
  const mobile = useMobileHero();
  return mobile ? <MobileHero/> : <DesktopHero/>;
}
