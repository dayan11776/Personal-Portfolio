import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Download,
  Sparkles,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import { ABOUT_DATA, HERO_IMAGES, PORTFOLIO_DATA } from "../data/portfolioData";

interface AboutSectionProps {
  onOpenResume: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenResume,
  onContactClick,
}) => {
  const portraitCardRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt effect for portrait card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitCardRef.current) return;
    const rect = portraitCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-4 h-4 text-purple-400" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case "Layers":
      default:
        return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section
      id="about"
      className="relative z-10 w-full py-24 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Subtle Background Glow behind About section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none -z-10" />

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Large Professional Portrait in Rounded Rectangular Frame */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div
            style={{ perspective: 1200 }}
            className="w-full max-w-[420px] lg:max-w-none relative flex items-center justify-center"
          >
            {/* Subtle Blue-Purple Glow Halo behind the frame */}
            <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/30 via-indigo-500/25 to-purple-600/30 blur-2xl opacity-70 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none" />

            {/* Rounded Rectangular Frame */}
            <motion.div
              ref={portraitCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-[4/5] rounded-[2.2rem] p-3.5 sm:p-4 bg-[#09090f]/85 border border-white/[0.12] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] group overflow-hidden"
              id="about-portrait-frame"
            >
              {/* Inner Portrait Image */}
              <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-black/80 border border-white/[0.05]">
                <img
                  src={HERO_IMAGES.aboutPortrait}
                  alt="Portrait of Bryan Tapel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                {/* Bottom Frame Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#08080d]/80 backdrop-blur-md border border-white/[0.12] shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-neutral-200 text-[11px] tracking-wide">
                      Design & Code
                    </span>
                  </div>
                </div>
              </div>
              {/* Top glossy hairline reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Right Column: About Content, Typography, Highlight Cards & Action */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          {/* Small "ABOUT ME" Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="about-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-4 text-xs font-mono-accent uppercase tracking-widest text-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>{ABOUT_DATA.badge}</span>
          </motion.div>

          {/* Bold White Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            id="about-headline"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6"
          >
            {ABOUT_DATA.headline}
          </motion.h2>

          {/* Short Personal Biography in Soft Gray Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="about-bio"
            className="space-y-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            <p>{ABOUT_DATA.bioParagraph1}</p>
            <p className="text-neutral-400/90 text-sm sm:text-base">
              {ABOUT_DATA.bioParagraph2}
            </p>
          </motion.div>

          {/* Thin Divider Line */}
          <div className="w-full h-[1px] bg-gradient-to-r from-white/[0.12] via-white/[0.06] to-transparent mb-8" />

          {/* 3 Compact Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full mb-8"
            id="about-highlights-grid"
          >
            {ABOUT_DATA.highlights.map((item, index) => (
              <div
                key={item.id}
                id={`about-highlight-${item.id}`}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-purple-500/30 backdrop-blur-md transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2 rounded-xl bg-white/[0.05] group-hover:bg-white/[0.1] transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono-accent uppercase tracking-wider text-neutral-500 group-hover:text-purple-300 transition-colors">
                    0{index + 1}
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-display text-white mb-0.5">
                  {item.title}
                </div>
                <div className="text-xs font-semibold text-neutral-300 mb-1.5">
                  {item.subtitle}
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Download Resume Outlined Button & Supporting Contact Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Minimal "Download Resume" Outlined Button */}
            <button
              id="about-download-resume-btn"
              onClick={onOpenResume}
              className="relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-neutral-200 bg-white/[0.03] hover:bg-white/[0.08] border border-white/25 hover:border-white/50 rounded-full backdrop-blur-md transition-all duration-300 hover:text-white hover:scale-[1.02] active:scale-[0.98] group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <Download className="w-4 h-4 text-neutral-400 group-hover:text-purple-300 transition-colors group-hover:translate-y-0.5" />
              <span>Download Resume</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
