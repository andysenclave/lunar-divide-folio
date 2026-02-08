'use client';

import { MotionValue } from 'framer-motion';
import { MotionFigure } from '@/components/motion';

interface MoonTextureLayerProps {
  texture: string;
  backgroundPosition: MotionValue<string>;
}

/**
 * Renders the procedural moon texture as a background layer.
 * Position follows the light source for subtle parallax effect.
 */
export function MoonTextureLayer({ texture, backgroundPosition }: MoonTextureLayerProps) {
  return (
    <MotionFigure
      aria-hidden="true"
      className="absolute inset-0 rounded-full"
      style={{
        backgroundImage: `url(${texture})`,
        backgroundSize: '200% 100%',
        backgroundPosition,
      }}
    />
  );
}
