'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { FolderIcon, StarIcon, ForkIcon } from '../../icons';

interface CardHeaderProps {
  stars: number;
  forks: number;
}

const CardHeader = ({ stars, forks }: CardHeaderProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="flex justify-between items-center"
      style={{ marginBottom: '16px' }}
    >
      <FolderIcon color={colors.cyan} />
      <div className="flex" style={{ gap: '12px' }}>
        <span
          className="flex items-center"
          style={{
            gap: '4px',
            fontSize: '11px',
            color: colors.textMuted,
          }}
        >
          <StarIcon /> {stars}
        </span>
        <span
          className="flex items-center"
          style={{
            gap: '4px',
            fontSize: '11px',
            color: colors.textMuted,
          }}
        >
          <ForkIcon /> {forks}
        </span>
      </div>
    </div>
  );
};

export default CardHeader;
