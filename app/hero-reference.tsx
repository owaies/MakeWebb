'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import HeroThreeScene from './hero-three-scene-v2';

const services = [
  ['01','Web Design & Development','Modern, fast and scalable web experiences'],
  ['02','Android App Development','Powerful mobile apps for real users'],
  ['03','Windows App Development','Desktop apps with modern technology'],
  ['04','AI Integration','Smarter products with AI/ML'],
];

export default function HeroReference(){
  return <>
    <section className="hero-reference-shell shell" id="top">
      <div className="hero-reference-copy">
        <div className="eyebrow"><span className="pulse"/> BUILDING A BETTER DIGITAL WORLD</div>
        <h1>MakeWebb<br/><em>Web. Android. Windows.</em><br/><span>Ideas into real products.</span></h1>
        <p className="hero-text">We design and develop modern digital experiences with 3D, AI and next-gen technologies.</p>
        <div className="hero-actions hero-reference-actions"><a className="button primary" href="#configurator" data-cursor="OPEN">Let's Build Together <ArrowUpRight size={16}/></a><a className="text-link" href="#work" data-cursor="EXPLORE">View Our Work <ArrowDownRight size={16}/></a></div>
      </div>
      <div className="hero-reference-stage"><HeroThreeScene/></div>
    </section>
    <div className="hero-service-strip shell">
      {services.map(([index,title,text]) => <a href="#services" className="hero-service-card" key={index} data-cursor="EXPLORE"><span className="service-mini-index">{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={14}/></a>)}
    </div>
  </>;
}
