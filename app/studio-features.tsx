'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Github, Linkedin, Mail, MousePointer2, Palette, Rocket, Search, Sparkles, Wand2, Wrench } from 'lucide-react';
import { animate } from 'animejs';

const journey = [
  { num: '01', title: 'DISCOVER', text: 'Find the real problem, audience and outcome before a pixel is placed.', icon: Search, object: 'journey-compass' },
  { num: '02', title: 'DESIGN', text: 'Shape the experience into a clear interface, interaction and visual system.', icon: Palette, object: 'journey-diamond' },
  { num: '03', title: 'BUILD', text: 'Turn the system into reliable software with clean architecture and motion.', icon: Wrench, object: 'journey-cube' },
  { num: '04', title: 'LAUNCH', text: 'Ship, measure, polish and keep the product moving after release.', icon: Rocket, object: 'journey-orbit' },
];

const pipeline = ['IDEA', 'UX', 'FRONTEND', 'BACKEND', 'AI', 'DEPLOY'];

const skills = {
  'Mohammed Owaies': ['AI / ML', 'Python', 'LLMs', 'Computer Vision', 'Data', 'Engineering'],
  'Mohammed Afaf Hassan': ['React', 'Next.js', 'TypeScript', 'UI / UX', 'Frontend', 'Full-stack'],
};

const choices = ['Website', 'Android App', 'Windows App', 'AI Product', 'Other'];
const timelines = ['ASAP', '1 MONTH', '2–3 MONTHS'];

export function MakeWebbLogo({ mode = 'lime', compact = false }: { mode?: 'lime' | 'black' | 'white'; compact?: boolean }) {
  const color = mode === 'lime' ? 'var(--accent)' : mode === 'white' ? '#fff' : '#090909';
  const textColor = mode === 'black' ? '#090909' : '#f5f5f2';
  return (
    <div className={`makewebb-logo ${compact ? 'compact' : ''}`} style={{ color: textColor }} aria-label="MAKEWEBB">
      <svg className="makewebb-logo-icon" viewBox="0 0 64 64" role="img" aria-label="MAKEWEBB M W mark">
        <path d="M10 16 L19 16 L25 35 L32 16 L39 35 L45 16 L54 16 L45 48 L37 48 L32 31 L27 48 L19 48 Z" fill={color} />
        <path d="M16 25 L23 43 M48 25 L41 43" fill="none" stroke={mode === 'black' ? '#fff' : '#090909'} strokeWidth="3.2" strokeLinecap="round" opacity=".9" />
      </svg>
      {!compact && <span>MAKEWEBB</span>}
    </div>
  );
}

