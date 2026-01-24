'use client';

import { useMemo } from 'react';

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
}

export interface StarfieldConfig {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minTwinkleDuration?: number;
  maxTwinkleDuration?: number;
}

const DEFAULT_CONFIG: Required<StarfieldConfig> = {
  count: 80,
  minSize: 0.5,
  maxSize: 2.5,
  minOpacity: 0.2,
  maxOpacity: 0.7,
  minTwinkleDuration: 2,
  maxTwinkleDuration: 5,
};

export function useStarfield(config: StarfieldConfig = {}): Star[] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const stars = useMemo(() => {
    return Array.from({ length: mergedConfig.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size:
        Math.random() * (mergedConfig.maxSize - mergedConfig.minSize) +
        mergedConfig.minSize,
      opacity:
        Math.random() * (mergedConfig.maxOpacity - mergedConfig.minOpacity) +
        mergedConfig.minOpacity,
      twinkleDuration:
        Math.random() *
          (mergedConfig.maxTwinkleDuration - mergedConfig.minTwinkleDuration) +
        mergedConfig.minTwinkleDuration,
    }));
  }, [mergedConfig]);

  return stars;
}
