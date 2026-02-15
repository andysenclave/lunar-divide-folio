'use client';

import { useCallback, useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 *
 * Uses useSyncExternalStore for proper synchronization
 * with the browser's matchMedia API without triggering
 * cascading renders from setState-in-effect.
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
