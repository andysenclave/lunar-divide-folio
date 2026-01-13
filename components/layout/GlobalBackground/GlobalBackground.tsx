'use client';

import { useTransform } from 'framer-motion';
import { MotionDiv } from '../../motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useAnimation } from '@/context';

interface GlobalBackgroundProps {
  children?: React.ReactNode;
}

const GlobalBackground = ({ children }: GlobalBackgroundProps) => {
  const { mode, colors } = useTheme();
  const { lastActiveSide, scrollYProgress } = useAnimation();
  const bgAccentOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.03]);

  return (
    <div
      className="min-h-[300vh] relative font-body transition-[background] duration-400"
      style={{ background: colors.bg }}
    >
      <div className="fixed inset-0 z-0 transition-all duration-400">
        {/* Base gradient */}
        <div
          className="absolute inset-0 transition-[background] duration-400"
          style={{
            background:
              mode === 'dark'
                ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 50%, ${colors.bg} 100%)`
                : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 100%)`,
          }}
        />

        {/* Star field - only in dark mode */}
        {mode === 'dark' && (
          <div
            className="absolute inset-0 opacity-85"
            style={{
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
          className="absolute inset-0"
          style={{ opacity: bgAccentOpacity }}
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
      </div>
      {children}
    </div>
  );
};

export default GlobalBackground;