export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((node, i) => {
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(i);
      }, { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' });
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const item = journey[active];
  const Icon = item.icon;

  return (
    <div className="journey-shell">
      <div className="journey-rail" aria-hidden="true"><span style={{ height: `${((active + 1) / journey.length) * 100}%` }} /></div>
      <div className="journey-list">
        {journey.map((stage, i) => {
          const StageIcon = stage.icon;
          return <button ref={node => { refs.current[i] = node; }} className={`journey-stage ${i === active ? 'active' : ''}`} key={stage.num} onClick={() => setActive(i)} data-cursor="EXPLORE">
            <span className="journey-stage-num">{stage.num}</span>
            <span className="journey-stage-icon"><StageIcon size={18}/></span>
            <span className="journey-stage-copy"><strong>{stage.title}</strong><small>{stage.text}</small></span>
            {i < journey.length - 1 && <ArrowDown className="journey-down" size={15}/>} 
          </button>;
        })}
      </div>
      <div className="journey-visual" aria-live="polite">
        <div className={`journey-object ${item.object}`}><span>{item.num}</span><i/><b/></div>
        <div className="journey-visual-copy"><span>STAGE / {item.num}</span><h3>{item.title}</h3><p>{item.text}</p><div><Icon size={14}/> ACTIVE ROUTE</div></div>
      </div>
    </div>
  );
}

export function ArchitecturePipeline() {
  const [active, setActive] = useState(0);
  return <div className="architecture">
    <div className="architecture-line" aria-hidden="true"><span style={{ width: `${(active / (pipeline.length - 1)) * 100}%` }}/></div>
    <div className="architecture-nodes">
      {pipeline.map((name, i) => <button key={name} className={`architecture-node ${i === active ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} data-cursor="EXPLORE"><span className="architecture-node-index">0{i + 1}</span><span className="architecture-node-core">{i === 0 ? <Sparkles size={15}/> : i === pipeline.length - 1 ? <Rocket size={15}/> : <span/>}</span><strong>{name}</strong>{i < pipeline.length - 1 && <ArrowRight className="architecture-arrow" size={15}/>}</button>)}
    </div>
    <div className="architecture-status"><span>PIPELINE / {String(active + 1).padStart(2, '0')}</span><strong>{pipeline[active]}</strong><small>{active === 0 ? 'Define the product before the product defines itself.' : active === 1 ? 'Turn intent into flows, hierarchy and interaction.' : active === 2 ? 'Build the visible system with speed and restraint.' : active === 3 ? 'Make data, APIs and infrastructure dependable.' : active === 4 ? 'Add intelligence where it creates real leverage.' : 'Deploy, observe and keep improving.'}</small></div>
  </div>;
}

export function SkillConstellation({ person }: { person: string }) {
  const items = skills[person as keyof typeof skills] || [];
  return <div className="skill-constellation" aria-label={`${person} skills`}>{items.map((skill, i) => <span key={skill} style={{ '--x': `${50 + Math.cos(i * 1.05) * (28 + (i % 2) * 10)}%`, '--y': `${50 + Math.sin(i * 1.05) * (28 + (i % 2) * 10)}%` } as React.CSSProperties}>{skill}</span>)}<b>CORE</b></div>;
}

export function ProjectConfigurator() {
  const [product, setProduct] = useState('Website');
  const [budget, setBudget] = useState(125000);
  const [timeline, setTimeline] = useState('1 MONTH');
  const formatted = useMemo(() => budget >= 500000 ? '₹5L+' : `₹${Math.round(budget / 1000)}K`, [budget]);
  const summary = `Build a ${product.toLowerCase()} · ${formatted} · ${timeline}`;
  return <div className="configurator">
    <div className="config-head"><div><span>PROJECT CONFIGURATOR / 08</span><h3>What are you building?</h3></div><div className="config-live"><i/> CONFIG READY</div></div>
    <div className="config-body">
      <div className="config-group"><label>WHAT ARE YOU BUILDING?</label><div className="config-options">{choices.map(choice => <button key={choice} className={product === choice ? 'selected' : ''} onClick={() => setProduct(choice)} data-cursor="VIEW"><span>{product === choice ? <Check size={13}/> : <span/>}</span>{choice}</button>)}</div></div>
      <div className="config-group"><label>BUDGET <strong>{formatted}</strong></label><input aria-label="Project budget" type="range" min="25000" max="500000" step="5000" value={budget} onChange={e => setBudget(Number(e.target.value))}/><div className="range-labels"><span>₹25K</span><span>₹5L+</span></div></div>
      <div className="config-group"><label>TIMELINE</label><div className="config-options compact-options">{timelines.map(t => <button key={t} className={timeline === t ? 'selected' : ''} onClick={() => setTimeline(t)}><span>{timeline === t ? <Check size={13}/> : <span/>}</span>{t}</button>)}</div></div>
    </div>
    <div className="config-footer"><div><small>YOUR BUILD</small><strong>{summary}</strong></div><a className="button primary" href={`mailto:owaies786@gmail.com?subject=${encodeURIComponent(`MAKEWEBB project: ${product}`)}&body=${encodeURIComponent(`Hi MAKEWEBB,\n\nI want to build: ${product}\nBudget: ${formatted}\nTimeline: ${timeline}\n\nLet's discuss the project.`)}`} data-cursor="OPEN">BUILD MY PROJECT <ArrowRight size={16}/></a></div>
  </div>;
}

export function CursorContextBridge() {
  useEffect(() => {
    const cursor = document.querySelector('.anime-cursor') as HTMLElement | null;
    if (!cursor) return;
    const label = cursor.querySelector('span') as HTMLElement | null;
    if (!label) return;
    const enter = (e: Event) => { const target = e.currentTarget as HTMLElement; label.textContent = target.dataset.cursor || (target.tagName === 'A' ? 'OPEN' : 'VIEW'); cursor.classList.add('has-label'); };
    const leave = () => { label.textContent = ''; cursor.classList.remove('has-label'); };
    const targets = document.querySelectorAll<HTMLElement>('[data-cursor]');
    targets.forEach(target => { target.addEventListener('mouseenter', enter); target.addEventListener('mouseleave', leave); });
    return () => targets.forEach(target => { target.removeEventListener('mouseenter', enter); target.removeEventListener('mouseleave', leave); });
  });
  return null;
}

export const contactIconMap = { github: Github, linkedin: Linkedin, mail: Mail, pointer: MousePointer2, wand: Wand2 };
