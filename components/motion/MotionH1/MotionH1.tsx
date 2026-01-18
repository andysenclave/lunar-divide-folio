'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionH1Props } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionH1 = forwardRef<HTMLHeadingElement, MotionH1Props>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.h1
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
      <motion.h1
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...props}
      />
    );
  },
);

MotionH1.displayName = 'MotionH1';

export default MotionH1;
