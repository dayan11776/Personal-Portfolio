import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mail,
  Check,
  Copy,
  Send,
  Sparkles,
  MapPin,
  Calendar,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bryan@tapel.design");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
      onClose();
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl rounded-3xl bg-[#0a0a10]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden z-10"
        >
          {/* Top accent glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute -top-24 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-contact-modal-btn"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
            aria-label="Close Contact Dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Let's collaborate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-sm text-neutral-400">
              Have a project inquiry, collaboration proposal, or just want to
              connect? Send a note below.
            </p>
          </div>

          {/* Direct Email Quick Action */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-neutral-400">Direct Email</span>
                <span className="text-sm font-semibold text-white font-mono-accent">
                  bryantapel619@gmail.com
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              id="copy-email-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {sent ? (
            <div className="py-10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/30">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Message Received
              </h3>
              <p className="text-sm text-neutral-400">
                Thanks for reaching out! I'll respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    id="contact-input-name"
                    placeholder="Bryan Tapel"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    id="contact-input-email"
                    placeholder="bryantapel619@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Message / Project Scope
                </label>
                <textarea
                  required
                  rows={3}
                  id="contact-input-message"
                  placeholder="Tell me about your project, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center pt-2">
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
