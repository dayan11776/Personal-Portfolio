import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Layout,
  Code2,
  Compass,
  Palette,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Activity,
  Server,
} from "lucide-react";
import { SKILLS_SERVICES_DATA } from "../data/portfolioData";

interface SkillsServicesSectionProps {
  onContactClick: () => void;
}

export const SkillsServicesSection: React.FC<SkillsServicesSectionProps> = ({
  onContactClick,
}) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case "Layout":
        return (
          <Layout className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
        );
      case "Code2":
        return (
          <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        );
      case "Compass":
        return (
          <Compass className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
        );
      case "Server":
        return (
          <Server className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        );
      case "Sparkles":
      default:
        return (
          <Palette className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
        );
    }
  };

  return (
    <section
      id="skills"
      className="relative z-10 w-full py-24 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* 1. Centered Header: Small Label + Bold White Heading */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="skills-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-4 text-xs font-mono-accent uppercase tracking-widest text-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{SKILLS_SERVICES_DATA.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="skills-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4"
        >
          {SKILLS_SERVICES_DATA.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed"
        >
          {SKILLS_SERVICES_DATA.subtitle}
        </motion.p>
      </div>

      {/* 2. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Core Skills with Animated Progress Bars & Indicators */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Core Proficiency
              </h3>
            </div>
          </div>

          <div className="space-y-6">
            {SKILLS_SERVICES_DATA.coreSkills.map((skill, index) => (
              <div
                key={skill.id}
                id={`skill-item-${skill.id}`}
                className="p-5 rounded-2xl bg-[#0a0a10]/80 border border-white/[0.08] hover:border-white/[0.16] backdrop-blur-xl transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
              >
                {/* Skill Title & Percent Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {skill.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[10px] font-mono-accent text-neutral-400 border border-white/[0.06]">
                      {skill.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono-accent text-sm font-bold text-neutral-200 group-hover:text-white">
                    <span>{skill.percentage}%</span>
                  </div>
                </div>

                {/* Animated Progress Bar Track */}
                <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden mb-3.5 border border-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.accentColor} relative`}
                  >
                    {/* Glowing head tip */}
                    <div className="absolute right-0 top-0 bottom-0 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                </div>

                {/* Tech & Tool Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-[11px] font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Four Service Cards in a 2x2 Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Specialized Services
              </h3>
            </div>
            <span className="text-xs font-mono-accent text-neutral-500">
              4 Disciplines
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            id="services-2x2-grid"
          >
            {SKILLS_SERVICES_DATA.services.map((service, idx) => {
              const isHovered = hoveredService === service.id;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="relative p-6 rounded-2xl bg-[#0c0c14]/90 hover:bg-[#10101b] border border-white/[0.09] hover:border-white/[0.22] backdrop-blur-xl transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Blue-Purple Glow on Hover */}
                  <div
                    className={`absolute -inset-px rounded-2xl bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-600/25 blur-xl transition-opacity duration-500 pointer-events-none -z-10 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Top Header: Simple Line Icon + Card Index */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.08] border border-white/[0.08] group-hover:border-purple-500/30 transition-all duration-300">
                        {getServiceIcon(service.icon)}
                      </div>
                      <span className="text-xs font-mono-accent text-neutral-500 group-hover:text-purple-300 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* White Service Title */}
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white mb-2.5 group-hover:text-purple-100 transition-colors">
                      {service.title}
                    </h4>

                    {/* Short Gray Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mb-5">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Deliverables Chips */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] font-mono-accent text-neutral-400 group-hover:text-neutral-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
