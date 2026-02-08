'use client';

import { useAnimation } from '@/context';
import { useTransform, MotionValue } from 'framer-motion';

interface UsePortraitStateReturn {
  containerOpacity: MotionValue<number>;
  leftReveal: MotionValue<number>;
  rightReveal: MotionValue<number>;
}

/**
 * Hook for portrait overlay visibility state.
 * Portraits fade out as user scrolls, and reveal based on mouse position.
 */
export function usePortraitState(): UsePortraitStateReturn {
  const { scrollYProgress, smoothMouseX } = useAnimation();

  // Fade out as user scrolls past hero
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Reveal portraits based on mouse X position
  // Left portrait: visible when mouse is on left side (0.1 to 0.4)
  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);

  // Right portrait: visible when mouse is on right side (0.6 to 0.9)
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  return {
    containerOpacity,
    leftReveal,
    rightReveal,
  };
}
