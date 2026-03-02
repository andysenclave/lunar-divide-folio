'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { Experience } from '../../types';

interface MobileBookmarkProps {
  exp: Experience;
  index: number;
  isVisible: boolean;
  onClick: () => void;
  top: string; // CSS top value, e.g. "calc(50% - 40px)"
}

const MobileBookmark = ({
  exp,
  index,
  isVisible,
  onClick,
  top,
}: MobileBookmarkProps) => {
  const { colors } = useTheme();
  const isEng = exp.type === 'engineering';
  const accent = isEng ? colors.cyan : colors.orange;
  const accentGlow = isEng ? colors.cyanGlow : colors.orangeGlow;

  // Ribbon clip-path: pointed end toward center
  // Left (engineering): arrow points right
  // Right (adventure): arrow points left
  const clipPath = isEng
    ? 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)'
    : 'polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)';

  return (
    <MotionDiv
      className="pointer-events-auto cursor-pointer absolute"
      style={{
        [isEng ? 'left' : 'right']: 0,
        top,
        clipPath,
        background: accentGlow,
        padding: isEng ? '10px 24px 10px 12px' : '10px 12px 10px 24px',
        maxWidth: '56vw',
      }}
      initial={{
        opacity: 0,
        x: isEng ? -80 : 80,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isEng ? -80 : 80,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={{ scale: 0.96, x: isEng ? 4 : -4 }}
      onClick={onClick}
    >
      <span
        className="block font-semibold"
        style={{
          fontSize: '11px',
          color: accent,
          letterSpacing: '0.03em',
          lineHeight: 1.35,
          textAlign: isEng ? 'left' : 'right',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {exp.title}
      </span>
    </MotionDiv>
  );
};

export default MobileBookmark;
