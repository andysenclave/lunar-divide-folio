'use client';

import { useMemo } from 'react';
import { useJourney } from '../../context';
import CenterDivider from './CenterDivider';
import SideLabel from './SideLabel';
import CardColumn from './CardColumn';
import MobileBookmark from '../MobileBookmark';

const MAX_VISIBLE_BOOKMARKS = 3;
const BOOKMARK_SPACING = 52; // px between bookmarks (accommodates 2-line titles)

const CardsContainer = () => {
  const { currentLocation, visibleCards, onCardClick } = useJourney();

  // Compute visible bookmarks for mobile view
  const mobileBookmarks = useMemo(() => {
    if (!currentLocation) return { engineering: [], adventure: [] };

    const getVisibleForSide = (side: 'engineering' | 'adventure') => {
      const sideCards = currentLocation.experiences
        .map((exp, globalIdx) => ({ exp, globalIdx }))
        .filter(({ exp }) => exp.type === side);

      return sideCards
        .filter(({ globalIdx }) => visibleCards.includes(globalIdx))
        .slice(-MAX_VISIBLE_BOOKMARKS);
    };

    return {
      engineering: getVisibleForSide('engineering'),
      adventure: getVisibleForSide('adventure'),
    };
  }, [currentLocation, visibleCards]);

  if (!currentLocation) return null;

  const engCount = mobileBookmarks.engineering.length;

  return (
    <>
      <CenterDivider />

      <SideLabel side="engineering" />
      <SideLabel side="adventure" />

      {/* Desktop: side-by-side card columns */}
      <nav
        className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-between z-30 pointer-events-none"
        aria-label="Experience cards"
      >
        <CardColumn side="engineering" />
        <CardColumn side="adventure" />
      </nav>

      {/* Mobile: bookmark ribbons along edges */}
      <div
        className="md:hidden absolute inset-0 z-30 pointer-events-none"
        aria-label="Experience bookmarks"
        role="navigation"
      >
        {/* Engineering bookmarks: above center, from left edge */}
        {mobileBookmarks.engineering.map(({ exp }, idx) => (
          <MobileBookmark
            key={exp.id}
            exp={exp}
            index={idx}
            isVisible={true}
            onClick={() => onCardClick(exp)}
            top={`calc(50% - ${(engCount - idx) * BOOKMARK_SPACING + 10}px)`}
          />
        ))}
        {/* Adventure bookmarks: below center, from right edge */}
        {mobileBookmarks.adventure.map(({ exp }, idx) => (
          <MobileBookmark
            key={exp.id}
            exp={exp}
            index={idx}
            isVisible={true}
            onClick={() => onCardClick(exp)}
            top={`calc(50% + ${10 + idx * BOOKMARK_SPACING}px)`}
          />
        ))}
      </div>
    </>
  );
};

export default CardsContainer;
