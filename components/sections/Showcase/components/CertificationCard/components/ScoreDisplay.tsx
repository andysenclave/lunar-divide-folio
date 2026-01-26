'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';

interface ScoreDisplayProps {
  score: number;
  passingScore: number;
}

const ScoreDisplay = ({ score, passingScore }: ScoreDisplayProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      style={{
        width: '100%',
        maxWidth: '180px',
        padding: '12px 16px',
        background: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      {/* Score Header */}
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: '8px' }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'colors.verified',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {score}%
        </span>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: colors.textMuted,
          }}
        >
          EXAM SCORE
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '4px',
          background: colors.border,
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '6px',
        }}
      >
        <MotionDiv
          style={{
            height: '100%',
            background: `linear-gradient(90deg, colors.verified 0%, ${colors.cyan} 100%)`,
            borderRadius: '2px',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
        />
      </div>

      {/* Passing Score */}
      <span style={{ fontSize: '10px', color: colors.textMuted }}>
        Passing: {passingScore}%
      </span>
    </MotionDiv>
  );
};

export default ScoreDisplay;
