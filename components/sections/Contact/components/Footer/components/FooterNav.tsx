'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionLink } from '@/components/motion';
import { FOOTER_LINKS } from '../../../data';

const FooterNav = () => {
  const { colors } = useTheme();

  return (
    <nav
      className="flex justify-center gap-[clamp(16px,4vw,40px)] flex-wrap mb-8"
      aria-label="Footer navigation"
    >
      {FOOTER_LINKS.map((link, idx) => (
        <MotionLink
          key={link.name}
          href={link.href}
          className="text-xs font-medium tracking-[0.1em] uppercase no-underline transition-colors duration-300"
          style={{ color: colors.textSecondary }}
          whileHover={{ color: colors.cyan }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          {link.name}
        </MotionLink>
      ))}
    </nav>
  );
};

export default FooterNav;
