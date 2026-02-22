'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface BlogInfoProps {
  title: string;
  date: string;
}

const BlogInfo = ({ title, date }: BlogInfoProps) => {
  const { colors } = useTheme();

  return (
    <div style={{ padding: '12px 16px' }}>
      <h4
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: colors.text,
          marginBottom: '4px',
        }}
      >
        {title}
      </h4>
      <span
        style={{
          fontSize: '11px',
          color: colors.textMuted,
        }}
      >
        {date}
      </span>
    </div>
  );
};

export default BlogInfo;
