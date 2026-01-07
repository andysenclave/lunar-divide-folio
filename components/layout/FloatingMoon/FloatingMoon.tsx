'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence, MotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import MoonSurface from './MoonSurface';

interface FloatingMoonProps {
  scrollYProgress: MotionValue<number>;
  smoothMouseX: MotionValue<number>;
}

export default function FloatingMoon({
  scrollYProgress,
  smoothMouseX,
}: FloatingMoonProps) {
  const [isCornerMoonHovered, setIsCornerMoonHovered] = useState(false);
  const { colors, mode } = useTheme();

  const scrollEased = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const isInCorner = useTransform(scrollYProgress, (v) => v > 0.5);
  const moonX = useTransform(scrollEased, [0, 1], ['50%', '92%']);
  const moonY = useTransform(scrollEased, [0, 1], ['50%', '88%']);
  const moonScale = useTransform(scrollEased, [0, 1], [1, 0.16]);
  const moonOpacity = useTransform(scrollEased, [0, 1], [1, 0.35]);

  const moonRotation = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const lightX = useTransform(smoothMouseX, [0, 1], [30, 70]);

  // Calculate reveal values for portraits
  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  const combinedOpacity = useTransform(
    [moonOpacity, leftReveal, rightReveal],
    // @ts-expect-error -- framer-motion types ---
    ([base, left, right]) => base * (1 - left * 0.8) * (1 - right * 0.8),
  );

  const handleReturnHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionDiv
      style={{
        position: 'fixed',
        left: moonX,
        top: moonY,
        x: '-50%',
        y: '-50%',
        scale: moonScale,
        rotate: moonRotation,
        opacity: combinedOpacity,
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        zIndex: 50,
        cursor: isInCorner.get() ? 'pointer' : 'default',
      }}
      whileHover={isInCorner.get() ? { scale: 1.1 } : {}}
      onClick={() => isInCorner.get() && handleReturnHome()}
      onHoverStart={() => setIsCornerMoonHovered(true)}
      onHoverEnd={() => setIsCornerMoonHovered(false)}
    >
      <MoonSurface lightX={lightX} moonRotation={moonRotation} mode={mode} />

      <AnimatePresence>
        {isCornerMoonHovered && (
          <MotionDiv
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{
              position: 'absolute',
              bottom: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 12px',
              background: 'rgba(0,0,0,0.85)',
              borderRadius: '6px',
              fontSize: '9px',
              color: colors.text,
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            RETURN HOME
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
