'use client';

import { useRef, useCallback, useState } from 'react';
import { useAnimation, type ActiveSide } from '@/context';

type SwipeDirection = 'cw' | 'ccw' | null;

interface UseCircularSwipeReturn {
  /** Touch event handlers to attach to the moon element */
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  /** Current swipe direction: 'cw' (clockwise/adventure) | 'ccw' (counterclockwise/engineering) | null */
  swipeDirection: SwipeDirection;
  /** Progress toward activation threshold (0-1) */
  swipeProgress: number;
  /** Whether the swipe just activated a side */
  isActive: boolean;
}

const ACTIVATION_THRESHOLD = Math.PI / 2; // 90 degrees of cumulative rotation
const DECAY_MS = 600; // Time for glow to fade after release

/**
 * Detects circular swipe gestures on the moon element.
 * Clockwise → adventure (orange), Counterclockwise → engineering (cyan).
 */
export function useCircularSwipe(): UseCircularSwipeReturn {
  const { setActiveSide, setLastActiveSide } = useAnimation();

  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Refs for tracking gesture state without re-renders
  const centerRef = useRef<{ x: number; y: number } | null>(null);
  const prevAngleRef = useRef<number | null>(null);
  const cumulativeRef = useRef(0);
  const decayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getAngle = useCallback(
    (touchX: number, touchY: number, cx: number, cy: number) => {
      return Math.atan2(touchY - cy, touchX - cx);
    },
    [],
  );

  const normalizeAngleDelta = useCallback((delta: number) => {
    // Normalize to [-PI, PI] to handle wrapping around ±PI
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    return delta;
  }, []);

  const clearDecayTimer = useCallback(() => {
    if (decayTimerRef.current) {
      clearTimeout(decayTimerRef.current);
      decayTimerRef.current = null;
    }
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      clearDecayTimer();

      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      centerRef.current = { x: cx, y: cy };

      const touch = e.touches[0];
      prevAngleRef.current = getAngle(touch.clientX, touch.clientY, cx, cy);
      cumulativeRef.current = 0;

      setSwipeDirection(null);
      setSwipeProgress(0);
      setIsActive(false);
    },
    [clearDecayTimer, getAngle],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!centerRef.current || prevAngleRef.current === null) return;

      const touch = e.touches[0];
      const { x: cx, y: cy } = centerRef.current;
      const currentAngle = getAngle(touch.clientX, touch.clientY, cx, cy);

      const delta = normalizeAngleDelta(currentAngle - prevAngleRef.current);
      cumulativeRef.current += delta;
      prevAngleRef.current = currentAngle;

      const cumulative = cumulativeRef.current;
      const absCumulative = Math.abs(cumulative);
      const progress = Math.min(absCumulative / ACTIVATION_THRESHOLD, 1);

      // Positive delta = clockwise = adventure, Negative = counterclockwise = engineering
      const direction: SwipeDirection =
        absCumulative > 0.1 ? (cumulative > 0 ? 'cw' : 'ccw') : null;

      setSwipeDirection(direction);
      setSwipeProgress(progress);

      // Activate when threshold is reached
      if (progress >= 1 && !isActive) {
        setIsActive(true);
        const side: ActiveSide =
          cumulative > 0 ? 'adventure' : 'engineering';
        setActiveSide(side);
        setLastActiveSide(side);

        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
    },
    [
      getAngle,
      normalizeAngleDelta,
      isActive,
      setActiveSide,
      setLastActiveSide,
    ],
  );

  const onTouchEnd = useCallback(() => {
    centerRef.current = null;
    prevAngleRef.current = null;
    cumulativeRef.current = 0;

    // Fade out glow effect
    decayTimerRef.current = setTimeout(() => {
      setSwipeDirection(null);
      setSwipeProgress(0);
      setIsActive(false);
    }, DECAY_MS);
  }, []);

  return {
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
    swipeDirection,
    swipeProgress,
    isActive,
  };
}
