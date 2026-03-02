'use client';

import { useRef, useCallback, useSyncExternalStore } from 'react';
import { MotionSection } from '@/components/motion';
import { useAnimation, type ActiveSide } from '@/context';
import { useTransform } from 'framer-motion';
import Title from './components/Title';
import OrbitalRings from './components/OrbitalRings';
import SideLabel from './components/SideLabel';
import PortraitOverlays from './components/PortraitOverlays';
import Tagline from './components/Tagline';
import ScrollIndicator from './components/ScrollIndicator';

const MOBILE_QUERY = '(max-width: 767px)';
const SWIPE_SENSITIVITY = 2.5; // How quickly swipe maps to full reveal

const HeroSection = () => {
  const {
    activeSide,
    lastActiveSide,
    heroRef,
    heroContentRef,
    handleMouseMove,
    handleMouseLeave,
    scrollYProgress,
    smoothMouseX,
    mouseX,
    setActiveSide,
    setLastActiveSide,
  } = useAnimation();

  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

  // Mobile detection
  const subscribeMobile = useCallback((cb: () => void) => {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, []);
  const getMobileSnapshot = useCallback(
    () => window.matchMedia(MOBILE_QUERY).matches,
    [],
  );
  const getMobileServerSnapshot = useCallback(() => false, []);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );

  // Touch swipe state for portrait reveals
  const touchStartXRef = useRef<number | null>(null);
  const viewportWidthRef = useRef(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;
      touchStartXRef.current = e.touches[0].clientX;
      viewportWidthRef.current = window.innerWidth;
    },
    [isMobile],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || touchStartXRef.current === null) return;

      const deltaX = e.touches[0].clientX - touchStartXRef.current;
      const halfWidth = viewportWidthRef.current / 2;
      // Swipe right→left (negative delta) → adventure (mouseX toward 1)
      // Swipe left→right (positive delta) → engineering (mouseX toward 0)
      const normalized = Math.max(
        0,
        Math.min(1, 0.5 - (deltaX / halfWidth) * SWIPE_SENSITIVITY),
      );

      mouseX.set(normalized);

      const newSide: ActiveSide =
        normalized < 0.4
          ? 'engineering'
          : normalized > 0.6
            ? 'adventure'
            : 'neutral';
      setActiveSide(newSide);
      if (newSide !== 'neutral') {
        setLastActiveSide(newSide);
      }
    },
    [isMobile, mouseX, setActiveSide, setLastActiveSide],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    touchStartXRef.current = null;
    mouseX.set(0.5);
    setActiveSide('neutral');
  }, [isMobile, mouseX, setActiveSide]);

  return (
    <main
      id="main-content"
      ref={heroRef}
      className="min-h-screen relative z-10 flex items-center justify-center"
    >
      <div
        ref={heroContentRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-350 min-h-screen relative flex flex-col items-center justify-center py-20 px-6 pt-30 mx-auto cursor-crosshair"
      >
        <MotionSection
          className="absolute left-1/2 text-center z-40 w-full px-6"
          style={{
            opacity: heroContentOpacity,
            x: '-50%',
            bottom: 'calc(50% + clamp(100px, 15vw, 150px) + 5px)',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title />
        </MotionSection>

        {/* Side labels positioned relative to the full hero viewport */}
        <SideLabel
          side="engineering"
          activeSide={activeSide}
          opacity={heroContentOpacity}
          mouseX={smoothMouseX}
        />
        <SideLabel
          side="adventure"
          activeSide={activeSide}
          opacity={heroContentOpacity}
          mouseX={smoothMouseX}
        />

        <div className="relative w-full max-w-225 h-100 flex items-center justify-center">
          <OrbitalRings opacity={heroContentOpacity} />
          <PortraitOverlays />
        </div>

        <Tagline activeSide={activeSide} opacity={heroContentOpacity} />
        <ScrollIndicator
          lastActiveSide={lastActiveSide}
          opacity={heroContentOpacity}
        />
      </div>
    </main>
  );
};

export default HeroSection;
