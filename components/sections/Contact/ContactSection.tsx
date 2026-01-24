'use client';

import { ContactProvider } from './context';
import { useContactScroll } from './hooks';
import {
  HeroContent,
  AvailabilityBadge,
  CTAButtons,
  Footer,
  BackToTop,
} from './components';

const ContactSection = () => {
  const { sectionRef, scrollProgress } = useContactScroll();

  return (
    <ContactProvider sectionRef={sectionRef} scrollProgress={scrollProgress}>
      <HeroContent />
      <AvailabilityBadge />
      <CTAButtons />
      <Footer />
      <BackToTop />
    </ContactProvider>
  );
};

export default ContactSection;
