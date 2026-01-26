'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';

interface HighlightListProps {
  highlights: string[];
}

const HighlightList = ({ highlights }: HighlightListProps) => {
  const { colors } = useTheme();

  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-col"
      style={{ gap: '8px', marginBottom: '16px' }}
    >
      {highlights.map((highlight, idx) => (
        <MotionDiv
          key={idx}
          className="flex items-center"
          style={{
            gap: '10px',
            fontSize: '13px',
            color: colors.textSecondary,
          }}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + idx * 0.1 }}
        >
          <span style={{ color: colors.verified, fontWeight: 700 }}>✓</span>
          <span>{highlight}</span>
        </MotionDiv>
      ))}
    </div>
  );
};

export default HighlightList;
