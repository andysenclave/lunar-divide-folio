'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

const AuroraWaves = () => {
  const { mode, colors } = useTheme();
  const isDark = mode === 'dark';

  // Reduced opacity multiplier for light mode
  const opacityMultiplier = isDark ? 1 : 0.4;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Aurora wave 1 */}
      <MotionDiv
        className="absolute -left-1/2 top-0 w-[200%] h-100 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.cyanGlow} 25%, transparent 50%, ${colors.orangeGlow} 75%, transparent 100%)`,
          filter: isDark ? 'blur(80px)' : 'blur(100px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          opacity: [0.3 * opacityMultiplier, 0.6 * opacityMultiplier, 0.3 * opacityMultiplier],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora wave 2 - only in dark mode for less clutter */}
      {isDark && (
        <MotionDiv
          className="absolute -left-[30%] top-25 w-[160%] h-75 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.orangeGlow} 30%, ${colors.cyanGlow} 70%, transparent 100%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: ['20%', '-20%', '20%'],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Aurora wave 3 - only in dark mode */}
      {isDark && (
        <MotionDiv
          className="absolute -left-[20%] top-12.5 w-[140%] h-62.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.text}08 50%, transparent 100%)`,
            filter: 'blur(70px)',
          }}
          animate={{
            x: ['-10%', '30%', '-10%'],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default AuroraWaves;
