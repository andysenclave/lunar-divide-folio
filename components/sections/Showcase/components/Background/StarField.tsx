'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useStarfield } from '../../hooks';

interface StarFieldProps {
  rotationDuration?: number;
}

const StarField = ({ rotationDuration = 300 }: StarFieldProps) => {
  const { colors } = useTheme();
  const stars = useStarfield({ count: 80 });

  return (
    <MotionDiv
      className="absolute"
      style={{
        inset: '-50%',
        width: '200%',
        height: '200%',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: rotationDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {stars.map((star) => (
        <MotionDiv
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
            duration: star.twinkleDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </MotionDiv>
  );
};

export default StarField;
