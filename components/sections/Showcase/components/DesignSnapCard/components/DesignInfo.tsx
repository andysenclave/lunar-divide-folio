'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface DesignInfoProps {
  title: string;
  description: string;
}

const DesignInfo = ({ title, description }: DesignInfoProps) => {
  const { colors } = useTheme();

  return (
    <div style={{ padding: '16px 20px' }}>
      <h4
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.white,
          marginBottom: '4px',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: '12px',
          color: colors.textMuted,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default DesignInfo;
