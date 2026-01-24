'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  RefObject,
} from 'react';
import { MotionValue } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FilterType } from '../types';
import { Background } from '../components';

interface ShowcaseContextValue {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  showFeatured: boolean;
  showCertifications: boolean;
  showGitHub: boolean;
  showDesigns: boolean;
  isScrolled: boolean;
  contentRef: RefObject<HTMLDivElement | null>;
}

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

export const useShowcase = () => {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error('useShowcase must be used within a ShowcaseProvider');
  }
  return context;
};

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
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Listen to scroll events on the content area
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleScroll = () => {
      setIsScrolled(contentElement.scrollTop > 20);
    };

    contentElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => contentElement.removeEventListener('scroll', handleScroll);
  }, []);

  const showFeatured = activeFilter === 'all' || activeFilter === 'featured';
  const showCertifications =
    activeFilter === 'all' || activeFilter === 'certifications';
  const showGitHub = activeFilter === 'all' || activeFilter === 'github';
  const showDesigns = activeFilter === 'all' || activeFilter === 'designs';

  return (
    <ShowcaseContext.Provider
      value={{
        activeFilter,
        setActiveFilter,
        showFeatured,
        showCertifications,
        showGitHub,
        showDesigns,
        isScrolled,
        contentRef,
      }}
    >
      <section
        ref={sectionRef}
        className="relative"
        style={{
          height: '400vh',
          background: colors.bg,
          fontFamily: 'var(--font-heading)',
        }}
        id="showcase"
      >
        {/* Sticky container - full viewport height */}
        <section className="sticky top-0 h-screen overflow-hidden">
          <Background backgroundY={backgroundY} />

          {/* Main layout - flex column to stack header, tabs, and content */}
          <div className="relative z-10 h-full flex flex-col">
            {children}
          </div>
        </section>
      </section>

      {/* Custom scrollbar styles */}
      <style>{`
        .showcase-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .showcase-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .showcase-scroll::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 3px;
        }
        .showcase-scroll::-webkit-scrollbar-thumb:hover {
          background: ${colors.textMuted};
        }
      `}</style>
    </ShowcaseContext.Provider>
  );
};
