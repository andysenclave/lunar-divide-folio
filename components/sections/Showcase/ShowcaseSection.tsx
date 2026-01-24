'use client';

import { ShowcaseProvider } from './context';
import { useShowcaseScroll } from './hooks';
import { SectionHeader, FilterTabs, ContentArea } from './components';

const ShowcaseSection = () => {
  const { sectionRef, backgroundY } = useShowcaseScroll();

  return (
    <ShowcaseProvider sectionRef={sectionRef} backgroundY={backgroundY}>
      <SectionHeader />
      <FilterTabs />
      <ContentArea />
    </ShowcaseProvider>
  );
};

export default ShowcaseSection;
