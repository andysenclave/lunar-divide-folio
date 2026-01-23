'use client';

import { MotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import { AuroraWaves, Stars, HorizonGlow } from './components';

interface CosmicBackgroundProps {
  scrollProgress: MotionValue<number>;
}

const CosmicBackground = ({ scrollProgress }: CosmicBackgroundProps) => {
  const { colors } = useTheme();
  const auroraOpacity = useTransform(scrollProgress, [0, 0.5], [0, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${colors.bg} 0%, #050812 60%, #020408 100%)`,
        }}
      />

      {/* Aurora layer */}
      <MotionDiv className="absolute inset-0" style={{ opacity: auroraOpacity }}>
        <AuroraWaves />
      </MotionDiv>

      {/* Stars */}
      <Stars />

      {/* Horizon glow */}
      <HorizonGlow />
    </div>
  );
};

export default CosmicBackground;
