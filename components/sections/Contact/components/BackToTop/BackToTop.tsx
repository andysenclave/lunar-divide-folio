'use client';

import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionButton, MotionSpan } from '@/components/motion';
import { useBackToTop } from '../../hooks';

const BackToTop = () => {
  const { colors } = useTheme();
  const { isVisible, scrollToTop } = useBackToTop();

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionButton
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer z-50 transition-all duration-300"
          style={{
            background: colors.bgSecondary,
            border: `1px solid ${colors.cyan}50`,
            color: colors.cyan,
          }}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 30px ${colors.cyanGlow}`,
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <MotionSpan
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          >
            ↑
          </MotionSpan>
        </MotionButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
