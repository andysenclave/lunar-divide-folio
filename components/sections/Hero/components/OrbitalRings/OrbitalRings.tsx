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
      className="absolute left-1/2 top-1/2 pointer-events-none z-45"
      style={{
        width: 'clamp(280px, 40vw, 400px)',
        height: 'clamp(280px, 40vw, 400px)',
        transform: 'translate(-50%, -54%)',
        opacity,
      }}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          opacity: 0.3,
        }}
      />
      {/* Inner rotating ring */}
      <MotionSection
        className="absolute rounded-full"
        style={{
          border: `1px dashed ${colors.border}`,
          inset: '24px',
          opacity: 0.2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
    </MotionSection>
  );
};

export default OrbitalRings;
