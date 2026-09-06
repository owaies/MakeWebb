'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone, Globe } from 'lucide-react';
import HeroThreeScene from './hero-r3f-scene';
import MobileHero from './mobile-hero';
import { founders, heroServices } from './hero-data';

function FounderCardDesktop({ person }: { person: typeof founders[number] }) {
  return <article className={`hero-founder-card ${person.accent}`}>
    <div className="hero-founder-photo"><Image src={person.image} alt={person.name} fill sizes="30vw" priority quality={82}/><span className="hero-founder-corner">↗</span><span className="hero-founder-label">{person.tag}</span></div>
    <div className="hero-founder-body">
      <span className="hero-founder-badge">Co-Founder</span>
      <h2>{person.name}</h2><p className="hero-founder-role">{person.role}</p>
      <p className="hero-founder-description">Building modern digital products with engineering, design and next-gen technology.</p>
      <div className="hero-founder-contact"><span><Phone size={13}/>{person.phone}</span><span><Mail size={13}/>{person.email}</span></div>
      <div className="hero-founder-links"><a href={person.portfolio} target="_blank" rel="noreferrer"><Globe size={14}/>Portfolio</a><a href={person.github} target="_blank" rel="noreferrer"><Github size={14}/>GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14}/>LinkedIn</a></div>
    </div>
  </article>;
}

function ServiceVisual({ kind }: { kind: string }) {
  if(kind==='browser') return <div className="service-visual browser-visual"><i/><b/><b/><b/></div>;
  if(kind==='phone') return <div className="service-visual phone-visual"><span/><i/></div>;
  if(kind==='windows') return <div className="service-visual windows-visual"><b/><b/><b/><b/></div>;
  return <div className="service-visual chip-visual"><strong>AI</strong><i/><i/><i/><i/></div>;
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

function DesktopHero(){
  return <section className="hero-reference-shell shell" id="top">
    <div className="hero-reference-stage"><HeroThreeScene/></div>
    <div className="hero-glass-cube-wrap"><HeroGlassCube/></div>
    <div className="hero-founder-layer"><FounderCardDesktop person={founders[0]}/><FounderCardDesktop person={founders[1]}/></div>
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
      {heroServices.map(([index,title,text,kind]) => <a href="#services" className="hero-service-card" key={index}><ServiceVisual kind={kind}/><span className="service-mini-index">{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={16}/></a>)}
    </div>
  </section>;
}

function HeroLoadingShell(){
  return <div className="hero-reference-loading" aria-hidden="true"><div className="hero-reference-loading-glow"/></div>;
}

export default function HeroReferenceOptimized(){
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    const sync = () => { setMobile(media.matches); setMounted(true); };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  if (!mounted) return <HeroLoadingShell />;
  return mobile ? <MobileHero /> : <DesktopHero />;
}
