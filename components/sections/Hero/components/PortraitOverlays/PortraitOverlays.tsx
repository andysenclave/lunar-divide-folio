'use client';

import MotionSection from '@/components/motion/MotionSection/MotionSection';
import { MotionValue, useTransform } from 'framer-motion';
import EngineeringPortrait from './EngineeringPortrait';
import AdventurePortrait from './AdventurePortrait';

interface PortraitOverlaysProps {
  scrollYProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
}

const PortraitOverlays = ({
  scrollYProgress,
  mouseX,
}: PortraitOverlaysProps) => {
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const leftReveal = useTransform(mouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(mouseX, [0.6, 0.9], [0, 1]);

  return (
    <MotionSection
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden z-51 pointer-events-none"
      style={{
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        opacity: containerOpacity,
      }}
    >
      <MotionSection
        className="absolute inset-0"
        style={{ opacity: leftReveal }}
      >
        <EngineeringPortrait />
      </MotionSection>

      <MotionSection
        className="absolute inset-0"
        style={{ opacity: rightReveal }}
      >
        <AdventurePortrait />
      </MotionSection>
    </MotionSection>
  );
};

export default PortraitOverlays;
