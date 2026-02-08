'use client';

import { MotionValue } from 'framer-motion';
import { MotionFigure } from '@/components/motion';

interface ShadowLayersProps {
  boxShadow: MotionValue<string>;
}

/**
 * Renders the 3D shadow effects for spherical depth.
 * Includes dynamic box shadow and static inner edge shadow.
 */
export function ShadowLayers({ boxShadow }: ShadowLayersProps) {
  return (
    <>
      {/* Dynamic 3D shadow effect - follows light position */}
      <MotionFigure
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow,
        }}
      />

      {/* Static inner edge for spherical depth */}
      <figure
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: 'inset 0 0 25px 5px rgba(0, 0, 0, 0.1)',
        }}
      />
    </>
  );
}
