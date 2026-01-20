export type SideType = 'engineering' | 'adventure';

export interface WorkExperience {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: SideType;
  current?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}
