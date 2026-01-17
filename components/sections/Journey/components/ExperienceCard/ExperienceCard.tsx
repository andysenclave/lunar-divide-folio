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
  const gold = '#FFD700';

  return (
    <MotionDiv
      className="rounded-2xl overflow-hidden cursor-pointer shrink-0 p-10"
      style={{
        width: 300,
        padding: 16,
        margin: '0 8px',
        background: 'rgba(26, 31, 58, 0.95)',
        border: `1px solid ${exp.featured ? gold : colors.border}`,
        backdropFilter: 'blur(16px)',
        boxShadow: exp.featured ? '0 0 20px rgba(255, 215, 0, 0.15)' : 'none',
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
      <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3">
        <span
          className="px-3 py-1.5 rounded-xl text-[9px] font-semibold uppercase tracking-[0.1em] shrink-0 border"
          style={{
            background: exp.featured
              ? 'rgba(255, 215, 0, 0.15)'
              : isEng
                ? 'rgba(0, 217, 255, 0.15)'
                : 'rgba(255, 107, 53, 0.15)',
            color: exp.featured ? gold : accent,
            borderColor: exp.featured
              ? 'rgba(255, 215, 0, 0.3)'
              : isEng
                ? 'rgba(0, 217, 255, 0.25)'
                : 'rgba(255, 107, 53, 0.25)',
          }}
        >
          {exp.featured ? '⭐ ' : ''}
          {exp.type}
        </span>
        <span className="text-xl opacity-60">
          {exp.icon || (isEng ? '💻' : '🌍')}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
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
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.places.slice(0, 3).map((place, i) => (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-lg"
                style={{
                  fontSize: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  color: colors.textSecondary,
                }}
              >
                {place}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <span
            style={{
              fontSize: '11px',
              color: colors.textDim,
            }}
          >
            {exp.date}
          </span>
          <span
            className="font-semibold tracking-[0.1em]"
            style={{
              fontSize: '10px',
              color: accent,
            }}
          >
            View details →
          </span>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ExperienceCard;
