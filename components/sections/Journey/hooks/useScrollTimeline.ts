'use client';

import { useMemo } from 'react';
import type { TimelineKeyframe, Location } from '../types';
import { LOCATIONS } from '../data';

// ============================================
// SCROLL TIMELINE BUILDER
// ============================================

interface TimelineConfig {
  initialHold: number;
  transitionTime: number;
  cardRevealDelay: number;
}

// Dwell times per location (percentage of scroll progress)
// Total should sum to ~0.92 (leaving room for initial hold and final state)
const LOCATION_DWELL_TIMES: Record<string, number> = {
  'kolkata-2': 0.12, // Recent history - faster
  'berlin': 0.18, // European experience - slower
  'oslo': 0.20, // European experience - slower (longer stint)
  'kolkata-1': 0.14, // Standard
  'chennai': 0.14, // Standard
};

const DEFAULT_DWELL = 0.14;

const DEFAULT_CONFIG: TimelineConfig = {
  initialHold: 0.06, // Buffer before animation starts
  transitionTime: 0.05,
  cardRevealDelay: 0.018,
};

export function buildScrollTimeline(
  locations: Location[] = LOCATIONS,
  config: TimelineConfig = DEFAULT_CONFIG
): TimelineKeyframe[] {
  const timeline: TimelineKeyframe[] = [];
  const { initialHold, transitionTime, cardRevealDelay } = config;

  // Initial state: Globe centered on first location
  const firstLoc = locations[0];
  if (firstLoc) {
    timeline.push({
      progress: 0,
      scale: 1.8,
      rotation: [-firstLoc.coords[0], -firstLoc.coords[1]],
      locationId: firstLoc.id,
      year: firstLoc.year,
      era: firstLoc.era,
      cardVisibility: [],
      isTransition: false,
    });
  }

  // Start with initial hold (globe stays on first location)
  let currentProgress = initialHold;

  locations.forEach((loc, locIndex) => {
    const startProgress = currentProgress;
    const progressPerLocation =
      LOCATION_DWELL_TIMES[loc.id] || DEFAULT_DWELL;

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
