import { Variants, Transition } from 'framer-motion';

// Standard transitions
export const transitions = {
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
  smooth: { duration: 0.3, ease: 'easeOut' } as Transition,
  slow: { duration: 0.6, ease: 'easeInOut' } as Transition,
} as const;

// Animation presets
export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } satisfies Variants,

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } satisfies Variants,

  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  } satisfies Variants,

  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  } satisfies Variants,

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  } satisfies Variants,

  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  } satisfies Variants,
} as const;

// Reduced motion variants - instant transitions
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  // All position-based animations collapse to simple fade
  slideUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  slideDown: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  slideLeft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  slideRight: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,

  scaleUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,
} as const;

export type VariantPreset = keyof typeof variants;
