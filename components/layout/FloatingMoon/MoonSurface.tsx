'use client';

import { motion } from 'framer-motion';
import { ThemeMode } from '@/theme/theme';
import { MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { generateMoonTexture } from '@/lib/moon';

interface MoonSurfaceProps {
  lightX: MotionValue<number>;
  moonRotation: MotionValue<number>;
  mode: ThemeMode;
}

const MoonSurface = ({ lightX, mode }: MoonSurfaceProps) => {
  const [moonTexture, setMoonTexture] = useState<string | null>(null);
  const textureRef = useRef<string | null>(null);

  // Generate procedural texture on mount - only once, persist in ref
  useEffect(() => {
    // If we already have texture in ref, use it (handles re-renders/strict mode)
    if (textureRef.current) {
      setMoonTexture(textureRef.current);
      return;
    }

    // Generate texture
    try {
      const texture = generateMoonTexture(1024, 512);
      textureRef.current = texture;
      setMoonTexture(texture);
    } catch (error) {
      console.error('Failed to generate moon texture:', error);
    }
  }, []);

  // Subtle 3D shadow - lighter to preserve texture
  const boxShadow = useTransform(lightX, (x) => {
    const normalizedX = (x - 50) / 50;
    const shadowX = normalizedX * 12;
    const shadowY = normalizedX * 6;

    return `
      inset ${shadowX}px ${shadowY}px 30px 15px rgba(0, 0, 0, 0.25),
      inset ${shadowX * 1.2}px ${shadowY * 1.1}px 60px 35px rgba(0, 0, 0, 0.15),
      inset ${-shadowX * 0.15}px ${-shadowY * 0.15}px 25px 8px rgba(255, 255, 255, 0.04)
    `;
  });

  // Very subtle terminator - preserves texture visibility
  const terminatorGradient = useTransform(lightX, (x) => {
    const angle = 90 + (x - 50) * 0.5;
    return `linear-gradient(${angle}deg,
      transparent 0%,
      transparent 45%,
      rgba(0, 0, 0, 0.05) 55%,
      rgba(0, 0, 0, 0.12) 65%,
      rgba(0, 0, 0, 0.22) 80%,
      rgba(0, 0, 0, 0.32) 100%
    )`;
  });

  // Background position follows light subtly
  const backgroundPosition = useTransform(
    lightX,
    (x) => `${50 + (x - 50) * 0.12}% 50%`
  );

  // Soft highlight gradient on lit side
  const highlightGradient = useTransform(
    lightX,
    (x) =>
      `radial-gradient(ellipse at ${100 - x * 0.7}% 30%, rgba(255,255,255,0.05) 0%, transparent 35%)`
  );

  // Atmospheric glow color
  const glowColor = mode === 'dark'
    ? 'rgba(180, 190, 210, 0.2)'
    : 'rgba(150, 160, 180, 0.15)';

  // Don't render anything until texture is ready - no fallback versions
  if (!moonTexture) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      {/* Atmospheric glow - outer */}
      <div
        style={{
          position: 'absolute',
          inset: '-12%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
          filter: 'blur(15px)',
          pointerEvents: 'none',
        }}
      />

      {/* Moon container with overflow hidden */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Procedural moon texture - only layer, no fallback */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundImage: moonTexture ? `url(${moonTexture})` : 'none',
            backgroundSize: '200% 100%',
            backgroundPosition,
          }}
        />

        {/* Very subtle terminator gradient */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: terminatorGradient,
          }}
        />

        {/* Soft highlight on lit side */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: highlightGradient,
          }}
        />

        {/* 3D shadow effect - on top but subtle */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow,
          }}
        />

        {/* Subtle inner edge for spherical depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 5px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {/* Subtle outer glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '50%',
          boxShadow: `0 0 25px 3px ${glowColor}, 0 0 50px 8px rgba(150, 160, 180, 0.08)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MoonSurface;
