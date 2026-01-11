'use client';

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

// ============================================
// THEME SYSTEM
// ============================================
const THEMES = {
  dark: {
    bg: '#0A0E27',
    bgSecondary: '#1A1F3A',
    bgHover: '#252B45',
    divider: '#2A2F4A',
    cyan: '#00D9FF',
    cyanHover: '#00F0FF',
    cyanDark: '#0099CC',
    cyanGlow: 'rgba(0, 217, 255, 0.2)',
    orange: '#FF6B35',
    orangeHover: '#FF8C50',
    orangeDark: '#E55100',
    orangeGlow: 'rgba(255, 107, 53, 0.2)',
    text: '#FFFFFF',
    textSecondary: '#B0B9C6',
    textTertiary: '#7A8396',
    textDisabled: '#4A5166',
  },
  light: {
    bg: '#FAFBFF',
    bgSecondary: '#FFFFFF',
    bgHover: '#F3F4F8',
    divider: '#E8EBF0',
    cyan: '#0066FF',
    cyanHover: '#1A7FFF',
    cyanDark: '#0052CC',
    cyanGlow: 'rgba(0, 102, 255, 0.1)',
    orange: '#FF4500',
    orangeHover: '#FF6633',
    orangeDark: '#E63900',
    orangeGlow: 'rgba(255, 69, 0, 0.1)',
    text: '#0A0E27',
    textSecondary: '#5A6373',
    textTertiary: '#8A92A6',
    textDisabled: '#C8CED7',
  },
};

