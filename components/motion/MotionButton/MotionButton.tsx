'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { MotionButtonProps } from '../types';
import { variants, reducedMotionVariants, transitions } from '../variants';
import { useReducedMotion } from '../useReducedMotion';

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ preset, reduceMotion, transition, whileHover, whileTap, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = reduceMotion ?? prefersReducedMotion;

    // Disable hover/tap animations if reduced motion is preferred
    const hoverProps = shouldReduceMotion ? {} : { whileHover, whileTap };

    if (preset) {
      const variantSet = shouldReduceMotion
        ? reducedMotionVariants[preset]
        : variants[preset];

      return (
        <motion.button
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
          {...hoverProps}
          {...props}
        />
      );
    }

    return (
      <motion.button
        ref={ref}
        transition={
          shouldReduceMotion && !transition ? { duration: 0.01 } : transition
        }
        {...hoverProps}
        {...props}
      />
    );
  },
);

MotionButton.displayName = 'MotionButton';

export default MotionButton;
