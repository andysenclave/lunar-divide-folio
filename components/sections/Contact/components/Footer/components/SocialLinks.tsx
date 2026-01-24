'use client';

import type { ReactNode } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionLink } from '@/components/motion';
import { SOCIAL_LINKS } from '../../../data';
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
  InstagramIcon,
} from '../../CTAButtons/components/Icons';

const ICON_MAP: Record<string, ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  youtube: <YouTubeIcon />,
  instagram: <InstagramIcon />,
};

const SocialLinks = () => {
  const { colors } = useTheme();

  return (
    <nav className="flex gap-2.5" aria-label="Social media links">
      {SOCIAL_LINKS.map((social) => (
        <MotionLink
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full no-underline transition-all duration-300"
          style={{
            border: `1px solid ${colors.border}`,
            color: colors.textMuted,
          }}
          whileHover={{
            color: colors.cyan,
            borderColor: colors.cyan,
            y: -3,
          }}
          aria-label={social.name}
        >
          {ICON_MAP[social.id]}
        </MotionLink>
      ))}
    </nav>
  );
};

export default SocialLinks;
