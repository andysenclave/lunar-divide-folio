'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { FlightData, JourneyState, TimelineKeyframe } from '../types';
import { LOCATIONS } from '../data';
import { useScrollTimeline } from './useScrollTimeline';

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const generateArcPoints = (
  start: [number, number],
  end: [number, number],
  numPoints: number = 60,
): [number, number][] => {
  const points: [number, number][] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lng = lerp(start[0], end[0], t);
    const lat = lerp(start[1], end[1], t);
    const arcHeight = Math.sin(t * Math.PI) * 12;
    points.push([lng, lat + arcHeight]);
  }
  return points;
};

// ============================================
// INTERPOLATION HELPER
// ============================================

interface InterpolatedState {
  scale: number;
  rotation: [number, number];
  year: number;
  era: string;
  locationId: string | null;
  cardVisibility: number[];
  flightData: FlightData | null;
}

function interpolateTimeline(
  timeline: TimelineKeyframe[],
  progress: number,
): InterpolatedState {
  let curr = timeline[0];
  let next = timeline[1];
  let t = 0;

  for (let i = 0; i < timeline.length - 1; i++) {
    if (
      progress >= timeline[i].progress &&
      progress <= timeline[i + 1].progress
    ) {
      curr = timeline[i];
      next = timeline[i + 1];
      t = (progress - curr.progress) / (next.progress - curr.progress);
      break;
    }
  }

  if (progress >= timeline[timeline.length - 1].progress) {
    curr = next = timeline[timeline.length - 1];
    t = 1;
  }

  const ease = easeOutQuart(t);

  const scale = lerp(curr.scale, next.scale, ease);
  const rotLng = lerp(curr.rotation[0], next.rotation[0], ease);
  const rotLat = lerp(curr.rotation[1], next.rotation[1], ease);

  let flightData: FlightData | null = null;
  if (curr.isTransition || next.isTransition) {
    const transitionKeyframe = curr.isTransition ? curr : next;
    if (transitionKeyframe.flightFrom && transitionKeyframe.flightTo) {
      flightData = {
        from: transitionKeyframe.flightFrom,
        to: transitionKeyframe.flightTo,
        progress: curr.isTransition ? ease : 0,
      };
    }
  }

  return {
    scale,
    rotation: [rotLng, rotLat],
    year: Math.round(lerp(curr.year, next.year, ease)),
    era: next.era || curr.era || '',
    locationId: next.locationId || curr.locationId,
    cardVisibility: next.cardVisibility || curr.cardVisibility || [],
    flightData,
  };
}

// ============================================
// HOOK: useJourneyScroll
// ============================================

export interface UseJourneyScrollReturn extends JourneyState {
  sectionRef: React.RefObject<HTMLElement | null>;
  updateGlobeCallback: (
    scale: number,
    rotation: [number, number],
    flightData: FlightData | null,
  ) => void;
  setUpdateGlobeCallback: (
    callback: (
      scale: number,
      rotation: [number, number],
      flightData: FlightData | null,
    ) => void,
  ) => void;
}

export function useJourneyScroll(): UseJourneyScrollReturn {
  const sectionRef = useRef<HTMLElement | null>(null);
  const updateGlobeRef = useRef<
    | ((
        scale: number,
        rotation: [number, number],
        flightData: FlightData | null,
      ) => void)
    | null
  >(null);

  const timeline = useScrollTimeline();

  const [state, setState] = useState<JourneyState>({
    scrollProgress: 0,
    currentLocation: null,
    visibleCards: [],
    currentYear: 2026,
    currentEra: 'The Return',
    isAdventureMode: false,
    flightData: null,
  });

  const setUpdateGlobeCallback = useCallback(
    (
      callback: (
        scale: number,
        rotation: [number, number],
        flightData: FlightData | null,
      ) => void,
    ) => {
      updateGlobeRef.current = callback;
    },
    [],
  );

  const updateGlobeCallback = useCallback(
    (
      scale: number,
      rotation: [number, number],
      flightData: FlightData | null,
    ) => {
      if (updateGlobeRef.current) {
        updateGlobeRef.current(scale, rotation, flightData);
      }
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight - window.innerHeight;
        const relativeScroll = window.scrollY - sectionTop + window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, relativeScroll / sectionHeight),
        );

        const interpolated = interpolateTimeline(timeline, progress);

        // Find current location
        const currentLocation = interpolated.locationId
          ? LOCATIONS.find((l) => l.id === interpolated.locationId) || null
          : null;

        // Determine adventure mode
        const isAdventureMode =
          currentLocation?.experiences.some((e) => e.type === 'adventure') ||
          false;

        setState({
          scrollProgress: progress,
          currentLocation,
          visibleCards: interpolated.cardVisibility,
          currentYear: interpolated.year,
          currentEra: interpolated.era,
          isAdventureMode,
          flightData: interpolated.flightData,
        });

        // Update globe if callback is set
        if (updateGlobeRef.current) {
          updateGlobeRef.current(
            interpolated.scale,
            interpolated.rotation,
            interpolated.flightData,
          );
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial call

    return () => window.removeEventListener('scroll', onScroll);
  }, [timeline]);

  return {
    ...state,
    sectionRef,
    updateGlobeCallback,
    setUpdateGlobeCallback,
  };
}

export default useJourneyScroll;
