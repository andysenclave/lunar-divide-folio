'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv, MotionH2, MotionP, MotionSpan } from '@/components/motion';

const HeroContent = () => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="text-center mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Pre-title badge */}
      <MotionSpan
        className="inline-block text-[11px] font-semibold tracking-[0.3em] mb-6 px-4 py-2 rounded-full"
        style={{
          color: colors.warning,
          border: `1px solid ${colors.warning}30`,
          background: `${colors.warning}10`,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        THE NEXT HORIZON
      </MotionSpan>

      {/* Main title */}
      <MotionH2
        className="text-[clamp(32px,6vw,56px)] font-bold leading-[1.15] mb-6"
        style={{ color: colors.text }}
      >
        <span className="block">
          Let&apos;s{' '}
<span className="text-gradient-brand">innovate</span>
        </span>
        <span className="block">together.</span>
      </MotionH2>

      {/* Subtitle */}
      <MotionP
        className="text-[clamp(14px,2vw,18px)] max-w-125 mx-auto leading-relaxed"
        style={{ color: colors.textSecondary }}
      >
        Senior Technical Lead with 12+ years of experience, seeking the next
        chapter across the globe.
      </MotionP>
    </MotionDiv>
  );
};

export default HeroContent;
