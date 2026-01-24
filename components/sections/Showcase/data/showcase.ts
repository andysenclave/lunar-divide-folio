import type { ShowcaseData, FilterItem } from '../types';

export const FILTERS: FilterItem[] = [
  { id: 'all', label: 'All', icon: '◈' },
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'certifications', label: 'Certifications', icon: '🏆' },
  { id: 'github', label: 'GitHub', icon: '⌨' },
  { id: 'designs', label: 'Design Snaps', icon: '🎨' },
];

export const SHOWCASE: ShowcaseData = {
  featured: [
    {
      id: 'portfolio',
      title: 'Two Sides of the Moon',
      subtitle: 'Personal Portfolio',
      description:
        'An Awwwards-caliber portfolio showcasing my dual identity as an engineer and adventure content creator. Features interactive globe, scroll-driven animations, and the signature moon concept.',
      image: null,
      tags: ['Next.js 15', 'Framer Motion', 'Three.js', 'D3.js'],
      links: {
        live: '#',
        github: 'https://github.com/anindya/portfolio',
      },
      type: 'engineering',
      status: 'In Progress',
    },
    {
      id: 'localoi',
      title: 'Localoi',
      subtitle: 'Local Business Platform',
      description:
        'A platform connecting local businesses with communities through technology. Helping small businesses compete against platform giants.',
      image: null,
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      links: {
        live: 'https://localoi.com',
      },
      type: 'engineering',
      status: 'Active',
    },
  ],
  certifications: [
    {
      id: 'gh-300',
      title: 'GitHub Copilot',
      code: 'GH-300',
      issuer: 'GitHub',
      issuerLogo: '🐙',
      badgeImage: '/badges/github-copilot.svg',
      description:
        'Certified in AI-assisted development with GitHub Copilot. Demonstrates expertise in prompt engineering, code generation, and AI pair programming workflows.',
      score: 92,
      passingScore: 70,
      earnedDate: 'January 2025',
      validUntil: 'January 2028',
      credentialId: 'GH-300-2025-XXXX',
      skills: [
        'AI Pair Programming',
        'Prompt Engineering',
        'Code Generation',
        'GitHub Copilot Enterprise',
      ],
      highlights: [
        'Scored 92% on certification exam',
        'Top performer in code generation patterns',
        'Expert in enterprise deployment scenarios',
      ],
      verifyUrl: 'https://www.credly.com/badges/xxx',
      featured: true,
      category: 'AI Development',
    },
  ],
  github: [
    {
      id: 'react-component-lib',
      title: 'React Component Library',
      description:
        'A collection of reusable, accessible React components with Storybook documentation.',
      stars: 24,
      forks: 8,
      language: 'TypeScript',
      tags: ['React', 'TypeScript', 'Storybook'],
      url: 'https://github.com/anindya/react-components',
    },
    {
      id: 'node-api-starter',
      title: 'Node.js API Starter',
      description:
        'Production-ready Express.js boilerplate with authentication, logging, and Docker setup.',
      stars: 45,
      forks: 12,
      language: 'JavaScript',
      tags: ['Node.js', 'Express', 'Docker'],
      url: 'https://github.com/anindya/node-api-starter',
    },
    {
      id: 'graphql-toolkit',
      title: 'GraphQL Toolkit',
      description:
        'Utilities and helpers for building GraphQL APIs with schema stitching and caching.',
      stars: 18,
      forks: 5,
      language: 'TypeScript',
      tags: ['GraphQL', 'Apollo', 'TypeScript'],
      url: 'https://github.com/anindya/graphql-toolkit',
    },
    {
      id: 'cli-tools',
      title: 'Developer CLI Tools',
      description:
        'Collection of CLI utilities for automating repetitive development tasks.',
      stars: 31,
      forks: 7,
      language: 'JavaScript',
      tags: ['Node.js', 'CLI', 'Automation'],
      url: 'https://github.com/anindya/cli-tools',
    },
  ],
  designs: [
    {
      id: 'hero-mockup-1',
      title: 'Hero Section - Neutral State',
      description: 'Moon in center with dual-side labels',
      image: '/Screenshot_1.png',
    },
    {
      id: 'hero-mockup-2',
      title: 'Hero Section - Engineering Hover',
      description: 'Left side hover reveals engineering persona',
      image: '/Screenshot_2_Hover_Left.png',
    },
    {
      id: 'hero-mockup-3',
      title: 'Hero Section - Adventure Hover',
      description: 'Right side hover reveals adventure persona',
      image: '/Screenshot_2_Hover_Right.png',
    },
  ],
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#ED8B00',
};
