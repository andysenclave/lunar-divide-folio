'use client';

import { ThemeMode } from '@/theme/theme';

interface AtmosphericGlowProps {
  mode: ThemeMode;
}

/**
 * Renders the outer atmospheric glow effect around the moon.
 * Creates a soft radial gradient blur that simulates atmospheric scattering.
 */
export function AtmosphericGlow({ mode }: AtmosphericGlowProps) {
  const glowColor = mode === 'dark'
    ? 'rgba(180, 190, 210, 0.2)'
    : 'rgba(150, 160, 180, 0.15)';

  return (
    <figure
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        inset: '-12%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
        filter: 'blur(15px)',
      }}
    />
  );
}
