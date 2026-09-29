import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  ExternalLink,
  X,
  Award,
  Printer,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import { CERTIFICATIONS_DATA } from "../data/portfolioData";
import { Certification } from "../types";

interface CertificationsSectionProps {
  onContactClick?: () => void;
}

interface CertDetail {
  specialization: string;
  issueDate: string;
  honors: string;
  board: string;
  issuerCode: string;
  sealColor: string;
  accentColor: string;
}

const CERT_DETAILS_MAP: Record<string, CertDetail> = {
  "cert-aws-solutions-architect": {
    specialization: "Cloud Architecture & Infrastructure",
    issueDate: "January 2025",
    honors: "Official Score 890 / 1000",
    board: "Amazon Web Services Authorized Certification Board",
    issuerCode: "AMAZON WEB SERVICES",
    sealColor: "from-amber-400 via-amber-500 to-yellow-600",
    accentColor: "#f59e0b",
  },
  "cert-meta-frontend-developer": {
    specialization: "Engineering & Frameworks Architecture",
    issueDate: "August 2024",
    honors: "With Honors (98.4% Academic Distinction)",
    board: "Meta Authorized Certification Board",
    issuerCode: "META PLATFORMS, INC.",
    sealColor: "from-blue-400 via-indigo-500 to-purple-600",
    accentColor: "#3b82f6",
  },
  "cert-google-ux-design": {
    specialization: "UI/UX Systems & Prototyping Craft",
    issueDate: "March 2024",
    honors: "Distinction in Usability Testing & Design Systems",
    board: "Google Authorized Certification Board",
    issuerCode: "GOOGLE LLC",
    sealColor: "from-emerald-400 via-teal-500 to-cyan-600",
    accentColor: "#10b981",
  },
  "cert-threejs-shaders-mastery": {
    specialization: "3D Graphics, GLSL Shaders & Creative Coding",
    issueDate: "November 2024",
    honors: "Advanced Spatial Mastery & GLSL Optimization",
    board: "Bruno Simon & WebGL Academy Authorized Board",
    issuerCode: "BRUNO SIMON & WEBGL ACADEMY",
    sealColor: "from-purple-400 via-violet-500 to-indigo-600",
    accentColor: "#a855f7",
  },
  "cert-advanced-typescript-react": {
    specialization: "Enterprise Engineering & Large-Scale Systems",
    issueDate: "May 2023",
    honors: "Professional Architecture Masterclass",
    board: "Frontend Masters Authorized Certification Board",
    issuerCode: "FRONTEND MASTERS",
    sealColor: "from-rose-400 via-pink-500 to-red-600",
    accentColor: "#ef4444",
  },
  "cert-ixdf-interaction-design": {
    specialization: "Cognitive Usability & Human Factors",
    issueDate: "February 2023",
    honors: "Top 10% Global Rank Across Designers",
    board: "Interaction Design Foundation (IxDF) Board",
    issuerCode: "INTERACTION DESIGN FOUNDATION (IXDF)",
    sealColor: "from-amber-400 via-yellow-500 to-amber-600",
    accentColor: "#eab308",
  },
};

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onContactClick,
}) => {
  const [selectedCertForPdf, setSelectedCertForPdf] =
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

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedCertForPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCertForPdf]);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handlePrintCertificate = () => {
    if (!selectedCertForPdf) return;
    const detail = CERT_DETAILS_MAP[selectedCertForPdf.id] || {
      specialization: selectedCertForPdf.category,
      issueDate: `Conferred ${selectedCertForPdf.year}`,
      honors: "Verified Credential",
      board: `${selectedCertForPdf.issuer} Certification Board`,
      issuerCode: selectedCertForPdf.issuer.toUpperCase(),
      sealColor: "from-amber-400 to-amber-600",
      accentColor: "#f59e0b",
    };

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${selectedCertForPdf.title} - Bryan Tapel</title>
          <style>
            @page { size: landscape; margin: 12mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              background-color: #0b0c16;
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cert-box {
              width: 100%;
              max-width: 960px;
              border: 3px double #d4af37;
              padding: 40px;
              text-align: center;
              background: radial-gradient(circle at 50% 50%, #111222 0%, #080912 100%);
              position: relative;
            }
            .cert-header {
              font-size: 11px;
              letter-spacing: 4px;
              text-transform: uppercase;
              color: #d4af37;
              margin-bottom: 8px;
            }
            .issuer {
              font-size: 22px;
              font-weight: 800;
              letter-spacing: 2px;
              color: #ffffff;
              margin-bottom: 24px;
            }
            .certify-text {
              font-size: 13px;
              font-style: italic;
              color: #a0a0b0;
              margin-bottom: 8px;
            }
            .recipient {
              font-size: 32px;
              font-weight: 800;
              letter-spacing: 3px;
              color: #e5c158;
              margin-bottom: 16px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #ffffff;
              margin: 16px 0 8px 0;
            }
            .meta {
              font-size: 12px;
              color: #94a3b8;
              margin-bottom: 24px;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 40px;
              border-top: 1px solid rgba(212, 175, 55, 0.3);
              padding-top: 20px;
              font-size: 11px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <div class="cert-header">Official Verified Certificate of Accreditation</div>
            <div class="issuer">${detail.issuerCode}</div>
            <div class="certify-text">This is to certify that</div>
            <div class="recipient">BRYAN TAPEL</div>
            <div class="certify-text">has successfully demonstrated verified competency and mastery in</div>
            <div class="title">${selectedCertForPdf.title}</div>
            <div class="meta">${detail.specialization} &bull; ${detail.issueDate} &bull; ${detail.honors}</div>
            <div class="footer">
              <div>
                <strong>${detail.board}</strong><br/>
                Official Cryptographic Attestation
              </div>
              <div>
                <strong>Credential ID: ${selectedCertForPdf.credentialId}</strong><br/>
                Status: Verified &bull; Active
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section
      id="certifications"
      className="relative z-10 w-full py-14 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-purple-600/10 blur-[100px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-blue-600/10 blur-[100px] sm:blur-[110px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-8 mb-8 sm:mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[10px] sm:text-xs font-mono-accent uppercase tracking-widest text-purple-400">
              {CERTIFICATIONS_DATA.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-4">
            {CERTIFICATIONS_DATA.heading}
          </h2>
        </div>

        {/* Filter by Year */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 no-scrollbar self-start md:self-auto w-full md:w-auto">
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
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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

      {/* Grid of Certification Cards Displaying Title, Year & PDF File */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7"
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
                {/* Top Subtle Accent Rim */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-purple-500/50 transition-colors" />

                <div>
                  {/* Visual PDF File Certificate Cover / Document Preview */}
                  <div
                    onClick={() => setSelectedCertForPdf(cert)}
                    className="relative w-full aspect-[16/10] mb-3.5 sm:mb-5 rounded-xl sm:rounded-2xl bg-[#0e0e18] border border-white/[0.1] hover:border-purple-400/50 overflow-hidden cursor-pointer group/pdf p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-inner"
                  >
                    {/* Certificate Mockup Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40 pointer-events-none" />

                    {/* Decorative certificate border lines */}
                    <div className="absolute inset-2 border border-amber-500/25 rounded-xl pointer-events-none" />
                    <div className="absolute inset-2.5 border border-white/[0.05] rounded-lg pointer-events-none" />

                    {/* PDF Document Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold font-mono tracking-wider uppercase">
                        <FileText className="w-3 h-3 text-rose-400" />
                        <span>PDF File</span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono-accent text-neutral-400">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span className="font-semibold text-neutral-300">
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* PDF Certificate Center Seal & Authority */}
                    <div className="relative z-10 my-auto text-center px-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover/pdf:scale-110 transition-transform">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                      </div>
                      <div className="text-[9px] sm:text-[11px] font-mono-accent text-neutral-400 uppercase tracking-widest">
                        {cert.issuer}
                      </div>
                      <div className="text-xs font-semibold text-white/90 line-clamp-1 mt-0.5">
                        {cert.title}
                      </div>
                    </div>

                    {/* PDF Footer Bar */}
                    <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-500 pt-1 border-t border-white/[0.06] font-mono">
                      <span className="text-purple-400 group-hover/pdf:underline flex items-center gap-1 font-sans">
                        Preview PDF <Eye className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Hover Overlay with "Click to View PDF" Prompt */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/pdf:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <Eye className="w-4 h-4 text-purple-300" />
                      <span>View PDF Certificate</span>
                    </div>
                  </div>

                  {/* 1. Title */}
                  <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5 sm:mb-2 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* 2. Year & Issuer Info */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2.5 sm:mb-3">
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
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-3 sm:mb-4 pt-2 border-t border-white/[0.05]">
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

                {/* 3. PDF File Actions: View PDF & Download PDF */}
                <div className="pt-2.5 sm:pt-3 border-t border-white/[0.06] flex items-center gap-2 sm:gap-2.5">
                  {/* View PDF Button */}
                  <button
                    onClick={() => setSelectedCertForPdf(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-purple-400/40 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer group/view whitespace-nowrap"
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
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
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

      {/* High-Fidelity Verified Certificate Modal (Mobile-Optimized & Rendered via Portal to document.body) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCertForPdf &&
              (() => {
                const detail = CERT_DETAILS_MAP[selectedCertForPdf.id] || {
                  specialization: selectedCertForPdf.category,
                  issueDate: `Conferred ${selectedCertForPdf.year}`,
                  honors: "Verified Credential Mastery",
                  board: `${selectedCertForPdf.issuer} Authorized Board`,
                  issuerCode: selectedCertForPdf.issuer.toUpperCase(),
                  sealColor: "from-amber-400 via-yellow-500 to-amber-600",
                  accentColor: "#f59e0b",
                };

                return (
                  <div
                    key="cert-modal-root"
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 md:p-8 select-text overflow-y-auto"
                  >
                    {/* Backdrop with strong blur and darkness */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedCertForPdf(null)}
                      className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 16 }}
                      transition={{
                        type: "spring",
                        damping: 28,
                        stiffness: 320,
                      }}
                      className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#090912] border border-white/[0.14] shadow-[0_30px_90px_rgba(0,0,0,0.98)] p-2.5 sm:p-6 my-auto z-10 flex flex-col max-h-[96vh] sm:max-h-[94vh] overflow-hidden"
                    >
                      {/* Top Header Bar matching reference image with compact mobile styling */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 sm:pb-4 border-b border-white/[0.08] mb-2 sm:mb-4 pr-9 sm:pr-14 gap-2 sm:gap-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0 mt-0.5 shadow-sm">
                            <FileText className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-rose-400" />
                          </div>
                          <div className="min-w-0 pr-2">
                            <h3 className="text-xs sm:text-lg font-bold text-white leading-snug line-clamp-1 sm:line-clamp-none">
                              {selectedCertForPdf.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[10px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1">
                              <span className="font-semibold text-neutral-200">
                                {selectedCertForPdf.issuer}
                              </span>
                              <span className="text-neutral-600">·</span>
                              <span className="font-mono-accent text-purple-300 font-semibold">
                                {selectedCertForPdf.year}
                              </span>
                              <span className="text-neutral-600 hidden xs:inline">
                                ·
                              </span>
                              {selectedCertForPdf.credentialId && (
                                <span className="font-mono text-neutral-400 hidden xs:inline truncate max-w-[100px] sm:max-w-none">
                                  ID: {selectedCertForPdf.credentialId}
                                </span>
                              )}
                              <span className="text-neutral-600">·</span>
                              <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />{" "}
                                Verified PDF
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Top Action Buttons: Open in Tab, Print, Download PDF */}
                        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-0 shrink-0">
                          <a
                            href={selectedCertForPdf.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open official PDF in a new tab"
                            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                            <span>Open in Tab</span>
                          </a>

                          <button
                            onClick={handlePrintCertificate}
                            title="Print Certificate"
                            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] text-xs font-semibold transition-all cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print</span>
                          </button>

                          <a
                            href={selectedCertForPdf.pdfUrl}
                            download={selectedCertForPdf.pdfFileName}
                            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-[11px] sm:text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
                          >
                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      </div>

                      {/* Dedicated Close Button in Top-Right */}
                      <button
                        onClick={() => setSelectedCertForPdf(null)}
                        className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 hover:text-white border border-white/[0.1] transition-colors z-30 cursor-pointer"
                        aria-label="Close PDF Viewer"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      {/* Certificate Viewer Document Canvas:
                      Fixed Flex Overflow Bug: Uses flex-col justify-start on mobile and m-auto on child so top content NEVER gets clipped! */}
                      <div className="relative w-full flex-1 overflow-y-auto overscroll-contain rounded-xl sm:rounded-2xl bg-[#07070e] border border-white/[0.1] shadow-2xl p-2 sm:p-6 md:p-8 flex flex-col items-center justify-start">
                        {/* The Certificate Sheet */}
                        <div className="relative w-full max-w-4xl my-auto bg-gradient-to-b from-[#0b0c18] via-[#080913] to-[#05060c] text-white rounded-xl sm:rounded-2xl border sm:border-2 border-amber-500/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-3.5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden shrink-0">
                          {/* Subtle guilloché security lattice lines in background */}
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

                          {/* Inner gold accent border with rounded corners */}
                          <div className="absolute inset-1.5 sm:inset-3 border border-amber-400/25 rounded-md sm:rounded-lg pointer-events-none" />
                          <div className="absolute inset-2.5 sm:inset-4 border border-white/[0.06] rounded sm:rounded-md pointer-events-none" />

                          {/* Four Decorative Corner Brackets (scaled for mobile & desktop) */}
                          {/* Top-Left */}
                          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-3.5 h-3.5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
                          {/* Top-Right */}
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-3.5 h-3.5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
                          {/* Bottom-Left */}
                          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-3.5 h-3.5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
                          {/* Bottom-Right */}
                          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-3.5 h-3.5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

                          {/* Top Accreditation Banner (properly visible from the very top on mobile!) */}
                          <div className="relative z-10 text-center pt-0.5 sm:pt-2">
                            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[8px] sm:text-xs font-mono-accent tracking-wider sm:tracking-widest text-amber-300 uppercase shadow-sm">
                              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                              <span>
                                Official Verified Certificate of Accreditation
                              </span>
                            </div>

                            {/* Issuer Large Wordmark */}
                            <div className="text-xs sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white mt-1.5 sm:mt-3 uppercase font-display">
                              {detail.issuerCode}
                            </div>

                            {/* Elegant divider */}
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-1.5 sm:my-3">
                              <div className="w-12 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rotate-45 bg-amber-400" />
                              <div className="w-12 sm:w-28 h-[1px] bg-gradient-to-l from-transparent via-amber-500/50 to-transparent" />
                            </div>

                            <div className="text-[9px] sm:text-xs text-neutral-400 italic">
                              This is to formally certify that
                            </div>

                            {/* Recipient Full Name */}
                            <div className="text-base sm:text-3xl md:text-4xl font-extrabold tracking-wider sm:tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 my-0.5 sm:my-2 font-display">
                              BRYAN TAPEL
                            </div>

                            <div className="text-[9px] sm:text-xs text-neutral-400 max-w-lg mx-auto leading-tight">
                              has successfully demonstrated verified competency,
                              technical rigor, and professional mastery in
                            </div>
                          </div>

                          {/* Center Certificate Title & Accolades */}
                          <div className="relative z-10 text-center my-2 sm:my-5 px-1 sm:px-2">
                            <h4 className="text-xs sm:text-2xl md:text-3xl font-extrabold text-amber-300 leading-tight max-w-2xl mx-auto font-display drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                              {selectedCertForPdf.title}
                            </h4>

                            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 text-[9px] sm:text-xs text-neutral-300 font-mono mt-1.5 sm:mt-2.5">
                              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08]">
                                Specialization: {detail.specialization}
                              </span>
                              <span className="hidden sm:inline text-neutral-600">
                                •
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08]">
                                Conferred: {selectedCertForPdf.year}
                              </span>
                              <span className="hidden sm:inline text-neutral-600">
                                •
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                                {detail.honors}
                              </span>
                            </div>
                          </div>

                          {/* Bottom Authentication & Seal Section */}
                          <div className="relative z-10 pt-2 sm:pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
                            {/* Left: Signatures & Certification Board */}
                            <div className="text-center sm:text-left order-2 sm:order-1">
                              <div className="font-serif italic text-xs sm:text-lg text-neutral-300 tracking-wider">
                                Bryan Tapel &bull; Academic Review Board
                              </div>
                              <div className="w-28 sm:w-44 h-[1px] bg-white/20 mx-auto sm:mx-0 my-0.5 sm:my-1" />
                              <div className="text-[9px] sm:text-xs font-semibold text-white">
                                {detail.board}
                              </div>
                            </div>

                            {/* Center: Official Metallic Gold Seal */}
                            <div className="order-1 sm:order-2 flex flex-col items-center">
                              <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-[1.5px] sm:p-[2px] shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center">
                                <div className="w-full h-full rounded-full bg-[#0d0e1b] flex flex-col items-center justify-center p-0.5 sm:p-1 border border-amber-400/60">
                                  <Award className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400" />
                                  <span className="text-[5px] sm:text-[7px] font-black tracking-tighter text-amber-300 font-mono">
                                    VERIFIED
                                  </span>
                                  <span className="text-[5px] sm:text-[6px] text-neutral-400 font-mono">
                                    {selectedCertForPdf.year}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[7px] sm:text-[9px] font-mono-accent text-amber-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                                OFFICIAL SEAL
                              </span>
                            </div>

                            {/* Right: Security ID, Verification Key & Status */}
                            <div className="text-center sm:text-right order-3">
                              <div className="flex items-center justify-center sm:justify-end gap-1 text-emerald-400 text-[10px] sm:text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Digital Verification: Active</span>
                              </div>
                              {selectedCertForPdf.credentialId && (
                                <div className="text-[9px] sm:text-xs font-mono text-neutral-300 mt-0.5">
                                  ID: {selectedCertForPdf.credentialId}
                                </div>
                              )}
                              <div className="text-[8px] sm:text-[10px] text-neutral-500 font-mono">
                                Authenticated PDF Registry &bull; Issued{" "}
                                {detail.issueDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Modal Footer Info Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 sm:pt-3 mt-1 text-[10px] sm:text-[11px] text-neutral-400 gap-1 border-t border-white/[0.06]">
                        <span className="text-[9px] sm:text-[11px] text-neutral-400 font-mono-accent">
                          Category: {selectedCertForPdf.category} · Conferred
                          Year {selectedCertForPdf.year}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};
