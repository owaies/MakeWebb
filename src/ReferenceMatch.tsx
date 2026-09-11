import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { InfiniteCarousel3D } from './components/InfiniteCarousel3D';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tech: string;
  url: string;
}

const projects: ProjectItem[] = [
  { id: '01', title: 'AI JOB TRACKER', category: 'AI PRODUCT', tech: 'Next.js · AI · Analytics', url: 'https://ai-job-application-tracker-rose.vercel.app' },
  { id: '02', title: 'E-EXAMINER', category: 'EXAM PLATFORM', tech: 'Web App · Assessments · Exams', url: 'https://e-examiner.vercel.app/' },
  { id: '03', title: 'WORLD OBJECT DETECTOR', category: 'COMPUTER VISION', tech: 'Python · Vision · Detection', url: 'https://world-object-detector.netlify.app/' },
  { id: '04', SILSILA: 'SILSILA BURQA HOUSE', title: 'SILSILA BURQA HOUSE', category: 'E-COMMERCE', tech: 'Web · Commerce · Product Experience', url: 'https://silsilaburqahouse.web.app' } as any,
  { id: '05', title: 'HAND GESTURE CONTROLLER', category: 'COMPUTER VISION', tech: 'Python · Hand Tracking · Interaction', url: 'https://handgesturecontroller.netlify.app/' },
];

const skills = [
  'AI',
  'MACHINE LEARNING',
  'DATA',
  'WEB',
  'APPS',
  'UI/UX',
  'COMPUTER VISION',
  'INTERACTIVE EXPERIENCES',
];

const technologies = [
  'AI',
  'ML',
  'DATA',
  'PYTHON',
  'NEXT.JS',
  'REACT',
  'JAVASCRIPT',
  'COMPUTER VISION',
  'UI/UX',
  'WEB',
  'APPS',
  'AUTOMATION',
];

// Motion animation variants for scroll reveals
const revealVariant = {
  hidden: { opacity: 0, y: 35 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const headlineReveal = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const deviceCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function usePointer(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 24 });
  const sy = useSpring(y, { stiffness: 80, damping: 24 });

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e: MouseEvent) => {
      x.set((e.clientX / Math.max(1, window.innerWidth) - 0.5) * 20);
      y.set((e.clientY / Math.max(1, window.innerHeight) - 0.5) * 14);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, x, y]);

  return [sx, sy] as const;
}

function Device({ i, interactive = true }: { i: number; interactive?: boolean }) {
  return (
    <motion.div
      custom={i}
      variants={deviceCardVariants}
      className={`ref-device d${i}`}
      whileHover={
        interactive
          ? {
              y: -18,
              rotateY: i === 1 ? 0 : i === 0 ? -6 : 6,
              rotateZ: i === 0 ? -3 : 3,
              transition: { duration: 0.35, ease: 'easeOut' },
            }
          : undefined
      }
    >
      <div className="device-screen">
        <small>{i === 1 ? 'MAKEWEBB' : `MW / 00${i}`}</small>
        <b>{i === 1 ? 'SYSTEMS THAT ANSWER FIRST' : i === 2 ? 'E-EXAMINER' : 'INTELLIGENT'}</b>
        <span />
      </div>
    </motion.div>
  );
}

function Chrome() {
  return (
    <motion.div
      className="ref-chrome"
      initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        rotateZ: [0, 5, -4, 0],
        rotateX: [0, 8, -6, 0],
        y: [0, -16, 0],
      }}
      // continuous floating animation
      style={{
        transition: 'transform 8s ease-in-out infinite',
      }}
    >
      <div />
    </motion.div>
  );
}

