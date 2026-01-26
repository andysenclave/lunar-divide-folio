'use client';

import { useAnimation } from '@/context';
import { useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useState, useCallback } from 'react';

interface UseMoonStateReturn {
  // Position transforms (scroll-driven)
  moonX: MotionValue<string>;
  moonY: MotionValue<string>;
  moonScale: MotionValue<number>;

  // Visual transforms
  moonRotation: MotionValue<number>;
  lightX: MotionValue<number>;
  combinedOpacity: MotionValue<number>;

  // State
  isInCorner: boolean;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;

  // Actions
  handleReturnHome: () => void;
}

const SCROLL_RANGE = [0, 0.7] as const;
const CORNER_THRESHOLD = 0.5;

export function useMoonState(): UseMoonStateReturn {
  const [isHovered, setIsHovered] = useState(false);
  const [isInCorner, setIsInCorner] = useState(false);
  const { scrollYProgress, smoothMouseX } = useAnimation();

  // Scroll-driven position transforms
  const scrollEased = useTransform(scrollYProgress, [...SCROLL_RANGE], [0, 1]);
  const moonX = useTransform(scrollEased, [0, 1], ['50%', '92%']);
  const moonY = useTransform(scrollEased, [0, 1], ['50%', '88%']);
  const moonScale = useTransform(scrollEased, [0, 1], [1, 0.16]);
  const moonOpacity = useTransform(scrollEased, [0, 1], [1, 0.35]);

  // Track corner state
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsInCorner(v > CORNER_THRESHOLD);
  });

  // Mouse-driven visual transforms
  const moonRotation = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const lightX = useTransform(smoothMouseX, [0, 1], [30, 70]);

  // Portrait reveal opacity (reduces moon opacity when portraits show)
  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  const combinedOpacity = useTransform(
    [moonOpacity, leftReveal, rightReveal],
    (latest) => {
      const [base, left, right] = latest as [number, number, number];
      return base * (1 - left * 0.8) * (1 - right * 0.8);
    },
  );

  const handleReturnHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
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
  };
}
