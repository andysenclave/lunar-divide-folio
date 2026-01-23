'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionLink } from '@/components/motion';
import { CTA_CONFIG } from '../../../data';
import { LinkedInIcon, GitHubIcon, DownloadIcon } from './Icons';

const SecondaryCTA = () => {
  const { colors } = useTheme();

  const buttons = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/andysenclave',
      icon: <LinkedInIcon />,
      hoverColor: colors.cyan,
      external: true,
    },
    {
      id: 'resume',
      label: 'Resume',
      href: CTA_CONFIG.resumePath,
      icon: <DownloadIcon />,
      hoverColor: colors.orange,
      download: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/andysenclave',
      icon: <GitHubIcon />,
      hoverColor: colors.text,
      external: true,
    },
  ];

  return (
    <nav className="flex gap-3 flex-wrap justify-center" aria-label="Secondary actions">
      {buttons.map((button) => (
        <MotionLink
          key={button.id}
          href={button.href}
          download={button.download || undefined}
          target={button.external ? '_blank' : undefined}
          rel={button.external ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-medium no-underline transition-all duration-300"
          style={{
            background: 'transparent',
            border: `1px solid ${colors.border}`,
            color: colors.textSecondary,
          }}
          whileHover={{
            borderColor: button.hoverColor,
            color: button.hoverColor,
          }}
        >
          {button.icon}
          {button.label}
        </MotionLink>
      ))}
    </nav>
  );
};

export default SecondaryCTA;
