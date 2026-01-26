'use client';

import { useTheme } from '@/theme/ThemeProvider';

interface FeatureRibbonProps {
  label?: string;
}

const FeatureRibbon = ({ label = 'VERIFIED CREDENTIAL' }: FeatureRibbonProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="absolute z-10"
      style={{
        top: '20px',
        right: '20px',
        padding: '8px 16px',
        background: `linear-gradient(135deg, ${colors.verified} 0%, ${colors.cyan} 100%)`,
        borderRadius: '20px',
        boxShadow: `0 4px 16px ${colors.verifiedGlow}`,
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: colors.bg,
          textTransform: 'uppercase',
        }}
      >
        🏅 {label}
      </span>
    </div>
  );
};

export default FeatureRibbon;
