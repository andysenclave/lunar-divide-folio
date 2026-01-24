'use client';

import { createContext, useContext, ReactNode, RefObject } from 'react';
import { MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { CosmicBackground } from '../components';

interface ContactContextValue {
  scrollProgress: MotionValue<number>;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
  sectionRef: RefObject<HTMLElement | null>;
  scrollProgress: MotionValue<number>;
}

export const ContactProvider = ({
  children,
  sectionRef,
  scrollProgress,
}: ContactProviderProps) => {
  const { colors } = useTheme();

  return (
    <ContactContext.Provider value={{ scrollProgress }}>
      <footer
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          background: colors.bg,
          fontFamily: 'var(--font-heading)',
          paddingTop: 'clamp(80px, 15vh, 140px)',
        }}
        id="contact"
      >
        <CosmicBackground scrollProgress={scrollProgress} />

        <article
          className="relative z-10 max-w-250 mx-auto"
          style={{
            padding: '0 clamp(20px, 5vw, 48px)',
          }}
        >
          {children}
        </article>
      </footer>
    </ContactContext.Provider>
  );
};
