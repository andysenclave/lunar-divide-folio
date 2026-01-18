'use client';

import { useMemo } from 'react';
import type { TimelineKeyframe, Location } from '../types';
import { LOCATIONS } from '../data';

// ============================================
// SCROLL TIMELINE BUILDER
// ============================================

interface TimelineConfig {
  progressPerLocation: number;
  transitionTime: number;
  cardRevealDelay: number;
}

const DEFAULT_CONFIG: TimelineConfig = {
  progressPerLocation: 0.14,
  transitionTime: 0.05,
  cardRevealDelay: 0.018,
};

export function buildScrollTimeline(
  locations: Location[] = LOCATIONS,
  config: TimelineConfig = DEFAULT_CONFIG
): TimelineKeyframe[] {
  const timeline: TimelineKeyframe[] = [];
  let currentProgress = 0;
  const { progressPerLocation, transitionTime, cardRevealDelay } = config;

  locations.forEach((loc, locIndex) => {
    const startProgress = currentProgress;

    // Add transition keyframes between locations
    if (locIndex > 0) {
      const prevLoc = locations[locIndex - 1];

      // Mid-transition keyframe
      timeline.push({
        progress: startProgress,
        scale: 1.4,
        rotation: [
          -(prevLoc.coords[0] + loc.coords[0]) / 2,
          -(prevLoc.coords[1] + loc.coords[1]) / 2,
        ],
        locationId: null,
        year: loc.year + 1,
        era: 'Traveling...',
        cardVisibility: [],
        isTransition: true,
        flightFrom: prevLoc.coords,
        flightTo: loc.coords,
      });

      // Near-destination keyframe
      timeline.push({
        progress: startProgress + transitionTime * 0.5,
        scale: 1.2,
        rotation: [
          -(prevLoc.coords[0] * 0.3 + loc.coords[0] * 0.7),
          -(prevLoc.coords[1] * 0.3 + loc.coords[1] * 0.7),
        ],
        locationId: null,
        year: loc.year,
        era: 'Traveling...',
        cardVisibility: [],
        isTransition: true,
        flightFrom: prevLoc.coords,
        flightTo: loc.coords,
      });

      currentProgress = startProgress + transitionTime;
    }

    const dwellStart = currentProgress;
    const expCount = loc.experiences.length;

    // Location arrival keyframe
    timeline.push({
      progress: dwellStart,
      scale: 1.8,
      rotation: [-loc.coords[0], -loc.coords[1]],
      locationId: loc.id,
      year: loc.year,
      era: loc.era,
      cardVisibility: [],
      isTransition: false,
    });

    // Card reveal keyframes
    for (let i = 0; i < expCount; i++) {
      const cardProgress = dwellStart + 0.02 + i * cardRevealDelay;
      const cardsToShow = Array.from({ length: i + 1 }, (_, j) => j);
      const yearOffset = loc.id === 'kolkata-2' ? 5 : loc.id === 'oslo' ? 3 : 2;
      const yearInterp = loc.year - Math.floor((i / expCount) * yearOffset);

      timeline.push({
        progress: Math.min(
          cardProgress,
          dwellStart + progressPerLocation - 0.015
        ),
        scale: 2.2,
        rotation: [-loc.coords[0], -loc.coords[1]],
        locationId: loc.id,
        year: Math.max(
          yearInterp,
          parseInt(loc.period.split('–')[0]) || loc.year
        ),
        era: loc.era,
        cardVisibility: cardsToShow,
        isTransition: false,
      });
    }

    // All cards visible keyframe
    timeline.push({
      progress: dwellStart + progressPerLocation - 0.01,
      scale: 2.2,
      rotation: [-loc.coords[0], -loc.coords[1]],
      locationId: loc.id,
      year: parseInt(loc.period.split('–')[0]) || loc.year,
      era: loc.era,
      cardVisibility: loc.experiences.map((_, i) => i),
      isTransition: false,
    });

    currentProgress = dwellStart + progressPerLocation;
  });

  // Final keyframe
  timeline.push({
    progress: 0.98,
    scale: 1.1,
    rotation: [-82, -22],
    locationId: null,
    year: 2013,
    era: 'Where It All Began',
    cardVisibility: [],
    isTransition: false,
  });

  return timeline;
}

// ============================================
// HOOK: useScrollTimeline
// ============================================

export function useScrollTimeline(config?: Partial<TimelineConfig>) {
  const timeline = useMemo(() => {
    return buildScrollTimeline(LOCATIONS, { ...DEFAULT_CONFIG, ...config });
  }, [config]);

  return timeline;
}

export default useScrollTimeline;
