'use client';

import { useTheme } from '@/theme/ThemeProvider';

const GridPattern = () => {
  const { colors } = useTheme();

  return (
    <div
      className="absolute inset-0 opacity-30 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${colors.border}15 1px, transparent 1px),
          linear-gradient(90deg, ${colors.border}15 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
};

export default GridPattern;
