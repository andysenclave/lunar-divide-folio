'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

const IntroSection = () => {
  const { colors } = useTheme();

  return (
    <section
      className="h-screen flex flex-col items-center justify-center font-heading"
      style={{ background: colors.bg }}
    >
      <h1
        className="font-bold tracking-[0.1em] mb-4"
        style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.textSecondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        THE JOURNEY
      </h1>

      <p
        className="uppercase tracking-[0.15em] mb-2"
        style={{
          color: colors.textDim,
          fontSize: '16px',
        }}
      >
        From Present Day Back to the Beginning
      </p>

      <p
        className="tracking-[0.2em] mb-16"
        style={{
          color: colors.cyan,
          fontSize: '14px',
        }}
      >
        2026 — 2013
      </p>

      <div className="flex flex-col items-center gap-3">
        <span
          className="uppercase tracking-[0.2em]"
          style={{
            fontSize: '11px',
            color: colors.textDim,
          }}
        >
          SCROLL TO BEGIN
        </span>
        <MotionDiv
          className="w-px"
          style={{
            height: '50px',
            background: `linear-gradient(180deg, ${colors.cyan} 0%, transparent 100%)`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};

export default IntroSection;
