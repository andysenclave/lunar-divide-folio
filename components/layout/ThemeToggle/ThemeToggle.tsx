'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/theme/ThemeProvider';

export default function ThemeToggle() {
  const theme = useContext(ThemeContext);

  return (
    <button
      className="border border-border bg-bg-secondary px-3 py-2 rounded-md"
      onClick={() => theme?.toggle()}
    >
      Theme: {theme?.mode}
    </button>
  );
}
