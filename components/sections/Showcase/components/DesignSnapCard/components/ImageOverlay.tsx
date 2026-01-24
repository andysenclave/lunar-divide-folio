'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';

interface ImageOverlayProps {
  isVisible: boolean;
}

const ImageOverlay = ({ isVisible }: ImageOverlayProps) => {
  const { colors } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background: 'rgba(10, 14, 39, 0.85)',
            gap: '8px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span style={{ fontSize: '24px' }}>🔍</span>
          <span
            style={{
              fontSize: '11px',
              color: colors.cyan,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            View Full
          </span>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ImageOverlay;
