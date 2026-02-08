'use client';

import { MotionValue } from 'framer-motion';
import { MotionFigure } from '@/components/motion';

interface HighlightLayerProps {
  gradient: MotionValue<string>;
}

/**
 * Renders a soft highlight on the lit side of the moon.
 * Creates subtle specular reflection effect.
 */
export function HighlightLayer({ gradient }: HighlightLayerProps) {
  return (
    <MotionFigure
      aria-hidden="true"
      className="absolute inset-0 rounded-full"
      style={{
        background: gradient,
      }}
    />
  );
}
