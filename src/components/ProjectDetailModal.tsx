import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { FeaturedProject } from "../types";

interface ProjectDetailModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="project-detail-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0b0b12] border border-white/[0.14] shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white flex flex-col my-auto"
        >
          {/* Ambient Glow Header */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Hero Image Header */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-t-3xl bg-neutral-900">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/50 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono-accent uppercase tracking-wider backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono-accent backdrop-blur-md">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Subtitle & High-Level Summary */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-300 font-display">
                {project.subtitle}
              </h4>
              <p className="text-base text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <span className="block text-xs font-mono-accent text-neutral-400 uppercase tracking-wider mb-3">
                Technologies & Tools Deployed
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono-accent text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center  gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
                >
                  <span>Inquire About Similar Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] group-hover:bg-purple-600/20 border border-white/[0.1] group-hover:border-purple-400/50 text-white text-xs font-semibold transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap self-end sm:self-auto hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  <span>View Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
