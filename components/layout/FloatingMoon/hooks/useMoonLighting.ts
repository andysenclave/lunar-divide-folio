'use client';

import { MotionValue, useTransform } from 'framer-motion';

interface UseMoonLightingProps {
  lightX: MotionValue<number>;
}

interface UseMoonLightingReturn {
  boxShadow: MotionValue<string>;
  terminatorGradient: MotionValue<string>;
  backgroundPosition: MotionValue<string>;
  highlightGradient: MotionValue<string>;
}

/**
 * Hook for computing moon lighting effects based on light position.
 * All transforms are derived from the lightX MotionValue.
 */
export function useMoonLighting({ lightX }: UseMoonLightingProps): UseMoonLightingReturn {
  // Subtle 3D shadow - lighter to preserve texture
  const boxShadow = useTransform(lightX, (x) => {
    const normalizedX = (x - 50) / 50;
    const shadowX = normalizedX * 12;
    const shadowY = normalizedX * 6;

    return `
      inset ${shadowX}px ${shadowY}px 30px 15px rgba(0, 0, 0, 0.25),
      inset ${shadowX * 1.2}px ${shadowY * 1.1}px 60px 35px rgba(0, 0, 0, 0.15),
      inset ${-shadowX * 0.15}px ${-shadowY * 0.15}px 25px 8px rgba(255, 255, 255, 0.04)
    `;
  });

  // Very subtle terminator - preserves texture visibility
  const terminatorGradient = useTransform(lightX, (x) => {
    const angle = 90 + (x - 50) * 0.5;
    return `linear-gradient(${angle}deg,
      transparent 0%,
      transparent 45%,
      rgba(0, 0, 0, 0.05) 55%,
      rgba(0, 0, 0, 0.12) 65%,
      rgba(0, 0, 0, 0.22) 80%,
      rgba(0, 0, 0, 0.32) 100%
    )`;
  });

  // Background position follows light subtly
  const backgroundPosition = useTransform(
    lightX,
    (x) => `${50 + (x - 50) * 0.12}% 50%`
  );

  // Soft highlight gradient on lit side
  const highlightGradient = useTransform(
    lightX,
    (x) =>
      `radial-gradient(ellipse at ${100 - x * 0.7}% 30%, rgba(255,255,255,0.05) 0%, transparent 35%)`
  );

  return {
    boxShadow,
    terminatorGradient,
    backgroundPosition,
    highlightGradient,
  };
}
