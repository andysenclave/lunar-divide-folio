'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionLink, MotionButton } from '@/components/motion';
import { FOOTER_LINKS } from '../../../data';
import type { FooterLink } from '../../../types';

interface FooterNavLinkProps {
  link: FooterLink;
  index: number;
  color: string;
  hoverColor: string;
}

function FooterNavLink({ link, index, color, hoverColor }: FooterNavLinkProps) {
  const sharedStyles = {
    color,
  };

  const motionProps = {
    className:
      'text-xs font-medium tracking-[0.1em] uppercase no-underline transition-colors duration-300',
    style: sharedStyles,
    whileHover: { color: hoverColor },
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: index * 0.1 },
  } as const;

  if (link.isScrollToTop) {
    return (
      <MotionButton
        {...motionProps}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        style={{ ...sharedStyles, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {link.name}
      </MotionButton>
    );
  }

  return (
    <MotionLink href={link.href} {...motionProps}>
      {link.name}
    </MotionLink>
  );
}

export default function FooterNav() {
  const { colors } = useTheme();

  return (
    <nav
      className="flex justify-center gap-[clamp(16px,4vw,40px)] flex-wrap mb-8"
      aria-label="Footer navigation"
    >
      {FOOTER_LINKS.map((link, idx) => (
        <FooterNavLink
          key={link.name}
          link={link}
          index={idx}
          color={colors.textSecondary}
          hoverColor={colors.cyan}
        />
      ))}
    </nav>
  );
}
