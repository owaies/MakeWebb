'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Mail, Phone, Linkedin, Github, X, Users } from 'lucide-react';

const team = [
  {
    name: 'Mohammed Owaies',
    role: 'AI / ML Engineer',
    phone: '+91 76193 29863',
    phoneHref: 'tel:+917619329863',
    email: 'owaies786@gmail.com',
    portfolio: 'https://owaies-portfolio.base44.app',
    github: 'https://github.com/owaies',
    linkedin: 'https://www.linkedin.com/in/mohammed-owaies-507b4a398',
  },
  {
    name: 'Mohammed Afaf Hassan',
    role: 'Web Developer',
    phone: '+91 80738 18817',
    phoneHref: 'tel:+918073818817',
    email: 'kingahassan786@gmail.com',
    portfolio: 'https://afaf.base44.app',
    github: 'https://github.com/afaf-app',
    linkedin: 'https://www.linkedin.com/in/mansafaf',
  },
];

export default function ContactDock() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panel.current) return;
    animate(panel.current, {
      opacity: open ? [0, 1] : [1, 0],
      scale: open ? [0.94, 1] : [1, 0.94],
      translateY: open ? [18, 0] : [0, 18],
      duration: open ? 420 : 260,
      ease: 'out(4)',
    });
  }, [open]);

  return (
    <>
      <button className="contact-dock-trigger" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Open MakeWebb team contacts">
        {open ? <X size={18} /> : <Users size={18} />}
        <span>{open ? 'Close' : 'Team'}</span>
      </button>
      <div ref={panel} className={`contact-dock-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="contact-dock-head">
          <span>MAKEWEBB / CONTACT</span>
          <span className="dock-live">● AVAILABLE</span>
        </div>
        <div className="contact-dock-team">
          {team.map(person => (
            <article className="dock-person" key={person.name}>
              <div>
                <span className="dock-role">{person.role}</span>
                <h3>{person.name}</h3>
              </div>
              <a href={person.phoneHref}><Phone size={14} /> {person.phone}</a>
              <a href={`mailto:${person.email}`}><Mail size={14} /> {person.email}</a>
              <div className="dock-links">
                <a href={person.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
                <a href={person.github} target="_blank" rel="noreferrer"><Github size={13} /> GitHub</a>
                <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={13} /> LinkedIn</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
