'use client';
import { GlobalBackground } from '@/components/layout';
import { useActiveSide } from '@/hooks';

export default function Page() {
  const { heroRef, heroContentRef, lastActiveSide, scrollYProgress } =
    useActiveSide();

  return (
    <GlobalBackground
      lastActiveSide={lastActiveSide}
      scrollYProgress={scrollYProgress}
    >
      <section ref={heroRef}>
        <div ref={heroContentRef}>
          <p>Welcome to the main page!</p>
        </div>
      </section>
    </GlobalBackground>
  );
}
