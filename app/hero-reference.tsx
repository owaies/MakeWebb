'use client';

import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import HeroThreeScene from './hero-three-scene';

const builders = [
  { name:'Mohammed Owaies', role:'AI/ML Engineer', tag:'AI · ML · DATA', image:'/team/file_000000002d308211b0a2203107625baf.png', github:'https://github.com/owaies', linkedin:'https://www.linkedin.com/in/mohammed-owaies-507b4a398', portfolio:'https://owaies-portfolio.base44.app', phone:'7619329863', email:'owaies786@gmail.com', side:'PEOPLE · IDEAS · TECHNOLOGY · IMPACT' },
  { name:'Mohammed Afaf Hassan', role:'Web Developer', tag:'WEB · APPS · UI/UX', image:'/team/file_000000001c20821185b00fb24f8c0312.png', github:'https://github.com/afaf-app', linkedin:'https://www.linkedin.com/in/mansafaf', portfolio:'https://afaf.base44.app', phone:'8073818817', email:'kingahassan786@gmail.com', side:'MODERN · SCALABLE · BEAUTIFUL · TOGETHER' },
];

const services = [
  ['01','Web Design & Development','Modern, fast and scalable web experiences'],
  ['02','Android App Development','Powerful mobile apps for real users'],
  ['03','Windows App Development','Desktop apps with modern technology'],
  ['04','AI Integration','Smarter products with AI/ML'],
];

function BuilderCard({ person }: { person: typeof builders[number] }) {
  return <article className="hero-reference-side">
    <a href="#studio" className="side-image" data-cursor="VIEW"><img src={person.image} alt={person.name}/><span className="side-image-arrow">↗</span></a>
    <div className="side-content">
      <span className="side-tag">{person.tag}</span>
      <h3>{person.name}</h3>
      <p>{person.role}</p>
      <div className="side-contact"><span><Phone size={10}/>{person.phone}</span><span><Mail size={10}/>{person.email}</span></div>
      <div className="side-links"><a href={person.portfolio} target="_blank" rel="noreferrer" data-cursor="OPEN">Portfolio <ArrowUpRight size={10}/></a><a href={person.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><Github size={10}/> GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN"><Linkedin size={10}/> LinkedIn</a></div>
    </div>
    <span className="side-edge-copy">{person.side}</span>
  </article>;
}

export default function HeroReference(){
  return <>
    <section className="hero-reference-shell shell" id="top">
      <BuilderCard person={builders[0]}/>
      <div className="hero-reference-copy">
        <div className="eyebrow"><span className="pulse"/> BUILDING A BETTER DIGITAL WORLD</div>
        <h1>MakeWebb<br/><em>Web. Android. Windows.</em><br/><span>Ideas into real products.</span></h1>
        <p className="hero-text">We design and develop modern digital experiences with 3D, AI and next-gen technologies.</p>
        <div className="hero-actions hero-reference-actions"><a className="button primary" href="#configurator" data-cursor="OPEN">Let's Build Together <ArrowUpRight size={16}/></a><a className="text-link" href="#work" data-cursor="EXPLORE">View Our Work <ArrowDownRight size={16}/></a></div>
        <div className="hero-reference-stage"><HeroThreeScene/></div>
      </div>
      <BuilderCard person={builders[1]}/>
    </section>
    <div className="hero-service-strip shell">
      {services.map(([index,title,text]) => <a href="#services" className="hero-service-card" key={index} data-cursor="EXPLORE"><span className="service-mini-index">{index}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={14}/></a>)}
    </div>
  </>;
}
