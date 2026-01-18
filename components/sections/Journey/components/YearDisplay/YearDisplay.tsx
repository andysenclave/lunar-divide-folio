'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionH2, MotionP } from '@/components/motion';

interface YearDisplayProps {
  currentYear: number;
  currentEra: string;
  scrollProgress: number;
}

const YearDisplay = ({
  currentYear,
  currentEra,
  scrollProgress,
}: YearDisplayProps) => {
  const { colors } = useTheme();

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-center">
      <MotionH2
        className="tabular-nums leading-none transition-opacity duration-500"
        style={{
          fontSize: 'clamp(42px, 7vw, 72px)',
          fontWeight: 700,
          color: colors.white,
          letterSpacing: '-0.03em',
          opacity: scrollProgress > 0.02 ? 0.4 : 0.15,
        }}
      >
        {currentYear}
      </MotionH2>

      <MotionP
        className="uppercase mt-1.5"
        style={{
          fontSize: '10px',
          color: colors.textDim,
          letterSpacing: '0.25em',
          marginTop: '6px',
        }}
        animate={{ opacity: scrollProgress > 0.02 ? 1 : 0 }}
      >
        {currentEra}
      </MotionP>
    </div>
  );
};

export default YearDisplay;
