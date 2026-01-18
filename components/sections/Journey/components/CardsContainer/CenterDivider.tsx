'use client';

import { useTheme } from '@/theme/ThemeProvider';

const CenterDivider = () => {
  const { colors } = useTheme();

  return (
    <div
      className="absolute top-[15%] bottom-[15%] left-1/2 w-px z-25 opacity-50"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${colors.border} 15%, ${colors.cyan} 30%, ${colors.border} 50%, ${colors.orange} 70%, ${colors.border} 85%, transparent 100%)`,
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          background: colors.bg,
          border: `1px solid ${colors.border}`,
        }}
      />
    </div>
  );
};

export default CenterDivider;
