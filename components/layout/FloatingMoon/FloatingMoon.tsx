'use client';

import { MotionDiv } from '@/components/motion';
import { useAnimation } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence, useMotionValueEvent, useTransform } from 'framer-motion';
import { useState } from 'react';
import MoonSurface from './MoonSurface';

export default function FloatingMoon() {
  const [isCornerMoonHovered, setIsCornerMoonHovered] = useState(false);
  const [isInCorner, setIsInCorner] = useState(false);
  const { colors, mode } = useTheme();
  const { scrollYProgress, smoothMouseX } = useAnimation();

  const scrollEased = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const moonX = useTransform(scrollEased, [0, 1], ['50%', '92%']);
  const moonY = useTransform(scrollEased, [0, 1], ['50%', '88%']);
  const moonScale = useTransform(scrollEased, [0, 1], [1, 0.16]);
  const moonOpacity = useTransform(scrollEased, [0, 1], [1, 0.35]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsInCorner(v > 0.5);
  });

  const moonRotation = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const lightX = useTransform(smoothMouseX, [0, 1], [30, 70]);

  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  const combinedOpacity = useTransform(
    [moonOpacity, leftReveal, rightReveal],
    (latest) => {
      const [base, left, right] = latest as [number, number, number];
      return base * (1 - left * 0.8) * (1 - right * 0.8);
    },
  );

  const handleReturnHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      whileHover={isInCorner ? { scale: 1.1 } : {}}
      onClick={() => isInCorner && handleReturnHome()}
      onHoverStart={() => setIsCornerMoonHovered(true)}
      onHoverEnd={() => setIsCornerMoonHovered(false)}
    >
      <MoonSurface lightX={lightX} moonRotation={moonRotation} mode={mode} />

      <AnimatePresence>
        {isCornerMoonHovered && isInCorner && (
          <MotionDiv
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-[110%] left-1/2 -translate-x-1/2 py-1.5 px-3 bg-black/85 rounded-md text-[9px] tracking-[0.15em] whitespace-nowrap"
            style={{ color: colors.text }}
          >
            RETURN HOME
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
