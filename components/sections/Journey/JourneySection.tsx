'use client';

import { useJourneyScroll } from './hooks';
import { JourneyProvider } from './context';
import {
  GlobeView,
  YearDisplay,
  LocationDisplay,
  CardsContainer,
  ScrollIndicator,
  StarField,
} from './components';

const JourneySection = () => {
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
      scrollProgress={scrollProgress}
      sectionRef={sectionRef as React.RefObject<HTMLElement>}
    >
      <StarField />

      <YearDisplay
        currentYear={currentYear}
        currentEra={currentEra}
        scrollProgress={scrollProgress}
      />

      <GlobeView
        isAdventureMode={isAdventureMode}
        setUpdateGlobeCallback={setUpdateGlobeCallback}
      />

      <LocationDisplay
        currentLocation={currentLocation}
        flightData={flightData}
      />

      <CardsContainer />

      <ScrollIndicator scrollProgress={scrollProgress} />
    </JourneyProvider>
  );
};

export default JourneySection;
