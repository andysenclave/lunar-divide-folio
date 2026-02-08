'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
} from 'react';
import type { Location, Experience } from '../types';
import { ProgressBar, ExperienceModal } from '../components';

interface JourneyContextValue {
  isAdventureMode: boolean;
  currentLocation: Location | null;
  visibleCards: number[];
  onCardClick: (exp: Experience) => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};

interface JourneyProviderProps {
  children: ReactNode;
  isAdventureMode: boolean;
  currentLocation: Location | null;
  visibleCards: number[];
  scrollProgress: number;
  sectionRef: RefObject<HTMLElement | null>;
}

export const JourneyProvider = ({
  children,
  isAdventureMode,
  currentLocation,
  visibleCards,
  scrollProgress,
  sectionRef,
}: JourneyProviderProps) => {
  const [modalExp, setModalExp] = useState<Experience | null>(null);

  return (
    <JourneyContext.Provider
      value={{
        isAdventureMode,
        currentLocation,
        visibleCards,
        onCardClick: setModalExp,
      }}
    >
      <ProgressBar scrollProgress={scrollProgress} />

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

      {/* Main journey section */}
      <section
        ref={sectionRef}
        id="journey"
        className="relative"
        style={{ height: '2800vh' }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 w-screen h-screen overflow-hidden">
          {children}
        </div>
      </section>

      <ExperienceModal exp={modalExp} onClose={() => setModalExp(null)} />
    </JourneyContext.Provider>
  );
};
