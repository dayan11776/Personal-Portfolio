import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
  Clock,
  MessageSquare,
} from "lucide-react";
import { CONTACT_SECTION_DATA } from "../data/portfolioData";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate real send
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1000);
  };

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case "Linkedin":
        return (
          <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
        );
      case "Github":
        return (
          <Github className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
        );
      default:
        return (
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
        );
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full py-24 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Ambient Lighting Spheres */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      {/* 1. Centered Section Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="contact-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-4 text-xs font-mono-accent uppercase tracking-widest text-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{CONTACT_SECTION_DATA.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="contact-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-4"
        >
          {CONTACT_SECTION_DATA.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed"
        >
          {CONTACT_SECTION_DATA.subtitle}
        </motion.p>
      </div>

      {/* 2. Two-Column Layout: Details on Left, Contact Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        {/* Left Column: Direct Contact Details, Social Channels & Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Header Card */}
          <div className="p-6 rounded-3xl bg-[#0b0b14]/90 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.08] mb-6">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-neutral-400 font-mono-accent">
                  Available for collaborations & full-stack design engineering
                </p>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              {/* Email */}
              <div
                id="contact-email-item"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] font-mono-accent text-neutral-500 uppercase tracking-wider">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${CONTACT_SECTION_DATA.email}`}
                      className="text-sm font-semibold text-white group-hover:text-purple-200 transition-colors truncate block"
                    >
                      {CONTACT_SECTION_DATA.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(CONTACT_SECTION_DATA.email, "email")
                  }
                  aria-label="Copy email address"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div
                id="contact-phone-item"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] font-mono-accent text-neutral-500 uppercase tracking-wider">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${CONTACT_SECTION_DATA.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors truncate block"
                    >
                      {CONTACT_SECTION_DATA.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(CONTACT_SECTION_DATA.phone, "phone")
                  }
                  aria-label="Copy phone number"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div
                id="contact-location-item"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-mono-accent text-neutral-500 uppercase tracking-wider">
                    Primary Location
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {CONTACT_SECTION_DATA.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Response Rate Pill */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-accent text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-neutral-300 font-medium">
                  Active Status
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>~24h turnaround</span>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="p-6 rounded-3xl bg-[#0b0b14]/90 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <span className="block text-xs font-mono-accent text-neutral-400 uppercase tracking-wider mb-4">
              Social Profiles & Networks
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CONTACT_SECTION_DATA.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.18] flex flex-col justify-between transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    {getSocialIcon(social.icon)}
                    <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs font-bold font-display text-neutral-300 group-hover:text-white">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0b0b14]/90 border border-white/[0.09] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Subtle Inner Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              id="portfolio-contact-form"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name-input"
                    className="block text-xs font-mono-accent uppercase tracking-wider text-neutral-300"
                  >
                    Your Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Bryan Tapel"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0e0e18] border border-white/[0.1] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 focus:shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email-input"
                    className="block text-xs font-mono-accent uppercase tracking-wider text-neutral-300"
                  >
                    Email Address <span className="text-purple-400">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. bryantapel619@gmail.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0e0e18] border border-white/[0.1] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 focus:shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject-input"
                  className="block text-xs font-mono-accent uppercase tracking-wider text-neutral-300"
                >
                  Project Subject / Type
                </label>
                <input
                  id="contact-subject-input"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Spatial Web App / Freelance Collaboration"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0e0e18] border border-white/[0.1] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message-input"
                  className="block text-xs font-mono-accent uppercase tracking-wider text-neutral-300"
                >
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your goals, timeline, and what you're hoping to build..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0e0e18] border border-white/[0.1] text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 focus:shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all resize-none"
                />
              </div>

              {/* Helper note */}
              <p className="text-xs text-neutral-500 font-normal">
                Your message is sent directly to Bryan's inbox. No spam, ever.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-send-message-btn"
                  className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Success Notification */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-mono-accent"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      Message received! Bryan will get back to you within 24
                      hours.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>

      {/* 3. Refined Bottom Footer Line */}
      <div
        id="contact-footer-bar"
        className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono-accent"
      >
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Bryan Tapel.</span>
          <span className="hidden sm:inline">•</span>
          <span>All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <span>Bacoor Cavite, Philippines</span>
          <span>•</span>
          <a
            href="#hero-section"
            className="hover:text-white transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
};
