'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface ProjectTagsProps {
  tags: string[];
}

const ProjectTags = ({ tags }: ProjectTagsProps) => {
  const { colors } = useTheme();

  return (
    <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '20px' }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: colors.cyan,
            background: 'rgba(0, 217, 255, 0.15)',
            padding: '6px 12px',
            borderRadius: '14px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ProjectTags;
