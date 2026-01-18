'use client';

import { useJourney } from '../../context';
import CenterDivider from './CenterDivider';
import SideLabel from './SideLabel';
import CardColumn from './CardColumn';

const CardsContainer = () => {
  const { currentLocation } = useJourney();

  if (!currentLocation) return null;

  return (
    <>
      <CenterDivider />

      <SideLabel side="engineering" />
      <SideLabel side="adventure" />

      {/* Cards wrapper */}
      <nav
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between z-30 pointer-events-none"
        aria-label="Experience cards"
      >
        <CardColumn side="engineering" />
        <CardColumn side="adventure" />
      </nav>
    </>
  );
};

export default CardsContainer;
