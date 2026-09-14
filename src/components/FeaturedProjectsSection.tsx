import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowUpRight,
  Filter,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FEATURED_PROJECTS_SECTION_DATA } from "../data/portfolioData";
import { FeaturedProject, ProjectCategoryFilter } from "../types";

interface FeaturedProjectsSectionProps {
  onSelectProject: (project: FeaturedProject) => void;
  onContactClick: () => void;
}

export const FeaturedProjectsSection: React.FC<
  FeaturedProjectsSectionProps
> = ({ onSelectProject, onContactClick }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategoryFilter>("All");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredProjects = FEATURED_PROJECTS_SECTION_DATA.projects.filter(
    (project) => {
      if (selectedCategory === "All") return true;
      return project.category === selectedCategory;
    },
  );

  return (
    <section
      id="projects"
      className="relative z-10 w-full py-24 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none -z-10" />

      {/* 1. Header Section: Small Label + Large Bold White Heading + Short Gray Subtitle */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="projects-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-4 text-xs font-mono-accent uppercase tracking-widest text-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{FEATURED_PROJECTS_SECTION_DATA.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="projects-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4"
        >
          {FEATURED_PROJECTS_SECTION_DATA.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed"
        >
          {FEATURED_PROJECTS_SECTION_DATA.subtitle}
        </motion.p>
      </div>

      {/* 2. Filter Tabs Above Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-center mb-12 md:mb-14"
      >
        <div
          id="project-filter-tabs"
          className="inline-flex items-center p-1.5 rounded-full bg-[#0d0d15]/90 border border-white/[0.08] backdrop-blur-xl shadow-lg max-w-full overflow-x-auto"
        >
          {FEATURED_PROJECTS_SECTION_DATA.categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilterTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/80 via-indigo-600/80 to-blue-600/80 shadow-[0_0_15px_rgba(147,51,234,0.4)] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 3. Responsive Project Showcase Grid (First Project Spans 2 Columns for Visual Hierarchy) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        id="featured-projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredCardId === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`relative rounded-3xl bg-[#0b0b14]/90 border border-white/[0.08] hover:border-white/[0.22] backdrop-blur-xl transition-all duration-500 overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between ${
                  project.colSpan === 2
                    ? project.colSpan === 2 && selectedCategory === "All"
                      ? "lg:col-span-2"
                      : "lg:col-span-1"
                    : "lg:col-span-1"
                }`}
              >
                {/* Subtle Blue-Purple Accent Glow on Hover */}
                <div
                  className={`absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/25 blur-xl transition-opacity duration-500 pointer-events-none -z-10 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Top/Visual Container: Image Preview with Dark Gradient Overlay */}
                <div
                  className={`relative w-full overflow-hidden bg-neutral-950 cursor-pointer ${
                    project.colSpan === 2
                      ? project.colSpan === 2 && selectedCategory === "All"
                        ? "h-72 sm:h-96 md:h-[420px]"
                        : "h-64 sm:h-72"
                      : "h-64 sm:h-72"
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Gradient Overlay for optimal contrast and mood */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b14] via-[#0b0b14]/40 to-black/30" />

                  {/* Top Badges (Category & Year) */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.12] text-xs font-mono-accent text-purple-300 font-medium">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08] text-xs font-mono-accent text-neutral-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Interactive Quick-Expand Indicator */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono-accent text-white shadow-lg">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                </div>

                {/* Bottom Content Area: Title, Short Description, Tags & Arrow CTA */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className={`font-display font-bold text-white group-hover:text-purple-100 transition-colors cursor-pointer ${
                          project.colSpan === 2
                            ? project.colSpan === 2 &&
                              selectedCategory === "All"
                              ? "text-2xl sm:text-3xl"
                              : "text-xl sm:text-2xl"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Row: Technology Tags + "View Project" Arrow Button */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono-accent text-neutral-400 group-hover:text-neutral-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Small "View Project" Arrow Button */}
                    <button
                      onClick={() => onSelectProject(project)}
                      id={`view-project-btn-${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] group-hover:bg-purple-600/20 border border-white/[0.1] group-hover:border-purple-400/50 text-white text-xs font-semibold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap self-end sm:self-auto"
                    >
                      <span>View Project</span>
                      <div className="p-1 rounded-full bg-white/[0.08] group-hover:bg-purple-500/40 text-purple-300 transition-all">
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Exploration Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#090912] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base sm:text-lg font-bold font-display text-white">
            Have a custom digital product or system in mind?
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400">
            Available for select client partnerships, full-stack architectural
            sprints, and bespoke design systems.
          </p>
        </div>

        <button
          onClick={onContactClick}
          id="featured-projects-contact-cta"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(147,51,234,0.35)] cursor-pointer whitespace-nowrap"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
};
