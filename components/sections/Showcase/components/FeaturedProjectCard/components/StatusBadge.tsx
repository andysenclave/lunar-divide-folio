'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { colors } = useTheme();
  const isActive = status === 'Active';

  return (
    <span
      className="absolute"
      style={{
        top: '16px',
        right: '16px',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: isActive ? colors.verifiedGlow : colors.archivedGlow,
        color: isActive ? colors.verified : colors.archived,
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
