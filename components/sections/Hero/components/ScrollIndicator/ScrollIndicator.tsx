import { MotionSection, MotionSpan } from '@/components/motion';
import { ActiveSide } from '@/hooks';
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

  const text =
    lastActiveSide === 'engineering'
      ? 'Scroll into Engineering'
      : lastActiveSide === 'adventure'
        ? 'Scroll into Adventure'
        : 'Scroll to explore';

  return (
    <MotionSection
      style={{
        position: 'absolute',
        bottom: 'clamp(20px, 5vh, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity,
      }}
    >
      <MotionSpan
        style={{
          fontSize: 'clamp(9px, 1vw, 10px)',
          color: `${color}99`,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
        animate={{ color: `${color}99` }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </MotionSpan>
      <MotionSection
        style={{
          width: 1,
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
