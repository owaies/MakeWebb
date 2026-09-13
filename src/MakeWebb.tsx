import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bot, Braces, Globe2, Github, Linkedin, Mail, Phone, Globe, Menu, X } from 'lucide-react';

const company = {
  name: 'MakeWebb',
  email: 'hello.makewebb@gmail.com',
  github: 'https://github.com/owaies/MakeWebb',
  website: 'https://makewebb.vercel.app/',
};
const services = [
  { id: '01', title: 'Websites', blurb: 'Fast, animated, SEO-ready sites built to convert.', tags: ['React', 'Motion', 'SEO'] },
  { id: '02', title: 'Applications', blurb: 'Product-grade web and mobile apps with real data.', tags: ['Web Apps', 'Dashboards', 'Mobile'] },
  { id: '03', title: 'AI Integration', blurb: 'Assistants, vision, search and generation in production.', tags: ['LLMs', 'Vision', 'RAG'] },
  { id: '04', title: 'Automation', blurb: 'Agents and workflows that remove repetitive work.', tags: ['Workflows', 'Agents', 'Data'] },
];
const founders = [
  { name: 'Mohammed Owaies', role: 'AI / ML Engineer', focus: 'AI · ML · DATA', image: '/founders/owaies.jpg', portfolio: 'https://owaies-portfolio.base44.app', github: 'https://github.com/owaies', linkedin: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398', email: 'owaies786@gmail.com', phone: '7619329863' },
  { name: 'Mohammed Afaf Hassan', role: 'Web Developer', focus: 'WEB · APPS · UI/UX', image: '/founders/afaf.jpg', portfolio: 'https://afaf.base44.app', github: 'https://github.com/afaf-app', linkedin: 'https://www.linkedin.com/in/mansafaf', email: 'kingahassan786@gmail.com', phone: '8073818817' },
];
const projects = [
  { code: 'MW / 001', name: 'AI Job Tracker', type: 'AI PRODUCT', tech: 'Next.js · AI · Analytics', url: 'https://ai-job-application-tracker-rose.vercel.app' },
  { code: 'MW / 002', name: 'E-Examiner', type: 'EXAM PLATFORM', tech: 'Web App · Assessments · Exams', url: 'https://e-examiner.vercel.app/' },
  { code: 'MW / 003', name: 'World Object Detector', type: 'COMPUTER VISION', tech: 'Python · Vision · Detection', url: 'https://world-object-detector.netlify.app/' },
  { code: 'MW / 004', name: 'Silsila Burqa House', type: 'E-COMMERCE', tech: 'Web · Commerce · Product Experience', url: 'https://silsilaburqahouse.web.app' },
  { code: 'MW / 005', name: 'Hand Gesture Controller', type: 'COMPUTER VISION', tech: 'Python · Hand Tracking · Interaction', url: 'https://handgesturecontroller.netlify.app/' },
];

function AppLink({ to, children, className = '', onClick }: { to: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const internal = to.startsWith('/');
  if (!internal) return <a href={to} className={className}>{children}</a>;
  return <a href={to} className={className} onClick={(e) => { e.preventDefault(); history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); onClick?.(); }}>{children}</a>;
}

function usePath() {
  const [path, setPath] = useState(() => window.location.pathname || '/');
  useEffect(() => { const onPop = () => setPath(window.location.pathname || '/'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  return path;
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
function RevealWords({ text }: { text: string }) {
  return <>{text.split(' ').map((word, i) => <motion.span key={`${word}-${i}`} className="inline-block mr-[0.22em]" initial={{ opacity: 0, y: '70%' }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: i * .04, ease: [0.16, 1, .3, 1] }}>{word}</motion.span>)}</>;
}
function TiltCard({ children, className = '', intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const enabled = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return <motion.div ref={ref} className={className} animate={{ rotateX: rotate.x, rotateY: rotate.y }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} onMouseMove={enabled ? (e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; setRotate({ x: -((e.clientY-r.top)/r.height-.5)*intensity, y: ((e.clientX-r.left)/r.width-.5)*intensity }); } : undefined} onMouseLeave={() => setRotate({x:0,y:0})}>{children}</motion.div>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [['/services','Services'], ['/work','Work'], ['/team','Team'], ['/contact','Contact']];
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <>
    <header className="lv-nav"><AppLink to="/" className="lv-brand"><span>MW</span><b>MAKEWEBB</b></AppLink><nav>{links.slice(0,3).map(([to,label]) => <AppLink key={to} to={to}>{label}</AppLink>)}</nav><AppLink to="/contact" className="lv-start">GET STARTED</AppLink><button className="lv-menu" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={19}/></button></header>
    {open && <motion.div className="lv-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="lv-close" onClick={() => setOpen(false)}><X/></button><div>{[['/','Home'], ...links].map(([to,label],i) => <motion.div key={to} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:i*.05}}><AppLink to={to} onClick={() => setOpen(false)}>{label}</AppLink></motion.div>)}</div></motion.div>}
  </>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] });
  const y = useTransform(scrollYProgress,[0,1],[0,120]); const fade = useTransform(scrollYProgress,[0,.8],[1,0]); const cardY = useTransform(scrollYProgress,[0,1],[0,-80]);
  return <section ref={ref} className="lv-hero"><div className="lv-hero-grid"><motion.div style={{y,opacity:fade}}><p className="lv-kicker">INDEPENDENT DIGITAL STUDIO</p><h1><RevealWords text="MakeWebb"/><em><RevealWords text="builds what moves"/></em></h1><Reveal delay={.25}><p className="lv-lead">We design and engineer websites, applications, AI integrations and automation, end to end.</p></Reveal><Reveal delay={.4} className="lv-actions"><AppLink to="/contact" className="lv-light-btn">START A PROJECT <ArrowRight size={15}/></AppLink><AppLink to="/work" className="lv-dark-btn">SEE OUR WORK</AppLink></Reveal><Reveal delay={.55}><div className="lv-proof"><i/><i/> <span>Two founders · 5 shipped products</span></div></Reveal></motion.div><motion.div style={{y:cardY}}><TiltCard className="lv-hero-card"><div className="lv-live"><span>LIVE BUILD</span><span>● SHIPPING</span></div><div className="lv-hero-visual"><div/><b>SHIP AN AI-POWERED PRODUCT</b></div><div className="lv-bars">{[1,2,3,4].map(i=><i key={i}/>)}</div><strong>Design → Build → Automate</strong><small>Typical first release in 2–4 weeks.</small></TiltCard></motion.div></div><div className="lv-bottom"><span>WEB · APPS · AI · AUTOMATION</span><span>SCROLL TO EXPLORE ↓</span></div></section>;
}

function Marquee(){ const items=['WEB','APPS','AI INTEGRATION','AUTOMATION','UI/UX','DATA']; return <div className="lv-marquee"><motion.div animate={{x:['0%','-50%']}} transition={{duration:20,repeat:Infinity,ease:'linear'}}>{[...items,...items,...items].map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</motion.div></div> }

function Services(){ return <section className="lv-section"><Reveal><p className="lv-meta">WHAT WE DO</p><h2 className="lv-big">Four disciplines, one team</h2></Reveal><div className="lv-service-grid">{services.map((s,i)=><Reveal key={s.id} delay={i*.07}><TiltCard className="lv-card"><small>{s.id}</small><h3>{s.title}</h3><p>{s.blurb}</p><div>{s.tags.map(t=><span key={t}>{t}</span>)}</div></TiltCard></Reveal>)}</div></section> }

const positions = [
 {x:['-80vw','-31vw','-31vw','-23vw','-24vw'],y:['44vh','4vh','4vh','-4vh','2vh'],ry:[-75,-18,18,-12,-24],rz:[-14,-6,3,-4,-7],s:[.68,.88,1,.92,.86]},
 {x:['0vw','0vw','0vw','1vw','3vw'],y:['55vh','-2vh','-2vh','3vh','-4vh'],ry:[0,4,-5,9,13],rz:[0,0,-2,2,3],s:[.72,1.05,1.08,1.02,1.04]},
 {x:['80vw','31vw','31vw','25vw','26vw'],y:['44vh','5vh','5vh','-3vh','3vh'],ry:[75,18,-18,14,25],rz:[14,6,-3,5,8],s:[.68,.88,1,.94,.88]},
];
function ScrollStory(){
  const sectionRef=useRef<HTMLElement>(null); const {scrollYProgress}=useScroll({target:sectionRef,offset:['start start','end end']}); const reduced=useReducedMotion(); const [light,setLight]=useState(false);
  const darkOpacity=useTransform(scrollYProgress,[.48,.63],[1,0]); const line1=useTransform(scrollYProgress,[.24,.54],['75vw','-155vw']); const line1o=useTransform(scrollYProgress,[.2,.28,.49,.56],[0,1,1,0]); const line2=useTransform(scrollYProgress,[.65,.94],['70vw','-170vw']); const line2o=useTransform(scrollYProgress,[.62,.7,.9,.96],[0,1,1,0]); const cards=useTransform(scrollYProgress,[0,.08,.93,.99],[0,1,1,0]);
  useMotionValueEvent(scrollYProgress,'change',v=>setLight(v>=.59));
  if(reduced) return <section className="lv-story-static"><div className="lv-section"><p className="lv-meta">BUILT ACROSS EVERY LAYER</p><h2 className="lv-big">We build what moves businesses forward.</h2></div></section>;
  return <section ref={sectionRef} className="lv-story"><div className="lv-story-sticky"><div className="lv-story-light"/><motion.div className="lv-story-dark" style={{opacity:darkOpacity}}/><div className="lv-story-intro"><p>MAKEWEBB STUDIO SYSTEM</p><h2>One team. Every layer.</h2></div><motion.p className="lv-runner white" style={{x:line1,opacity:line1o}}>WE BUILD WHAT MOVES</motion.p><motion.p className="lv-runner black" style={{x:line2,opacity:line2o}}>DESIGN THAT SHIPS</motion.p><motion.div className="lv-story-cards" style={{opacity:cards}}>{positions.map((p,i)=>{const x=useTransform(scrollYProgress,[.08,.25,.48,.7,.9],p.x);const y=useTransform(scrollYProgress,[.08,.25,.48,.7,.9],p.y);const ry=useTransform(scrollYProgress,[.08,.25,.48,.7,.9],p.ry);const rz=useTransform(scrollYProgress,[.08,.25,.48,.7,.9],p.rz);const s=useTransform(scrollYProgress,[.08,.25,.48,.7,.9],p.s);const Icon=[Globe2,Braces,Bot][i];return <motion.article key={i} className={`lv-story-card c${i}`} style={{x,y,rotateY:ry,rotateZ:rz,scale:s}}><div className="lv-story-pill">{services[i].id}<span>MW / 0{i+1}</span></div><div><Icon/><h3>{light?projects[i].name:services[i].title}</h3><p>{light?projects[i].tech:services[i].blurb}</p></div></motion.article>})}</motion.div><div className="lv-story-action"><AppLink to="/work">EXPLORE OUR WORK <ArrowUpRight size={15}/></AppLink></div><div className="lv-progress"><span>01</span><i/><span>05</span></div></div></section>;
}

function Work(){return <main><section className="lv-page-hero"><p>SELECTED WORK</p><h1><RevealWords text="Things we"/><em><RevealWords text="actually shipped"/></em></h1></section><section className="lv-section"><div className="lv-work-grid">{projects.map((p,i)=><Reveal key={p.code} delay={i*.06}><TiltCard className="lv-card lv-project"><a href={p.url} target="_blank" rel="noreferrer"><div className={`lv-project-visual pv${i}`}><span>{p.type}</span></div><small>{p.code}</small><h2>{p.name}</h2><p>{p.tech}</p><ArrowUpRight className="lv-project-arrow"/></a></TiltCard></Reveal>)}</div></section></main>}
function ServicesPage(){return <main><section className="lv-page-hero"><p>SERVICES</p><h1><RevealWords text="Everything from"/><em><RevealWords text="idea to uptime"/></em></h1></section><section className="lv-section"><div className="lv-service-grid">{services.map((s,i)=><Reveal key={s.id} delay={i*.06}><TiltCard className="lv-card"><small>{s.id}</small><h2>{s.title}</h2><p>{s.blurb}</p><div>{s.tags.map(t=><span key={t}>{t}</span>)}</div></TiltCard></Reveal>)}</div><h2 className="lv-big lv-process-title">How we work</h2><div className="lv-process">{['Scope','Design','Build','Run'].map((x,i)=><div key={x}><small>0{i+1}</small><h3>{x}</h3><p>{['A short call, a written plan, a fixed price and timeline.','Interface and motion prototyped before product code.','Shipped in weekly slices you can click, not screenshots.','Deploy, monitor, automate and keep improving.'][i]}</p></div>)}</div></section></main>}
function Team(){return <main><section className="lv-page-hero"><p>FOUNDERS</p><h1><RevealWords text="Two people,"/><em><RevealWords text="zero handoffs"/></em></h1></section><section className="lv-section"><div className="lv-team-grid">{founders.map((f,i)=><Reveal key={f.name} delay={i*.1}><article className="lv-founder"><div className="lv-founder-img"><img src={f.image} alt={f.name}/></div><small>FOUNDER</small><h2>{f.name}</h2><p>{f.role} · {f.focus}</p><div className="lv-social"><a href={f.portfolio}>PORTFOLIO ↗</a><a href={f.github} target="_blank" rel="noreferrer"><Github/></a><a href={f.linkedin} target="_blank" rel="noreferrer"><Linkedin/></a><a href={`mailto:${f.email}`}><Mail/></a><a href={`tel:${f.phone}`}><Phone/></a></div></article></Reveal>)}</div></section></main>}
function Contact(){return <main><section className="lv-page-hero"><p>CONTACT</p><h1><RevealWords text="Tell us what"/><em><RevealWords text="you're building"/></em></h1><a className="lv-light-btn lv-contact-btn" href={`mailto:${company.email}`}><Mail size={15}/> {company.email}</a></section><section className="lv-section"><div className="lv-contact-grid"><TiltCard className="lv-card"><h2>Studio</h2><div className="lv-contact-links"><a href={`mailto:${company.email}`}><Mail/> {company.email}</a><a href={company.github}><Github/> github.com/owaies/MakeWebb</a><a href={company.website}><Globe/> makewebb.vercel.app</a></div><p>Send a few lines about the product, deadline and budget range. We'll reply with a plan, timeline and price.</p></TiltCard><TiltCard className="lv-card"><h2>Talk to a founder</h2>{founders.map(f=><div className="lv-contact-founder" key={f.name}><b>{f.name}</b><small>{f.role}</small><div><a href={`mailto:${f.email}`}>{f.email}</a><a href={`tel:${f.phone}`}>{f.phone}</a></div></div>)}</TiltCard></div></section></main>}
function Home(){return <main><Hero/><Marquee/><Services/><ScrollStory/><section className="lv-section"><Reveal><p className="lv-meta">SELECTED WORK</p><h2 className="lv-big">Shipped, not slides</h2></Reveal><div className="lv-list">{projects.slice(0,3).map(p=><a key={p.code} href={p.url} target="_blank" rel="noreferrer"><small>{p.code}</small><b>{p.name}</b><span>{p.tech}</span><ArrowUpRight/></a>)}</div></section><section className="lv-cta"><div><p>MAKEWEBB</p><h2>Let's build <em>it.</em></h2><p>Tell us what you're making. We'll come back with a plan, timeline and price.</p><AppLink to="/contact" className="lv-light-btn">GET STARTED <ArrowRight size={15}/></AppLink></div><div className="lv-orb"><i/></div></section></main>}
function Footer(){return <footer><b>MAKEWEBB</b><span>WEB · APPS · AI · AUTOMATION</span><span>© {new Date().getFullYear()} MAKEWEBB</span></footer>}

export default function LovableSite(){const path=usePath(); useEffect(()=>window.scrollTo({top:0,behavior:'auto'}),[path]); let page:ReactNode=<Home/>; if(path.startsWith('/services'))page=<ServicesPage/>; else if(path.startsWith('/work'))page=<Work/>; else if(path.startsWith('/team'))page=<Team/>; else if(path.startsWith('/contact'))page=<Contact/>; return <div className="lv-site"><Nav/>{page}<Footer/></div>}
