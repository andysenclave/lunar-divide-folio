'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useMoonState } from './hooks/useMoonState';
import { MoonHoverWrapper, ReturnHomeTooltip } from './components';
import MoonSurface from './MoonSurface';

export default function FloatingMoon() {
  const { mode } = useTheme();
  const {
    moonX,
    moonY,
    moonScale,
    moonRotation,
    lightX,
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
      <MoonHoverWrapper
        isInCorner={isInCorner}
        isHovered={isHovered}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => isInCorner && handleReturnHome()}
      >
        <MoonSurface lightX={lightX} moonRotation={moonRotation} mode={mode} />
        <ReturnHomeTooltip isVisible={isHovered && isInCorner} />
      </MoonHoverWrapper>
    </MotionDiv>
  );
}
