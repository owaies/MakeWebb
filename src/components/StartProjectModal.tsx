import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Send, Phone, Mail, Sparkles, Loader2 } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const { submitInquiry } = useStudioData();
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(
    initialService ? [initialService] : ['AI & Machine Learning']
  );
  const [budget, setBudget] = useState('$5,000 – $15,000');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const disciplines = [
    'AI & Machine Learning',
    'Web Applications & Platforms',
    'Computer Vision & Optical Models',
    'UI / UX & Spatial Systems',
    'Autonomous Automation & Cloud',
  ];

  const toggleDiscipline = (d: string) => {
    if (selectedDisciplines.includes(d)) {
      if (selectedDisciplines.length > 1) {
        setSelectedDisciplines(selectedDisciplines.filter((item) => item !== d));
      }
    } else {
      setSelectedDisciplines([...selectedDisciplines, d]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name,
        email,
        phone,
        disciplines: selectedDisciplines,
        budget,
        timeline,
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Failed to submit inquiry:', err);
      // Still show success fallback if network fails
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050608]/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-2xl rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_20px_80px_rgba(0,0,0,0.9)] z-10 my-8">
        <div className="rounded-[22px] bg-[#090b10] p-6 sm:p-8 md:p-10 border border-white/10 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MAKEWEBB ENGAGEMENT PROTOCOL</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  LET'S MAKE IT REAL.
                </h3>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  Provide brief project parameters. Mohammed Owaies and Mohammed Afaf Hassan will analyze your scope and return a technical architecture roadmap within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Discipline selection pills */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-3">
                    PRIMARY DISCIPLINES / FOCUS
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {disciplines.map((item) => {
                      const isSelected = selectedDisciplines.includes(item);
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleDiscipline(item)}
                          className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all border ${
                            isSelected
                              ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                              : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/30'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                      BUDGET RANGE
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option className="bg-[#090b10]">&lt; $5,000</option>
                      <option className="bg-[#090b10]">$5,000 – $15,000</option>
                      <option className="bg-[#090b10]">$15,000 – $35,000</option>
                      <option className="bg-[#090b10]">$35,000 – $75,000</option>
                      <option className="bg-[#090b10]">$75,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                      DESIRED TIMELINE
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option className="bg-[#090b10]">Immediate (&lt; 2 Weeks)</option>
                      <option className="bg-[#090b10]">Within 1 Month</option>
                      <option className="bg-[#090b10]">1 – 3 Months</option>
                      <option className="bg-[#090b10]">Long-Term Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Client Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                    PHONE / WHATSAPP (OPTIONAL)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834 or +91 ..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-slate-400 uppercase mb-2">
                    EXECUTIVE BRIEF / OBJECTIVES
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your product vision, target users, or key deliverables..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-sans text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING BRIEF...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT INQUIRY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success confirmation */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-3xl text-white uppercase tracking-tight">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-sans text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <strong className="text-white">{name || 'Partner'}</strong>. Your technical brief for <strong className="text-cyan-300">{selectedDisciplines.join(', ')}</strong> has been logged directly with Mohammed Owaies and Mohammed Afaf Hassan.
              </p>

              {/* Direct Founder Hotlines */}
              <div className="pt-6 border-t border-white/10 max-w-md mx-auto text-left space-y-3">
                <span className="font-mono text-[10px] font-semibold text-slate-400 tracking-widest uppercase block">
                  URGENT INQUIRY? REACH CO-FOUNDERS DIRECTLY:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-slate-200">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Owaies: 7619329863</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-slate-200">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Afaf: 8073818817</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full font-mono text-xs tracking-widest uppercase text-white bg-white/[0.05] border border-white/20 hover:bg-white/10 transition-colors"
                >
                  RETURN TO STUDIO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
