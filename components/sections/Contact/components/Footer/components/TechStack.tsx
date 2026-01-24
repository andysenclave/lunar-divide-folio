'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionP } from '@/components/motion';

const TechStack = () => {
  const { colors } = useTheme();

  return (
    <MotionP
      className="text-center text-[11px] tracking-wide cursor-default transition-colors duration-300"
      style={{ color: colors.textDim }}
      whileHover={{ color: colors.textSecondary }}
    >
      Built with Next.js, Framer Motion & D3.js
    </MotionP>
  );
};

export default TechStack;
