'use client';

import { useTheme } from '@/theme/ThemeProvider';

const Title = () => {
  const { colors } = useTheme();

  return (
    <h1
      className="font-heading font-bold uppercase tracking-[0.15em] leading-tight m-0"
      style={{
        fontSize: 'clamp(32px, 6vw, 72px)',
        color: colors.text,
      }}
    >
      ANINDYA
      <br />
      MUKHERJEE
    </h1>
  );
};

export default Title;
