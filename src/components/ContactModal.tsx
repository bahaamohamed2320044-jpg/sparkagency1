import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Copy, Send, Zap } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Brand Identity',
    budget: '$5k - $15k',
    message: '',
  });

  const emailAddress = 'hello@sparkagency.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[#121212] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 text-[#D7E2EA] shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#F59E0B] font-bold">
                <Zap size={14} className="fill-[#F59E0B]" />
                <span>SPARK Agency &bull; New Business</span>
              </div>
              <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase mt-1">
                LET&apos;S TALK
              </h3>
              <p className="text-sm font-light text-[#D7E2EA]/70 mt-2">
                Ready to transform your brand? Share your campaign goals below or connect with our strategists directly.
              </p>
            </div>

            {/* Quick WhatsApp & copy email pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href="https://wa.me/201558082474?text=Hello%20SPARK%20Agency!%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
                    <Zap size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold text-[#25D366]">Direct WhatsApp</span>
                    <span className="text-xs font-mono text-white/90">+20 155 808 2474</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#25D366] bg-[#25D366]/20 px-2 py-1 rounded-full group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                  Open
                </span>
              </a>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] flex items-center justify-center text-black font-black">
                    <Mail size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold text-white/50">Agency Email</span>
                    <span className="font-mono text-xs text-white/90">hello@sparkagency.com</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-4">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-bold uppercase text-white">Inquiry Received</h4>
                <p className="text-sm text-[#D7E2EA]/70 mt-2 max-w-xs">
                  Thank you! Our creative directors at SPARK Agency will review your campaign brief and connect shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Vance &bull; Nova Global"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                      Primary Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                    >
                      <option value="Brand Identity">01 — Brand Identity</option>
                      <option value="Social Media & Content">02 — Social Media & Content</option>
                      <option value="Creative Advertising">03 — Creative Advertising</option>
                      <option value="Digital Marketing">04 — Digital Marketing</option>
                      <option value="Motion & Digital Experiences">05 — Motion & Digital Experiences</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                      Budget Scope
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                    >
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k - $50k">$25,000 - $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                    Campaign Scope / Brand Challenge
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell SPARK about your brand vision, target timeline, and campaign objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F59E0B] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(123deg, #1C1200 0%, #D97706 32%, #F59E0B 62%, #FBBF24 85%, #FEF08A 100%)',
                    boxShadow: '0px 4px 14px rgba(245, 158, 11, 0.35), inset 2px 2px 10px #D97706',
                    outline: '2px solid #FFFFFF',
                    outlineOffset: '-3px',
                  }}
                  className="mt-2 w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                >
                  <Send size={16} />
                  <span>Send Campaign Request</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
