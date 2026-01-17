'use client';

import { useTheme } from '@/theme/ThemeProvider';

const Title = () => {
  const { colors } = useTheme();

  return (
    <h1
      className="font-heading uppercase tracking-[0.15em] leading-[1.1] m-0"
      style={{
        fontSize: 'clamp(32px, 6vw, 72px)',
        fontWeight: 700,
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
