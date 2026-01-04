'use client';

import React, { createContext, useEffect, useMemo, useState } from 'react';
import { applyTheme } from './applyTheme';
import type { ThemeMode } from './theme';

type ThemeCtx = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = 'theme-mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // Runs ONLY in browser
  useEffect(() => {
    const saved =
      typeof window !== 'undefined'
        ? (localStorage.getItem(STORAGE_KEY) as ThemeMode | null)
        : null;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(saved ?? 'dark');
    setMounted(true);
  }, []);

  // Apply theme after mount
  useEffect(() => {
    if (!mounted) return;

    applyTheme(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, mounted]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
