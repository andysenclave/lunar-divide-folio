'use client';

import { ThemeMode } from '@/theme/theme';
import styles from './MoonSurface.module.css';

interface MoonSurfaceProps {
  mode: ThemeMode;
}

/**
 * Renders the moon surface with real texture and CSS-based rotation animation.
 * Uses the 2K moon texture from Solar System Scope with pure CSS animation.
 */
export default function MoonSurface({ mode }: MoonSurfaceProps) {
  const glowColor = mode === 'dark'
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(200, 200, 220, 0.25)';

  return (
    <article
      role="img"
      aria-label="Decorative moon"
      className="relative w-full h-full rounded-full"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-[-15%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Moon sphere with texture */}
      <div className={styles.moon} />

      {/* Outer glow ring */}
      <div
        className="absolute inset-[-2px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, transparent 45%, ${glowColor} 50%, transparent 55%)`,
        }}
      />
    </article>
  );
}
