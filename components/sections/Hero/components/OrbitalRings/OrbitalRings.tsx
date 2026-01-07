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
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(280px, 40vw, 400px)',
        height: 'clamp(280px, 40vw, 400px)',
        pointerEvents: 'none',
        opacity,
        zIndex: 45,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${colors.border}`,
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />
      <MotionSection
        style={{
          position: 'absolute',
          inset: 25,
          border: `1px dashed ${colors.border}`,
          borderRadius: '50%',
          opacity: 0.2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
    </MotionSection>
  );
};

export default OrbitalRings;
