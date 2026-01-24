'use client';

import { useTheme } from '@/theme/ThemeProvider';

const GradientOrbs = () => {
  const { colors } = useTheme();

  return (
    <>
      {/* Cyan Gradient Orb - Top Left */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${colors.cyanGlow}15 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Orange Gradient Orb - Bottom Right */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: '10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${colors.orangeGlow}15 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />
    </>
  );
};

export default GradientOrbs;
