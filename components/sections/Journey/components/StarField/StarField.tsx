'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { GLOBE_COLORS } from '../../hooks/useGlobe';
import { useJourney } from '../../context';

const StarField = () => {
  const { mode, colors } = useTheme();
  const { isAdventureMode } = useJourney();

  return (
    <>
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-all duration-800"
        style={{
          background: isAdventureMode
            ? `radial-gradient(ellipse 100% 80% at 50% 50%, ${GLOBE_COLORS.orangeGlow}15 0%, transparent 60%), linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 50%, ${colors.bg} 100%)`
            : `radial-gradient(ellipse 100% 80% at 50% 50%, ${GLOBE_COLORS.cyanGlow}10 0%, transparent 60%), linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 50%, ${colors.bg} 100%)`,
        }}
      />

      {/* Star field - only in dark mode */}
      {mode === 'dark' && (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(1px 1px at 3% 12%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 12% 38%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1px 1px at 22% 7%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 32% 62%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 45% 22%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1px 1px at 58% 78%, rgba(255,255,255,0.25) 0%, transparent 100%),
              radial-gradient(1px 1px at 68% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 78% 55%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(1px 1px at 88% 35%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1px 1px at 95% 82%, rgba(255,255,255,0.25) 0%, transparent 100%)
            `,
          }}
        />
      )}
    </>
  );
};

export default StarField;
