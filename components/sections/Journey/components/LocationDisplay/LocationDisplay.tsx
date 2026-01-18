'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import { AnimatePresence } from 'framer-motion';
import type { Location, FlightData } from '../../types';

interface LocationDisplayProps {
  currentLocation: Location | null;
  flightData: FlightData | null;
}

const LocationDisplay = ({
  currentLocation,
  flightData,
}: LocationDisplayProps) => {
  const { colors } = useTheme();

  return (
    <>
      {/* Location name display */}
      <AnimatePresence>
        {currentLocation && (
          <MotionDiv
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="font-bold mb-1.5"
              style={{
                fontSize: 'clamp(36px, 7vw, 72px)',
                color: colors.text,
                letterSpacing: '0.02em',
                textShadow: '0 4px 40px rgba(0,0,0,0.6)',
              }}
            >
              {currentLocation.name}
            </div>

            <div
              className="uppercase mb-1"
              style={{
                fontSize: '13px',
                color: colors.textSecondary,
                letterSpacing: '0.3em',
              }}
            >
              {currentLocation.country}
            </div>

            <div
              style={{
                fontSize: '12px',
                color: colors.textDim,
              }}
            >
              {currentLocation.period}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Traveling indicator */}
      <AnimatePresence>
        {flightData && !currentLocation && (
          <MotionDiv
            className="absolute bottom-[12%] left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span
              className="text-2xl"
              style={{
                animation: 'plane-bob 1.5s ease-in-out infinite',
              }}
            >
              ✈️
            </span>
            <span
              className="uppercase"
              style={{
                fontSize: '14px',
                color: colors.textSecondary,
                letterSpacing: '0.15em',
              }}
            >
              Traveling...
            </span>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default LocationDisplay;
