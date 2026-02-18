'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface DesignInfoProps {
  title: string;
}

const DesignInfo = ({ title }: DesignInfoProps) => {
  const { colors } = useTheme();

  return (
    <div style={{ padding: '12px 16px' }}>
      <h4
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: colors.white,
        }}
      >
        {title}
      </h4>
    </div>
  );
};

export default DesignInfo;
