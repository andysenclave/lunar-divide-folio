'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

interface ProgressBarProps {
  scrollProgress: number;
}

const ProgressBar = ({ scrollProgress }: ProgressBarProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100]"
      style={{ background: colors.border }}
    >
      <MotionDiv
        className="h-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${colors.cyan} 0%, ${colors.orange} 100%)`,
        }}
        animate={{ scaleX: scrollProgress }}
      />
    </div>
  );
};

export default ProgressBar;
