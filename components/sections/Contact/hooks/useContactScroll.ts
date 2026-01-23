'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';

export const useContactScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  return {
    sectionRef,
    scrollProgress: scrollYProgress,
  };
};
