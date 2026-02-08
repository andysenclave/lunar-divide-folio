'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';

interface GlowEffectProps {
  isHovered: boolean;
}

const GlowEffect = ({ isHovered }: GlowEffectProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="absolute pointer-events-none"
      style={{
        top: '-50%',
        right: '-20%',
        width: '60%',
        height: '150%',
        background: `radial-gradient(ellipse, ${colors.verifiedGlow} 0%, transparent 60%)`,
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
