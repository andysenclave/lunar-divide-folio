'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv, MotionSpan } from '@/components/motion';

const AvailabilityBadge = () => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="flex items-center justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      {/* Pulsing green dot */}
      <MotionSpan
        className="w-2.5 h-2.5 rounded-full"
        style={{
          background: colors.verified,
          boxShadow: `0 0 10px ${colors.verified}99`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Availability text */}
      <span
        className="text-[13px] tracking-wide"
        style={{ color: colors.textSecondary }}
      >
        Open to opportunities in{' '}
        <span style={{ color: colors.warning }}>Australia</span>,
        <span style={{ color: colors.cyan }}> APAC</span> &
        <span style={{ color: colors.orange }}> UAE</span>
      </span>
    </MotionDiv>
  );
};

export default AvailabilityBadge;
