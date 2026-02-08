'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionFigureProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionFigure = forwardRef<HTMLElement, MotionFigureProps>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    // Apply preset if provided
    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.figure
          ref={ref}
          variants={variantSet}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={
            shouldReduceMotion
              ? { duration: 0.01 }
              : transition ?? transitions.smooth
          }
          {...props}
        />
      );
    }

    // Default behavior - just motion.figure with reduced motion transition override
    return (
      <motion.figure
        ref={ref}
        transition={
          shouldReduceMotion && !transition
            ? { duration: 0.01 }
            : transition
        }
        {...props}
      />
    );
  },
);

MotionFigure.displayName = 'MotionFigure';

export default MotionFigure;
