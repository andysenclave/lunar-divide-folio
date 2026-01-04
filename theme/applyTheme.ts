import { THEME, ThemeMode } from './theme';

export function applyTheme(mode: ThemeMode) {
  const t = THEME[mode];
  const root = document.documentElement;

  root.classList.toggle('dark', mode === 'dark');

  // colors
  root.style.setProperty('--bg', t.colors.bg);
  root.style.setProperty('--bg-secondary', t.colors.bgSecondary);
  root.style.setProperty('--surface-hover', t.colors.surfaceHover);
  root.style.setProperty('--border', t.colors.border);

  root.style.setProperty('--cyan', t.colors.cyan);
  root.style.setProperty('--cyan-hover', t.colors.cyanHover);
  root.style.setProperty('--cyan-dark', t.colors.cyanDark);
  root.style.setProperty('--cyan-glow', t.colors.cyanGlow);

  root.style.setProperty('--orange', t.colors.orange);
  root.style.setProperty('--orange-hover', t.colors.orangeHover);
  root.style.setProperty('--orange-dark', t.colors.orangeDark);
  root.style.setProperty('--orange-glow', t.colors.orangeGlow);

  root.style.setProperty('--text', t.colors.text);
  root.style.setProperty('--text-muted', t.colors.textMuted);
  root.style.setProperty('--text-dim', t.colors.textDim);

  root.style.setProperty('--success', t.colors.success);
  root.style.setProperty('--warning', t.colors.warning);
  root.style.setProperty('--error', t.colors.error);

  // fonts
  root.style.setProperty('--font-heading', t.fonts.heading);
  root.style.setProperty('--font-body', t.fonts.body);
  root.style.setProperty('--font-mono', t.fonts.mono);
}
