'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

export interface ScrollState {
  isScrolled: boolean;
  scrollTop: number;
  contentRef: RefObject<HTMLDivElement | null>;
}

export function useScrollState(threshold: number = 20): ScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleScroll = () => {
      const currentScrollTop = contentElement.scrollTop;
      setScrollTop(currentScrollTop);
      setIsScrolled(currentScrollTop > threshold);
    };

    contentElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => contentElement.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return {
    isScrolled,
    scrollTop,
    contentRef,
  };
}
