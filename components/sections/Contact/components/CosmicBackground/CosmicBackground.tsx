'use client';

import { MotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import { AuroraWaves, Stars, HorizonGlow } from './components';

interface CosmicBackgroundProps {
  scrollProgress: MotionValue<number>;
}

const CosmicBackground = ({ scrollProgress }: CosmicBackgroundProps) => {
  const { mode, colors } = useTheme();
  const auroraOpacity = useTransform(scrollProgress, [0, 0.5], [0, 1]);

  const isDark = mode === 'dark';

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Background gradient - theme aware */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? `linear-gradient(180deg, ${colors.bg} 0%, #050812 60%, #020408 100%)`
            : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgDark} 100%)`,
        }}
      />

      {/* Aurora layer - subtle in light mode */}
      <MotionDiv
        className="absolute inset-0"
        style={{ opacity: auroraOpacity }}
      >
        <AuroraWaves />
      </MotionDiv>

      {/* Stars - only in dark mode */}
      {isDark && <Stars />}

      {/* Horizon glow */}
      <HorizonGlow />
    </div>
  );
};

export default CosmicBackground;
