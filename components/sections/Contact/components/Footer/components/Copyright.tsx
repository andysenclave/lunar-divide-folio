'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionSpan } from '@/components/motion';

const Copyright = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="flex items-center gap-2 text-xs flex-wrap"
      style={{ color: colors.textMuted }}
    >
      <span>© {currentYear} Thimple Solutions Pvt Ltd</span>
      <span style={{ color: colors.border }}>•</span>
      <span>
        Crafted with{' '}
        <MotionSpan
          className="inline-block"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="coffee"
        >
          ☕
        </MotionSpan>{' '}
        in Kolkata
      </span>
    </div>
  );
};

export default Copyright;
