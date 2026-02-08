'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
} from 'react';
import { MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { TabType, SideType } from '../types';
import { Background } from '../components';

interface ExperienceContextValue {
  activeTab: TabType;
  activeSide: SideType;
  setActiveTab: (tab: TabType) => void;
  setActiveSide: (side: SideType) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};

interface ExperienceProviderProps {
  children: ReactNode;
  sectionRef: RefObject<HTMLElement | null>;
  backgroundY: MotionValue<string>;
}

export const ExperienceProvider = ({
  children,
  sectionRef,
  backgroundY,
}: ExperienceProviderProps) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('profession');
  const [activeSide, setActiveSide] = useState<SideType>('engineering');

  return (
    <ExperienceContext.Provider
      value={{ activeTab, activeSide, setActiveTab, setActiveSide }}
    >
      <section
        ref={sectionRef}
        className="relative"
        style={{
          height: '300vh',
          background: colors.bg,
          fontFamily: 'var(--font-heading)',
        }}
        id="experience"
      >
        {/* Sticky container */}
        <section className="sticky top-0 min-h-screen overflow-hidden">
          <Background backgroundY={backgroundY} />

          <section
            className="relative z-10 h-screen flex flex-col"
            style={{
              padding: 'clamp(40px, 6vh, 80px) clamp(20px, 5vw, 48px)',
              paddingBottom: 'clamp(40px, 3vh, 80px)',
            }}
          >
            {children}
          </section>
        </section>
      </section>
    </ExperienceContext.Provider>
  );
};
