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
  ExternalLink,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import {
  DEFAULT_CONTACT_EMAIL,
  sendContactEmail,
  buildMailtoUrl,
  SendEmailResult,
} from "../utils/emailService";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SendEmailResult | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEFAULT_CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
        message: formData.message,
      });
      setSubmissionResult(result);
    } catch {
      const mailtoUrl = buildMailtoUrl({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmissionResult({
        success: true,
        message: `Prepared for ${DEFAULT_CONTACT_EMAIL}. Use the button below to launch your email client.`,
        status: "fallback",
        mailtoUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({ name: "", email: "", subject: "", message: "" });
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
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
              connect? Send a note directly to Bryan.
            </p>
          </div>

          {/* Direct Email Quick Action */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs text-neutral-400">
                  Default Contact Email
                </span>
                <a
                  href={`mailto:${DEFAULT_CONTACT_EMAIL}`}
                  className="text-sm font-semibold text-white hover:text-purple-300 font-mono-accent truncate transition-colors"
                >
                  {DEFAULT_CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              id="copy-email-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white transition-colors cursor-pointer flex-shrink-0 ml-2"
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

          {/* Form or Result View */}
          {submissionResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-display">
                  Message Dispatched
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  {submissionResult.message}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono-accent text-purple-300">
                  <Mail className="w-3 h-3 text-purple-400" />
                  <span>Routed to: {DEFAULT_CONTACT_EMAIL}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 w-full flex flex-col sm:flex-row gap-3">
                <a
                  href={submissionResult.mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-open-mail-client-btn"
                  className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Mail App (Gmail / Outlook)</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  id="modal-send-another-btn"
                  className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Another</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              id="modal-contact-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Your Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    id="contact-input-name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Your Email <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    id="contact-input-email"
                    placeholder="jane@company.com"
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
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  id="contact-input-subject"
                  placeholder="e.g. Project Inquiry / WebGL Collaboration"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Message / Project Scope{" "}
                  <span className="text-purple-400">*</span>
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

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{PORTFOLIO_DATA.location}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
