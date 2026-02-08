'use client';

import { useEffect, useState, useRef } from 'react';
import { generateMoonTexture } from '@/lib/moon';

interface UseMoonTextureReturn {
  texture: string | null;
  isLoading: boolean;
}

const TEXTURE_WIDTH = 1024;
const TEXTURE_HEIGHT = 512;

/**
 * Hook for generating and caching the procedural moon texture.
 * Generates once on mount and persists through re-renders via ref.
 */
export function useMoonTexture(): UseMoonTextureReturn {
  const [texture, setTexture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const textureRef = useRef<string | null>(null);

  useEffect(() => {
    // Use cached texture if available (handles re-renders/strict mode)
    if (textureRef.current) {
      setTexture(textureRef.current);
      setIsLoading(false);
      return;
    }

    // Generate texture
    try {
      const generatedTexture = generateMoonTexture(TEXTURE_WIDTH, TEXTURE_HEIGHT);
      textureRef.current = generatedTexture;
      setTexture(generatedTexture);
    } catch (error) {
      console.error('Failed to generate moon texture:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { texture, isLoading };
}
