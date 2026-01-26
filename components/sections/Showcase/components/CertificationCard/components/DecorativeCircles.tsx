'use client';

import { useTheme } from '@/theme/ThemeProvider';

const DecorativeCircles = () => {
  const { colors } = useTheme();

  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          border: `1px solid ${colors.verifiedGlow}`,
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10px',
          left: '10px',
          width: '60px',
          height: '60px',
          border: `1px solid ${colors.verifiedGlow}`,
          borderRadius: '50%',
          opacity: 0.75,
        }}
      />
    </>
  );
};

export default DecorativeCircles;
