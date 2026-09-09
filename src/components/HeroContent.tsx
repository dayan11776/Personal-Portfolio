import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface HeroContentProps {
  onViewWork: () => void;
  onContact: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onViewWork,
  onContact,
}) => {
  return (
    <div className="flex flex-col items-start justify-center text-left max-w-2xl z-10">
      {/* 1. Bible Verse Card at the top */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        id="hero-bible-verse-card"
        className="inline-flex items-start sm:items-center gap-2.5 px-3.5 py-2 sm:py-1.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group text-white mb-4 max-w-xl"
      >
        <div className="relative shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 mt-0.5 sm:mt-0">
          <BookOpen className="w-3.5 h-3.5 text-white group-hover:text-purple-300 transition-colors" />
          {/* Micro accent dot */}
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 ring-1 ring-[#050507]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-left py-0.5">
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-200 group-hover:text-white transition-colors whitespace-nowrap">
            {PORTFOLIO_DATA.bibleVerse.reference}
          </span>
          <span className="hidden sm:inline text-neutral-500 text-xs">•</span>
          <span className="text-[11px] sm:text-xs text-neutral-300 italic leading-snug">
            "{PORTFOLIO_DATA.bibleVerse.text}"
          </span>
        </div>
      </motion.div>

      {/* 2. Small "Hello, I'm" Label / Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6 hover:border-purple-500/40 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        id="hero-greeting-pill"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
        </span>
        <span className="text-xs md:text-sm font-medium tracking-wide text-neutral-300">
          {PORTFOLIO_DATA.greeting}
        </span>
      </motion.div>

      {/* 2. Large Name Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        id="hero-name-headline"
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-4 selection:text-white"
      >
        {PORTFOLIO_DATA.name}
      </motion.h1>

      {/* 3. Short Professional Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        id="hero-professional-title"
        className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400 mb-5"
      >
        {PORTFOLIO_DATA.title}
      </motion.div>

      {/* 4. Concise One-Line Introduction */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        id="hero-intro-text"
        className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-xl mb-9"
      >
        {PORTFOLIO_DATA.bio}
      </motion.p>

      {/* 5. Two CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto"
      >
        {/* White Filled Button: "View My Work" */}
        <button
          id="hero-cta-view-work-btn"
          onClick={onViewWork}
          className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-bold text-black bg-white rounded-full transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.25)] group cursor-pointer"
        >
          <span>View My Work</span>
          <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Subtle Outlined Button: "Contact Me" */}
        <button
          id="hero-cta-contact-me-btn"
          onClick={onContact}
          className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-semibold text-neutral-200 bg-white/[0.03] hover:bg-white/[0.07] border border-white/20 hover:border-white/40 rounded-full backdrop-blur-md transition-all duration-300 hover:text-white hover:scale-[1.02] active:scale-[0.98] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <Mail className="w-4 h-4 text-neutral-400 group-hover:text-purple-300 transition-colors" />
          <span>Contact Me</span>
        </button>
      </motion.div>

      {/* 6. Social Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="pt-6 border-t border-white/[0.07] w-full flex items-center gap-3 text-xs text-neutral-500 font-mono-accent"
      >
        {/* Social Quick Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/dayan11776"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-github"
            aria-label="GitHub Profile"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/bryan-tapel-876271198/"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-linkedin"
            aria-label="LinkedIn Profile"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
