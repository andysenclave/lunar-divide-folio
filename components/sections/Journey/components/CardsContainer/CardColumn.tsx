'use client';

import { useMemo } from 'react';
import { useJourney } from '../../context';
import ExperienceCard from '../ExperienceCard';

const MAX_VISIBLE_CARDS_PER_SIDE = 2;

interface CardColumnProps {
  side: 'engineering' | 'adventure';
}

const CardColumn = ({ side }: CardColumnProps) => {
  const { currentLocation, visibleCards, onCardClick } = useJourney();
  const isEngineering = side === 'engineering';

  // Get visible cards for this side, limited to MAX_VISIBLE
  const visibleSideCards = useMemo(() => {
    if (!currentLocation) return [];

    const sideCards = currentLocation.experiences
      .map((exp, globalIdx) => ({ exp, globalIdx }))
      .filter(({ exp }) => exp.type === side);

    // Filter to only visible cards
    const visible = sideCards.filter(({ globalIdx }) =>
      visibleCards.includes(globalIdx),
    );

    // Limit to most recent MAX_VISIBLE_CARDS_PER_SIDE
    return visible.slice(-MAX_VISIBLE_CARDS_PER_SIDE);
  }, [currentLocation, visibleCards, side]);

  if (!currentLocation || visibleSideCards.length === 0) return null;

  return (
    <div
      className={`flex flex-col gap-5 justify-center overflow-y-auto py-6 pointer-events-auto ${
        isEngineering ? 'pl-6 pr-8 items-start' : 'pr-6 pl-8 items-end'
      }`}
    >
      {visibleSideCards.map(({ exp, globalIdx }, idx) => (
        <ExperienceCard
          key={exp.id}
          exp={exp}
          index={idx}
          isVisible={true}
          onClick={() => onCardClick(exp)}
        />
      ))}
    </div>
  );
};

export default CardColumn;
