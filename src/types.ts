export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export type VisualType = "3d" | "portrait";

export type ProjectCategoryFilter =
  | "All"
  | "Web Design"
  | "E-Commerce"
  | "Dashboard";

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: "Web Design" | "E-Commerce" | "Dashboard";
  year: string;
  description: string;
  detailedDescription?: string;
  image: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  link?: string;
  github?: string;
}

export interface ProjectSnippet {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

export type CertificationCategoryFilter =
  | "All"
  | "Cloud Computing / Microsoft Azure"
  | "Business Applications / Low-Code Development (Microsoft Power Platform)"
  | "Cybersecurity / Security, Compliance, and Identity (SC-900)"
  | "Full-Stack Web Development"
  | "Cybersecurity / Security, Compliance, and Identity (SC-900)";

export interface Certification {
  id: string;
  title: string;
  year: string;
  issuer: string;
  credentialId: string;
  category:
    | "Cloud Computing / Microsoft Azure"
    | "Business Applications / Low-Code Development (Microsoft Power Platform)"
    | "Cybersecurity / Security, Compliance, and Identity (SC-900)"
    | "Full-Stack Web Development"
    | "Artificial Intelligence / Cloud Computing"
    | string;
  pdfFileName: string;
  pdfUrl: string;
}
