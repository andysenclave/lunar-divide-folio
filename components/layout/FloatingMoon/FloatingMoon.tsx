'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useMoonState } from './hooks/useMoonState';
import { MoonHoverWrapper, MoonSurface } from './components';

export default function FloatingMoon() {
  const { mode } = useTheme();
  const {
    moonX,
    moonY,
    moonScale,
    moonRotation,
    combinedOpacity,
    isInCorner,
    isHovered,
    setIsHovered,
    handleReturnHome,
  } = useMoonState();

  return (
    <MotionDiv
      className="fixed z-50"
      style={{
        left: moonX,
        top: moonY,
        x: '-50%',
        y: '-50%',
        scale: moonScale,
        rotate: moonRotation,
        opacity: combinedOpacity,
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        cursor: isInCorner ? 'pointer' : 'default',
      }}
    >
      {/* Floating animation wrapper */}
      <MotionDiv
        className="w-full h-full"
        animate={{
          y: [0, -8, 0, 4, 0],
          rotateZ: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MoonHoverWrapper
          isInCorner={isInCorner}
          isHovered={isHovered}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => isInCorner && handleReturnHome()}
        >
          <MoonSurface mode={mode} />
        </MoonHoverWrapper>
      </MotionDiv>
    </MotionDiv>
  );
}
