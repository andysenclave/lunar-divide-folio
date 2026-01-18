'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionH2Props } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionH2 = forwardRef<HTMLHeadingElement, MotionH2Props>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.h2
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
      <motion.h2
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...props}
      />
    );
  },
);

MotionH2.displayName = 'MotionH2';

export default MotionH2;
