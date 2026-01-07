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
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        borderRadius: '50%',
        overflow: 'hidden',
        zIndex: 51,
        pointerEvents: 'none',
        opacity: containerOpacity,
      }}
    >
      <MotionSection
        style={{ position: 'absolute', inset: 0, opacity: leftReveal }}
      >
        <EngineeringPortrait />
      </MotionSection>

      <MotionSection
        style={{ position: 'absolute', inset: 0, opacity: rightReveal }}
      >
        <AdventurePortrait />
      </MotionSection>
    </MotionSection>
  );
};

export default PortraitOverlays;
