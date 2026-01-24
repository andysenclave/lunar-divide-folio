'use client';

import { MotionDiv } from '@/components/motion';

interface GlowEffectProps {
  isHovered: boolean;
  color?: string;
}

const GlowEffect = ({ isHovered, color = 'rgba(16, 185, 129, 0.3)' }: GlowEffectProps) => {
  return (
    <MotionDiv
      className="absolute pointer-events-none"
      style={{
        top: '-50%',
        right: '-20%',
        width: '60%',
        height: '150%',
        background: `radial-gradient(ellipse, ${color} 0%, transparent 60%)`,
        filter: 'blur(60px)',
      }}
      animate={{
        opacity: isHovered ? 0.4 : 0.2,
        scale: isHovered ? 1.05 : 1,
      }}
    />
  );
};

export default GlowEffect;
