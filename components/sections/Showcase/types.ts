// Showcase Section Types
// ============================================

export type FilterType =
  | 'all'
  | 'featured'
  | 'certifications'
  | 'github'
  | 'designs';

export type ProjectType = 'engineering' | 'adventure';
export type ProjectStatus = 'Active' | 'In Progress' | 'Completed';

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  tags: string[];
  links: ProjectLinks;
  type: ProjectType;
  status: ProjectStatus;
}

export interface Certification {
  id: string;
  title: string;
  code: string;
  issuer: string;
  issuerLogo: string;
  badgeImage?: string;
  description: string;
  score: number;
  passingScore: number;
  earnedDate: string;
  validUntil: string;
  credentialId: string;
  skills: string[];
  highlights: string[];
  verifyUrl?: string;
  featured: boolean;
  category: string;
}

export interface GitHubProject {
  id: string;
  title: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  url: string;
}

export interface DesignSnap {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ShowcaseData {
  featured: FeaturedProject[];
  certifications: Certification[];
  github: GitHubProject[];
  designs: DesignSnap[];
}

export interface FilterItem {
  id: FilterType;
  label: string;
  icon: string;
}
