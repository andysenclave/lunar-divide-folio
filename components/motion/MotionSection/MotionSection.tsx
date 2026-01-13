'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionSectionProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ preset, reduceMotion, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.section
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
      <motion.section
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...props}
      />
    );
  },
);

MotionSection.displayName = 'MotionSection';

export default MotionSection;
