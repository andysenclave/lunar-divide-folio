'use client';

import { cdn } from '@/config';
import { ThemeMode } from '@/theme/theme';

interface MoonSurfaceProps {
  mode: ThemeMode;
}

const MOON_STYLES = {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '110% 100%',
  boxShadow: `
    inset -10px 8px 6px -5px rgba(255, 255, 255, 0.8),
    inset 20px -20px 40px 30px rgba(0, 0, 0, 0.85),
    0 0 20px rgba(255, 255, 255, 0.1)
  `.trim(),
} as const;

const KEYFRAMES_CSS = `
  @keyframes moonRotation {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }
`;

/**
 * Renders the moon surface with real texture and CSS-based rotation animation.
 * Uses the 2K moon texture from Solar System Scope with pure CSS animation.
 */
export function MoonSurface({ mode }: MoonSurfaceProps) {
  const glowColor =
    mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(200, 200, 220, 0.25)';

  return (
    <article
      role="img"
      aria-label="Decorative moon"
      className="relative w-full h-full rounded-full"
    >
      <style>{KEYFRAMES_CSS}</style>

      {/* Atmospheric glow */}
      <div
        className="absolute inset-[-15%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Moon sphere with texture */}
      <div
        className="motion-safe:animate-[moonRotation_15s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-center"
        style={{
          ...MOON_STYLES,
          backgroundImage: `url('${cdn.texture('moon.jpg')}')`,
        }}
      />

      {/* Outer glow ring */}
      <div
        className="absolute -inset-0.5 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, transparent 45%, ${glowColor} 50%, transparent 55%)`,
        }}
      />
    </article>
  );
}

export default MoonSurface;
