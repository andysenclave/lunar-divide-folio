'use client';

import { MotionValue, useTransform } from 'framer-motion';
import { MotionDiv } from '../../motion';
import { useTheme } from '@/theme/ThemeProvider';
import { ActiveSide } from '@/hooks';

interface GlobalBackgroundProps {
  children?: React.ReactNode;
  lastActiveSide: ActiveSide;
  scrollYProgress: MotionValue<number>;
}

const GlobalBackground = ({
  children,
  lastActiveSide,
  scrollYProgress,
}: { children?: React.ReactNode } & GlobalBackgroundProps) => {
  const { mode, colors } = useTheme();
  const bgAccentOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.03]);

  return (
    <section
      style={{
        minHeight: '300vh',
        position: 'relative',
        background: colors.bg,
        fontFamily: "'Sora', 'Inter', -apple-system, sans-serif",
        transition: 'background 0.4s ease',
      }}
    >
      <section
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          transition: 'all 0.4s ease',
        }}
      >
        {/* Base gradient */}
        <section
          style={{
            position: 'absolute',
            inset: 0,
            background:
              mode === 'dark'
                ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 50%, ${colors.bg} 100%)`
                : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 100%)`,
            transition: 'background 0.4s ease',
          }}
        />

        {/* Star field - only in dark mode */}
        {mode === 'dark' && (
          <section
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.85,
              background: `
            radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 35% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at 55% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 45%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 75% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 5% 85%, rgba(255,255,255,0.4) 0%, transparent 100%)
          `,
            }}
          />
        )}

        {/* Dynamic accent glow */}
        <MotionDiv
          style={{
            position: 'absolute',
            inset: 0,
            opacity: bgAccentOpacity,
          }}
          animate={{
            background:
              lastActiveSide === 'engineering'
                ? `radial-gradient(ellipse 80% 60% at 30% 50%, ${colors.cyan} 0%, transparent 60%)`
                : lastActiveSide === 'adventure'
                  ? `radial-gradient(ellipse 80% 60% at 70% 50%, ${colors.orange} 0%, transparent 60%)`
                  : 'transparent',
          }}
          transition={{ duration: 0.8 }}
        />
      </section>
      {children}
    </section>
  );
};

export default GlobalBackground;
