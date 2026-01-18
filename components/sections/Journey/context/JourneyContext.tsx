'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Location, Experience } from '../types';

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
  onCardClick: (exp: Experience) => void;
}

export const JourneyProvider = ({
  children,
  isAdventureMode,
  currentLocation,
  visibleCards,
  onCardClick,
}: JourneyProviderProps) => {
  return (
    <JourneyContext.Provider
      value={{ isAdventureMode, currentLocation, visibleCards, onCardClick }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
