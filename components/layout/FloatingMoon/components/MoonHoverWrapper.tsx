'use client';

import { MotionDiv } from '@/components/motion';
import { ReactNode } from 'react';

interface MoonHoverWrapperProps {
  isInCorner: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  children: ReactNode;
}

/**
 * Inner wrapper that handles hover interactions separately from scroll transforms.
 * This prevents the whileHover scale from conflicting with the parent's scroll-based scale.
 */
export function MoonHoverWrapper({
  isInCorner,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  children,
}: MoonHoverWrapperProps) {
  return (
    <MotionDiv
      className="w-full h-full relative"
      animate={{
        scale: isInCorner && isHovered ? 1.15 : 1,
        filter: isInCorner && isHovered
          ? 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
          : 'brightness(1) drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    >
      {children}
    </MotionDiv>
  );
}
