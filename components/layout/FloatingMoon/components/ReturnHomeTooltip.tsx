'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence } from 'framer-motion';

interface ReturnHomeTooltipProps {
  isVisible: boolean;
}

export function ReturnHomeTooltip({ isVisible }: ReturnHomeTooltipProps) {
  const { colors } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute bottom-[110%] left-1/2 -translate-x-1/2 py-1.5 px-3 bg-black/85 rounded-md text-[9px] tracking-[0.15em] whitespace-nowrap pointer-events-none"
          style={{ color: colors.text }}
        >
          RETURN HOME
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
