'use client';

import { motion, MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';

interface BackgroundProps {
  backgroundY: MotionValue<string>;
}

const Background = ({ backgroundY }: BackgroundProps) => {
  const { colors } = useTheme();

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ y: backgroundY }}
    >
      {/* Cyan Gradient Orb */}
      <div
        className="absolute rounded-full"
        style={{
          top: '10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${colors.cyanGlow}15 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Orange Gradient Orb */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: '10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${colors.orangeGlow}15 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(${colors.border}15 1px, transparent 1px),
            linear-gradient(90deg, ${colors.border}15 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </motion.div>
  );
};

export default Background;
