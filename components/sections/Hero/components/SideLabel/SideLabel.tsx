'use client';

import { MotionSection } from '@/components/motion';
import { ActiveSide } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionValue, useTransform } from 'framer-motion';

interface SideLabelProps {
  side: ActiveSide;
  opacity: MotionValue<number>;
  activeSide: ActiveSide;
  mouseX: MotionValue<number>;
}

const SideLabel = ({ side, opacity, activeSide, mouseX }: SideLabelProps) => {
  const { colors } = useTheme();

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
    return l * o;
  });

  return (
    <MotionSection
      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-3 z-45 pointer-events-none"
      style={{
        left: isEngineering ? 'clamp(10px, 5%, 50px)' : 'auto',
        right: isEngineering ? 'auto' : 'clamp(10px, 5%, 50px)',
        flexDirection: isEngineering ? 'row' : 'row-reverse',
        opacity: combinedOpacity,
      }}
    >
      <span
        className="font-semibold tracking-[0.2em]"
        style={{
          color,
          fontSize: 'clamp(9px, 1.2vw, 11px)',
        }}
      >
        {side.toUpperCase()}
      </span>
      <MotionSection
        className="h-px"
        style={{
          width: 'clamp(20px, 3vw, 30px)',
          background: `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color}40 0%, ${color}10 100%)`,
        }}
        animate={{
          background:
            activeSide === side
              ? `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color} 0%, ${color}40 100%)`
              : `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color}40 0%, ${color}10 100%)`,
        }}
      />
    </MotionSection>
  );
};

export default SideLabel;
