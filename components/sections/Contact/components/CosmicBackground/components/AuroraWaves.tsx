'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

const AuroraWaves = () => {
  const { colors } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Aurora wave 1 */}
      <MotionDiv
        className="absolute -left-1/2 top-0 w-[200%] h-100 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.cyanGlow}15 25%, ${colors.text}10 50%, ${colors.orangeGlow}15 75%, transparent 100%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora wave 2 */}
      <MotionDiv
        className="absolute -left-[30%] top-25 w-[160%] h-75 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.orangeGlow}15 30%, ${colors.cyanGlow}15 70%, transparent 100%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['20%', '-20%', '20%'],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora wave 3 */}
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
    </div>
  );
};

export default AuroraWaves;
