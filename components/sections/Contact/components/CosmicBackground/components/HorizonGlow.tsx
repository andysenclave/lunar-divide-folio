'use client';

import { useTheme } from '@/theme/ThemeProvider';

const HorizonGlow = () => {
  const { colors } = useTheme();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.cyanGlow}10 0%, transparent 60%)`,
      }}
      aria-hidden="true"
    />
  );
};

export default HorizonGlow;
