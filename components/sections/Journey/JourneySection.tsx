'use client';

import { useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useJourneyScroll } from './hooks';
import { JourneyProvider } from './context';
import type { Experience } from './types';
import {
  GlobeView,
  YearDisplay,
  LocationDisplay,
  CardsContainer,
  ExperienceModal,
  ScrollIndicator,
  ProgressBar,
  StarField,
} from './components';

const JourneySection = () => {
  const { colors } = useTheme();
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
    <JourneyProvider
      isAdventureMode={isAdventureMode}
      currentLocation={currentLocation}
      visibleCards={visibleCards}
      onCardClick={setModalExp}
    >
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
          {/* Background & Star field */}
          <StarField />

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
          <CardsContainer />

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
    </JourneyProvider>
  );
};

export default JourneySection;
