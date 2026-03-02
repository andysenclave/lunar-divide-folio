'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
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
  // Mouse/touch tracking
  mouseX: MotionValue<number>;
  smoothMouseX: MotionValue<number>;
  // Active side state
  activeSide: ActiveSide;
  lastActiveSide: ActiveSide;
  setActiveSide: (side: ActiveSide) => void;
  setLastActiveSide: (side: ActiveSide) => void;
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

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [activeSide, setActiveSide] = useState<ActiveSide>('neutral');
  const [lastActiveSide, setLastActiveSide] = useState<ActiveSide>('neutral');

  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  // Reduced motion preference via useSyncExternalStore
  // Avoids setState-in-effect lint violations
  const subscribeReducedMotion = useCallback((callback: () => void) => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }, []);

  const getReducedMotionSnapshot = useCallback(() => {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  }, []);

  const getReducedMotionServerSnapshot = useCallback(() => false, []);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
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
    },
    [mouseX],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    setActiveSide('neutral');
  }, [mouseX]);

  const value = useMemo(
    () => ({
      scrollYProgress,
      mouseX,
      smoothMouseX,
      activeSide,
      lastActiveSide,
      setActiveSide,
      setLastActiveSide,
      heroRef,
      heroContentRef,
      handleMouseMove,
      handleMouseLeave,
      prefersReducedMotion,
    }),
    [
      activeSide,
      lastActiveSide,
      prefersReducedMotion,
      scrollYProgress,
      mouseX,
      smoothMouseX,
      handleMouseMove,
      handleMouseLeave,
    ],
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
