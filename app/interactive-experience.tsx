'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Globe2, Laptop, Layers3, MousePointer2, Play, Smartphone, Sparkles, Terminal, Wand2, X } from 'lucide-react';

const services = [
  { icon: Globe2, index: '01', title: 'Websites', timeline: '2–6 weeks', tech: 'Next.js · React · TypeScript', text: 'High-impact websites and web apps with sharp UX, responsive systems and production-ready performance.', examples: 'Marketing sites, SaaS, e-commerce, dashboards' },
  { icon: Smartphone, index: '02', title: 'Android Apps', timeline: '4–10 weeks', tech: 'Kotlin · React Native · Firebase', text: 'Mobile products designed around real-world use, from flows and interfaces to release-ready builds.', examples: 'Consumer apps, internal tools, MVPs' },
  { icon: Laptop, index: '03', title: 'Windows Software', timeline: '4–12 weeks', tech: 'C# · .NET · Electron', text: 'Focused desktop software with practical workflows, clean interfaces and dependable engineering.', examples: 'Business tools, automation, operations software' },
  { icon: BrainCircuit, index: '04', title: 'AI Systems', timeline: '3–10 weeks', tech: 'Python · LLMs · ML · APIs', text: 'Useful AI features that belong inside the product instead of feeling bolted on.', examples: 'Assistants, search, recommendations, automation' },
  { icon: Layers3, index: '05', title: 'Interactive 3D', timeline: '2–8 weeks', tech: 'Three.js · WebGL · CSS 3D', text: 'Immersive interfaces with depth, motion and responsive 3D interactions.', examples: 'Product worlds, showcases, configurators' },
];

const projects = [
  { code: 'MW / 001', title: 'AI Job Tracker', type: 'AI PRODUCT', meta: 'Next.js · AI · Analytics', shape: 'project-cube', url: 'https://ai-job-application-tracker-rose.vercel.app' },
  { code: 'MW / 002', title: 'E-Examiner', type: 'EXAM PLATFORM', meta: 'Web App · Assessments · Exams', shape: 'project-ring', url: 'https://e-examiner.vercel.app/' },
  { code: 'MW / 003', title: 'World Object Detector', type: 'COMPUTER VISION', meta: 'Python · Vision · Detection', shape: 'project-orb', url: 'https://world-object-detector.netlify.app/' },
  { code: 'MW / 004', title: 'Silsila Burqa House', type: 'E-COMMERCE', meta: 'Web · Commerce · Product Experience', shape: 'project-grid', url: 'https://silsilaburqahouse.web.app' },
  { code: 'MW / 005', title: 'Hand Gesture Controller', type: 'COMPUTER VISION', meta: 'Python · Hand Tracking · Interaction', shape: 'project-cube', url: 'https://handgesturecontroller.netlify.app/' },
];

const technologies = ['Next.js', 'React', 'Python', 'AI / ML', 'Three.js', 'Supabase', 'TypeScript', 'Node.js'];

export function InteractiveHeroVisual() {
  const stage = useRef<HTMLDivElement>(null); const object = useRef<HTMLDivElement>(null); const [entered, setEntered] = useState(false); const dragging = useRef(false); const pointer = useRef({ x: 0, y: 0, rx: -12, ry: 24 });
  useEffect(() => {
    const node = stage.current; const target = object.current; if (!node || !target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animate('.hero-3d-core', { rotateZ: [0, 360], duration: 18000, loop: true, ease: 'linear' }); animate('.hero-3d-orbit', { rotateZ: [0, -360], duration: 12000, loop: true, ease: 'linear' }); animate('.hero-particle', { opacity: [0.2, 0.85], scale: [0.7, 1.35], duration: 1800, delay: stagger(90), alternate: true, loop: true, ease: 'inOutSine' });
    const onMove = (e: PointerEvent) => { if (dragging.current) { pointer.current.ry += (e.clientX - pointer.current.x) * 0.55; pointer.current.rx -= (e.clientY - pointer.current.y) * 0.55; } else { const r = node.getBoundingClientRect(); pointer.current.ry = 24 + ((e.clientX - r.left) / r.width - 0.5) * 22; pointer.current.rx = -12 + ((e.clientY - r.top) / r.height - 0.5) * -18; } pointer.current.x = e.clientX; pointer.current.y = e.clientY; target.style.transform = `rotateX(${pointer.current.rx}deg) rotateY(${pointer.current.ry}deg)`; };
    const onUp = () => { dragging.current = false; }; node.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); return () => { node.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, []);
  const enter = () => { setEntered(v => !v); if (object.current) animate(object.current, { scale: entered ? [1.08, 1] : [1, 1.08], duration: 650, ease: 'out(4)' }); };
  return <div ref={stage} className={`interactive-hero ${entered ? 'is-entered' : ''}`} onPointerDown={e => { dragging.current = true; pointer.current.x = e.clientX; pointer.current.y = e.clientY; }} data-cursor="DRAG">
    <div className="hero-particle-field" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i className="hero-particle" key={i} style={{ '--i': i } as React.CSSProperties} />)}</div><div className="hero-3d-orbit orbit-a"/><div className="hero-3d-orbit orbit-b"/>
    <div ref={object} className="hero-3d-object"><div className="hero-3d-core"><span className="core-face face-front">MW</span><span className="core-face face-back">3D</span><span className="core-face face-right">AI</span><span className="core-face face-left">WEB</span><span className="core-face face-top">BUILD</span><span className="core-face face-bottom">∞</span></div><div className="hero-3d-shadow"/></div>
    <div className="hero-3d-label label-one"><Sparkles size={13}/> DEPTH / 03</div><div className="hero-3d-label label-two"><MousePointer2 size={13}/> DRAG TO ROTATE</div><button className="enter-experience" onClick={enter} data-cursor="VIEW">{entered ? <X size={15}/> : <Play size={15}/>} {entered ? 'EXIT EXPERIENCE' : 'ENTER EXPERIENCE'} <ArrowUpRight size={14}/></button>
  </div>;
}

