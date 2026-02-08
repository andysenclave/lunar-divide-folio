// Contact Links Data
// ============================================

import type { FooterLink } from '../types';

export const FOOTER_LINKS: FooterLink[] = [
  { name: 'Home', href: '#', isScrollToTop: true },
  { name: 'Journey', href: '#journey' },
  { name: 'Experience', href: '#experience' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = [
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/andysenclave',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/andysenclave',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    href: 'https://twitter.com/andysenclave',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://youtube.com/@andysenclave',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://instagram.com/andysenclave',
  },
] as const;

export const CTA_CONFIG = {
  email: 'hello@anindya.dev',
  emailSubject: "Let's Connect",
  resumePath: '/resume.pdf',
} as const;
