'use client';

import { useMemo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';

interface BackgroundProps {
  backgroundY: MotionValue<string>;
}

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 3 + 2,
  }));
};

const Background = ({ backgroundY }: BackgroundProps) => {
  const { colors } = useTheme();

  // Memoize stars to prevent regeneration
  const stars = useMemo(() => generateStars(80), []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ y: backgroundY }}
    >
      {/* Rotating Starfield Container */}
      <motion.div
        className="absolute inset-[-50%]"
        style={{
          width: '200%',
          height: '200%',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 300,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: colors.white,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

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
