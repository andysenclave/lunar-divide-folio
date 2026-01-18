'use client';

import { MotionSection } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionValue } from 'framer-motion';

interface OrbitalRingsProps {
  opacity?: MotionValue<number>;
}

const OrbitalRings = ({ opacity }: OrbitalRingsProps) => {
  const { colors } = useTheme();

  return (
    <MotionSection
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-45"
      style={{
        width: 'clamp(280px, 40vw, 400px)',
        height: 'clamp(280px, 40vw, 400px)',
        opacity,
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ border: `1px solid ${colors.border}` }}
      />
      <MotionSection
        className="absolute inset-6 rounded-full opacity-20"
        style={{ border: `1px dashed ${colors.border}` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
    </MotionSection>
  );
};

export default OrbitalRings;
