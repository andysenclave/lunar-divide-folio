'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function useShowcaseScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return {
    sectionRef,
    scrollYProgress,
    backgroundY,
  };
}
