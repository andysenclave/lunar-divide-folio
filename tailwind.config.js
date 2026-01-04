const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './theme/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-secondary': 'var(--bg-secondary)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',

        cyan: 'var(--cyan)',
        'cyan-hover': 'var(--cyan-hover)',
        'cyan-dark': 'var(--cyan-dark)',

        orange: 'var(--orange)',
        'orange-hover': 'var(--orange-hover)',
        'orange-dark': 'var(--orange-dark)',

        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-dim': 'var(--text-dim)',

        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'cyan-glow': '0 0 40px var(--cyan-glow)',
        'orange-glow': '0 0 40px var(--orange-glow)',
      },
    },
  },
  plugins: [],
};

export default config;
