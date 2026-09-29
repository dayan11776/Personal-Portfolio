import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Award,
  Copy,
  Check,
} from "lucide-react";
import { CERTIFICATIONS_DATA } from "../data/portfolioData";
import { Certification } from "../types";
import { downloadCertificatePdf } from "../utils/certificatePdf";
import { CertificationPdfModal } from "./CertificationPdfModal";

interface CertificationsSectionProps {
  onContactClick?: () => void;
  onSelectCert?: (cert: Certification) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onContactClick,
  onSelectCert,
}) => {
  const [internalSelectedCert, setInternalSelectedCert] =
    useState<Certification | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterOptions = ["All", "2025", "2024", "2023"];

  const filteredCerts =
    activeFilter === "All"
      ? CERTIFICATIONS_DATA.certifications
      : CERTIFICATIONS_DATA.certifications.filter(
          (c) => c.year === activeFilter,
        );

  const handleOpenCert = (cert: Certification) => {
    if (onSelectCert) {
      onSelectCert(cert);
    } else {
      setInternalSelectedCert(cert);
    }
  };

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDownload = (e: React.MouseEvent, cert: Certification) => {
    e.stopPropagation();
    downloadCertificatePdf(cert);
  };

  return (
    <section
      id="certifications"
      className="relative z-10 w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-blue-600/10 blur-[110px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[11px] sm:text-xs font-mono-accent uppercase tracking-widest text-purple-400">
              {CERTIFICATIONS_DATA.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            {CERTIFICATIONS_DATA.heading}
          </h2>
        </div>

        {/* Filter by Year */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar self-start md:self-auto w-full md:w-auto">
          {filterOptions.map((yearOption) => {
            const isActive = activeFilter === yearOption;
            const count =
              yearOption === "All"
                ? CERTIFICATIONS_DATA.certifications.length
                : CERTIFICATIONS_DATA.certifications.filter(
                    (c) => c.year === yearOption,
                  ).length;

            return (
              <button
                key={yearOption}
                onClick={() => setActiveFilter(yearOption)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black font-bold shadow-lg"
                    : "bg-white/[0.03] hover:bg-white/[0.07] text-neutral-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                <span>{yearOption === "All" ? "All Years" : yearOption}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-black/15 text-neutral-900 font-bold"
                      : "bg-white/[0.08] text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Certification Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert, index) => {
            const isCopied = copiedId === cert.credentialId;

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#090912]/80 border border-white/[0.09] hover:border-purple-500/40 p-4 sm:p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.15)] hover:-translate-y-1"
              >
                {/* Top Accent Rim */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-purple-500/50 transition-colors" />

                <div>
                  {/* Visual PDF File Certificate Cover / Document Preview */}
                  <div
                    onClick={() => handleOpenCert(cert)}
                    className="relative w-full aspect-[16/10] mb-4 sm:mb-5 rounded-xl sm:rounded-2xl bg-[#0e0e18] border border-white/[0.1] hover:border-purple-400/50 overflow-hidden cursor-pointer group/pdf p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-inner"
                  >
                    {/* Certificate Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40 pointer-events-none" />

                    {/* Decorative certificate border lines */}
                    <div className="absolute inset-2 border border-amber-500/25 rounded-xl pointer-events-none" />
                    <div className="absolute inset-2.5 border border-white/[0.05] rounded-lg pointer-events-none" />

                    {/* PDF Document Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold font-mono tracking-wider uppercase">
                        <FileText className="w-3 h-3 text-rose-400" />
                        <span>PDF File</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono-accent text-neutral-400">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span className="font-semibold text-neutral-300">
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* PDF Certificate Center Seal & Authority */}
                    <div className="relative z-10 my-auto text-center px-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 sm:mb-2 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover/pdf:scale-110 transition-transform">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono-accent text-neutral-400 uppercase tracking-widest">
                        {cert.issuer}
                      </div>
                      <div className="text-xs font-semibold text-white/90 line-clamp-1 mt-0.5">
                        {cert.title}
                      </div>
                    </div>

                    {/* PDF Footer Bar */}
                    <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-500 pt-1 border-t border-white/[0.06] font-mono">
                      <span className="text-purple-400 group-hover/pdf:underline flex items-center gap-1 font-sans">
                        View Certificate <Eye className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/pdf:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <Eye className="w-4 h-4 text-purple-300" />
                      <span>View PDF Certificate</span>
                    </div>
                  </div>

                  {/* 1. Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* 2. Year & Issuer Info */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                    <span className="font-semibold text-neutral-200">
                      {cert.issuer}
                    </span>
                    <span className="text-neutral-600">·</span>
                    <div className="flex items-center gap-1 font-mono-accent text-purple-300">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>Year {cert.year}</span>
                    </div>
                  </div>

                  {/* Category & Credential ID */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-4 pt-2 border-t border-white/[0.05]">
                    {cert.credentialId && (
                      <button
                        onClick={(e) => handleCopyId(e, cert.credentialId)}
                        title="Click to copy Credential ID"
                        className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        <span>ID: {cert.credentialId}</span>
                        {isCopied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-60" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Actions: View PDF & Download PDF */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 sm:gap-2.5">
                  <button
                    onClick={() => handleOpenCert(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-purple-400/40 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer group/view whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400 group-hover/view:scale-110 transition-transform" />
                    <span>View PDF</span>
                  </button>

                  <button
                    onClick={(e) => handleDownload(e, cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Fallback Internal Modal if onSelectCert is not passed */}
      {!onSelectCert && (
        <CertificationPdfModal
          cert={internalSelectedCert}
          onClose={() => setInternalSelectedCert(null)}
        />
      )}
    </section>
  );
};
