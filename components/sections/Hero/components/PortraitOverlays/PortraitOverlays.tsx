'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { MotionDiv } from '@/components/motion';
import { usePortraitState } from './hooks/usePortraitState';
import EngineeringPortrait from './EngineeringPortrait';
import AdventurePortrait from './AdventurePortrait';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Portrait overlays that appear on mouse hover (left/right sides) or touch swipe on mobile.
 * Uses fixed positioning to align exactly with the FloatingMoon component.
 * Both share the same viewport-centered position: left 50%, top 50%.
 */
const PortraitOverlays = () => {
  const { containerOpacity, leftReveal, rightReveal } = usePortraitState();

  const subscribeMobile = useCallback((cb: () => void) => {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);
  const getMobileSnapshot = useCallback(
    () => window.matchMedia(MOBILE_QUERY).matches,
    [],
  );
  const getMobileServerSnapshot = useCallback(() => false, []);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );

  const size = isMobile
    ? 'clamp(240px, 65vw, 300px)'
    : 'clamp(200px, 30vw, 300px)';

  return (
    <MotionDiv
      className="fixed z-51 rounded-full overflow-hidden pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        width: size,
        height: size,
        opacity: containerOpacity,
      }}
    >
      {/* Engineering Portrait - reveals on left hover / left-to-right swipe */}
      <MotionDiv className="absolute inset-0" style={{ opacity: leftReveal }}>
        <EngineeringPortrait />
      </MotionDiv>

      {/* Adventure Portrait - reveals on right hover / right-to-left swipe */}
      <MotionDiv className="absolute inset-0" style={{ opacity: rightReveal }}>
        <AdventurePortrait />
      </MotionDiv>
    </MotionDiv>
  );
};

export default PortraitOverlays;
