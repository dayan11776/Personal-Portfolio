export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export type VisualType = '3d' | 'portrait';

export type ProjectCategoryFilter = 'All' | 'Web Design' | 'Development' | 'Branding';

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Design' | 'Development' | 'Branding';
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