function Founder({
  name,
  role,
  focus,
  img,
  portfolio,
  github,
  linkedin,
  email,
  phone,
  index,
}: {
  name: string;
  role: string;
  focus: string;
  img: string;
  portfolio: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  index: number;
}) {
  return (
    <motion.article
      className="ref-founder"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="founder-image">
        <img src={img} alt={name} loading="lazy" />
      </div>
      <div className="founder-info">
        <span className="ref-meta">FOUNDER</span>
        <h3>{name}</h3>
        <p>
          {role} · {focus}
        </p>
        <div>
          <a href={portfolio} target="_blank" rel="noreferrer">
            PORTFOLIO ↗
          </a>
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={14} />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={14} />
          </a>
          <a href={`mailto:${email}`} aria-label="Email">
            <Mail size={14} />
          </a>
          <a href={`tel:${phone}`} aria-label="Phone">
            <Phone size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}



export default function ReferenceMatch() {
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [mx, my] = usePointer(interactive);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const m = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setInteractive(m.matches);
    sync();
    m.addEventListener?.('change', sync);
    return () => m.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener('keydown', esc);
    };
  }, [menu]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72),
      behavior: 'smooth',
    });
    setMenu(false);
  };

  return (
    <div className="match-page">
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="match-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span>MW</span>
              <b>MAKEWEBB</b>
              <small>DIGITAL PRODUCT STUDIO</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glass Navigation */}
      <motion.header
        className="match-nav"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={interactive ? { x: mx, y: my } : undefined}
      >
        <button onClick={() => go('hero')} className="brand" aria-label="MakeWebb home">
          <span>MW</span>MAKEWEBB
        </button>
        <nav>
          {[
            ['projects', 'WORK'],
            ['capabilities', 'CAPABILITIES'],
            ['founders', 'FOUNDERS'],
            ['contact', 'CONTACT'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="nav-start" onClick={() => go('contact')}>
          GET STARTED
        </button>
        <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">
          <Menu size={16} />
        </button>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="match-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => setMenu(false)} aria-label="Close menu">
              <X />
            </button>
            <div>
              {['projects', 'capabilities', 'founders', 'contact'].map((x, idx) => (
                <motion.button
                  key={x}
                  onClick={() => go(x)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.3 }}
                >
                  {x.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO SECTION */}
        <section id="hero" className="match-hero">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                },
              }}
            >
              <motion.span variants={revealVariant} className="ref-meta white">
                MW / 001 · DIGITAL PRODUCT STUDIO
              </motion.span>

              <motion.h1 variants={headlineReveal}>
                SYSTEMS THAT
                <br />
                <em>ANSWER FIRST.</em>
              </motion.h1>

              <motion.p variants={revealVariant}>
                Intelligent products, web experiences and data systems built for the next layer of
                the web.
              </motion.p>

              <motion.div variants={revealVariant}>
                <button onClick={() => go('projects')}>VIEW WORK ↗</button>
                <button onClick={() => go('founders')}>MEET THE FOUNDERS ↓</button>
              </motion.div>
            </motion.div>

            <motion.div
              className="device-stage"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={interactive ? { x: mx, y: my } : undefined}
            >
              <Device i={0} interactive={interactive} />
              <Device i={1} interactive={interactive} />
              <Device i={2} interactive={interactive} />
            </motion.div>
          </div>

          <motion.div
            className="star"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            ✦
          </motion.div>

          <motion.div
            className="hero-bottom ref-meta white"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span>AI · WEB · DATA · EXPERIENCE</span>
            <span>SCROLL / EXPLORE</span>
          </motion.div>
        </section>

        {/* 2. 3D INFINITE CARD CAROUSEL (SELECTED WORK / FLAGSHIP SYSTEMS) */}
        <InfiniteCarousel3D onExploreClick={() => go('manifesto')} />

        {/* 3. MANIFESTO SECTION */}
        <section id="manifesto" className="match-light manifesto">
          <motion.span
            className="ref-meta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            MW / 003 · STUDIO
          </motion.span>

          <div className="manifesto-copy">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              WE DON'T JUST
              <br />
              BUILD WEBSITES.
            </motion.h2>

            <motion.div
              className="manifesto-devices"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <Device i={0} interactive={interactive} />
              <Device i={1} interactive={interactive} />
              <Device i={2} interactive={interactive} />
            </motion.div>
          </div>
        </section>

        {/* 3. CAPABILITIES SECTION */}
        <section id="capabilities" className="match-dark capability">
          <motion.span
            className="ref-meta white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            MW / 003 · CAPABILITIES
          </motion.span>

          <motion.div
            className="cap-head"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            BEYOND
            <br />
            <span>EVERY LIMIT.</span>
          </motion.div>

          <div className="cap-grid">
            {skills.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  transition: { duration: 0.2 },
                }}
              >
                <small>0{i + 1}</small>
                <b>{s}</b>
                <span>{i % 2 ? 'SYSTEMS' : 'PRODUCT'} · 2026</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. FOUNDERS SECTION */}
        <section id="founders" className="match-light founders">
          <motion.span
            className="ref-meta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            MW / 005 · FOUNDERS
          </motion.span>

          <div className="founder-grid">
            <Founder
              index={0}
              name="MOHAMMED OWAIES"
              role="AI / ML ENGINEER"
              focus="AI · ML · DATA"
              img="/founders/owaies.jpg"
              portfolio="https://owaies-portfolio.base44.app"
              github="https://github.com/owaies"
              linkedin="https://www.linkedin.com/in/mohammed-owaies-507b4a398"
              email="owaies786@gmail.com"
              phone="7619329863"
            />
            <Founder
              index={1}
              name="MOHAMMED AFAF HASSAN"
              role="WEB DEVELOPER"
              focus="WEB · APPS · UI/UX"
              img="/founders/afaf.jpg"
              portfolio="https://afaf.base44.app"
              github="https://github.com/afaf-app"
              linkedin="https://www.linkedin.com/in/mansafaf"
              email="kingahassan786@gmail.com"
              phone="8073818817"
            />
          </div>
        </section>

        {/* 6. STATEMENT SECTION */}
        <section id="statement" className="match-dark statement">
          <motion.span
            className="ref-meta white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            MW / 006 · STUDIO
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 },
              },
            }}
          >
            <motion.span
              style={{ display: 'block' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              BUILD
            </motion.span>
            <motion.span
              style={{ display: 'block', color: '#9b61ed' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              BEYOND
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              EVERY LIMIT.
            </motion.span>
          </motion.h2>
        </section>

        {/* 7. TECHNOLOGY CONSTELLATION SECTION */}
        <section id="technology" className="match-purple tech">
          <motion.span
            className="ref-meta white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            MW / 007 · TECHNOLOGY
          </motion.span>

          <div>
            {technologies.map((x, idx) => (
              <motion.b
                key={x}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  color: '#ffffff',
                  transition: { duration: 0.2 },
                }}
              >
                {x}
              </motion.b>
            ))}
          </div>
        </section>

        {/* 8. CONTACT / CTA SECTION */}
        <section id="contact" className="match-cta">
          <motion.div
            className="cta-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
          >
            <motion.span variants={revealVariant} className="ref-meta white">
              MW / 008 · CONTACT
            </motion.span>

            <motion.h2 variants={headlineReveal}>
              BUILD BEYOND
              <br />
              <em>EVERY LIMIT.</em>
            </motion.h2>

            <motion.p variants={revealVariant}>
              Have an idea? Let's build the experience it deserves.
            </motion.p>

            <motion.div variants={revealVariant}>
              <button
                onClick={() => (window.location.href = 'mailto:owaies786@gmail.com')}
                style={{ cursor: 'pointer' }}
              >
                START A PROJECT ↗
              </button>
            </motion.div>
          </motion.div>

          <Chrome />
        </section>

        {/* 9. FOOTER */}
        <motion.footer
          className="match-footer"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <b>MAKEWEBB</b>
          <span>DIGITAL PRODUCT STUDIO</span>
          <span>AI · WEB · DATA · EXPERIENCE</span>
          <span>© 2026 MAKEWEBB</span>
        </motion.footer>
      </main>
    </div>
  );
}
