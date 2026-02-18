import { cdn } from '@/config';
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
      image: cdn.showcase('two-sides-of-moon.png'),
      tags: ['Next.js 15', 'Framer Motion', 'Three.js', 'D3.js'],
      links: {
        live: '#',
        github: 'https://github.com/anindya/portfolio',
      },
      type: 'engineering',
      status: 'Active',
    },
    {
      id: 'localoi',
      title: 'Localoi',
      subtitle: 'Local Business Platform',
      description:
        'A platform connecting local businesses with communities through technology. Helping small businesses compete against platform giants.',
      image: cdn.showcase('localoi.png'),
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      links: {
        live: 'https://localoi.com',
      },
      type: 'engineering',
    },
  ],
  certifications: [
    {
      id: 'gh-300',
      title: 'GitHub Copilot',
      code: 'GH-300',
      issuer: 'GitHub',
      issuerLogo: '🐙',
      badgeImage: cdn.badge('github-copilot.svg'),
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
      id: 'localoi-landing',
      title: 'Localoi — Landing Page',
      subtitle:
        "A comprehensive landing page designed to introduce Locali to all user types, clearly communicating the platform's purpose, functionality, value proposition, and stakeholders through an intuitive and informative first-touch experience.",
      description:
        "A comprehensive landing page designed to introduce Locali to all user types, clearly communicating the platform's purpose, functionality, value proposition, and stakeholders through an intuitive and informative first-touch experience.",
      detail:
        "The Localoi landing page was designed as the primary entry point for all user segments, ensuring a clear and engaging introduction to the platform. The goal was to communicate what Locali does, how it works, and the value it brings to users and local stakeholders through a structured storytelling approach. The design focuses on intuitive navigation, concise information hierarchy, and guided user flow to help visitors quickly understand the platform's ecosystem. Every section was crafted to balance product explanation with conversion-focused design principles.",
      image: cdn.showcase('localoi-landing-page.png'),
    },
    {
      id: 'localoi-dashboard',
      title: 'Localoi — Admin Dashboard',
      subtitle:
        'A data-driven admin dashboard created in collaboration with key stakeholders to provide real-time insights into onboarding trends, product sales, category performance, and localized commerce analytics for informed decision-making.',
      description:
        'A data-driven admin dashboard created in collaboration with key stakeholders to provide real-time insights into onboarding trends, product sales, category performance, and localized commerce analytics for informed decision-making.',
      detail:
        'The Localoi admin dashboard was developed through close collaboration with business stakeholders to translate operational needs into actionable visual insights. The interface provides real-time analytics such as daily shop onboarding, product sales performance, category trends, and region-specific demand patterns. Emphasis was placed on clarity, quick decision-making, and data accessibility for non-technical users managing marketplace operations. The design enables administrators to monitor growth, identify opportunities, and make data-driven business decisions efficiently.',
      image: cdn.showcase('localoi-admin-dashboard.png'),
    },
    {
      id: 'overhear-podcast',
      title: 'Overhear.in — Podcast App',
      subtitle:
        'A forward-thinking podcast platform concept envisioned in 2018, designed as a radio-like experience offering 24/7 genre-based audio streaming with subscriptions, along with accessible features such as subtitles and transcripts for seamless listening anywhere.',
      description:
        'A forward-thinking podcast platform concept envisioned in 2018, designed as a radio-like experience offering 24/7 genre-based audio streaming with subscriptions, along with accessible features such as subtitles and transcripts for seamless listening anywhere.',
      detail:
        "Overhear.in was a concept project envisioned in 2018, inspired by the traditional radio experience and reimagined for the digital era before podcasts became mainstream. The platform was designed to offer continuous, genre-based audio streaming where users could subscribe to channels and listen anytime, similar to tuning into a personalized radio station. Accessibility was a key focus, with features like subtitles and transcripts allowing users to follow content even when active listening wasn't possible. The design explored how long-form audio content could become more discoverable, immersive, and convenient on mobile devices.",
      image: cdn.showcase('overhear-in-app.png'),
    },
    {
      id: 'thimple-solutions',
      title: 'Thimple Solutions — SaaS Platform',
      subtitle:
        'A unified SaaS platform designed to onboard and manage multiple applications with built-in CMS, AI capabilities, multi-language support, and advanced authentication and authorization management through an intuitive operational dashboard.',
      description:
        'A unified SaaS platform designed to onboard and manage multiple applications with built-in CMS, AI capabilities, multi-language support, and advanced authentication and authorization management through an intuitive operational dashboard.',
      detail:
        'Thimple Solutions Private Limited was designed as a unified SaaS platform enabling businesses to onboard and manage multiple applications within a single ecosystem. The platform provides built-in capabilities such as CMS integration, multi-language and internationalization support, AI-powered features, and a complete authentication and authorization framework with configurable entitlement rules. The design focused on simplifying complex platform operations through a clear onboarding experience and an intuitive operational dashboard. Both the landing experience and admin interface were crafted to help organizations efficiently manage applications, users, and content at scale while maintaining flexibility and security.',
      image: cdn.showcase('thimple-solutions.png'),
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
