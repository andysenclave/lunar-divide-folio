'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useShowcase } from '../../context';
import { useHoverState } from '../../hooks';
import { FILTERS } from '../../data';
import FilterTab from './FilterTab';

const FilterTabs = () => {
  const { colors } = useTheme();
  const { activeFilter, setActiveFilter, isScrolled } = useShowcase();
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  // Show full labels when not scrolled OR when hovered
  const showLabels = !isScrolled || isHovered;

  return (
    <MotionDiv
      className="flex justify-center flex-wrap shrink-0 relative"
      style={{
        gap: showLabels ? '10px' : '6px',
        padding: '0 clamp(20px, 5vw, 48px)',
        paddingBottom: showLabels ? '24px' : '16px',
        background: `linear-gradient(to bottom, ${colors.bg}ee 0%, ${colors.bg}dd 50%, transparent 100%)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        paddingBottom: showLabels ? '24px' : '12px',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {FILTERS.map((filter) => (
        <FilterTab
          key={filter.id}
          filter={filter}
          isActive={activeFilter === filter.id}
          showLabels={showLabels}
          onSelect={() => setActiveFilter(filter.id)}
        />
      ))}
    </MotionDiv>
  );
};

export default FilterTabs;
