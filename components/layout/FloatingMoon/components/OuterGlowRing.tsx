'use client';

import { ThemeMode } from '@/theme/theme';

interface OuterGlowRingProps {
  mode: ThemeMode;
}

/**
 * Renders a subtle outer glow ring around the moon's edge.
 * Provides definition and luminosity to the moon's silhouette.
 */
export function OuterGlowRing({ mode }: OuterGlowRingProps) {
  const glowColor = mode === 'dark'
    ? 'rgba(180, 190, 210, 0.2)'
    : 'rgba(150, 160, 180, 0.15)';

  return (
    <figure
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        inset: '-1px',
        boxShadow: `0 0 25px 3px ${glowColor}, 0 0 50px 8px rgba(150, 160, 180, 0.08)`,
      }}
    />
  );
}
