import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  ExternalLink,
  X,
  Printer,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Certification } from "../types";
import {
  downloadCertificatePdf,
  getCertificatePdfBlobUrl,
} from "../utils/certificatePdf";

interface CertificationPdfModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificationPdfModal: React.FC<CertificationPdfModalProps> = ({
  cert,
  onClose,
}) => {
  const [blobPdfUrl, setBlobPdfUrl] = useState<string | null>(null);

  // Generate in-memory PDF blob URL whenever cert changes
  useEffect(() => {
    if (cert) {
      try {
        const url = getCertificatePdfBlobUrl(cert);
        setBlobPdfUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error("Failed to create PDF blob:", err);
      }
    } else {
      setBlobPdfUrl(null);
    }
  }, [cert]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (cert) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [cert]);

  if (!cert) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadCertificatePdf(cert);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenInTab = () => {
    if (blobPdfUrl) {
      window.open(blobPdfUrl, "_blank");
    } else {
      window.open(cert.pdfUrl, "_blank");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#090912] border border-white/[0.14] shadow-[0_30px_80px_rgba(0,0,0,0.95)] p-4 sm:p-6 my-auto z-10 flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Top Right Dedicated Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-neutral-300 hover:text-white border border-white/[0.1] transition-colors z-30 cursor-pointer"
            aria-label="Close Certificate Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] mb-3 sm:mb-4 pr-11 sm:pr-14 gap-2.5 sm:gap-3">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0 mt-0.5 sm:mt-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-bold text-white leading-snug">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-neutral-400 mt-1">
                  <span className="font-semibold text-neutral-200">
                    {cert.issuer}
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="font-mono-accent text-purple-300">
                    Year {cert.year}
                  </span>
                  <span className="text-neutral-600">·</span>
                  {cert.credentialId && (
                    <span className="font-mono text-neutral-400">
                      ID: {cert.credentialId}
                    </span>
                  )}
                  <span className="text-neutral-600">·</span>
                  <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />{" "}
                    Verified PDF
                  </span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <button
                onClick={handleOpenInTab}
                title="Open PDF in new tab"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                <span>Open in Tab</span>
              </button>

              <button
                onClick={handlePrint}
                title="Print Certificate"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white border border-white/[0.1] text-xs font-semibold transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Certificate Document Display Container */}
          <div className="relative w-full flex-1 overflow-y-auto max-h-[calc(90vh-140px)] rounded-xl sm:rounded-2xl p-1 sm:p-2">
            {/* The Certificate Sheet: Structured box-model with real CSS borders so content NEVER overflows or overlaps */}
            <div className="w-full rounded-2xl bg-[#0c0c18] border-2 border-amber-500/50 p-2.5 sm:p-4 shadow-2xl relative">
              {/* Inner Ornate Gold Border Frame */}
              <div className="w-full rounded-xl border border-amber-500/30 p-3 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-6 relative bg-gradient-to-b from-white/[0.02] via-transparent to-black/30">
                {/* 1. Certificate Top Authority Header */}
                <div className="text-center pt-1">
                  <div className="text-[9px] sm:text-xs font-mono-accent tracking-widest text-neutral-400 uppercase">
                    Official Verified Certificate of Accreditation
                  </div>

                  <div className="text-lg sm:text-2xl font-extrabold text-white mt-1 sm:mt-1.5 tracking-wide uppercase font-display">
                    {cert.issuer}
                  </div>

                  <div className="w-20 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-1.5 mb-2.5 sm:mb-3" />

                  <div className="text-[11px] sm:text-xs text-neutral-300 italic font-serif">
                    This is to certify that
                  </div>

                  {/* Recipient Name */}
                  <div className="text-xl sm:text-3xl font-extrabold text-white mt-1 tracking-wider uppercase font-display">
                    Bryan Tapel
                  </div>

                  <div className="w-28 sm:w-44 h-[1px] bg-indigo-500/50 mx-auto mt-1 mb-1 sm:mb-2" />
                </div>

                {/* 2. Certificate Body Content */}
                <div className="text-center py-1 sm:py-2 px-2 sm:px-6">
                  <div className="text-[11px] sm:text-xs text-neutral-300">
                    has successfully demonstrated verified competency and
                    mastery in
                  </div>

                  {/* Certification Title */}
                  <div className="text-base sm:text-xl md:text-2xl font-bold text-amber-200 mt-1.5 leading-snug">
                    {cert.title}
                  </div>

                  <div className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 font-mono">
                    Specialization: {cert.category} &nbsp;•&nbsp; Conferred
                    Year: {cert.year}
                  </div>

                  {/* Official Gold Seal Graphic */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-500/10 border-2 border-amber-500/50 flex flex-col items-center justify-center mx-auto mt-3 sm:mt-4 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <span className="text-[7px] font-bold text-amber-400 font-mono tracking-tighter mt-0.5">
                      VERIFIED
                    </span>
                    <span className="text-[6px] text-amber-500/80 font-mono">
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* 3. Certificate Signatures & Verification Registry Block */}
                <div className="pt-3 sm:pt-4 border-t border-white/[0.08] mt-1">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center pb-2.5">
                    <div>
                      <div className="w-24 sm:w-36 h-[1px] bg-neutral-600 mx-auto mb-1.5" />
                      <div className="text-[10px] sm:text-xs font-semibold text-neutral-200">
                        {cert.issuer}
                      </div>
                      <div className="text-[8px] sm:text-[10px] text-neutral-500">
                        Authorized Certification Board
                      </div>
                    </div>
                    <div>
                      <div className="w-24 sm:w-36 h-[1px] bg-neutral-600 mx-auto mb-1.5" />
                      <div className="text-[10px] sm:text-xs font-semibold text-neutral-200">
                        Year {cert.year}
                      </div>
                      <div className="text-[8px] sm:text-[10px] text-neutral-500">
                        Digital Credential Registry
                      </div>
                    </div>
                  </div>

                  {/* Bottom Credential ID & Status Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-white/[0.05] text-[10px] sm:text-[11px] text-neutral-400 font-mono gap-1 text-center sm:text-left">
                    {cert.credentialId && (
                      <span>Credential ID: {cert.credentialId}</span>
                    )}
                    <span className="text-emerald-400 flex items-center gap-1 justify-center">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />{" "}
                      Digital Signature Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2.5 sm:pt-3 mt-1 sm:mt-2 text-[11px] text-neutral-400 gap-1 border-t border-white/[0.06]">
            <span className="font-mono text-[10px] sm:text-[11px] truncate max-w-[280px] sm:max-w-md">
              {cert.pdfFileName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-neutral-500 font-mono-accent">
              Conferred to Bryan Tapel · {cert.year}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
