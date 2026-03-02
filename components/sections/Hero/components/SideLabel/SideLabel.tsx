'use client';

import { MotionSection } from '@/components/motion';
import { ActiveSide } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionValue, useTransform } from 'framer-motion';
import { useSyncExternalStore, useCallback } from 'react';

interface SideLabelProps {
  side: ActiveSide;
  opacity: MotionValue<number>;
  activeSide: ActiveSide;
  mouseX: MotionValue<number>;
}

const MOBILE_QUERY = '(max-width: 767px)';

const SideLabel = ({ side, opacity, activeSide, mouseX }: SideLabelProps) => {
  const { colors } = useTheme();

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

  const isEngineering = side === 'engineering';
  const color = isEngineering ? colors.cyan : colors.orange;

  const labelOpacity = useTransform(mouseX, (x) => {
    if (isEngineering) {
      return x > 0.6 ? 0.2 : 0.6 + (0.4 - x) * 0.4;
    } else {
      return x < 0.4 ? 0.2 : 0.6 + (x - 0.6) * 0.4;
    }
  });

  const combinedOpacity = useTransform([labelOpacity, opacity], (latest) => {
    const [l, o] = latest as [number, number];
    return l * o * (isMobile ? 0.7 : 1);
  });

  // Desktop: staging gradient directions. Mobile: rotated for vertical layout.
  const gradientDir = isEngineering
    ? (isMobile ? '180deg' : '90deg')
    : (isMobile ? '0deg' : '270deg');

  return (
    <MotionSection
      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-3 z-45 pointer-events-none"
      style={{
        left: isEngineering
          ? (isMobile ? 'clamp(4px, 3%, 50px)' : 'clamp(10px, 5%, 50px)')
          : 'auto',
        right: isEngineering
          ? 'auto'
          : (isMobile ? 'clamp(4px, 3%, 50px)' : 'clamp(10px, 5%, 50px)'),
        flexDirection: isEngineering ? 'row' : 'row-reverse',
        opacity: combinedOpacity,
        ...(isMobile
          ? {
              writingMode: isEngineering ? 'vertical-lr' : 'vertical-rl',
              textOrientation: 'mixed',
            }
          : {}),
      }}
    >
      <span
        className="font-semibold tracking-[0.2em]"
        style={{
          color,
          fontSize: isMobile ? 'clamp(9px, 2.5vw, 11px)' : 'clamp(9px, 1.2vw, 11px)',
        }}
      >
        {side.toUpperCase()}
      </span>
      <MotionSection
        className={isMobile ? 'w-px' : 'h-px'}
        style={{
          ...(isMobile
            ? { height: 'clamp(24px, 4vw, 36px)' }
            : { width: 'clamp(20px, 3vw, 30px)' }),
          background: `linear-gradient(${gradientDir}, ${color}40 0%, ${color}10 100%)`,
        }}
        animate={{
          background:
            activeSide === side
              ? `linear-gradient(${gradientDir}, ${color} 0%, ${color}40 100%)`
              : `linear-gradient(${gradientDir}, ${color}40 0%, ${color}10 100%)`,
        }}
      />
    </MotionSection>
  );
};

export default SideLabel;
