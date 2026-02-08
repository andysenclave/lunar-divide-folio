'use client';

import { useState, useCallback, useMemo } from 'react';
import type { FilterType } from '../types';

export interface ShowcaseFilterState {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  showFeatured: boolean;
  showCertifications: boolean;
  showGitHub: boolean;
  showDesigns: boolean;
}

export function useShowcaseFilter(
  initialFilter: FilterType = 'all',
): ShowcaseFilterState {
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);

  const handleSetActiveFilter = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
  }, []);

  const visibility = useMemo(
    () => ({
      showFeatured: activeFilter === 'all' || activeFilter === 'featured',
      showCertifications:
        activeFilter === 'all' || activeFilter === 'certifications',
      showGitHub: activeFilter === 'all' || activeFilter === 'github',
      showDesigns: activeFilter === 'all' || activeFilter === 'designs',
    }),
    [activeFilter],
  );

  return {
    activeFilter,
    setActiveFilter: handleSetActiveFilter,
    ...visibility,
  };
}
