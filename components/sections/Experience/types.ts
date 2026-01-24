// Experience Section Types
// ============================================

export type SideType = 'engineering' | 'adventure';
export type TabType = 'expertise' | 'profession' | 'tools';

export interface Skill {
  name: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: Skill[];
}

export interface Tool {
  name: string;
  icon: string;
  category: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ExperienceState {
  activeTab: TabType;
  activeSide: SideType;
}
