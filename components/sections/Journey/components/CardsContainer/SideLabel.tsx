'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionSpan } from '@/components/motion';

interface SideLabelProps {
  side: 'engineering' | 'adventure';
}

const SideLabel = ({ side }: SideLabelProps) => {
  const { colors } = useTheme();
  const isEngineering = side === 'engineering';

  return (
    <MotionSpan
      className="absolute top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-[0.25em] opacity-30 z-[24]"
      style={{
        left: isEngineering ? '12px' : 'auto',
        right: isEngineering ? 'auto' : '12px',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        color: isEngineering ? colors.cyan : colors.orange,
        transform: isEngineering
          ? 'translateY(-50%) rotate(180deg)'
          : 'translateY(-50%)',
      }}
    >
      {isEngineering ? 'ENGINEERING' : 'ADVENTURE'}
    </MotionSpan>
  );
};

export default SideLabel;
