'use client';

import { MotionValue } from 'framer-motion';
import { MotionFigure } from '@/components/motion';

interface TerminatorLayerProps {
  gradient: MotionValue<string>;
}

/**
 * Renders the terminator line effect - the day/night boundary on the moon.
 * Creates a subtle gradient that preserves texture visibility.
 */
export function TerminatorLayer({ gradient }: TerminatorLayerProps) {
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
