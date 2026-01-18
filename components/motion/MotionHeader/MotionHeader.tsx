'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionHeaderProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionHeader = forwardRef<HTMLElement, MotionHeaderProps>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.header
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
      <motion.header
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...props}
      />
    );
  },
);

MotionHeader.displayName = 'MotionHeader';

export default MotionHeader;
