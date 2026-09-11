import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight, Check, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface ContactSectionProps {
  onOpenProjectModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenProjectModal }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 pt-32 pb-16 overflow-hidden select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Scene 10 Header */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SCENE 10 / CONTACT & SYNTHESIS</span>
          </div>
          <span>COLLABORATION CHANNEL READY</span>
        </div>

        {/* Main Statements */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-mono text-xs sm:text-sm text-cyan-400 tracking-[0.3em] uppercase"
          >
            LET'S MAKE SOMETHING WORTH SCROLLING FOR.
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] text-white uppercase leading-[0.92]"
          >
            HAVE AN IDEA? <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              LET'S BUILD IT.
            </span>
          </motion.h2>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>START A PROJECT ↗</span>
            </button>

            <a
              href="mailto:owaies786@gmail.com,kingahassan786@gmail.com?subject=Project%20Inquiry%20%7C%20MAKEWEBB"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-mono text-xs tracking-[0.2em] uppercase backdrop-blur-xl transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>EMAIL US</span>
            </a>
          </motion.div>
        </div>

        {/* Direct Contact Cards for Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 sm:mt-20">
          {/* Founder 01 Contact Card: Mohammed Owaies */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-cyan-400/30 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                  MW / 01 · FOUNDER
                </span>
                <span className="font-mono text-[10px] text-slate-400 uppercase">AI · ML · DATA</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-4">
                MOHAMMED OWAIES
              </h3>
              <div className="font-mono text-xs text-slate-400 mt-1">AI / ML ENGINEER</div>

              {/* Direct Links */}
              <div className="space-y-3 mt-6">
                <a
                  href="mailto:owaies786@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>owaies786@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="tel:7619329863"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>+91 7619329863</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.06]">
              <a
                href="https://owaies-portfolio.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 font-mono text-[10px] text-slate-300 hover:text-white uppercase tracking-widest transition-all flex items-center gap-1.5"
              >
                <span>PORTFOLIO</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/owaies"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-owaies-507b4a398"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Founder 02 Contact Card: Mohammed Afaf Hassan */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-indigo-400/30 transition-all">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <span className="font-mono text-[10px] text-indigo-400 tracking-widest uppercase">
                  MW / 02 · FOUNDER
                </span>
                <span className="font-mono text-[10px] text-slate-400 uppercase">WEB · APPS · UI/UX</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-4">
                MOHAMMED AFAF HASSAN
              </h3>
              <div className="font-mono text-xs text-slate-400 mt-1">WEB DEVELOPER</div>

              {/* Direct Links */}
              <div className="space-y-3 mt-6">
                <a
                  href="mailto:kingahassan786@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>kingahassan786@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="tel:8073818817"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span>+91 8073818817</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Social profiles */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.06]">
              <a
                href="https://afaf.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 font-mono text-[10px] text-slate-300 hover:text-white uppercase tracking-widest transition-all flex items-center gap-1.5"
              >
                <span>PORTFOLIO</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/afaf-app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mansafaf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 11 — FOOTER */}
      <footer className="w-full max-w-7xl mx-auto pt-20 mt-20 border-t border-white/[0.08] relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          <div>
            <div className="font-display font-black text-3xl tracking-tight text-white uppercase">
              MAKEWEBB
            </div>
            <div className="font-mono text-xs text-slate-400 tracking-[0.25em] uppercase mt-1">
              DIGITAL PRODUCT STUDIO
            </div>
            <div className="font-mono text-[11px] text-cyan-400/80 tracking-widest uppercase mt-2">
              AI · WEB · DATA · EXPERIENCE
            </div>
          </div>

          {/* Canonical Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs tracking-wider uppercase text-slate-300">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              WORK
            </a>
            <a
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('capabilities');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              CAPABILITIES
            </a>
            <a
              href="#founders"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('founders');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              FOUNDERS
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              CONTACT
            </a>
            <a
              href="https://github.com/owaies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-owaies-507b4a398"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          <div>© 2026 MAKEWEBB · BUILT WITH INTENT.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div>BANGALORE / GLOBAL</div>
        </div>
      </footer>
    </section>
  );
};
