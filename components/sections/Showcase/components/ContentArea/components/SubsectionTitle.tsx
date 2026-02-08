'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface SubsectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SubsectionTitle = ({ icon, children }: SubsectionTitleProps) => {
  const { colors } = useTheme();

  return (
    <h3
      className="flex items-center"
      style={{
        fontSize: '14px',
        fontWeight: 600,
        color: colors.textSecondary,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '24px',
        gap: '10px',
      }}
    >
      <span className="flex items-center" style={{ fontSize: '16px' }}>
        {icon}
      </span>
      {children}
    </h3>
  );
};

export default SubsectionTitle;