const ThemeContext = createContext({
  theme: 'dark',
  colors: THEMES.dark,
  toggleTheme: () => {},
});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colors: THEMES[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

// ============================================
// GLOBAL BACKGROUND
// ============================================
function GlobalBackground({ lastActiveSide, scrollYProgress, colors, theme }) {
  const bgAccentOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.03]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        transition: 'all 0.4s ease',
      }}
    >
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            theme === 'dark'
              ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 50%, ${colors.bg} 100%)`
              : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgSecondary} 100%)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Star field - only in dark mode */}
      {theme === 'dark' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.85,
            background: `
            radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 35% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at 55% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 45%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 75% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 5% 85%, rgba(255,255,255,0.4) 0%, transparent 100%)
          `,
          }}
        />
      )}

      {/* Dynamic accent glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: bgAccentOpacity,
        }}
        animate={{
          background:
            lastActiveSide === 'engineering'
              ? `radial-gradient(ellipse 80% 60% at 30% 50%, ${colors.cyan} 0%, transparent 60%)`
              : lastActiveSide === 'adventure'
                ? `radial-gradient(ellipse 80% 60% at 70% 50%, ${colors.orange} 0%, transparent 60%)`
                : 'transparent',
        }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

// ============================================
// HEADER WITH THEME TOGGLE
// ============================================
function Header({ navOpacity, activeSide, colors, theme, toggleTheme }) {
  return (
    <motion.header
      style={{
        opacity: navOpacity,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px clamp(24px, 5vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: colors.text,
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '20px', opacity: 0.7 }}>☽</span>
        ANINDYA
      </motion.div>

      <nav
        style={{
          display: 'flex',
          gap: 'clamp(20px, 4vw, 40px)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
        className="hide-mobile"
      >
        {['Engineering', 'Adventure', 'Journal'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2 }}
            style={{
              color:
                activeSide === item.toLowerCase()
                  ? item === 'Engineering'
                    ? colors.cyan
                    : colors.orange
                  : colors.textSecondary,
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `1px solid ${colors.divider}`,
            background: colors.bgSecondary,
            color: colors.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.3s ease',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, borderColor: colors.text }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '10px 24px',
            border: `1px solid ${colors.divider}`,
            borderRadius: '24px',
            color: colors.text,
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease',
          }}
        >
          CONTACT →
        </motion.a>
      </div>
    </motion.header>
  );
}

// ============================================
// MOON COMPONENT
// ============================================
function Moon({
  moonX,
  moonY,
  moonScale,
  moonOpacity,
  moonRotation,
  lightX,
  scrollYProgress,
  isCornerMoonHovered,
  setIsCornerMoonHovered,
  onReturnHome,
  leftReveal,
  rightReveal,
  colors,
  theme,
}) {
  const isInCorner = useTransform(scrollYProgress, (v) => v > 0.5);

  const combinedOpacity = useTransform(
    [moonOpacity, leftReveal, rightReveal],
    ([base, left, right]) => base * (1 - left * 0.8) * (1 - right * 0.8),
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: moonX,
        top: moonY,
        x: '-50%',
        y: '-50%',
        scale: moonScale,
        rotate: moonRotation,
        opacity: combinedOpacity,
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        zIndex: 50,
        cursor: isInCorner.get() ? 'pointer' : 'default',
      }}
      whileHover={isInCorner.get() ? { scale: 1.1 } : {}}
      onClick={() => isInCorner.get() && onReturnHome()}
      onHoverStart={() => setIsCornerMoonHovered(true)}
      onHoverEnd={() => setIsCornerMoonHovered(false)}
    >
      <MoonSurface lightX={lightX} moonRotation={moonRotation} theme={theme} />

      <AnimatePresence>
        {isCornerMoonHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{
              position: 'absolute',
              bottom: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 12px',
              background: 'rgba(0,0,0,0.85)',
              borderRadius: '6px',
              fontSize: '9px',
              color: colors.textSecondary,
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            RETURN HOME
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// MOON SURFACE
// ============================================
function MoonSurface({ lightX, moonRotation, theme }) {
  const moonColors =
    theme === 'dark'
      ? {
          highlight: '#E8E8E0',
          mid: '#A8A8A0',
          dark: '#484848',
          shadow: '#282828',
        }
      : {
          highlight: '#F5F5F0',
          mid: '#D0D0C8',
          dark: '#787878',
          shadow: '#484848',
        };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        position: 'relative',
        boxShadow:
          theme === 'dark'
            ? '0 0 60px rgba(180, 190, 180, 0.15)'
            : '0 0 60px rgba(0, 0, 0, 0.1)',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: useTransform(
            lightX,
            (x) => `
            radial-gradient(circle at ${x}% 35%, 
              ${moonColors.highlight} 0%, 
              #D0D0C8 15%,
              ${moonColors.mid} 35%, 
              ${moonColors.dark} 55%,
              ${moonColors.dark} 75%,
              ${moonColors.shadow} 100%)
          `,
          ),
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: useTransform(
            moonRotation,
            (r) => `
            linear-gradient(${90 + r}deg, 
              transparent 0%, 
              transparent 45%, 
              rgba(0,0,0,0.3) 50%, 
              rgba(0,0,0,0.6) 60%,
              rgba(0,0,0,0.8) 100%)
          `,
          ),
        }}
      />

      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 300 300"
      >
        <ellipse cx="180" cy="200" rx="35" ry="32" fill="rgba(0,0,0,0.15)" />
        <ellipse cx="180" cy="200" rx="28" ry="25" fill="rgba(60,60,55,0.3)" />
        <ellipse cx="175" cy="195" rx="12" ry="10" fill="rgba(90,90,85,0.2)" />
        <ellipse cx="120" cy="100" rx="28" ry="26" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="120" cy="100" rx="22" ry="20" fill="rgba(70,70,65,0.25)" />
        <ellipse cx="90" cy="160" rx="50" ry="45" fill="rgba(40,45,40,0.2)" />
        <ellipse cx="220" cy="90" rx="18" ry="16" fill="rgba(0,0,0,0.1)" />
        <ellipse cx="200" cy="140" rx="35" ry="30" fill="rgba(50,55,50,0.15)" />
        {[
          [70, 80],
          [250, 180],
          [150, 60],
          [60, 220],
          [160, 240],
        ].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <ellipse cx={cx} cy={cy} r={12 - i} fill="rgba(0,0,0,0.1)" />
            <ellipse cx={cx} cy={cy} r={9 - i} fill="rgba(80,80,75,0.12)" />
          </React.Fragment>
        ))}
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow:
            'inset -30px -20px 60px rgba(0,0,0,0.5), inset 10px 10px 40px rgba(255,255,255,0.05)',
        }}
      />
    </div>
  );
}

// ============================================
// ORBITAL RINGS
// ============================================
function OrbitalRings({ opacity, colors }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(280px, 40vw, 400px)',
        height: 'clamp(280px, 40vw, 400px)',
        pointerEvents: 'none',
        opacity,
        zIndex: 45,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${colors.divider}`,
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 25,
          border: `1px dashed ${colors.divider}`,
          borderRadius: '50%',
          opacity: 0.2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

