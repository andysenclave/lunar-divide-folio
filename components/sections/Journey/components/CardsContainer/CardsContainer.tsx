'use client';

import { useTheme } from '@/theme/ThemeProvider';
import ExperienceCard from '../ExperienceCard';
import type { Location, Experience } from '../../types';

interface CardsContainerProps {
  currentLocation: Location | null;
  visibleCards: number[];
  onCardClick: (exp: Experience) => void;
}

const CardsContainer = ({
  currentLocation,
  visibleCards,
  onCardClick,
}: CardsContainerProps) => {
  const { colors } = useTheme();

  if (!currentLocation) return null;

  const engineeringCards = currentLocation.experiences.filter(
    (e) => e.type === 'engineering',
  );
  const adventureCards = currentLocation.experiences.filter(
    (e) => e.type === 'adventure',
  );

  return (
    <>
      {/* Center divider */}
      <div
        className="absolute top-[15%] bottom-[15%] left-1/2 w-px z-[25] opacity-50"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${colors.border} 15%, ${colors.cyan} 30%, ${colors.border} 50%, ${colors.orange} 70%, ${colors.border} 85%, transparent 100%)`,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
          }}
        />
      </div>

      {/* Side labels */}
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 rotate-180 text-[9px] font-semibold uppercase tracking-[0.25em] opacity-30 z-[24]"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          color: colors.cyan,
          padding: '4px',
        }}
      >
        ENGINEERING
      </div>
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-[0.25em] opacity-30 z-[24]"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          color: colors.orange,
        }}
      >
        ADVENTURE
      </div>

      {/* Cards wrapper */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between z-30 pointer-events-none px-8">
        {/* Engineering cards (left) */}
        <div className="flex flex-col gap-5 max-h-[50vh] overflow-y-auto py-6 pl-6 pr-8 items-start pointer-events-auto">
          {engineeringCards.map((exp, idx) => {
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

        {/* Adventure cards (right) */}
        <div className="flex flex-col gap-5 max-h-[50vh] overflow-y-auto py-6 pr-6 pl-8 items-end pointer-events-auto">
          {adventureCards.map((exp, idx) => {
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
      </div>
    </>
  );
};

export default CardsContainer;
