'use client';

import { MotionDiv } from '@/components/motion';
import { MotionValue } from 'framer-motion';
import StarField from './StarField';
import GradientOrbs from './GradientOrbs';
import GridPattern from './GridPattern';

interface BackgroundProps {
  backgroundY: MotionValue<string>;
}

const Background = ({ backgroundY }: BackgroundProps) => {
  return (
    <MotionDiv
      className="absolute inset-0 pointer-events-none"
      style={{ y: backgroundY }}
    >
      <StarField rotationDuration={300} />
      <GradientOrbs />
      <GridPattern />
    </MotionDiv>
  );
};

export default Background;
