export const THEME = {
  dark: {
    colors: {
      bg: '#0A0E27',
      bgSecondary: '#1A1F3A',
      surfaceHover: '#252B45',
      border: '#2A2F4A',

      cyan: '#00D9FF',
      cyanHover: '#00F0FF',
      cyanDark: '#0099CC',
      cyanGlow: 'rgba(0, 217, 255, 0.2)',

      orange: '#FF6B35',
      orangeHover: '#FF8C50',
      orangeDark: '#E55100',
      orangeGlow: 'rgba(255, 107, 53, 0.2)',

      white: '#FFFFFF',
      text: 'rgba(255,255,255,0.85)',
      textMuted: 'rgba(255,255,255,0.5)',
      textDim: 'rgba(255,255,255,0.3)',

      success: '#4ADE80',
      warning: '#FBBF24',
      error: '#EF4444',
    },
    fonts: {
      heading: "'Sora', 'Inter', -apple-system, sans-serif",
      body: "'Inter', -apple-system, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
  },
  light: {
    colors: {
      bg: '#FAFBFF',
      bgSecondary: '#FFFFFF',
      surfaceHover: '#F3F4F8',
      border: '#E8EBF0',

      cyan: '#0066FF',
      cyanHover: '#1A7FFF',
      cyanDark: '#0052CC',
      cyanGlow: 'rgba(0, 102, 255, 0.1)',

      orange: '#FF4500',
      orangeHover: '#FF6633',
      orangeDark: '#E63900',
      orangeGlow: 'rgba(255, 69, 0, 0.1)',

      white: '#FFFFFF',
      text: 'rgba(10,14,39,0.92)',
      textMuted: 'rgba(10,14,39,0.62)',
      textDim: 'rgba(10,14,39,0.42)',

      success: '#4ADE80',
      warning: '#FBBF24',
      error: '#EF4444',
    },
    fonts: {
      heading: "'Sora', 'Inter', -apple-system, sans-serif",
      body: "'Inter', -apple-system, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
  },
} as const;

export type ThemeMode = keyof typeof THEME;
export type Theme = typeof THEME.dark | typeof THEME.light;

export type ThemeColors = typeof THEME.dark.colors | typeof THEME.light.colors;
