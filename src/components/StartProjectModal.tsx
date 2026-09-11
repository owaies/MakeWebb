import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Send, Phone, Mail } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/websiteData';

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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    initialService ? [initialService] : ['Web Design & Apps']
  );
  const [budget, setBudget] = useState('$2k – $5k');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const platforms = [
    'Web Design & Apps',
    'Android Mobile Apps',
    'Windows Desktop Software',
    'AI & ML Integration',
    '3D Interactive Graphics',
  ];

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const owaies = TEAM_MEMBERS[0];
  const afaf = TEAM_MEMBERS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-b from-cyan-400/50 via-blue-600/30 to-blue-950/70 shadow-[0_0_60px_rgba(56,189,248,0.35)] z-10 my-8">
        <div className="rounded-[22px] bg-[#061026]/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 border border-cyan-500/20 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="space-y-1.5 pr-8">
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  START A BUILD WITH MAKEWEBB
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                  Let's bring your idea into reality.
                </h3>
                <p className="text-sm text-slate-300">
                  Tell us about your requirements. Mohammed Owaies & Mohammed Afaf Hassan will review and respond within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Platform selection pills */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-3">
                    Target Platforms / Needs
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((plat) => {
                      const isSelected = selectedPlatforms.includes(plat);
                      return (
                        <button
                          type="button"
                          key={plat}
                          onClick={() => togglePlatform(plat)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-blue-600/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          {plat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                      Estimated Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option>&lt; $2,000</option>
                      <option>$2k – $5k</option>
                      <option>$5k – $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                      Desired Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option>Urgent (&lt; 2 Weeks)</option>
                      <option>Within 1 Month</option>
                      <option>1 – 3 Months</option>
                      <option>Flexible Exploration</option>
                    </select>
                  </div>
                </div>

                {/* Client Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase font-['Outfit'] mb-2">
                    Project Goals / Description
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe what you want to build, any inspirations or existing code..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 hover:opacity-95 transition-opacity shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 cursor-pointer text-base"
                  >
                    <span>Send Project Proposal</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success confirmation */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-3xl font-bold text-white font-['Outfit']">
                Inquiry Received!
              </h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <strong className="text-white">{name || 'there'}</strong>. We have logged your request for <strong className="text-cyan-300">{selectedPlatforms.join(', ')}</strong>.
                Mohammed Owaies and Mohammed Afaf Hassan will review your specs and reach out at <strong className="text-white">{email}</strong> shortly.
              </p>

              {/* Direct founders contact */}
              <div className="pt-4 border-t border-blue-500/20 max-w-md mx-auto text-left space-y-3">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                  Need immediate response?
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>Owaies: {owaies.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Afaf: {afaf.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-8 py-3 rounded-full text-sm font-semibold text-white bg-slate-900 border border-blue-400/40 hover:border-cyan-300 transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
