import FloatingMoon from '@/components/layout/FloatingMoon';

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-bg">
      {/* Starfield background - only visible in dark mode */}
      <div className="absolute inset-0 opacity-80 dark:opacity-100 light:opacity-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 35% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(2px 2px at 55% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 65% 45%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 75% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 85% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 5% 85%, rgba(255,255,255,0.4) 0%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* Layout Container - Full Width */}
      <div className="relative h-full w-full px-6 md:px-12 lg:px-16">
        {/* Floating Moon - Center - RENDER FIRST for z-index layering */}
        <FloatingMoon
          size={300}
          className="left-1/2 top-[50%] sm:top-[52%] z-10"
        />

        {/* Hero Title - Overlapping Moon - LARGER */}
        <div className="absolute left-1/2 top-[18vh] sm:top-[20vh] w-full max-w-350 -translate-x-1/2 text-center z-30 px-4">
          <h1 className="font-heading font-bold uppercase tracking-[0.15em] text-[clamp(64px,10vw,132px)] leading-[0.88] text-text">
            ANINDYA
            <br />
            MUKHERJEE
          </h1>
        </div>

        {/* Side Labels - Engineering & Adventure - FULL WIDTH */}
        <div className="absolute inset-x-0 top-[50%] -translate-y-1/2 z-20">
          <div className="mx-auto flex max-w-350 items-center justify-between px-6 md:px-12 lg:px-16">
            {/* Engineering Label - Left */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase text-cyan">
                ENGINEERING
              </span>
              <span className="hidden md:block h-px w-16 lg:w-24 bg-cyan/25" />
            </div>

            {/* Adventure Label - Right */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              <span className="hidden md:block h-px w-16 lg:w-24 bg-orange/25" />
              <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase text-orange">
                ADVENTURE
              </span>
            </div>
          </div>
        </div>

        {/* Tagline & Scroll Indicator - Bottom Center */}
        <div className="absolute left-1/2 bottom-[15vh] sm:bottom-[18vh] -translate-x-1/2 text-center z-20 px-4">
          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl font-medium text-text mb-8">
            Engineering systems. Exploring worlds.
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-orange/75 font-medium">
              SCROLL INTO ADVENTURE
            </span>
            <div className="h-8 sm:h-10 w-px bg-linear-to-b from-orange/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full border border-border bg-surface/30 backdrop-blur hover:bg-surface-hover transition-colors font-medium text-text"
          aria-label="Navigation"
        >
          N
        </button>
      </div>
    </section>
  );
}
