'use client';

import { ExperienceProvider } from './context';
import { useExperienceScroll } from './hooks';
import { SectionHeader, ContentArea } from './components';

const ExperienceSection = () => {
  const { sectionRef, backgroundY } = useExperienceScroll();

  return (
    <ExperienceProvider sectionRef={sectionRef} backgroundY={backgroundY}>
      <SectionHeader />
      <ContentArea />
    </ExperienceProvider>
  );
};

export default ExperienceSection;
