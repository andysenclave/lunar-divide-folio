'use client';

import { MotionSection } from '@/components/motion';
import { useAnimation } from '@/context';
import { useTransform } from 'framer-motion';
import Title from './components/Title';
import OrbitalRings from './components/OrbitalRings';
import SideLabel from './components/SideLabel';
import PortraitOverlays from './components/PortraitOverlays';
import Tagline from './components/Tagline';
import ScrollIndicator from './components/ScrollIndicator';

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
  } = useAnimation();

  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

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
        className="w-full max-w-350 min-h-screen relative flex flex-col items-center justify-center py-20 px-6 pt-30 mx-auto cursor-crosshair"
      >
        <MotionSection
          className="absolute top-[max(15vh,120px)] left-1/2 text-center z-60 w-full px-6"
          style={{ opacity: heroContentOpacity, x: '-50%' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title />
        </MotionSection>

        <div className="relative w-full max-w-225 h-100 flex items-center justify-center">
          <OrbitalRings opacity={heroContentOpacity} />

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
