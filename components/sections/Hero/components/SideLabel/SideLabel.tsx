import { MotionSection } from '@/components/motion';
import { ActiveSide } from '@/hooks';
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

  return (
    <MotionSection
      style={{
        position: 'absolute',
        left: isEngineering ? 'clamp(10px, 5%, 50px)' : 'auto',
        right: isEngineering ? 'auto' : 'clamp(10px, 5%, 50px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexDirection: isEngineering ? 'row' : 'row-reverse',
        // @ts-expect-error types
        opacity: useTransform(
          [labelOpacity, opacity],
          ([l, o]: [number, number]) => l * o,
        ),
        zIndex: 45,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          color,
          fontSize: 'clamp(9px, 1.2vw, 11px)',
          fontWeight: 600,
          letterSpacing: '0.2em',
        }}
      >
        {side.toUpperCase()}
      </span>
      <MotionSection
        style={{
          width: 'clamp(20px, 3vw, 30px)',
          height: 1,
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
