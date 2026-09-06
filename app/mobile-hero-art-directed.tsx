'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowDownRight, ArrowUpRight, Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import HeroThreeScene from './hero-r3f-scene';
import { founders, heroServices } from './hero-data';

type Founder = typeof founders[number];
type ServiceKind = 'browser' | 'phone' | 'windows' | 'chip';
type PausableAnimation = { pause: () => unknown };

function MobileFounderCard({ person, index }: { person: Founder; index: number }) {
  return <article className="mobile-art-founder" data-art-founder={index + 1}>
    <div className="mobile-art-founder-photo">
      <Image src={person.image} alt={person.name} fill sizes="(max-width: 800px) calc(100vw - 32px), 390px" priority={index === 0} quality={86}/>
      <span className="mobile-art-founder-tag">{person.tag}</span><span className="mobile-art-founder-corner" aria-hidden="true">↗</span><span className="mobile-art-founder-sheen" aria-hidden="true"/>
    </div>
    <div className="mobile-art-founder-body">
      <span className="mobile-art-founder-badge">Co-Founder</span><h2>{person.name}</h2><p className="mobile-art-founder-role">{person.role}</p>
      <p className="mobile-art-founder-description">Building modern digital products with engineering, design and next-gen technology.</p>
      <div className="mobile-art-founder-contact"><a href={`tel:${person.phone}`}><Phone size={13}/>{person.phone}</a><a href={`mailto:${person.email}`}><Mail size={13}/>{person.email}</a></div>
      <div className="mobile-art-founder-links"><a href={person.portfolio} target="_blank" rel="noreferrer"><Globe size={13}/>Portfolio</a><a href={person.github} target="_blank" rel="noreferrer"><Github size={13}/>GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={13}/>LinkedIn</a></div>
    </div>
  </article>;
}

function MobileServiceVisual({ kind }: { kind: ServiceKind }) {
  if(kind==='browser') return <div className="mobile-art-service-visual browser"><i/><b/><b/><b/></div>;
  if(kind==='phone') return <div className="mobile-art-service-visual phone"><span/><i/></div>;
  if(kind==='windows') return <div className="mobile-art-service-visual windows"><b/><b/><b/><b/></div>;
  return <div className="mobile-art-service-visual chip"><strong>AI</strong><i/><i/><i/><i/></div>;
}

function MobileMWObject(){
  return <div className="mobile-art-mw-stage" data-art-reveal="object" aria-label="Interactive MAKEWEBB M/W glass object"><div className="mobile-art-mw-caption"><span>03D / CORE OBJECT</span><i>INTERACTIVE</i></div><div className="mobile-art-mw-aura"/><HeroThreeScene mode="mobile"/><div className="mobile-art-mw-scan" aria-hidden="true"/></div>;
}

export default function MobileHeroArtDirected(){
  const rootRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    const root=rootRef.current;
    if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const animations: PausableAnimation[]=[];
    const push=(animation: PausableAnimation)=>animations.push(animation);
    push(animate(root.querySelectorAll<HTMLElement>('[data-art-reveal="copy"]'),{opacity:[0,1],y:[22,0],duration:650,delay:stagger(58),ease:'out(4)'}));
    push(animate(root.querySelectorAll<HTMLElement>('[data-art-reveal="object"]'),{opacity:[0,1],y:[12,0],scale:[.94,1],duration:900,delay:420,ease:'out(4)'}));
    push(animate(root.querySelectorAll<HTMLElement>('[data-art-reveal="founder"]'),{opacity:[0,1],y:[30,0],duration:700,delay:stagger(125,{start:700}),ease:'out(4)'}));
    push(animate(root.querySelectorAll<HTMLElement>('[data-art-reveal="service"]'),{opacity:[0,1],y:[22,0],scale:[.97,1],duration:560,delay:stagger(65,{start:1050}),ease:'out(4)'}));
    push(animate(root.querySelectorAll<HTMLElement>('.mobile-art-founder-sheen'),{translateX:['-18%','18%'],duration:2600,delay:1200,ease:'inOutSine',loop:true,direction:'alternate'}));
    push(animate(root.querySelectorAll<HTMLElement>('.mobile-art-service-card'),{translateY:['0px','-4px'],duration:1900,delay:stagger(110,{start:1400}),ease:'inOutSine',loop:true,direction:'alternate'}));
    return ()=>{for(const animation of animations)animation.pause();};
  },[]);

  return <section ref={rootRef} className="mobile-art-hero" id="top" data-mobile-hero="true">
    <div className="mobile-art-content">
      <div className="mobile-art-intro">
        <div className="mobile-art-eyebrow" data-art-reveal="copy"><span/>BUILDING A BETTER DIGITAL WORLD</div>
        <h1><strong data-art-reveal="copy">MakeWebb</strong><em data-art-reveal="copy">Web. Android.<br/>Windows.</em><span data-art-reveal="copy">Ideas into<br/>real products.</span></h1>
        <p data-art-reveal="copy">We design and develop modern digital experiences with 3D, AI and next-gen technologies.</p>
        <div className="mobile-art-actions" data-art-reveal="copy"><a className="button primary" href="#configurator">Let's Build Together <ArrowUpRight size={15}/></a><a className="mobile-art-work" href="#work">View Our Work <ArrowDownRight size={15}/></a></div>
        <div className="mobile-art-trust" data-art-reveal="copy"><small>TRUSTED BY INNOVATORS</small><div><span>Ⓝ Next.js</span><span>⚛ React</span><span>▣ Android</span><span>⊞ Windows</span></div></div>
      </div>
      <MobileMWObject/>
      <div className="mobile-art-founders" aria-label="MakeWebb founders">{founders.map((person,index)=><div key={person.name} data-art-reveal="founder"><MobileFounderCard person={person} index={index}/></div>)}</div>
      <div className="mobile-art-services" aria-label="MakeWebb services">{heroServices.map(([index,title,text,kind])=><a key={index} href="#services" className="mobile-art-service-card" data-art-reveal="service"><span className="mobile-art-service-index">{index}</span><MobileServiceVisual kind={kind as ServiceKind}/><strong>{title}</strong><small>{text}</small><ArrowUpRight className="mobile-art-service-arrow" size={14}/></a>)}</div>
    </div>
  </section>;
}
