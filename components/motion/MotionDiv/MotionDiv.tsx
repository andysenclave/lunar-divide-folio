'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionDivProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    // Apply preset if provided
    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.div
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

    // Default behavior - just motion.div with reduced motion transition override
    return (
      <motion.div
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

MotionDiv.displayName = 'MotionDiv';

export default MotionDiv;
