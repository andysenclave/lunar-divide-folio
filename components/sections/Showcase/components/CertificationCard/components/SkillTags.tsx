'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface SkillTagsProps {
  skills: string[];
}

const SkillTags = ({ skills }: SkillTagsProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="flex flex-wrap"
      style={{ gap: '8px', marginBottom: '20px' }}
    >
      {skills.map((skill) => (
        <span
          key={skill}
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: colors.white,
            background: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            padding: '6px 12px',
            borderRadius: '14px',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillTags;
