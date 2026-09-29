import { jsPDF } from "jspdf";
import { Certification } from "../types";

/**
 * Generates an official, high-resolution vector PDF certificate for a given certification.
 */
export const createCertificatePdfDoc = (cert: Certification): jsPDF => {
  // Landscape A4: 297mm x 210mm
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background deep dark / luxury parchment ivory-dark slate
  doc.setFillColor(12, 12, 18);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Outer ornate border
  doc.setDrawColor(212, 175, 55); // Rich gold
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner subtle border
  doc.setDrawColor(80, 80, 110);
  doc.setLineWidth(0.4);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Corner decorative flourishes
  const cornerSize = 8;
  const drawCorner = (x: number, y: number, xDir: number, yDir: number) => {
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.line(x, y, x + xDir * cornerSize, y);
    doc.line(x, y, x, y + yDir * cornerSize);
  };
  drawCorner(16, 16, 1, 1);
  drawCorner(pageWidth - 16, 16, -1, 1);
  drawCorner(16, pageHeight - 16, 1, -1);
  drawCorner(pageWidth - 16, pageHeight - 16, -1, -1);

  // Top Subtitle / Authority
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 190);
  doc.text(
    "OFFICIAL VERIFIED CERTIFICATE OF ACCREDITATION",
    pageWidth / 2,
    28,
    { align: "center" },
  );

  // Main Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(245, 245, 250);
  doc.text(cert.issuer.toUpperCase(), pageWidth / 2, 40, { align: "center" });

  // Thin separator rule
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 35, 45, pageWidth / 2 + 35, 45);

  // Certifies that text
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(180, 180, 200);
  doc.text("This is to certify that", pageWidth / 2, 57, { align: "center" });

  // Recipient Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text("BRYAN TAPEL", pageWidth / 2, 72, { align: "center" });

  // Recipient underline
  doc.setDrawColor(120, 100, 220);
  doc.setLineWidth(0.6);
  doc.line(pageWidth / 2 - 40, 76, pageWidth / 2 + 40, 76);

  // Has successfully completed...
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 180, 200);
  doc.text(
    "has successfully demonstrated verified competency and mastery in",
    pageWidth / 2,
    88,
    { align: "center" },
  );

  // Certification Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(230, 215, 140);
  doc.text(cert.title, pageWidth / 2, 102, { align: "center" });

  // Category & Year
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(160, 160, 180);
  doc.text(
    `Specialization: ${cert.category}   •   Conferred Year: ${cert.year}   •   Issue Date: ${cert.issueDate}`,
    pageWidth / 2,
    114,
    { align: "center" },
  );

  // Distinction (if any)
  if (cert.distinction) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(190, 160, 255);
    doc.text(`Honors / Distinction: ${cert.distinction}`, pageWidth / 2, 122, {
      align: "center",
    });
  }

  // Official Gold Seal graphic (vector drawn)
  const sealX = pageWidth / 2;
  const sealY = 145;
  doc.setFillColor(212, 175, 55);
  doc.circle(sealX, sealY, 14, "F");
  doc.setFillColor(28, 28, 38);
  doc.circle(sealX, sealY, 12.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(212, 175, 55);
  doc.text("VERIFIED", sealX, sealY - 2, { align: "center" });
  doc.text(cert.year, sealX, sealY + 3, { align: "center" });
  doc.setFontSize(5);
  doc.text("OFFICIAL SEAL", sealX, sealY + 7, { align: "center" });

  // Left Signature / Authority Block
  doc.setDrawColor(100, 100, 130);
  doc.setLineWidth(0.4);
  doc.line(35, 172, 85, 172);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 220);
  doc.text(cert.issuer, 60, 177, { align: "center" });
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 160);
  doc.text("Authorized Certification Board", 60, 182, { align: "center" });

  // Right Registrar / Date Block
  doc.line(pageWidth - 85, 172, pageWidth - 35, 172);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 220);
  doc.text(`Conferred ${cert.year}`, pageWidth - 60, 177, { align: "center" });
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 160);
  doc.text("Digital Credential Registry", pageWidth - 60, 182, {
    align: "center",
  });

  // Bottom Credential Verification ID
  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 150);
  doc.text(
    `Credential ID: ${cert.credentialId}   |   Digital Verification: ${cert.verificationUrl || "https://verify.credential.net"}`,
    pageWidth / 2,
    196,
    { align: "center" },
  );

  return doc;
};

/**
 * Generates and triggers download of the certificate PDF.
 */
export const downloadCertificatePdf = (cert: Certification) => {
  const doc = createCertificatePdfDoc(cert);
  doc.save(
    cert.pdfFileName || `${cert.title.replace(/\s+/g, "_")}_${cert.year}.pdf`,
  );
};

/**
 * Returns a blob URL to preview the certificate PDF in an iframe / object viewer.
 */
export const getCertificatePdfBlobUrl = (cert: Certification): string => {
  const doc = createCertificatePdfDoc(cert);
  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
};
