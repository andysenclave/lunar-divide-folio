'use client';

import { MotionSection, MotionSpan } from '@/components/motion';
import { ActiveSide } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  lastActiveSide: ActiveSide;
  opacity?: MotionValue<number>;
}

const ScrollIndicator = ({ lastActiveSide, opacity }: ScrollIndicatorProps) => {
  const { colors } = useTheme();
  const color =
    lastActiveSide === 'engineering'
      ? colors.cyan
      : lastActiveSide === 'adventure'
        ? colors.orange
        : colors.text;

  const text = 'Begin the Journey';

  return (
    <MotionSection
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{
        bottom: 'clamp(20px, 5vh, 40px)',
        opacity,
      }}
    >
      <MotionSpan
        className="uppercase tracking-[0.15em]"
        style={{
          fontSize: 'clamp(9px, 1vw, 10px)',
          color: `${color}99`,
        }}
        animate={{ color: `${color}99` }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </MotionSpan>
      <MotionSection
        className="w-px"
        style={{
          height: 'clamp(30px, 4vh, 40px)',
          background: `linear-gradient(180deg, ${color}80 0%, transparent 100%)`,
        }}
        animate={{
          scaleY: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </MotionSection>
  );
};

export default ScrollIndicator;
