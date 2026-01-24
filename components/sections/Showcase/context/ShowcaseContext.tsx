'use client';

import { createContext, useContext, ReactNode, RefObject } from 'react';
import { MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FilterType } from '../types';
import { useShowcaseFilter, useScrollState } from '../hooks';
import { Background } from '../components';

// ============================================
// CONTEXT TYPES
// ============================================
interface ShowcaseContextValue {
  // Filter state
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  showFeatured: boolean;
  showCertifications: boolean;
  showGitHub: boolean;
  showDesigns: boolean;
  // Scroll state
  isScrolled: boolean;
  contentRef: RefObject<HTMLDivElement | null>;
}

// ============================================
// CONTEXT
// ============================================
const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

export const useShowcase = () => {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error('useShowcase must be used within a ShowcaseProvider');
  }
  return context;
};

// ============================================
// SCROLLBAR STYLES
// ============================================
const ScrollbarStyles = ({ borderColor, hoverColor }: { borderColor: string; hoverColor: string }) => (
  <style>{`
    .showcase-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .showcase-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .showcase-scroll::-webkit-scrollbar-thumb {
      background: ${borderColor};
      border-radius: 3px;
    }
    .showcase-scroll::-webkit-scrollbar-thumb:hover {
      background: ${hoverColor};
    }
  `}</style>
);

// ============================================
// PROVIDER
// ============================================
interface ShowcaseProviderProps {
  children: ReactNode;
  sectionRef: RefObject<HTMLElement | null>;
  backgroundY: MotionValue<string>;
}

export const ShowcaseProvider = ({
  children,
  sectionRef,
  backgroundY,
}: ShowcaseProviderProps) => {
  const { colors } = useTheme();

  // Use extracted hooks
  const filterState = useShowcaseFilter('all');
  const scrollState = useScrollState(20);

  const contextValue: ShowcaseContextValue = {
    ...filterState,
    isScrolled: scrollState.isScrolled,
    contentRef: scrollState.contentRef,
  };

  return (
    <ShowcaseContext.Provider value={contextValue}>
      <section
        ref={sectionRef}
        id="showcase"
        className="relative"
        style={{
          height: '400vh',
          background: colors.bg,
          fontFamily: 'var(--font-heading)',
        }}
      >
        {/* Sticky viewport */}
        <section className="sticky top-0 h-screen overflow-hidden">
          <Background backgroundY={backgroundY} />

          {/* Content layout */}
          <div className="relative z-10 h-full flex flex-col">
            {children}
          </div>
        </section>
      </section>

      <ScrollbarStyles
        borderColor={colors.border}
        hoverColor={colors.textMuted}
      />
    </ShowcaseContext.Provider>
  );
};
