'use client';
import { GlobalBackground, Header } from '@/components/layout';
import FloatingMoon from '@/components/layout/FloatingMoon';
import { HeroSection } from '@/components/sections';
import { useActiveSide } from '@/hooks';

export default function Page() {
  const {
    activeSide,
    heroRef,
    heroContentRef,
    lastActiveSide,
    scrollYProgress,
    smoothMouseX,
    updateActiveSidesOnMouseMove,
    updateActiveSidesOnMouseLeave,
  } = useActiveSide();

  return (
    <GlobalBackground
      lastActiveSide={lastActiveSide}
      scrollYProgress={scrollYProgress}
    >
      <Header activeSide={activeSide} scrollYProgress={scrollYProgress} />

      <FloatingMoon
        scrollYProgress={scrollYProgress}
        smoothMouseX={smoothMouseX}
      />
      <HeroSection
        heroRef={heroRef}
        containerRef={heroContentRef}
        handleMouseMove={updateActiveSidesOnMouseMove}
        handleMouseLeave={updateActiveSidesOnMouseLeave}
        scrollYProgress={scrollYProgress}
        activeSide={activeSide}
        smoothMouseX={smoothMouseX}
      />
    </GlobalBackground>
  );
}