// ============================================
// SIDE LABELS
// ============================================
function SideLabel({ side, activeSide, opacity, mouseX, colors }) {
  const isEngineering = side === 'engineering';
  const color = isEngineering ? colors.cyan : colors.orange;

  const labelOpacity = useTransform(mouseX, (x) => {
    if (isEngineering) {
      return x > 0.6 ? 0.2 : 0.6 + (0.4 - x) * 0.4;
    } else {
      return x < 0.4 ? 0.2 : 0.6 + (x - 0.6) * 0.4;
    }
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: isEngineering ? 'clamp(10px, 5%, 50px)' : 'auto',
        right: isEngineering ? 'auto' : 'clamp(10px, 5%, 50px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexDirection: isEngineering ? 'row' : 'row-reverse',
        opacity: useTransform([labelOpacity, opacity], ([l, o]) => l * o),
        zIndex: 45,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          color,
          fontSize: 'clamp(9px, 1.2vw, 11px)',
          fontWeight: 600,
          letterSpacing: '0.2em',
        }}
      >
        {side.toUpperCase()}
      </span>
      <motion.div
        style={{
          width: 'clamp(20px, 3vw, 30px)',
          height: 1,
          background: `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color}40 0%, ${color}10 100%)`,
        }}
        animate={{
          background:
            activeSide === side
              ? `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color} 0%, ${color}40 100%)`
              : `linear-gradient(${isEngineering ? '90deg' : '270deg'}, ${color}40 0%, ${color}10 100%)`,
        }}
      />
    </motion.div>
  );
}

// ============================================
// PORTRAIT OVERLAYS
// ============================================
function PortraitOverlays({
  leftReveal,
  rightReveal,
  scrollYProgress,
  colors,
}) {
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        borderRadius: '50%',
        overflow: 'hidden',
        zIndex: 51,
        pointerEvents: 'none',
        opacity: containerOpacity,
      }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0, opacity: leftReveal }}
      >
        <EngineeringPortrait colors={colors} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', inset: 0, opacity: rightReveal }}
      >
        <AdventurePortrait colors={colors} />
      </motion.div>
    </motion.div>
  );
}

