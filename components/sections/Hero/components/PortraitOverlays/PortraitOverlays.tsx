'use client';

import { MotionDiv } from '@/components/motion';
import { usePortraitState } from './hooks/usePortraitState';
import EngineeringPortrait from './EngineeringPortrait';
import AdventurePortrait from './AdventurePortrait';

/**
 * Portrait overlays that appear on mouse hover (left/right sides).
 * Uses fixed positioning to align exactly with the FloatingMoon component.
 * Both share the same viewport-centered position: left 50%, top 50%.
 */
const PortraitOverlays = () => {
  const { containerOpacity, leftReveal, rightReveal } = usePortraitState();

  return (
    <MotionDiv
      className="fixed z-51 rounded-full overflow-hidden pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        opacity: containerOpacity,
      }}
    >
      {/* Engineering Portrait - reveals on left hover */}
      <MotionDiv className="absolute inset-0" style={{ opacity: leftReveal }}>
        <EngineeringPortrait />
      </MotionDiv>

      {/* Adventure Portrait - reveals on right hover */}
      <MotionDiv className="absolute inset-0" style={{ opacity: rightReveal }}>
        <AdventurePortrait />
      </MotionDiv>
    </MotionDiv>
  );
};

export default PortraitOverlays;
