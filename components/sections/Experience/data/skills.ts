import type { SkillCategory, SideType } from '../types';

export const SKILL_CATEGORIES: Record<SideType, SkillCategory[]> = {
  engineering: [
    {
      id: 'frontend',
      name: 'Frontend Architecture',
      icon: '\u269B', // Atom symbol
      description: 'Building scalable, accessible UIs',
      skills: [
        { name: 'React', level: 95, years: 7 },
        { name: 'Next.js', level: 92, years: 4 },
        { name: 'TypeScript', level: 90, years: 5 },
        { name: 'Redux', level: 88, years: 6 },
        { name: 'Framer Motion', level: 85, years: 3 },
      ],
    },
    {
      id: 'backend',
      name: 'Backend & APIs',
      icon: '\u26A1', // Lightning
      description: 'Designing robust service architectures',
      skills: [
        { name: 'Node.js', level: 92, years: 8 },
        { name: 'Express.js', level: 90, years: 8 },
        { name: 'GraphQL', level: 88, years: 5 },
        { name: 'REST APIs', level: 95, years: 10 },
        { name: 'PostgreSQL', level: 82, years: 6 },
      ],
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      icon: '\u2601', // Cloud
      description: 'CI/CD, deployment & infrastructure',
      skills: [
        { name: 'AWS', level: 85, years: 5 },
        { name: 'Docker', level: 88, years: 5 },
        { name: 'GitHub Actions', level: 90, years: 4 },
        { name: 'Jenkins', level: 82, years: 6 },
        { name: 'Kubernetes', level: 75, years: 3 },
      ],
    },
    {
      id: 'leadership',
      name: 'Technical Leadership',
      icon: '\uD83D\uDC65', // Team
      description: 'Leading teams, defining architecture',
      skills: [
        { name: 'Team Leadership', level: 95, years: 6 },
        { name: 'Code Review', level: 95, years: 8 },
        { name: 'Architecture', level: 90, years: 7 },
        { name: 'Mentoring', level: 92, years: 6 },
        { name: 'Agile/Scrum', level: 88, years: 8 },
      ],
    },
  ],
  adventure: [
    {
      id: 'video',
      name: 'Video Production',
      icon: '\uD83C\uDFAC', // Clapper
      description: 'Travel vlogs & storytelling',
      skills: [
        { name: 'DaVinci Resolve', level: 80, years: 3 },
        { name: 'Final Cut Pro', level: 75, years: 2 },
        { name: 'Color Grading', level: 78, years: 3 },
        { name: 'Motion Graphics', level: 70, years: 2 },
      ],
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '\uD83D\uDCF7', // Camera
      description: 'Travel & landscape photography',
      skills: [
        { name: 'Lightroom', level: 85, years: 5 },
        { name: 'Composition', level: 82, years: 6 },
        { name: 'Sony Alpha', level: 80, years: 4 },
        { name: 'Drone (DJI)', level: 78, years: 3 },
      ],
    },
    {
      id: 'audio',
      name: 'Audio & Podcasting',
      icon: '\uD83C\uDF99', // Microphone
      description: 'Audio stories & sound design',
      skills: [
        { name: 'Audio Recording', level: 75, years: 2 },
        { name: 'Podcast Editing', level: 72, years: 2 },
        { name: 'Sound Design', level: 68, years: 2 },
      ],
    },
  ],
};
