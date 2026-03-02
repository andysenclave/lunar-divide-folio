'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useMoonState } from './hooks/useMoonState';
import { useCircularSwipe } from './hooks/useCircularSwipe';
import { MoonHoverWrapper, MoonSurface } from './components';

const MOBILE_QUERY = '(max-width: 767px)';

// Glow colors for swipe feedback
const GLOW_COLORS = {
  cw: '#FF6B35', // adventure orange
  ccw: '#00D9FF', // engineering cyan
} as const;

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

  const { handlers, swipeDirection, swipeProgress, isActive } =
    useCircularSwipe();

  // Detect mobile for larger size & touch handlers
  const subscribeMobile = useCallback((cb: () => void) => {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);
  const getMobileSnapshot = useCallback(
    () => window.matchMedia(MOBILE_QUERY).matches,
    [],
  );
  const getMobileServerSnapshot = useCallback(() => false, []);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );

  const moonSize = isMobile
    ? 'clamp(240px, 65vw, 300px)'
    : 'clamp(200px, 30vw, 300px)';

  const glowColor = swipeDirection ? GLOW_COLORS[swipeDirection] : 'transparent';
  const glowOpacity = swipeDirection
    ? isActive
      ? 0.6
      : swipeProgress * 0.5
    : 0;

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
        width: moonSize,
        height: moonSize,
        cursor: isInCorner ? 'pointer' : 'default',
        touchAction: isMobile && !isInCorner ? 'none' : 'auto',
      }}
      {...(isMobile && !isInCorner ? handlers : {})}
    >
      {/* Swipe glow ring — visible during circular gesture */}
      {isMobile && swipeDirection && (
        <div
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{
            boxShadow: `0 0 ${isActive ? 40 : 20}px ${glowColor}, inset 0 0 ${isActive ? 20 : 10}px ${glowColor}30`,
            border: `1.5px solid ${glowColor}`,
            opacity: glowOpacity,
            transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
          }}
        />
      )}

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
