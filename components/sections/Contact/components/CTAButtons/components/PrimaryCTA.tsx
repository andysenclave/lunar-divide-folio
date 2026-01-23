'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionLink, MotionSpan } from '@/components/motion';
import { CTA_CONFIG } from '../../../data';

const PrimaryCTA = () => {
  const { colors } = useTheme();
  const mailtoHref = `mailto:${CTA_CONFIG.email}?subject=${encodeURIComponent(CTA_CONFIG.emailSubject)}`;

  return (
    <MotionLink
      href={mailtoHref}
      className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-base font-semibold no-underline transition-all duration-400"
      style={{
        background: `linear-gradient(135deg, ${colors.cyan} 0%, #0099CC 100%)`,
        color: colors.bg,
        boxShadow: `0 10px 40px ${colors.cyanGlow}`,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 20px 60px ${colors.cyanGlow}`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-xl" aria-hidden="true">
        ✉
      </span>
      <span>Get in Touch</span>
      <MotionSpan
        className="text-lg"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        →
      </MotionSpan>
    </MotionLink>
  );
};

export default PrimaryCTA;
