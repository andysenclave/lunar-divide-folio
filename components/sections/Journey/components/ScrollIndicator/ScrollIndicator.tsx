'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';

interface ScrollIndicatorProps {
  scrollProgress: number;
}

const ScrollIndicator = ({ scrollProgress }: ScrollIndicatorProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
      animate={{ opacity: scrollProgress > 0.02 ? 0 : 1 }}
    >
      <span
        className="uppercase tracking-[0.2em]"
        style={{
          fontSize: '9px',
          color: colors.textDim,
        }}
      >
        Scroll to explore
      </span>
      <div
        className="w-4 h-4 border-r-2 border-b-2 rotate-45 opacity-60"
        style={{
          borderColor: colors.cyan,
          animation: 'bounce 2s ease-in-out infinite',
        }}
      />
    </MotionDiv>
  );
};

export default ScrollIndicator;
