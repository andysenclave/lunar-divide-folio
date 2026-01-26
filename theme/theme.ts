export const THEME = {
  dark: {
    colors: {
      // Backgrounds
      bg: '#0A0E27',
      bgSecondary: '#1A1F3A',
      bgDark: '#050812',
      surfaceHover: '#252B45',
      border: '#2A2F4A',

      // Primary accent - Engineering
      cyan: '#00D9FF',
      cyanHover: '#00F0FF',
      cyanDark: '#0099CC',
      cyanGlow: 'rgba(0, 217, 255, 0.2)',

      // Secondary accent - Adventure
      orange: '#FF6B35',
      orangeHover: '#FF8C50',
      orangeDark: '#E55100',
      orangeGlow: 'rgba(255, 107, 53, 0.2)',

      // Featured/Gold accent
      gold: '#FFD700',
      goldDark: '#CC9900',
      goldGlow: 'rgba(255, 215, 0, 0.2)',

      // Verified/Success accent (for certifications)
      verified: '#10B981',
      verifiedDark: '#059669',
      verifiedGlow: 'rgba(16, 185, 129, 0.2)',

      // Archived/Inactive accent (for legacy projects)
      archived: '#A855F7',
      archivedDark: '#9333EA',
      archivedGlow: 'rgba(168, 85, 247, 0.15)',

      // Globe colors (Journey section)
      globeOcean: '#0D1A2D',
      globeLand: '#1E4D5C',
      globeLandStroke: '#2A6A7A',
      globeGraticule: 'rgba(255, 255, 255, 0.08)',

      // Text
      white: '#FFFFFF',
      textAlpha: `rgba(255, 255, 255, {alpha})`, // Need to replace {alpha} dynamically
      text: 'rgba(255,255,255,0.85)',
      textSecondary: '#B0B9C6',
      textMuted: 'rgba(255,255,255,0.5)',
      textDim: 'rgba(255,255,255,0.3)',

      // Status
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
      // Backgrounds
      bg: '#FAFBFF',
      bgSecondary: '#FFFFFF',
      bgDark: '#F0F2F5',
      surfaceHover: '#F3F4F8',
      border: '#E8EBF0',

      // Primary accent - Engineering
      cyan: '#0066FF',
      cyanHover: '#1A7FFF',
      cyanDark: '#0052CC',
      cyanGlow: 'rgba(0, 102, 255, 0.1)',

      // Secondary accent - Adventure
      orange: '#FF4500',
      orangeHover: '#FF6633',
      orangeDark: '#E63900',
      orangeGlow: 'rgba(255, 69, 0, 0.1)',

      // Featured/Gold accent
      gold: '#D4A000',
      goldDark: '#A67C00',
      goldGlow: 'rgba(212, 160, 0, 0.15)',

      // Verified/Success accent (for certifications)
      verified: '#059669',
      verifiedDark: '#047857',
      verifiedGlow: 'rgba(5, 150, 105, 0.15)',

      // Archived/Inactive accent (for legacy projects)
      archived: '#9333EA',
      archivedDark: '#7C3AED',
      archivedGlow: 'rgba(147, 51, 234, 0.12)',

      // Globe colors (Journey section)
      globeOcean: '#E8F4FC',
      globeLand: '#B8D4E3',
      globeLandStroke: '#8FBDD3',
      globeGraticule: 'rgba(0, 0, 0, 0.08)',

      // Text
      white: '#FFFFFF',
      textAlpha: `rgba(10,14,39, {alpha})`, // Need to replace {alpha} dynamically
      text: 'rgba(10,14,39,0.92)',
      textSecondary: '#5A6373',
      textMuted: 'rgba(10,14,39,0.62)',
      textDim: 'rgba(10,14,39,0.42)',

      // Status
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
