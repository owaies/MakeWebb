'use client';

import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Globe2,
  Laptop,
  Linkedin,
  Mail,
  Menu,
  Move3d,
  Phone,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';

const people = [
  {
    name: 'Mohammed Owaies',
    role: 'AI / ML Engineer',
    image: '/team/owaies.jpg',
    github: 'https://github.com/owaies',
    linkedin: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398',
    portfolio: 'https://owaies-portfolio.base44.app',
    phone: '7619329863',
    email: 'owaies786@gmail.com',
    tag: 'AI · ML · Engineering',
  },
  {
    name: 'Mohammed Afaf Hassan',
    role: 'Web Developer',
    image: '/team/afaf.jpg',
    github: 'https://github.com/afaf-app',
    linkedin: 'https://www.linkedin.com/in/mansafaf',
    portfolio: 'https://afaf.base44.app',
    phone: '8073818817',
    email: 'kingahassan786@gmail.com',
    tag: 'Web · Frontend · Full-stack',
  },
];

const services = [
  { icon: Globe2, index: '01', title: 'Web Design & Development', text: 'High-impact websites and web apps with thoughtful UX, strong performance and a visual system built around your brand.' },
  { icon: Smartphone, index: '02', title: 'Android Applications', text: 'Native-feeling Android experiences, from product architecture and interface design to production-ready releases.' },
  { icon: Laptop, index: '03', title: 'Windows Applications', text: 'Focused desktop software for Windows, with practical workflows, clean interfaces and reliable engineering.' },
  { icon: BrainCircuit, index: '04', title: 'AI Integration', text: 'Useful AI features that fit the product: automation, intelligent search, assistants, recommendations and ML workflows.' },
];

const process = [
  ['01', 'Discover', 'Clarify the problem, audience, goals and technical constraints.'],
  ['02', 'Design', 'Turn the idea into an interface, interaction system and visual direction.'],
  ['03', 'Build', 'Engineer the product with clean architecture, responsive UI and real-world performance.'],
  ['04', 'Launch', 'Test, polish, deploy and keep improving from actual user feedback.'],
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`tilt-card ${className}`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setRotation({ x: -y * 10, y: x * 12 });
      }}
      onPointerLeave={() => setRotation({ x: 0, y: 0 })}
      style={{ transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><Move3d size={17} /></span>
          <span>MAKEWEBB</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Studio</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={16} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> DIGITAL PRODUCT STUDIO</div>
          <h1>We build digital<br /><em>worlds</em> that work.</h1>
          <p className="hero-text">Websites, Android apps, Windows software and AI-powered products. Designed with intent. Engineered for the real world.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Build something <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#work">Explore the studio <ArrowDownRight size={17} /></a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Interactive 3D MakeWebb workspace">
          <div className="stage-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <TiltCard className="workspace">
            <div className="workspace-top"><span>makewebb.studio</span><span className="live-dot">● LIVE</span></div>
            <div className="workspace-grid" />
            <div className="cube cube-a"><span /></div>
            <div className="cube cube-b"><span /></div>
            <div className="code-panel">
              <div className="code-line short" /><div className="code-line long" /><div className="code-line mid" />
              <div className="code-line tiny" /><div className="code-line long" />
            </div>
            <div className="mini-phone"><div className="phone-notch" /><div className="phone-screen"><span>MAKE</span><strong>WEBB</strong></div></div>
            <div className="workspace-footer"><span>WEB</span><span>ANDROID</span><span>WINDOWS</span><span>AI</span></div>
          </TiltCard>
          <div className="floating-chip chip-top"><Sparkles size={14} /> 3D / INTERACTION</div>
          <div className="floating-chip chip-bottom"><span className="mini-status" /> Available for new work</div>
        </div>
      </section>

      <div className="marquee"><div>WEB DESIGN <span>✦</span> ANDROID <span>✦</span> WINDOWS <span>✦</span> AI / ML <span>✦</span> PRODUCT ENGINEERING <span>✦</span> WEB DESIGN <span>✦</span> ANDROID <span>✦</span></div></div>

      <section className="section shell" id="services">
        <div className="section-head">
          <div><span className="section-number">01 / SERVICES</span><h2>One studio.<br /><span>Many surfaces.</span></h2></div>
          <p>From a sharp landing page to a full software product, we combine design thinking with practical engineering.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return <TiltCard className="service-card" key={service.index}>
              <div className="service-icon"><Icon size={22} /></div>
              <span className="service-index">{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="card-arrow"><ArrowUpRight size={18} /></span>
            </TiltCard>;
          })}
        </div>
      </section>

      <section className="section studio-section" id="work">
        <div className="shell">
          <div className="section-head studio-head">
            <div><span className="section-number">02 / THE STUDIO</span><h2>Two minds.<br /><span>One build system.</span></h2></div>
            <p>MakeWebb brings together AI/ML engineering and web development to move ideas from concept to shipped product.</p>
          </div>
          <div className="people-grid">
            {people.map((person) => <TiltCard className="person-card" key={person.name}>
              <div className="person-image-wrap"><img src={person.image} alt={person.name} className="person-image" /><div className="image-grid" /></div>
              <div className="person-info">
                <span className="person-tag">{person.tag}</span>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <div className="person-links">
                  <a href={person.portfolio} target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={14} /></a>
                  <a href={person.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
                  <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /></a>
                </div>
              </div>
            </TiltCard>)}
          </div>
        </div>
      </section>

      <section className="section shell" id="process">
        <div className="section-head"><div><span className="section-number">03 / PROCESS</span><h2>Ideas need<br /><span>a route.</span></h2></div><p>No mystery handoffs. Every project gets a visible path from first conversation to launch.</p></div>
        <div className="process-grid">
          {process.map(([num, title, text]) => <div className="process-item" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
        </div>
      </section>

      <section className="contact-section shell" id="contact">
        <div className="contact-card">
          <div className="contact-orb"><Code2 size={42} /><span /></div>
          <div className="contact-copy"><span className="section-number">04 / CONTACT</span><h2>Have an idea?<br /><em>Let's make it real.</em></h2><p>Tell us what you are building. We will figure out the best shape for it.</p></div>
          <div className="contact-actions">
            <a className="button primary" href="mailto:owaies786@gmail.com">Start with email <Mail size={17} /></a>
            <a className="contact-detail" href="tel:+917619329863"><Phone size={16} /> +91 76193 29863</a>
            <a className="contact-detail" href="mailto:kingahassan786@gmail.com"><Mail size={16} /> kingahassan786@gmail.com</a>
          </div>
        </div>
      </section>

      <footer className="footer shell"><span>© {new Date().getFullYear()} MAKEWEBB</span><span>BUILT WITH INTENT · INDIA</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
