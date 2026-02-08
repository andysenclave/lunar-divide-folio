'use client';

import { MotionValue } from 'framer-motion';
import { ThemeMode } from '@/theme/theme';
import { useMoonTexture, useMoonLighting } from './hooks';
import {
  AtmosphericGlow,
  MoonTextureLayer,
  TerminatorLayer,
  HighlightLayer,
  ShadowLayers,
  OuterGlowRing,
} from './components';

interface MoonSurfaceProps {
  lightX: MotionValue<number>;
  moonRotation: MotionValue<number>;
  mode: ThemeMode;
}

/**
 * Renders the moon surface with procedural texture and dynamic lighting effects.
 * Composed of multiple visual layers for realistic 3D appearance.
 */
export default function MoonSurface({ lightX, mode }: MoonSurfaceProps) {
  const { texture, isLoading } = useMoonTexture();
  const {
    boxShadow,
    terminatorGradient,
    backgroundPosition,
    highlightGradient,
  } = useMoonLighting({ lightX });

  // Don't render until texture is ready
  if (isLoading || !texture) {
    return null;
  }

  return (
    <article
      role="img"
      aria-label="Decorative moon"
      className="relative w-full h-full rounded-full"
    >
      <AtmosphericGlow mode={mode} />

      <section
        aria-hidden="true"
        className="relative w-full h-full rounded-full overflow-hidden"
      >
        <MoonTextureLayer
          texture={texture}
          backgroundPosition={backgroundPosition}
        />
        <TerminatorLayer gradient={terminatorGradient} />
        <HighlightLayer gradient={highlightGradient} />
        <ShadowLayers boxShadow={boxShadow} />
      </section>

      <OuterGlowRing mode={mode} />
    </article>
  );
}
