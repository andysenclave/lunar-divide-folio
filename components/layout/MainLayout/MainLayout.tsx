'use client';

import { GlobalBackground, Header } from '@/components/layout';
import FloatingMoon from '@/components/layout/FloatingMoon';
import {
  HeroSection,
  JourneySection,
  ExperienceSection,
} from '@/components/sections';

export default function MainLayout() {
  return (
    <>
      <GlobalBackground>
        <Header />
        <FloatingMoon />
        <HeroSection />
      </GlobalBackground>
      <JourneySection />
      <ExperienceSection />
    </>
  );
}
