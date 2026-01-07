'use client';
import { useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

export type ActiveSide = 'engineering' | 'adventure' | 'neutral';

const useActiveSide = () => {
  const [activeSide, setActiveSide] = useState<ActiveSide>('neutral');
  const [lastActiveSide, setLastActiveSide] = useState<ActiveSide>('neutral');

  const heroRef = useRef(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0.5);
  // const _smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const updateActiveSidesOnMouseMove = (e: MouseEvent) => {
    if (!heroContentRef.current) return;

    const rect = heroContentRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;

    mouseX.set(Math.max(0, Math.min(1, x)));

    const newSide = x < 0.4 ? 'engineering' : x > 0.6 ? 'adventure' : 'neutral';
    setActiveSide(newSide);
    if (newSide !== 'neutral') {
      setLastActiveSide(newSide);
    }
  };

  const updateActiveSidesOnMouseLeave = () => {
    mouseX.set(0.5);
    setActiveSide('neutral');
  };

  return {
    heroRef,
    heroContentRef,
    activeSide,
    lastActiveSide,
    scrollYProgress,
    updateActiveSidesOnMouseMove,
    updateActiveSidesOnMouseLeave,
  };
};

export default useActiveSide;
