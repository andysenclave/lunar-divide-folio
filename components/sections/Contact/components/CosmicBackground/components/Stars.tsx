'use client';

import { useMemo } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

const STAR_COUNT = 80;

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  colorType: 'cyan' | 'orange' | 'white';
  duration: number;
  delay: number;
}

const Stars = () => {
  const { colors } = useTheme();

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      colorType: i % 5 === 0 ? 'cyan' : i % 7 === 0 ? 'orange' : 'white',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  const getStarColor = (type: Star['colorType']) => {
    switch (type) {
      case 'cyan':
        return colors.cyan;
      case 'orange':
        return colors.orange;
      default:
        return colors.text;
    }
  };

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {stars.map((star) => (
        <MotionDiv
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            background: getStarColor(star.colorType),
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
