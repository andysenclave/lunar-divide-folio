'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion';

export type ActiveSide = 'engineering' | 'adventure' | 'neutral';

interface AnimationContextValue {
  // Scroll tracking
  scrollYProgress: MotionValue<number>;
  // Mouse tracking
  smoothMouseX: MotionValue<number>;
  // Active side state
  activeSide: ActiveSide;
  lastActiveSide: ActiveSide;
  // Refs for scroll/mouse tracking
  heroRef: React.RefObject<HTMLElement | null>;
  heroContentRef: React.RefObject<HTMLDivElement | null>;
  // Mouse event handlers
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  // Accessibility
  prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [activeSide, setActiveSide] = useState<ActiveSide>('neutral');
  const [lastActiveSide, setLastActiveSide] = useState<ActiveSide>('neutral');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroContentRef.current) return;

    const rect = heroContentRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;

    mouseX.set(Math.max(0, Math.min(1, x)));

    const newSide: ActiveSide =
      x < 0.4 ? 'engineering' : x > 0.6 ? 'adventure' : 'neutral';
    setActiveSide(newSide);
    if (newSide !== 'neutral') {
      setLastActiveSide(newSide);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    setActiveSide('neutral');
  };

  const value = useMemo(
    () => ({
      scrollYProgress,
      smoothMouseX,
      activeSide,
      lastActiveSide,
      heroRef,
      heroContentRef,
      handleMouseMove,
      handleMouseLeave,
      prefersReducedMotion,
    }),
    [activeSide, lastActiveSide, prefersReducedMotion, scrollYProgress, smoothMouseX],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

export { AnimationContext };
