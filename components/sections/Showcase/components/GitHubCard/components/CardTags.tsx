'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface CardTagsProps {
  tags: string[];
  maxTags?: number;
}

const CardTags = ({ tags, maxTags = 2 }: CardTagsProps) => {
  const { colors } = useTheme();

  return (
    <div className="flex" style={{ gap: '6px' }}>
      {tags.slice(0, maxTags).map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: '9px',
            color: colors.textMuted,
            background: colors.border,
            padding: '3px 8px',
            borderRadius: '8px',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default CardTags;
