'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionPProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionP = forwardRef<HTMLParagraphElement, MotionPProps>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.p
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

    return (
      <motion.p
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...props}
      />
    );
  },
);

MotionP.displayName = 'MotionP';

export default MotionP;
