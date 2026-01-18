'use client';

import { useJourney } from '../../context';
import ExperienceCard from '../ExperienceCard';

interface CardColumnProps {
  side: 'engineering' | 'adventure';
}

const CardColumn = ({ side }: CardColumnProps) => {
  const { currentLocation, visibleCards, onCardClick } = useJourney();
  const isEngineering = side === 'engineering';

  if (!currentLocation) return null;

  const cards = currentLocation.experiences.filter((e) => e.type === side);

  return (
    <div
      className={`flex flex-col gap-5 justify-center overflow-y-auto py-6 pointer-events-auto ${
        isEngineering ? 'pl-6 pr-8 items-start' : 'pr-6 pl-8 items-end'
      }`}
    >
      {cards.map((exp, idx) => {
        const globalIdx = currentLocation.experiences.findIndex(
          (e) => e.id === exp.id,
        );
        return (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            index={idx}
            isVisible={visibleCards.includes(globalIdx)}
            onClick={() => onCardClick(exp)}
          />
        );
      })}
    </div>
  );
};

export default CardColumn;