export function ServicesExplorer() {
  const [active, setActive] = useState(0); const item = services[active]; const Icon = item.icon;
  return <div className="services-explorer"><div className="service-selector">{services.map((s, i) => { const SIcon = s.icon; return <button key={s.index} className={i === active ? 'active' : ''} onClick={() => setActive(i)} data-cursor="EXPLORE"><span>{s.index}</span><SIcon size={17}/><strong>{s.title}</strong><ArrowUpRight size={15}/></button>; })}</div><div className="service-detail"><div className="service-detail-top"><div className="service-detail-icon"><Icon size={27}/></div><span>{item.index} / SERVICE MODULE</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="service-meta"><div><small>CAPABILITIES / EXAMPLES</small><strong>{item.examples}</strong></div><div><small>TECHNOLOGY</small><strong>{item.tech}</strong></div><div><small>EST. TIMELINE</small><strong>{item.timeline}</strong></div></div><div className="service-detail-footer"><span>MODULE READY</span><span className="service-online">● ONLINE</span></div></div></div>;
}

export function ProjectGallery() {
  const [active, setActive] = useState(0); const project = projects[active];
  return <div className="project-showcase"><div className="project-list">{projects.map((p, i) => <button key={p.code} className={i === active ? 'active' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} data-cursor="VIEW"><span>{p.code}</span><strong>{p.title}</strong><small>{p.type}</small><ArrowUpRight size={16}/></button>)}</div><div className="project-stage"><div className={`project-object ${project.shape}`}><span>{String(active + 1).padStart(2, '0')}</span></div><div className="project-stage-copy"><span>{project.code} / SELECTED</span><h3>{project.title}</h3><p>{project.meta}</p><a className="project-case-study" href={project.url} target="_blank" rel="noreferrer" data-cursor="OPEN">VIEW PROJECT <ArrowUpRight size={14}/></a></div></div></div>;
}

export function TechStackOrbit() {
  const [active, setActive] = useState('MAKEWEBB');
  return <div className="tech-orbit-wrap"><div className="tech-orbit-scene"><div className="tech-orbit-ring ring-one"/><div className="tech-orbit-ring ring-two"/><div className="tech-core"><Cpu size={22}/><strong>{active}</strong><small>BUILD SYSTEM</small></div>{technologies.map((tech, i) => <button key={tech} className="tech-node" style={{ '--angle': `${i * 45}deg`, '--radius': `${150 + (i % 2) * 28}px` } as React.CSSProperties} onMouseEnter={() => setActive(tech)} onFocus={() => setActive(tech)} data-cursor="EXPLORE">{tech}</button>)}</div><div className="tech-orbit-copy"><span>STACK / ORBIT</span><h3>Tools orbit the idea.</h3><p>Hover a technology to bring it into focus. The stack moves, but the center stays the same: the product.</p><div><Wand2 size={15}/> RESPONSIVE TO POINTER</div></div></div>;
}

export function BuildStatusTerminal() {
  const terminal = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!terminal.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; animate('.terminal-cursor', { opacity: [1, 0], duration: 650, alternate: true, loop: true, ease: 'linear' }); animate('.terminal-progress', { width: ['0%', '100%'], duration: 3600, ease: 'inOutQuad' }); }, []);
  return <div ref={terminal} className="build-terminal"><div className="terminal-bar"><span><Terminal size={14}/> MAKEWEBB / SYSTEM</span><span>LOCAL · SECURE</span></div><div className="terminal-body"><div className="terminal-command"><span className="terminal-green">$</span> makewebb build --production</div><div className="terminal-log"><p><b>01</b> <i>✓</i> initializing project architecture...</p><p><b>02</b> <i>✓</i> composing interaction system...</p><p><b>03</b> <i>✓</i> optimizing responsive UI...</p><p><b>04</b> <i>✓</i> preparing deployment pipeline...</p></div><div className="terminal-progress-track"><span className="terminal-progress"/></div><div className="terminal-status"><span>SYSTEM STATUS</span><strong><i/> ONLINE</strong></div><div className="terminal-prompt"><span>makewebb@studio:~$</span> ready<span className="terminal-cursor">▋</span></div></div></div>;
}
