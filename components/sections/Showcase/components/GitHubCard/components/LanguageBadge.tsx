'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { LANGUAGE_COLORS } from '../../../data';

interface LanguageBadgeProps {
  language: string;
}

const LanguageBadge = ({ language }: LanguageBadgeProps) => {
  const { colors } = useTheme();

  return (
    <span
      className="flex items-center"
      style={{
        gap: '6px',
        fontSize: '11px',
        color: colors.textSecondary,
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: LANGUAGE_COLORS[language] || colors.cyan,
        }}
      />
      {language}
    </span>
  );
};

export default LanguageBadge;
