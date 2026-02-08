'use client';

import { useTheme } from '@/theme/ThemeProvider';

const HorizonGlow = () => {
  const { mode, colors } = useTheme();
  const isDark = mode === 'dark';

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
      style={{
        background: isDark
          ? `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.cyanGlow}10 0%, transparent 60%)`
          : `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.cyanGlow} 0%, transparent 60%)`,
        opacity: isDark ? 1 : 0.3,
      }}
      aria-hidden="true"
    />
  );
};

export default HorizonGlow;
