import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Download,
  FileText,
  Check,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import resumePdf from "../Resume/Resume.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);

    try {
      const link = document.createElement("a");
      link.href = resumePdf;
      link.download = "Bryan_Tapel_Resume_2026.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error("Resume download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

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
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#09090f]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 my-auto z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Subtle top rim highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-resume-modal-btn"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
            aria-label="Close Resume Dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[11px] font-mono-accent text-neutral-300 mb-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Curriculum Vitae</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white">
                Bryan Tapel — Resume
              </h2>
              <p className="text-xs text-neutral-400">
                Creative Developer & Designer
              </p>
            </div>
          </div>

          {/* Resume Snapshot Blocks */}
          <div className="space-y-4 mb-6">
            {/* Experience Section */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono-accent text-purple-400 uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" /> Recent Roles
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-white font-medium">
                    <span>Application System Engineer — Fujitsu</span>
                    <span className="text-neutral-500 font-mono-accent">
                      2022 - 2025
                    </span>
                  </div>
                  <p className="text-neutral-400 mt-0.5">
                    Build design by using Power Apps. Create dataflow and export
                    the data to excel sheet using Power Automate. Create a
                    program using PHP, Javascript, MySQL, HTML, CSS
                  </p>
                </div>
                <div className="border-t border-white/[0.04] pt-2">
                  <div className="flex justify-between text-white font-medium">
                    <span>Technical Support Staf — DENR</span>
                    <span className="text-neutral-500 font-mono-accent">
                      09/2021 – 12/2021
                    </span>
                  </div>
                  <p className="text-neutral-400 mt-0.5">
                    Worked in a team for a 3-month project called Survey and
                    Registration of Protected Area Occupants (SRPAO). Create
                    maps using ArcgisPro of the surveyed farm lots within the
                    Protected Area
                  </p>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono-accent text-blue-400 uppercase tracking-wider mb-2.5">
                <Award className="w-3.5 h-3.5" /> Technical Strengths
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PORTFOLIO_DATA.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-neutral-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex pt-4 border-t border-white/[0.08]">
            <button
              onClick={handleDownload}
              id="confirm-download-resume-btn"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download
                    className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`}
                  />
                  <span>
                    {downloading ? "Generating..." : "Download Resume File"}
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
