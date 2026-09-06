'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowDownRight, ArrowUpRight, Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import HeroThreeScene from './hero-r3f-scene';
import { founders, heroServices } from './hero-data';

function MobileFounderCard({ person }: { person: typeof founders[number] }) {
  return (
    <article className="mobile-founder-card">
      <div className="mobile-founder-photo">
        <Image src={person.image} alt={person.name} fill sizes="(max-width: 800px) calc(100vw - 32px), 390px" quality={82} />
        <span className="mobile-founder-label">{person.tag}</span>
        <span className="mobile-founder-corner" aria-hidden="true">↗</span>
      </div>
      <div className="mobile-founder-info">
        <span className="mobile-founder-badge">Co-Founder</span>
        <h2>{person.name}</h2>
        <p className="mobile-founder-role">{person.role}</p>
        <p className="mobile-founder-description">Building modern digital products with engineering, design and next-gen technology.</p>
        <div className="mobile-founder-contact">
          <a href={`tel:${person.phone}`}><Phone size={13} />{person.phone}</a>
          <a href={`mailto:${person.email}`}><Mail size={13} />{person.email}</a>
        </div>
        <div className="mobile-founder-links">
          <a href={person.portfolio} target="_blank" rel="noreferrer"><Globe size={13} />Portfolio</a>
          <a href={person.github} target="_blank" rel="noreferrer"><Github size={13} />GitHub</a>
          <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={13} />LinkedIn</a>
        </div>
      </div>
    </article>
  );
}

function MobileServiceIcon({ kind }: { kind: string }) {
  if (kind === 'browser') return <div className="mobile-service-icon browser"><i /><b /><b /><b /></div>;
  if (kind === 'phone') return <div className="mobile-service-icon phone"><span /><i /></div>;
  if (kind === 'windows') return <div className="mobile-service-icon windows"><b /><b /><b /><b /></div>;
  return <div className="mobile-service-icon chip"><strong>AI</strong><i /><i /><i /><i /></div>;
}

function MobileMWObject() {
  return (
    <div className="mobile-mw-stage" aria-hidden="true">
      <div className="mobile-mw-glow" />
      <div className="mobile-mw-orbit mobile-mw-orbit-a" />
      <div className="mobile-mw-orbit mobile-mw-orbit-b" />
      <div className="mobile-mw-cube"><span>M/W</span></div>
    </div>
  );
}

export default function MobileHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const copy = root.querySelectorAll<HTMLElement>('[data-mobile-reveal="copy"]');
    const object = root.querySelector<HTMLElement>('[data-mobile-reveal="object"]');
    const foundersNodes = root.querySelectorAll<HTMLElement>('[data-mobile-reveal="founder"]');
    const services = root.querySelectorAll<HTMLElement>('[data-mobile-reveal="service"]');

    animate(copy, { opacity: [0, 1], y: [20, 0], duration: 620, delay: stagger(55), ease: 'out(4)' });
    if (object) animate(object, { opacity: [0, 1], y: [18, 0], scale: [.94, 1], duration: 760, delay: 300, ease: 'out(4)' });
    animate(foundersNodes, { opacity: [0, 1], y: [22, 0], duration: 600, delay: stagger(100, { start: 620 }), ease: 'out(4)' });
    animate(services, { opacity: [0, 1], y: [18, 0], duration: 520, delay: stagger(70, { start: 880 }), ease: 'out(4)' });
  }, []);

  return (
    <section ref={rootRef} className="mobile-hero-clean" id="top" data-mobile-hero="true">
      <div className="mobile-hero-bg" aria-hidden="true"><HeroThreeScene mode="mobile" /></div>

      <div className="mobile-hero-content">
        <div className="mobile-hero-intro" data-mobile-region="hero-copy">
          <div className="mobile-hero-eyebrow" data-mobile-reveal="copy"><span />BUILDING A BETTER DIGITAL WORLD</div>
          <h1>
            <strong data-mobile-reveal="copy">MakeWebb</strong>
            <em data-mobile-reveal="copy">Web. Android. Windows.</em>
            <span data-mobile-reveal="copy">Ideas into real products.</span>
          </h1>
          <p data-mobile-reveal="copy">We design and develop modern digital experiences with 3D, AI and next-gen technologies.</p>
          <div className="mobile-hero-actions" data-mobile-reveal="copy">
            <a className="button primary" href="#configurator">Let's Build Together <ArrowUpRight size={15} /></a>
            <a className="mobile-work-link" href="#work">View Our Work <ArrowDownRight size={15} /></a>
          </div>
          <div className="mobile-trust" data-mobile-reveal="copy">
            <small>TRUSTED BY INNOVATORS</small>
            <div><span>Ⓝ Next.js</span><span>⚛ React</span><span>▣ Android</span><span>⊞ Windows</span></div>
          </div>
        </div>

        <div data-mobile-region="mw-object" data-mobile-reveal="object"><MobileMWObject /></div>

        <div className="mobile-founder-stack" aria-label="MakeWebb founders" data-mobile-region="founders">
          {founders.map((person) => <div key={person.name} data-mobile-reveal="founder"><MobileFounderCard person={person} /></div>)}
        </div>

        <div className="mobile-service-grid" aria-label="MakeWebb services" data-mobile-region="service-grid">
          {heroServices.map(([index, title, text, kind]) => (
            <a href="#services" className="mobile-service-card" key={index} data-mobile-reveal="service">
              <span className="mobile-service-index">{index}</span>
              <MobileServiceIcon kind={kind} />
              <strong>{title}</strong>
              <small>{text}</small>
              <ArrowUpRight className="mobile-service-arrow" size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
