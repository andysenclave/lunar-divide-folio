'use client';
import { GlobalBackground, Header } from '@/components/layout';
import FloatingMoon from '@/components/layout/FloatingMoon';
import { useActiveSide } from '@/hooks';

export default function Page() {
  const {
    activeSide,
    heroRef,
    heroContentRef,
    lastActiveSide,
    scrollYProgress,
    smoothMouseX,
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
      <section ref={heroRef}>
        <div ref={heroContentRef}>
          <p>Welcome to the main page!</p>
        </div>
      </section>
    </GlobalBackground>
  );
}
