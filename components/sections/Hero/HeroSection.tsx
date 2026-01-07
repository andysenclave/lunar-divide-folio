import { MotionSection } from '@/components/motion';
import { MotionValue, useTransform } from 'framer-motion';
import Title from './components/Title';
import OrbitalRings from './components/OrbitalRings';
import SideLabel from './components/SideLabel';
import { ActiveSide } from '@/hooks';
import PortraitOverlays from './components/PortraitOverlays';
import Tagline from './components/Tagline';
import ScrollIndicator from './components/ScrollIndicator';

interface HeroSectionProps {
  activeSide: ActiveSide;
  lastActiveSide: ActiveSide;
  heroRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  // @ts-expect-error types
  handleMouseMove: (event: MouseEvent<Element, MouseEvent>) => void;
  handleMouseLeave: () => void;
  scrollYProgress: MotionValue<number>;
  smoothMouseX: MotionValue<number>;
}

const HeroSection = ({
  activeSide,
  lastActiveSide,
  containerRef,
  handleMouseMove,
  handleMouseLeave,
  heroRef,
  scrollYProgress,
  smoothMouseX,
}: HeroSectionProps) => {
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          maxWidth: '1400px',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
          margin: '0 auto',
          cursor: 'crosshair',
        }}
      >
        <MotionSection
          style={{
            opacity: heroContentOpacity,
            position: 'absolute',
            top: '12vh',
            left: '50%',
            x: '-50%',
            textAlign: 'center',
            zIndex: 60,
            width: '100%',
            padding: '0 24px',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title />
        </MotionSection>
        <section
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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

          <PortraitOverlays
            mouseX={smoothMouseX}
            scrollYProgress={scrollYProgress}
          />
        </section>
        <Tagline activeSide={activeSide} opacity={heroContentOpacity} />
        <ScrollIndicator
          lastActiveSide={lastActiveSide}
          opacity={heroContentOpacity}
        />
      </section>
    </section>
  );
};

export default HeroSection;
