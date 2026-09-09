import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Code2,
  Layers,
  Cpu,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface WorkPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
  onContactClick: () => void;
}

export const WorkPreviewModal: React.FC<WorkPreviewModalProps> = ({
  isOpen,
  onClose,
  activeSection,
  onContactClick,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#09090f]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 my-auto z-10 max-h-[88vh] overflow-y-auto"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-work-modal-btn"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
            aria-label="Close Work Preview Dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Selected Portfolio Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              Featured Personal Work & Capabilities
            </h2>
            <p className="text-sm text-neutral-400">
              Accurated selection of design systems, spatial computing
              prototypes, and full-stack interactive engineering.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xs font-mono-accent text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Core Tech & Design
              Capabilities
            </div>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          <div className="space-y-3.5 mb-8">
            <div className="text-xs font-mono-accent text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> Selected Case
              Studies
            </div>
            {PORTFOLIO_DATA.featuredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.16] transition-all group"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <span className="text-[11px] font-mono-accent text-purple-400 font-semibold uppercase tracking-wider">
                      {project.category} • {project.year}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.1] text-neutral-400 group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] text-neutral-400 font-mono-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-neutral-500">
              Ready to create something memorable?
            </div>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              id="work-modal-contact-cta-btn"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-md"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
