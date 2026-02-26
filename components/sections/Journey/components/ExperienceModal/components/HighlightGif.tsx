'use client';

import { useState, useRef, useCallback } from 'react';
import { useTheme } from '@/theme/ThemeProvider';

interface HighlightGifProps {
  src: string;
  alt: string;
}

const HighlightGif = ({ src, alt }: HighlightGifProps) => {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const togglePlayback = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;

    if (isPlaying) {
      // Pause: capture current frame to canvas, replace src with data URL
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        img.dataset.gifSrc = img.src;
        img.src = canvas.toDataURL();
      }
    } else {
      // Resume: restore original GIF src
      const originalSrc = img.dataset.gifSrc;
      if (originalSrc) {
        img.src = originalSrc;
      }
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  if (hasError) {
    return (
      <div
        className="rounded-xl mb-6 flex items-center justify-center"
        style={{
          border: `2px dashed ${colors.border}`,
          padding: '32px',
          background: colors.bgSecondary,
        }}
      >
        <span
          style={{
            fontSize: '13px',
            color: colors.textMuted,
            fontFamily: 'var(--font-mono)',
          }}
        >
          GIF highlight coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden mb-6">
      {/* Label */}
      <div
        className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg"
        style={{
          background: `${colors.bg}cc`,
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          fontWeight: 600,
          color: colors.textSecondary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Highlight
      </div>

      {/* Play/Pause toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlayback();
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: `${colors.bg}cc`,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${colors.border}`,
          color: colors.text,
          fontSize: '14px',
        }}
        aria-label={isPlaying ? 'Pause GIF' : 'Play GIF'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* GIF image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl"
        style={{
          border: `1px solid ${colors.border}`,
          maxHeight: '400px',
          objectFit: 'cover',
        }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default HighlightGif;
