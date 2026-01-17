'use client';

import { GlobalBackground, Header } from '@/components/layout';
import FloatingMoon from '@/components/layout/FloatingMoon';
import { HeroSection, JourneySection } from '@/components/sections';

/**
 * MainLayout - Core visual structure for the home page
 *
 * Composes:
 * - GlobalBackground: Themed background with gradient effects
 * - Header: Navigation and theme toggle
 * - FloatingMoon: Animated lunar visual element
 * - HeroSection: Primary landing content
 * - JourneySection: Interactive globe-based journey timeline
 *
 * Requires AnimationProvider context.
 */
export default function MainLayout() {
  return (
    <>
      <GlobalBackground>
        <Header />
        <FloatingMoon />
        <HeroSection />
      </GlobalBackground>
      <JourneySection />
    </>
  );
}
