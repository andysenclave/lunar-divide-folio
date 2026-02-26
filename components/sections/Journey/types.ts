// Journey Section Types
// ============================================

export interface ExperienceContent {
  intro: string;
  body: string;
  tags: string[];
}

export interface TechStackEntry {
  category: string;
  technologies: string[];
}

export interface ProfessionalData {
  projectDescription: string;
  domain: string;
  client?: string;
  employer?: string;
  location: string;
  employmentType: 'full-time' | 'contract' | 'co-founder' | 'freelance';
  team: {
    directReports?: number;
    totalTeam?: number;
    programSize?: number;
    structure?: string;
  };
  roleDescription: string;
  responsibilities: string[];
  achievements: string[];
  techStack: TechStackEntry[];
  certifications?: string[];
}

export interface Experience {
  id: string;
  type: 'engineering' | 'adventure';
  icon?: string;
  title: string;
  subtitle?: string;
  desc: string;
  date: string;
  featured?: boolean;
  funFact?: string;
  places?: string[];
  hasVideo?: boolean;
  hasPhotos?: boolean;
  images?: string[];
  videoLinks?: string[];
  highlightGif?: string;
  content: ExperienceContent;
  professional?: ProfessionalData;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  coords: [number, number];
  period: string;
  era: string;
  year: number;
  experiences: Experience[];
}

export interface MarkerLocation {
  id: string;
  coords: [number, number];
  type: 'engineering' | 'adventure';
}

export interface TimelineKeyframe {
  progress: number;
  scale: number;
  rotation: [number, number];
  locationId: string | null;
  year: number;
  era: string;
  cardVisibility: number[];
  isTransition: boolean;
  flightFrom?: [number, number];
  flightTo?: [number, number];
}

export interface FlightData {
  from: [number, number];
  to: [number, number];
  progress: number;
}

export interface JourneyState {
  scrollProgress: number;
  currentLocation: Location | null;
  visibleCards: number[];
  currentYear: number;
  currentEra: string;
  isAdventureMode: boolean;
  flightData: FlightData | null;
}

