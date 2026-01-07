import { MotionSection } from '@/components/motion';
import { ActiveSide } from '@/hooks';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence, MotionValue } from 'framer-motion';

interface OrbitalRingsProps {
  activeSide: ActiveSide;
  opacity?: MotionValue<number>;
}

const Tagline = ({ activeSide, opacity }: OrbitalRingsProps) => {
  const { colors } = useTheme();

  const variants = {
    neutral: { tagline: 'Engineering systems. Exploring worlds.', sub: '' },
    engineering: {
      tagline: 'Engineering systems.',
      sub: 'Building what matters.',
    },
    adventure: { tagline: 'Exploring worlds.', sub: 'Sharing what inspires.' },
  };

  const current = variants[activeSide];
  const color =
    activeSide === 'engineering'
      ? colors.cyan
      : activeSide === 'adventure'
        ? colors.orange
        : colors.text;

  return (
    <MotionSection
      style={{
        position: 'absolute',
        bottom: 'clamp(100px, 15vh, 160px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        zIndex: 45,
        pointerEvents: 'none',
        width: '100%',
        padding: '0 24px',
      }}
    >
      <AnimatePresence mode="wait">
        <MotionSection
          key={activeSide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color,
              fontWeight: activeSide === 'neutral' ? 400 : 500,
              letterSpacing: '0.03em',
              marginBottom: current.sub ? 6 : 0,
            }}
          >
            {current.tagline}
          </p>
          {current.sub && (
            <p
              style={{
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                color: colors.text,
                fontWeight: 400,
              }}
            >
              {current.sub}
            </p>
          )}
        </MotionSection>
      </AnimatePresence>
    </MotionSection>
  );
};

export default Tagline;
