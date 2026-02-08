'use client';

import { useState, useCallback } from 'react';

export interface HoverState {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function useHoverState(initialState: boolean = false): HoverState {
  const [isHovered, setIsHovered] = useState(initialState);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  };
}
