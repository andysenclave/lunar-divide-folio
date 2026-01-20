import HeroSection from '@/resources/mockups/HeroSection';
import JourneySection from '@/resources/mockups/JourneySection';
import ExperienceSection from '@/resources/mockups/ExperienceSection';
import ContactSection from '@/resources/mockups/ContactFooterSection';

const Mockup = () => {
  return (
    <>
      <HeroSection />
      <JourneySection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
};

export default function Page() {
  return <Mockup />;
}
