'use client';

import { useState } from 'react';

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

function generateStarfield(config: Required<StarfieldConfig>): Star[] {
  return Array.from({ length: config.count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size:
      Math.random() * (config.maxSize - config.minSize) +
      config.minSize,
    opacity:
      Math.random() * (config.maxOpacity - config.minOpacity) +
      config.minOpacity,
    twinkleDuration:
      Math.random() *
        (config.maxTwinkleDuration - config.minTwinkleDuration) +
      config.minTwinkleDuration,
  }));
}

export function useStarfield(config: StarfieldConfig = {}): Star[] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const [stars] = useState(() => generateStarfield(mergedConfig));
  return stars;
}
