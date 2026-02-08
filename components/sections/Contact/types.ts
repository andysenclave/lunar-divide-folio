// Contact Section Types
// ============================================

import type { ReactNode } from 'react';

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: ReactNode;
  hoverColor?: string;
}

export interface FooterLink {
  name: string;
  href: string;
  isScrollToTop?: boolean;
}

export interface TargetLocation {
  id: string;
  name: string;
  country: string;
  flag: string;
  coords: { x: number; y: number };
  timezone: string;
}

export interface CTAButton {
  type: 'primary' | 'secondary';
  label: string;
  href: string;
  icon?: ReactNode;
  download?: boolean;
  external?: boolean;
}
