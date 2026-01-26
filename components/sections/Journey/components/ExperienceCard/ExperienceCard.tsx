'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  exp: Experience;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const ExperienceCard = ({
  exp,
  index,
  isVisible,
  onClick,
}: ExperienceCardProps) => {
  const { colors } = useTheme();
  const isEng = exp.type === 'engineering';
  const accent = isEng ? colors.cyan : colors.orange;
  const accentGlow = isEng ? colors.cyanGlow : colors.orangeGlow;

  return (
    <MotionDiv
      className="rounded-2xl overflow-hidden cursor-pointer shrink-0"
      style={{
        width: 300,
        margin: '0 8px',
        background: `${colors.bgSecondary}f2`, // 95% opacity
        border: `1px solid ${exp.featured ? colors.gold : colors.border}`,
        backdropFilter: 'blur(16px)',
        boxShadow: exp.featured ? `0 0 20px ${colors.goldGlow}` : 'none',
      }}
      initial={{ opacity: 0, x: isEng ? -40 : 40 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : isEng ? -40 : 40,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        x: isEng ? 6 : -6,
        scale: 1.02,
        borderColor: accent,
      }}
      onClick={onClick}
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3 px-6 pt-5 pb-3">
        <span
          className="px-3 py-1.5 rounded-xl text-[9px] font-semibold uppercase tracking-widest shrink-0 border"
          style={{
            background: exp.featured ? colors.goldGlow : accentGlow,
            color: exp.featured ? colors.gold : accent,
            borderColor: exp.featured
              ? `${colors.gold}4d` // 30% opacity
              : `${accent}40`, // 25% opacity
          }}
        >
          {exp.featured ? '⭐ ' : ''}
          {exp.type}
        </span>
        <span className="text-xl opacity-60" aria-hidden="true">
          {exp.icon || (isEng ? '💻' : '🌍')}
        </span>
      </header>

      {/* Body */}
      <article className="px-6 pb-6">
        <h3
          className="font-semibold mb-2 leading-snug"
          style={{
            fontSize: '15px',
            color: colors.text,
          }}
        >
          {exp.title}
        </h3>

        {exp.subtitle && (
          <p
            className="mb-3 font-medium"
            style={{
              fontSize: '12px',
              color: accent,
            }}
          >
            {exp.subtitle}
          </p>
        )}

        <p
          className="line-clamp-3"
          style={{
            fontSize: '12px',
            color: colors.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {exp.desc}
        </p>

        {/* Places */}
        {exp.places && (
          <ul
            className="flex flex-wrap gap-2 mt-4 list-none p-0"
            aria-label="Places visited"
          >
            {exp.places.slice(0, 3).map((place, i) => (
              <li
                key={i}
                className="px-2.5 py-1.5 rounded-lg"
                style={{
                  fontSize: '10px',
                  background: colors.surfaceHover,
                  color: colors.textSecondary,
                }}
              >
                {place}
              </li>
            ))}
          </ul>
        )}

        {/* Meta */}
        <footer
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <time
            style={{
              fontSize: '11px',
              color: colors.textDim,
            }}
          >
            {exp.date}
          </time>
          <span
            className="font-semibold tracking-widest"
            style={{
              fontSize: '10px',
              color: accent,
            }}
          >
            View details →
          </span>
        </footer>
      </article>
    </MotionDiv>
  );
};

export default ExperienceCard;
