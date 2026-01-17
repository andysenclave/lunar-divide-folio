'use client';

import { useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useJourneyScroll } from './hooks';
import { GLOBE_COLORS } from './hooks/useGlobe';
import type { Experience } from './types';
import {
  GlobeView,
  YearDisplay,
  LocationDisplay,
  CardsContainer,
  ExperienceModal,
  ScrollIndicator,
  ProgressBar,
} from './components';

const JourneySection = () => {
  const { colors, mode } = useTheme();
  const [modalExp, setModalExp] = useState<Experience | null>(null);

  const {
    scrollProgress,
    currentLocation,
    visibleCards,
    currentYear,
    currentEra,
    isAdventureMode,
    flightData,
    sectionRef,
    setUpdateGlobeCallback,
  } = useJourneyScroll();

  return (
    <>
      {/* Global keyframe styles */}
      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translate(0, 0); }
          50% { transform: rotate(45deg) translate(3px, 3px); }
        }
        @keyframes plane-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      {/* Progress bar */}
      <ProgressBar scrollProgress={scrollProgress} />

      {/* Main journey section - Hero serves as intro */}
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="relative"
        style={{ height: '2800vh' }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 w-screen h-screen overflow-hidden">
          {/* Background */}
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

          {/* Year display */}
          <YearDisplay
            currentYear={currentYear}
            currentEra={currentEra}
            scrollProgress={scrollProgress}
          />

          {/* Globe */}
          <GlobeView
            isAdventureMode={isAdventureMode}
            setUpdateGlobeCallback={setUpdateGlobeCallback}
          />

          {/* Location display */}
          <LocationDisplay
            currentLocation={currentLocation}
            flightData={flightData}
          />

          {/* Cards container */}
          <CardsContainer
            currentLocation={currentLocation}
            visibleCards={visibleCards}
            onCardClick={setModalExp}
          />

          {/* Scroll indicator */}
          <ScrollIndicator scrollProgress={scrollProgress} />
        </div>
      </section>

      {/* Experience modal */}
      <ExperienceModal exp={modalExp} onClose={() => setModalExp(null)} />

      {/* After section */}
      <section
        className="min-h-screen flex items-center justify-center py-20 px-6"
        style={{ background: colors.bg }}
      >
        <h2
          className="text-center"
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            color: colors.textDim,
          }}
        >
          Where it all began...
        </h2>
      </section>
    </>
  );
};

export default JourneySection;