function EngineeringPortrait({ colors }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background:
          'linear-gradient(145deg, #0a1628 0%, #0d1f35 50%, #051018 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          fontSize: 9,
          fontFamily: 'monospace',
          color: colors.cyan,
          lineHeight: 1.6,
          padding: 20,
          overflow: 'hidden',
        }}
      >
        {`const engineer = {
  name: 'Andy',
  role: 'Tech Lead',
  stack: ['React', 'Node', 
    'GraphQL', 'AWS'],
};

async function build() {
  const vision = await 
    architect(ideas);
  return ship(vision);
}`}
      </div>

      <div
        style={{
          width: 140,
          height: 160,
          background: 'linear-gradient(180deg, #1a2a3a 0%, #0d1a25 100%)',
          borderRadius: '70px 70px 35px 35px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%) perspective(100px) rotateX(10deg)',
            width: 80,
            height: 50,
            background: 'linear-gradient(180deg, #2a3a4a 0%, #1a2a35 100%)',
            borderRadius: 4,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 4,
              background: `linear-gradient(180deg, ${colors.cyan}33 0%, ${colors.cyan}0d 100%)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 40%, ${colors.cyanGlow} 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}

function AdventurePortrait({ colors }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background:
          'linear-gradient(145deg, #1a1005 0%, #2a1a0a 50%, #100800 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(180deg, transparent 0%, ${colors.orangeGlow} 100%)`,
          clipPath:
            'polygon(0% 100%, 15% 60%, 30% 80%, 45% 40%, 55% 55%, 70% 25%, 85% 50%, 100% 30%, 100% 100%)',
        }}
      />

      <div
        style={{
          width: 140,
          height: 160,
          background: 'linear-gradient(180deg, #2a1a0a 0%, #1a0d05 100%)',
          borderRadius: '70px 70px 35px 35px',
          position: 'relative',
          marginTop: -20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 55,
            height: 38,
            background: 'linear-gradient(180deg, #3a2a1a 0%, #2a1a0a 100%)',
            borderRadius: 6,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 22,
              height: 22,
              border: '3px solid #4a3a2a',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 70% 40%, ${colors.orangeGlow} 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}

// ============================================
// TAGLINE
// ============================================
function Tagline({ activeSide, opacity, colors }) {
  const variants = {
    neutral: { tagline: 'Engineering systems. Exploring worlds.', sub: '' },
    engineering: {
      tagline: 'Engineering systems.',
      sub: 'Building what matters.',
    },
    adventure: { tagline: 'Exploring worlds.', sub: 'Sharing what inspires.' },
  };

  const current = variants[activeSide];
  const color =
    activeSide === 'engineering'
      ? colors.cyan
      : activeSide === 'adventure'
        ? colors.orange
        : colors.text;

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: 'clamp(100px, 15vh, 160px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        zIndex: 45,
        pointerEvents: 'none',
        width: '100%',
        padding: '0 24px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color,
              fontWeight: activeSide === 'neutral' ? 400 : 500,
              letterSpacing: '0.03em',
              marginBottom: current.sub ? 6 : 0,
            }}
          >
            {current.tagline}
          </p>
          {current.sub && (
            <p
              style={{
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                color: colors.textSecondary,
                fontWeight: 400,
              }}
            >
              {current.sub}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// SCROLL INDICATOR
// ============================================
function ScrollIndicator({ lastActiveSide, opacity, colors }) {
  const color =
    lastActiveSide === 'engineering'
      ? colors.cyan
      : lastActiveSide === 'adventure'
        ? colors.orange
        : colors.textTertiary;

  const text =
    lastActiveSide === 'engineering'
      ? 'Scroll into Engineering'
      : lastActiveSide === 'adventure'
        ? 'Scroll into Adventure'
        : 'Scroll to explore';

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: 'clamp(20px, 5vh, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity,
      }}
    >
      <motion.span
        style={{
          fontSize: 'clamp(9px, 1vw, 10px)',
          color: `${color}99`,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
        animate={{ color: `${color}99` }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.span>
      <motion.div
        style={{
          width: 1,
          height: 'clamp(30px, 4vh, 40px)',
          background: `linear-gradient(180deg, ${color}80 0%, transparent 100%)`,
        }}
        animate={{
          scaleY: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function PortfolioContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const [activeSide, setActiveSide] = useState('neutral');
  const [lastActiveSide, setLastActiveSide] = useState('neutral');
  const [isCornerMoonHovered, setIsCornerMoonHovered] = useState(false);

  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll transforms
  const scrollEased = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const moonX = useTransform(scrollEased, [0, 1], ['50%', '92%']);
  const moonY = useTransform(scrollEased, [0, 1], ['50%', '88%']);
  const moonScale = useTransform(scrollEased, [0, 1], [1, 0.16]);
  const moonOpacity = useTransform(scrollEased, [0, 1], [1, 0.35]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Derived moon rotation from mouse
  const moonRotation = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const lightX = useTransform(smoothMouseX, [0, 1], [30, 70]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(Math.max(0, Math.min(1, x)));

    const newSide = x < 0.4 ? 'engineering' : x > 0.6 ? 'adventure' : 'neutral';
    setActiveSide(newSide);
    if (newSide !== 'neutral') {
      setLastActiveSide(newSide);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    setActiveSide('neutral');
  };

  const handleReturnHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate reveal values for portraits
  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  return (
    <div
      style={{
        minHeight: '300vh',
        position: 'relative',
        background: colors.bg,
        fontFamily: "'Sora', 'Inter', -apple-system, sans-serif",
        transition: 'background 0.4s ease',
      }}
    >
      {/* GLOBAL BACKGROUND */}
      <GlobalBackground
        lastActiveSide={lastActiveSide}
        scrollYProgress={scrollYProgress}
        colors={colors}
        theme={theme}
      />

      {/* FIXED HEADER */}
      <Header
        navOpacity={navOpacity}
        activeSide={activeSide}
        colors={colors}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* THE MOON */}
      <Moon
        moonX={moonX}
        moonY={moonY}
        moonScale={moonScale}
        moonOpacity={moonOpacity}
        moonRotation={moonRotation}
        lightX={lightX}
        scrollYProgress={scrollYProgress}
        isCornerMoonHovered={isCornerMoonHovered}
        setIsCornerMoonHovered={setIsCornerMoonHovered}
        onReturnHome={handleReturnHome}
        leftReveal={leftReveal}
        rightReveal={rightReveal}
        colors={colors}
        theme={theme}
      />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '100%',
            maxWidth: '1400px',
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 24px 80px',
            margin: '0 auto',
            cursor: 'crosshair',
          }}
        >
          {/* Name Title - Centered at top */}
          <motion.div
            style={{
              opacity: heroContentOpacity,
              position: 'absolute',
              top: '12vh',
              left: '50%',
              x: '-50%',
              textAlign: 'center',
              zIndex: 60,
              width: '100%',
              padding: '0 24px',
            }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              style={{
                fontSize: 'clamp(32px, 6vw, 72px)',
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              ANINDYA
            </h1>
            <h1
              style={{
                fontSize: 'clamp(32px, 6vw, 72px)',
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              MUKHERJEE
            </h1>
          </motion.div>

          {/* Central Moon Area with Labels */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Orbital Rings */}
            <OrbitalRings opacity={heroContentOpacity} colors={colors} />

            {/* Side Labels */}
            <SideLabel
              side="engineering"
              activeSide={activeSide}
              opacity={heroContentOpacity}
              mouseX={smoothMouseX}
              colors={colors}
            />
            <SideLabel
              side="adventure"
              activeSide={activeSide}
              opacity={heroContentOpacity}
              mouseX={smoothMouseX}
              colors={colors}
            />

            {/* Portrait Overlays */}
            <PortraitOverlays
              leftReveal={leftReveal}
              rightReveal={rightReveal}
              scrollYProgress={scrollYProgress}
              colors={colors}
            />
          </div>

          {/* Tagline */}
          <Tagline
            activeSide={activeSide}
            opacity={heroContentOpacity}
            colors={colors}
          />

          {/* Scroll Indicator */}
          <ScrollIndicator
            lastActiveSide={lastActiveSide}
            opacity={heroContentOpacity}
            colors={colors}
          />
        </div>
      </section>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { 
          background: ${colors.bg}; 
          overflow-x: hidden;
          transition: background 0.4s ease;
        }
        a:hover { opacity: 0.8; }
        
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function TwoSidesHeroV9() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
