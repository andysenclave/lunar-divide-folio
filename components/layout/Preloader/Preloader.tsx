'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cdn } from '@/config/cdn';

// ─── Tech/startup quotes ─────────────────────────────────────────────────────
const QUOTES = [
  { text: 'Stay hungry. Stay foolish.', author: 'Steve Jobs' },
  { text: 'Move fast and break things.', author: 'Mark Zuckerberg' },
  {
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
  },
  {
    text: 'Any sufficiently advanced technology is indistinguishable from magic.',
    author: 'Arthur C. Clarke',
  },
  {
    text: "It's not about ideas. It's about making ideas happen.",
    author: 'Scott Belsky',
  },
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: "Code is like humour. When you have to explain it, it's bad.",
    author: 'Cory House',
  },
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  {
    text: "The advance of technology is based on making it fit in so that you don't even notice it.",
    author: 'Bill Gates',
  },
  {
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
  },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  {
    text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.',
    author: 'Antoine de Saint-Exupéry',
  },
  {
    text: 'The web as I envisaged it, we have not seen it yet.',
    author: 'Tim Berners-Lee',
  },
];

// Moon styles matching FloatingMoon/MoonSurface exactly
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

const QUOTE_INTERVAL = 5_000; // 15 seconds per quote
const MIN_DISPLAY_TIME = 8_000; // 30 seconds minimum on screen

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTexture, setCurrentTexture] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  // eslint-disable-next-line react-hooks/purity
  const mountTimeRef = useRef<number>(Date.now());

  const compressedUrl = cdn.texture('moon-compressed.jpg');
  const fullUrl = cdn.texture('moon.jpg');

  // Phase 1: Load compressed texture first (fast, <100KB)
  // Phase 2: Load full texture in background, swap when ready
  useEffect(() => {
    // Load compressed first
    const compressed = new window.Image();
    compressed.onload = () => {
      setCurrentTexture(compressedUrl);

      // Now load full resolution in background
      const full = new window.Image();
      full.onload = () => {
        setCurrentTexture(fullUrl);
      };
      // If full fails, compressed stays — no problem
      full.src = fullUrl;
    };
    compressed.onerror = () => {
      // Fallback: try full directly
      setCurrentTexture(fullUrl);
      const full = new window.Image();
      full.src = fullUrl;
    };
    compressed.src = compressedUrl;
  }, [compressedUrl, fullUrl]);

  // Cycle quotes every 15 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, QUOTE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Exit after minimum 30 seconds AND at least compressed texture loaded
  useEffect(() => {
    if (!currentTexture) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const minTime = prefersReduced ? 2000 : MIN_DISPLAY_TIME;
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, minTime - elapsed);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, remaining);

    return () => clearTimeout(timer);
  }, [currentTexture]);

  // Prevent scrolling during preload
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const quote = QUOTES[quoteIndex];
  const hasTexture = currentTexture !== null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background — fades independently, the moon stays */}
          <motion.div
            className="absolute inset-0"
            style={{ background: '#0A0E27' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Starfield */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4), transparent),
                  radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.3), transparent),
                  radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5), transparent),
                  radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.3), transparent),
                  radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.4), transparent),
                  radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.2), transparent),
                  radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.3), transparent),
                  radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.4), transparent)
                `.trim(),
              }}
            />
          </motion.div>

          {/* Instructional text — above center */}
          <motion.div
            className="fixed left-0 right-0 flex justify-center pointer-events-none"
            style={{
              bottom: 'calc(50% + clamp(130px, 18vw, 190px))',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 1.2, duration: 1.4, ease: 'easeOut' }}
          >
            <p
              className="text-center px-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 2.2vw, 17px)',
                color: 'rgba(255, 255, 255, 0.45)',
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: '0.03em',
                maxWidth: '520px',
              }}
            >
              Scroll to explore the divide — engineering left, adventure right
            </p>
          </motion.div>

          {/* Moon — positioned exactly like FloatingMoon's initial state */}
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              width: 'clamp(200px, 30vw, 300px)',
              height: 'clamp(200px, 30vw, 300px)',
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              hasTexture
                ? { scale: 1, opacity: 1 }
                : { scale: 0.6, opacity: 0.3 }
            }
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Atmospheric glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-15%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
              }}
            />

            {/* Moon sphere — matches MoonSurface exactly */}
            {hasTexture && (
              <div
                className="motion-safe:animate-[moonRotation_15s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-center"
                style={{
                  ...MOON_STYLES,
                  backgroundImage: `url('${currentTexture}')`,
                }}
              />
            )}

            {/* Outer glow ring */}
            <div
              className="absolute -inset-0.5 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, transparent 45%, rgba(255,255,255,0.15) 50%, transparent 55%)',
              }}
            />

            <style>{`
              @keyframes moonRotation {
                0% { background-position: 0% 0%; }
                100% { background-position: 300% 0%; }
              }
            `}</style>
          </motion.div>

          {/* Quote — below center */}
          <div
            className="fixed left-0 right-0 flex justify-center pointer-events-none"
            style={{
              top: 'calc(50% + clamp(120px, 18vw, 180px))',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                className="text-center px-8"
                style={{ maxWidth: '500px' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.3)',
                    letterSpacing: '0.08em',
                  }}
                >
                  — {quote.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
