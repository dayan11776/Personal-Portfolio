import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  ShieldCheck,
  ExternalLink,
  X,
  Award,
  Printer,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { CERTIFICATIONS_DATA } from "../data/portfolioData";
import { Certification, CertificationCategoryFilter } from "../types";
import {
  downloadCertificatePdf,
  getCertificatePdfBlobUrl,
} from "../utils/certificatePdf";

interface CertificationsSectionProps {
  onContactClick?: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onContactClick,
}) => {
  const [selectedCertForPdf, setSelectedCertForPdf] =
    useState<Certification | null>(null);
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", "2026", "2022"];

  const filteredCerts =
    activeFilter === "All"
      ? CERTIFICATIONS_DATA.certifications
      : CERTIFICATIONS_DATA.certifications.filter(
          (c) => c.year === activeFilter,
        );

  // When a cert is selected for PDF viewing, create its Blob URL
  useEffect(() => {
    if (selectedCertForPdf) {
      try {
        const url = getCertificatePdfBlobUrl(selectedCertForPdf);
        setActivePdfUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error("Error creating PDF preview URL:", err);
      }
    } else {
      setActivePdfUrl(null);
    }
  }, [selectedCertForPdf]);

  const handleDownloadPdf = (e: React.MouseEvent, cert: Certification) => {
    e.stopPropagation();
    setDownloadingId(cert.id);
    try {
      downloadCertificatePdf(cert);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    } finally {
      setTimeout(() => {
        setDownloadingId(null);
      }, 1000);
    }
  };

  const handlePrintPdf = () => {
    if (!activePdfUrl) return;
    const iframe = document.getElementById(
      "pdf-preview-frame",
    ) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  return (
    <section
      id="certifications"
      className="relative z-10 w-full py-24 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-xs font-mono-accent uppercase tracking-widest text-purple-400">
              Verified Credentials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Certifications
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Officially verified accreditations with downloadable and viewable
            PDF certificates.
          </p>
        </div>

        {/* Filter by Year */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar self-start md:self-auto">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black font-bold shadow-lg"
                    : "bg-white/[0.03] hover:bg-white/[0.07] text-neutral-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                <span>{yearOption === "All" ? "All Years" : yearOption}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-black/15 text-neutral-900"
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

      {/* Grid of Certification Cards Displaying Title, Year & PDF File */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert, index) => {
            const isDownloading = downloadingId === cert.id;

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group flex flex-col justify-between rounded-3xl bg-[#090912]/80 border border-white/[0.09] hover:border-purple-500/40 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.15)] hover:-translate-y-1"
              >
                {/* Top Subtle Accent Rim */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-purple-500/50 transition-colors" />

                <div>
                  {/* Visual PDF File Certificate Cover / Document Preview */}
                  <div
                    onClick={() => setSelectedCertForPdf(cert)}
                    className="relative w-full aspect-[16/10] mb-5 rounded-2xl bg-[#0e0e18] border border-white/[0.1] hover:border-purple-400/50 overflow-hidden cursor-pointer group/pdf p-4 flex flex-col justify-between transition-all duration-300 shadow-inner"
                  >
                    {/* Elegant Certificate Document Mockup Background */}
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
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover/pdf:scale-110 transition-transform">
                        <Award className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-[11px] font-mono-accent text-neutral-400 uppercase tracking-widest">
                        {cert.issuer}
                      </div>
                      <div className="text-xs font-semibold text-white/90 line-clamp-1 mt-0.5">
                        {cert.title}
                      </div>
                    </div>

                    {/* Hover Overlay with "Click to View PDF" Prompt */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/pdf:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <Eye className="w-4 h-4 text-purple-300" />
                      <span>View PDF Certificate</span>
                    </div>
                  </div>

                  {/* 1. Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* 2. Year & Issuer Info */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-5">
                    <span className="font-semibold text-neutral-200">
                      {cert.issuer}
                    </span>
                    <span className="text-neutral-600">·</span>
                    <div className="flex items-center gap-1 font-mono-accent text-purple-300">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>Year {cert.year}</span>
                    </div>
                  </div>
                </div>

                {/* 3. PDF File Actions: View PDF & Download PDF */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5">
                  {/* View PDF Button */}
                  <button
                    onClick={() => setSelectedCertForPdf(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-purple-400/40 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer group/view"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400 group-hover/view:scale-110 transition-transform" />
                    <span>View PDF</span>
                  </button>

                  {/* Download PDF Button */}
                  <a
                    href={cert.pdfUrl}
                    download={cert.pdfFileName}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* PDF Certificate Document Viewer Modal */}
      <AnimatePresence>
        {selectedCertForPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertForPdf(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0a0a14]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] p-4 sm:p-6 my-auto z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                    <FileText className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {selectedCertForPdf.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                      <span>{selectedCertForPdf.issuer}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="font-mono-accent text-purple-300">
                        Year {selectedCertForPdf.year}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />{" "}
                        Verified PDF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedCertForPdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open PDF in new tab"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>

                  <button
                    onClick={handlePrintPdf}
                    title="Print Certificate"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>

                  <a
                    href={selectedCertForPdf.pdfUrl}
                    download={selectedCertForPdf.pdfFileName}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  <button
                    onClick={() => setSelectedCertForPdf(null)}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/[0.08] transition-colors ml-1"
                    aria-label="Close PDF Viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Canvas / Viewer Iframe */}
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[500px] rounded-2xl overflow-hidden bg-[#0c0c16] border border-white/[0.08] shadow-inner flex items-center justify-center">
                <iframe
                  id="pdf-preview-frame"
                  src={`${selectedCertForPdf.pdfUrl || activePdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={`${selectedCertForPdf.title} PDF`}
                  className="w-full h-full min-h-[420px] sm:min-h-[520px] border-0 rounded-2xl"
                />
              </div>

              {/* Modal Footer Info Bar */}
              <div className="flex items-center justify-between pt-3 mt-2 text-xs text-neutral-400">
                <span className="font-mono text-[11px] truncate max-w-[280px] sm:max-w-md">
                  {selectedCertForPdf.pdfFileName}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono-accent">
                  Conferred to Bryan Tapel · {selectedCertForPdf.year}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
