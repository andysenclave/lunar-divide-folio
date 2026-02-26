'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cdn } from '@/config/cdn';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  videoLinks?: string[];
}

const INTERVAL_MS = 4000;

// ─── Module-level image cache ───────────────────────────────────────────────
// Holds fully-decoded HTMLImageElement references in memory.
// • Each CDN path is fetched exactly ONCE via native Image().
// • Survives component unmount/remount → reopening a modal is instant.
// • Keeping the element reference prevents the browser from evicting it.
const imageCache = new Map<string, HTMLImageElement>();
const inflight = new Map<string, Promise<boolean>>();

function resolveUrl(path: string): string {
  // External URLs (e.g. YouTube thumbnails) are used as-is
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return cdn.journey(path);
}

function preload(path: string): Promise<boolean> {
  if (imageCache.has(path)) return Promise.resolve(true);
  const pending = inflight.get(path);
  if (pending) return pending;

  const p = new Promise<boolean>((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      imageCache.set(path, img);
      inflight.delete(path);
      resolve(true);
    };
    img.onerror = () => {
      inflight.delete(path);
      resolve(false);
    };
    img.src = resolveUrl(path);
  });
  inflight.set(path, p);
  return p;
}

const ImageCarousel = ({ images, alt, videoLinks }: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);

  // Seed loaded state from the persistent cache so reopened modals are instant
  const [loaded, setLoaded] = useState<Set<string>>(() => {
    const seed = new Set<string>();
    for (const img of images) {
      if (imageCache.has(img)) seed.add(img);
    }
    return seed;
  });

  const imagesRef = useRef(images);
  // eslint-disable-next-line react-hooks/refs
  imagesRef.current = images;

  // Kick off preloading for every image — each URL fetched exactly once
  useEffect(() => {
    let cancelled = false;
    for (const img of images) {
      preload(img).then((ok) => {
        if (cancelled || !ok) return;
        setLoaded((prev) => {
          if (prev.has(img)) return prev;
          const next = new Set(prev);
          next.add(img);
          return next;
        });
      });
    }
    return () => {
      cancelled = true;
    };
  }, [images]);

  // Only advance to slides whose images are already cached
  const advance = useCallback(() => {
    setCurrent((prev) => {
      const imgs = imagesRef.current;
      const len = imgs.length;
      for (let off = 1; off <= len; off++) {
        const c = (prev + off) % len;
        if (imageCache.has(imgs[c])) return c;
      }
      return prev;
    });
  }, []);

  // Start auto-advance only once the first image is ready
  const firstReady = loaded.has(images[0]);
  useEffect(() => {
    if (images.length <= 1 || !firstReady) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length, advance, firstReady]);

  const currentReady = loaded.has(images[current]);

  return (
    <>
      {/*
        All slides live in the DOM permanently — no mount/unmount, no re-fetch.
        Visibility is controlled purely via CSS opacity + z-index.
        The <img> src matches the URL already in browser memory cache
        from the native Image() preloader, so rendering costs zero network.
      */}
      {images.map((img, i) => {
        const isActive = i === current;
        const isLoaded = loaded.has(img);
        const videoLink = videoLinks?.[i];
        const imgElement = isLoaded && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={resolveUrl(img)}
            alt={isActive ? `${alt} - ${i + 1}` : ''}
            className="absolute inset-0 w-full h-full object-cover"
          />
        );
        return (
          <div
            key={img}
            className="absolute inset-0"
            style={{
              opacity: isActive && isLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
            aria-hidden={!isActive}
          >
            {videoLink ? (
              <a
                href={videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 cursor-pointer"
                aria-label={`Watch ${alt} - Episode ${i + 1} on YouTube`}
                onClick={(e) => e.stopPropagation()}
              >
                {imgElement}
              </a>
            ) : (
              imgElement
            )}
          </div>
        );
      })}

      {/* Spinner while the current slide is still loading */}
      {!currentReady && (
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                if (loaded.has(images[i])) setCurrent(i);
              }}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
