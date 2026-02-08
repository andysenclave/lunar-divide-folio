'use client';

import { MotionSpan } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useTypingAnimation } from './hooks';

const Cursor = ({ color }: { color: string }) => (
  <MotionSpan
    className="inline-block align-baseline"
    style={{
      color,
      fontWeight: 400,
      marginLeft: '2px',
    }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.7, repeat: Infinity }}
  >
    |
  </MotionSpan>
);

const Title = () => {
  const { colors } = useTheme();
  const { displayText, isComplete, showCursor } = useTypingAnimation();
  const customText = colors?.textAlpha.replace('{alpha}', '0.33');

  // Split display text by newline for multi-line rendering
  const lines = displayText.split('\n');
  const isFinalState = isComplete && displayText.includes('\n');

  return (
    <h1
      className={`font-heading uppercase leading-[1.05] m-0 ${isFinalState ? 'title-complete' : ''}`}
      style={{
        fontSize: isFinalState
          ? 'clamp(36px, 7vw, 64px)'
          : 'clamp(22px, 4vw, 48px)',
        fontWeight: 700,
        letterSpacing: isFinalState ? '-0.01em' : '0.02em',
        transition: 'all 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        minHeight: 'clamp(100px, 15vw, 200px)',
        textShadow: isFinalState
          ? `0 0 40px ${colors.cyan}15, 0 2px 20px ${colors.bg}40`
          : 'none',
      }}
    >
      {lines.map((line, index) => {
        const isLastLine = index === lines.length - 1;
        return (
          <span
            key={index}
            className={`${lines.length > 1 ? 'block' : 'inline'} ${isFinalState ? 'title-line-complete' : ''}`}
            style={{
              color: isFinalState ? customText : colors.text,
              transition: 'color 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            {line}
            {isLastLine && showCursor && <Cursor color={colors.cyan} />}
          </span>
        );
      })}
    </h1>
  );
};

export default Title;
