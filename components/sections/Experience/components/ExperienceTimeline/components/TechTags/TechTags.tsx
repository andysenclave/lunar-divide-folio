'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface TechTagsProps {
  technologies: string[];
  isExpanded: boolean;
  maxVisible?: number;
}

const TechTags = ({ technologies, isExpanded, maxVisible = 4 }: TechTagsProps) => {
  const { colors } = useTheme();
  const visibleTechs = isExpanded ? technologies : technologies.slice(0, maxVisible);
  const hiddenCount = technologies.length - maxVisible;

  return (
    <ul className="flex flex-wrap gap-1.5 mb-2 list-none p-0 m-0">
      {visibleTechs.map((tech) => (
        <li
          key={tech}
          className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
          style={{
            color: colors.textSecondary,
            background: colors.border,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {tech}
        </li>
      ))}
      {!isExpanded && hiddenCount > 0 && (
        <li
          className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
          style={{
            color: colors.cyan,
            background: colors.border,
            fontFamily: 'var(--font-mono)',
          }}
        >
          +{hiddenCount}
        </li>
      )}
    </ul>
  );
};

export default TechTags;
