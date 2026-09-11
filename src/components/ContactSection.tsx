import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ArrowUpRight, Check, Sparkles, MessageSquare, Phone } from 'lucide-react';

interface ContactSectionProps {
  onOpenProjectModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenProjectModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 pt-32 pb-16 overflow-hidden select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Scene 07 Tag */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SCENE 07 / SYNTHESIS & CONTACT</span>
          </div>
          <span>TRANSMISSION CHANNEL OPEN</span>
        </div>

        {/* Monumental Call to Action Statement */}
        <div className="text-center sm:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.04em] text-white uppercase leading-[0.92]"
          >
            HAVE AN IDEA? <br />
            <span className="text-gradient-glow">LET'S MAKE IT REAL.</span>
          </motion.h2>

          {/* Supporting Brand Signature */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.08]">
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[0.15em] uppercase">
                MAKEWEBB
              </div>
              <div className="font-mono text-xs sm:text-sm text-cyan-400/90 tracking-[0.3em] uppercase mt-1">
                AI · WEB · DATA · DESIGN
              </div>
            </div>

            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>LAUNCH PROJECT INQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Premium Contact Interactions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-20">
          {/* Direct Email Interaction */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6">
                <Mail className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                DIRECT STUDIO TRANSMISSION
              </div>
              <div className="font-display font-bold text-xl text-white mt-2">
                owaies786@gmail.com
              </div>
              <p className="font-sans text-xs text-slate-400 mt-2">
                Guaranteed sub-24h turnaround for project briefs and technical consultations.
              </p>
            </div>

            <button
              onClick={() => handleCopyEmail('owaies786@gmail.com')}
              className="mt-6 w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <span>COPY EMAIL ADDRESS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </>
              )}
            </button>
          </div>

          {/* GitHub Repositories */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 mb-6">
                <Github className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                OPEN SOURCE & CODEBASES
              </div>
              <div className="font-display font-bold text-xl text-white mt-2">
                github.com/owaies
              </div>
              <p className="font-sans text-xs text-slate-400 mt-2">
                Explore our public neural models, computer vision tools, and web experiments.
              </p>
            </div>

            <a
              href="https://github.com/owaies"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>VISIT GITHUB REPOSITORY</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* LinkedIn Network */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-6">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                ENTERPRISE NETWORK
              </div>
              <div className="font-display font-bold text-xl text-white mt-2">
                LinkedIn Leadership
              </div>
              <p className="font-sans text-xs text-slate-400 mt-2">
                Connect with Mohammed Owaies and Mohammed Afaf Hassan for strategic partnerships.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/mohammed-owaies-507b4a398"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>CONNECT ON LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Minimal Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto pt-16 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400 uppercase tracking-widest relative z-10">
        <div>© MAKEWEBB · {new Date().getFullYear()}</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white">MW / DIGITAL PRODUCT STUDIO</span>
        </div>
        <div className="text-[10px] text-slate-400">
          ALL RIGHTS RESERVED · BANGALORE / GLOBAL
        </div>
      </footer>
    </section>
  );
};
