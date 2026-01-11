'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// COLORS - DARK BUT VISIBLE
// ============================================
const COLORS = {
  bg: '#050810',
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.25)',
  orange: '#FF6B35',
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
};

// ============================================
// QUOTES
// ============================================
const QUOTES = [
  { text: "Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The best way to predict the future is to create it.", author: "Alan Kay" },
];

// ============================================
// REALISTIC MOON - FROM HERO SECTION
// ============================================
function RealisticMoon({ isVisible }) {
  const moonColors = {
    highlight: '#E8E8E0',
    mid: '#A8A8A0',
    dark: '#484848',
    shadow: '#282828',
  };

  return (
    <motion.div
      style={styles.moonContainer}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.85,
      }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      {/* Outer glow */}
      <motion.div
        style={styles.moonGlow}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Moon body */}
      <div style={styles.moonBody}>
        {/* Base surface with realistic gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, 
              ${moonColors.highlight} 0%, 
              #D0D0C8 12%,
              ${moonColors.mid} 30%, 
              ${moonColors.dark} 55%,
              ${moonColors.dark} 70%,
              ${moonColors.shadow} 100%)`,
          }}
        />
        
        {/* Craters - SVG matching HeroSection */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          viewBox="0 0 300 300"
        >
          {/* Mare Tranquillitatis */}
          <ellipse cx="180" cy="200" rx="35" ry="32" fill="rgba(0,0,0,0.15)" />
          <ellipse cx="180" cy="200" rx="28" ry="25" fill="rgba(60,60,55,0.3)" />
          <ellipse cx="175" cy="195" rx="12" ry="10" fill="rgba(90,90,85,0.2)" />
          
          {/* Mare Serenitatis */}
          <ellipse cx="120" cy="100" rx="28" ry="26" fill="rgba(0,0,0,0.12)" />
          <ellipse cx="120" cy="100" rx="22" ry="20" fill="rgba(70,70,65,0.25)" />
          
          {/* Oceanus Procellarum */}
          <ellipse cx="90" cy="160" rx="50" ry="45" fill="rgba(40,45,40,0.2)" />
          
          {/* Smaller maria */}
          <ellipse cx="220" cy="90" rx="18" ry="16" fill="rgba(0,0,0,0.1)" />
          <ellipse cx="200" cy="140" rx="35" ry="30" fill="rgba(50,55,50,0.15)" />
          
          {/* Individual craters */}
          {[[70, 80], [250, 180], [150, 60], [60, 220], [160, 240]].map(([cx, cy], i) => (
            <g key={i}>
              <ellipse cx={cx} cy={cy} r={12 - i} fill="rgba(0,0,0,0.1)" />
              <ellipse cx={cx} cy={cy} r={9 - i} fill="rgba(80,80,75,0.12)" />
            </g>
          ))}
        </svg>
        
        {/* Terminator shadow (day/night line) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `linear-gradient(100deg, 
              transparent 0%, 
              transparent 42%, 
              rgba(0,0,0,0.3) 50%, 
              rgba(0,0,0,0.6) 62%,
              rgba(0,0,0,0.8) 100%)`,
          }}
        />
        
        {/* Inner shadow for 3D depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: `
              inset -30px -20px 60px rgba(0,0,0,0.5),
              inset 10px 10px 40px rgba(255,255,255,0.05)
            `,
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [quoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  
  useEffect(() => {
    const timings = [
      800,   // 0 → 1: Show welcome
      2500,  // 1 → 2: Show moon
      2000,  // 2 → 3: Show concept line 1
      2000,  // 3 → 4: Show concept line 2
      2000,  // 4 → 5: Show concept line 3
      2500,  // 5 → 6: Show quote
      3000,  // 6 → 7: Begin exit
    ];
    
    let totalDelay = 0;
    const timeouts = timings.map((delay, i) => {
      totalDelay += delay;
      return setTimeout(() => setPhase(i + 1), totalDelay);
    });
    
    const exitTimeout = setTimeout(() => {
      onComplete?.();
    }, totalDelay + 1500);
    
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(exitTimeout);
    };
  }, [onComplete]);
  
  const quote = QUOTES[quoteIndex];
  
  return (
    <AnimatePresence>
      {phase < 7 && (
        <motion.div
          style={styles.container}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Vignette */}
          <div style={styles.vignette} />
          
          {/* Content */}
          <div style={styles.content}>
            
            {/* Welcome Text */}
            <motion.div
              style={styles.welcomeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <span style={styles.welcomeSmall}>welcome to</span>
              <h1 style={styles.welcomeTitle}>ANDY'S ENCLAVE</h1>
            </motion.div>
            
            {/* Moon */}
            <RealisticMoon isVisible={phase >= 2} />
            
            {/* Concept Text */}
            <div style={styles.conceptSection}>
              <motion.p
                style={styles.conceptLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: phase >= 3 ? 0.85 : 0,
                  y: phase >= 3 ? 0 : 10,
                }}
                transition={{ duration: 0.8 }}
              >
                A portfolio of two sides.
              </motion.p>
              
              <motion.p
                style={styles.conceptHighlight}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: phase >= 4 ? 1 : 0,
                  y: phase >= 4 ? 0 : 10,
                }}
                transition={{ duration: 0.8 }}
              >
                <span style={{ color: COLORS.cyan }}>Engineering</span>
                <span style={styles.dot}>·</span>
                <span style={{ color: COLORS.orange }}>Adventure</span>
              </motion.p>
              
              <motion.p
                style={styles.conceptLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: phase >= 5 ? 0.7 : 0,
                  y: phase >= 5 ? 0 : 10,
                }}
                transition={{ duration: 0.8 }}
              >
                One journey through code and curiosity.
              </motion.p>
            </div>
            
            {/* Quote */}
            <motion.div
              style={styles.quoteSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 6 ? 0.5 : 0 }}
              transition={{ duration: 1 }}
            >
              <p style={styles.quoteText}>"{quote.text}"</p>
              <span style={styles.quoteAuthor}>— {quote.author}</span>
            </motion.div>
            
          </div>
          
          {/* Progress line */}
          <motion.div
            style={styles.progressContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.4 : 0 }}
          >
            <motion.div
              style={styles.progressLine}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase / 7 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
          
          {/* Styles */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: COLORS.bg,
    fontFamily: "'Sora', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, ${COLORS.bg} 100%)`,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    padding: '0 24px',
  },
  welcomeSection: {
    textAlign: 'center',
  },
  welcomeSmall: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: COLORS.textTertiary,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },
  welcomeTitle: {
    margin: 0,
    fontSize: 'clamp(36px, 8vw, 56px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    lineHeight: 1.1,
  },
  moonContainer: {
    position: 'relative',
    width: '240px',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonGlow: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 65%)`,
    filter: 'blur(40px)',
  },
  moonBody: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 0 80px rgba(180, 190, 180, 0.15)`,
  },
  conceptSection: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    minHeight: '100px',
  },
  conceptLine: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 400,
    color: COLORS.textSecondary,
    letterSpacing: '0.02em',
    lineHeight: 1.7,
  },
  conceptHighlight: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  dot: {
    margin: '0 14px',
    color: COLORS.textTertiary,
    fontWeight: 300,
  },
  quoteSection: {
    position: 'absolute',
    bottom: '-140px',
    textAlign: 'center',
    maxWidth: '450px',
  },
  quoteText: {
    margin: '0 0 10px 0',
    fontSize: '15px',
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    lineHeight: 1.7,
  },
  quoteAuthor: {
    fontSize: '12px',
    color: COLORS.textTertiary,
    letterSpacing: '0.08em',
  },
  progressContainer: {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '2px',
    background: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    borderRadius: '2px',
  },
  progressLine: {
    height: '100%',
    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.orange} 100%)`,
    transformOrigin: 'left',
  },
};
