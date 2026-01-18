'use client';

import { useEffect } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import type { FlightData } from '../../types';
import { useGlobe, GLOBE_COLORS } from '../../hooks';

interface GlobeViewProps {
  isAdventureMode: boolean;
  setUpdateGlobeCallback: (
    callback: (
      scale: number,
      rotation: [number, number],
      flightData: FlightData | null
    ) => void
  ) => void;
}

const GlobeView = ({ isAdventureMode, setUpdateGlobeCallback }: GlobeViewProps) => {
  const { colors } = useTheme();
  const { svgRef, updateGlobe } = useGlobe();

  // Register the updateGlobe callback with the parent
  useEffect(() => {
    setUpdateGlobeCallback(updateGlobe);
  }, [setUpdateGlobeCallback, updateGlobe]);

  return (
    <div className="absolute inset-0 z-[5]">
      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full pointer-events-none transition-all duration-800"
        style={{
          background: isAdventureMode
            ? `radial-gradient(circle, ${GLOBE_COLORS.orangeGlow} 0%, transparent 70%)`
            : `radial-gradient(circle, ${GLOBE_COLORS.cyanGlow} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.5,
        }}
      />

      {/* SVG Globe */}
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default GlobeView;
