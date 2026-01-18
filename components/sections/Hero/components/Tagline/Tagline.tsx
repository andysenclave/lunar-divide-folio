'use client';

import { MotionSection } from '@/components/motion';
import { ActiveSide } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence, MotionValue } from 'framer-motion';

interface TaglineProps {
  activeSide: ActiveSide;
  opacity?: MotionValue<number>;
}

const Tagline = ({ activeSide, opacity }: TaglineProps) => {
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
      className="absolute left-1/2 -translate-x-1/2 text-center min-h-20 flex flex-col items-center justify-center z-45 pointer-events-none w-full px-6"
      style={{
        bottom: 'clamp(100px, 15vh, 160px)',
        opacity,
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
            className="tracking-[0.03em]"
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color,
              fontWeight: activeSide === 'neutral' ? 400 : 500,
              marginBottom: current.sub ? 6 : 0,
            }}
          >
            {current.tagline}
          </p>
          {current.sub && (
            <p
              className="font-normal"
              style={{
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                color: colors.text,
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
