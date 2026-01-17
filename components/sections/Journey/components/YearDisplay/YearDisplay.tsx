'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

interface YearDisplayProps {
  currentYear: number;
  currentEra: string;
  scrollProgress: number;
}

const YearDisplay = ({ currentYear, currentEra, scrollProgress }: YearDisplayProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-center"
    >
      <MotionDiv
        className="font-bold tabular-nums leading-none transition-opacity duration-500"
        style={{
          fontSize: 'clamp(42px, 7vw, 72px)',
          color: colors.text,
          letterSpacing: '-0.03em',
          opacity: scrollProgress > 0.02 ? 0.4 : 0.15,
        }}
      >
        {currentYear}
      </MotionDiv>

      <MotionDiv
        className="uppercase mt-1.5"
        style={{
          fontSize: '10px',
          color: colors.textDim,
          letterSpacing: '0.25em',
        }}
        animate={{ opacity: scrollProgress > 0.02 ? 1 : 0 }}
      >
        {currentEra}
      </MotionDiv>
    </div>
  );
};

export default YearDisplay;
