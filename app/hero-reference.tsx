'use client';

import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { InteractiveHeroVisual } from './interactive-experience';

const builders = [
  { name:'Mohammed Owaies', role:'AI / ML Engineer', tag:'AI · ML · ENGINEERING', image:'/team/file_000000002d308211b0a2203107625baf.png', github:'https://github.com/owaies', linkedin:'https://www.linkedin.com/in/mohammed-owaies-507b4a398' },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', tag:'WEB · FRONTEND · FULL-STACK', image:'/team/file_000000001c20821185b00fb24f8c0312.png', github:'https://github.com/afaf-app', linkedin:'https://www.linkedin.com/in/mansafaf' },
];

const services = [
  ['01','Websites','Fast, responsive digital products'],
  ['02','Android Apps','Mobile experiences built to ship'],
  ['03','Windows Software','Focused desktop applications'],
  ['04','AI / ML','Intelligence that solves real problems'],
];

function BuilderCard({ person }: { person: typeof builders[number] }) {
  return <article className="hero-reference-side">
    <a href="#studio" className="side-image" data-cursor="VIEW"><img src={person.image} alt={person.name}/></a>
    <div className="side-content">
      <span className="side-tag">{person.tag}</span>
      <h3>{person.name}</h3>
      <p>{person.role}</p>
      <div className="side-links"><a href={person.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><Github size={11}/> GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN"><Linkedin size={11}/> LinkedIn</a></div>
    </div>
  </article>;
}

export default function HeroReference(){
  return <>
    <section className="hero-reference-shell shell" id="top">
      <BuilderCard person={builders[0]}/>
      <div className="hero-reference-copy">
        <div className="eyebrow"><span className="pulse"/> DIGITAL PRODUCT STUDIO</div>
        <h1>MakeWebb<br/><em>builds ideas.</em></h1>
        <p className="hero-text">Websites, Android apps, Windows software and AI-powered products. Designed with intent. Engineered for the real world.</p>
        <div className="hero-actions hero-reference-actions"><a className="button primary" href="#configurator" data-cursor="OPEN">Let's build together <ArrowUpRight size={16}/></a><a className="text-link" href="#work" data-cursor="EXPLORE">View our work <ArrowDownRight size={16}/></a></div>
        <div className="hero-reference-stage"><InteractiveHeroVisual/></div>
      </div>
      <BuilderCard person={builders[1]}/>
    </section>
    <div className="hero-service-strip shell">
      {services.map(([index,title,text]) => <a href="#services" className="hero-service-card" key={index} data-cursor="EXPLORE"><span className="service-mini-index">{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={14}/></a>)}
    </div>
  </>;
}
