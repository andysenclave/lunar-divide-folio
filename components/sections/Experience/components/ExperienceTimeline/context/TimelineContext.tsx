'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TimelineContextValue {
  expandedId: string | null;
  toggleExpanded: (id: string) => void;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};

interface TimelineProviderProps {
  children: ReactNode;
}

export const TimelineProvider = ({ children }: TimelineProviderProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <TimelineContext.Provider value={{ expandedId, toggleExpanded }}>
      {children}
    </TimelineContext.Provider>
  );
};
