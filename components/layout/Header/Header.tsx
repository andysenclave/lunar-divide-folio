'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/theme/ThemeProvider';

export default function Header() {
  const themeCtx = useContext(ThemeContext);

  if (!themeCtx) {
    return null; // or a loading state
  }

  const { mode, toggle } = themeCtx;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-6 md:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-xl leading-none opacity-70">☽</span>
          <span className="text-sm font-semibold tracking-[0.28em] uppercase text-text">
            ANINDYA
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10 lg:gap-14 text-xs tracking-[0.35em] uppercase font-medium">
          <a
            className="text-cyan hover:text-cyan-hover transition-colors"
            href="#engineering"
          >
            ENGINEERING
          </a>
          <a
            className="text-text-muted hover:text-text transition-colors"
            href="#adventure"
          >
            ADVENTURE
          </a>
          <a
            className="text-text-muted hover:text-text transition-colors"
            href="#journal"
          >
            JOURNAL
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/30 backdrop-blur hover:bg-surface-hover transition-colors text-lg"
          >
            {mode === 'dark' ? '☀️' : '🌙'}
          </button>

          <a
            href="#contact"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface/30 px-6 text-xs tracking-[0.24em] uppercase backdrop-blur hover:border-text-muted hover:bg-surface-hover transition-all font-medium"
          >
            CONTACT <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
