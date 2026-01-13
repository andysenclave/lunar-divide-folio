'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// ============================================
// DESIGN SYSTEM - Two Sides of the Moon
// ============================================
const COLORS = {
  // Base
  bg: '#0A0E27',
  bgSecondary: '#1A1F3A',
  bgCard: 'rgba(26, 31, 58, 0.95)',
  divider: '#2A2F4A',

  // Engineering Side (Cool/Technical)
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.3)',
  cyanDim: 'rgba(0, 217, 255, 0.15)',

  // Adventure Side (Warm/Organic)
  orange: '#FF6B35',
  orangeGlow: 'rgba(255, 107, 53, 0.3)',
  orangeDim: 'rgba(255, 107, 53, 0.15)',

  // Text
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',

  // Globe
  ocean: '#0D1A2D',
  land: '#1E4D5C',
  landStroke: '#2A6A7A',
};

// ============================================
// JOURNEY DATA
// ============================================
const LOCATIONS = [
  {
    id: 'kolkata-2',
    name: 'Kolkata',
    country: 'India',
    coords: [88.3639, 22.5726],
    period: '2021 — Present',
    era: 'The Return',
    type: 'engineering',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coords: [13.405, 52.52],
    period: '2019 — 2021',
    era: 'The Startup Phase',
    type: 'engineering',
  },
  {
    id: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    coords: [10.7522, 59.9139],
    period: '2016 — 2019',
    era: 'The Scandinavian Chapter',
    type: 'adventure',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    country: 'India',
    coords: [80.2707, 13.0827],
    period: '2013 — 2015',
    era: 'The Beginning',
    type: 'engineering',
  },
];

// ============================================
// MOON COMPONENT - The Core Visual Element
// ============================================
function Moon({
  lightX,
  moonRotation,
  scale = 1,
  opacity = 1,
  showPortrait = null, // 'engineering' | 'adventure' | null
}) {
  const moonColors = {
    highlight: '#E8E8E0',
    mid: '#A8A8A0',
    dark: '#484848',
    shadow: '#282828',
  };

  return (
    <motion.div
      style={{
        width: 'clamp(200px, 30vw, 300px)',
        height: 'clamp(200px, 30vw, 300px)',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 60px rgba(180, 190, 180, 0.15)',
        scale,
        opacity,
      }}
    >
      {/* Base surface gradient */}
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

      {/* Terminator shadow */}
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

      {/* Craters */}
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
        <ellipse cx="120" cy="100" rx="28" ry="26" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="120" cy="100" rx="22" ry="20" fill="rgba(70,70,65,0.25)" />
        <ellipse cx="90" cy="160" rx="50" ry="45" fill="rgba(40,45,40,0.2)" />
        <ellipse cx="220" cy="90" rx="18" ry="16" fill="rgba(0,0,0,0.1)" />
        {[
          [70, 80],
          [250, 180],
          [150, 60],
          [60, 220],
        ].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <ellipse cx={cx} cy={cy} r={12 - i} fill="rgba(0,0,0,0.1)" />
            <ellipse cx={cx} cy={cy} r={9 - i} fill="rgba(80,80,75,0.12)" />
          </React.Fragment>
        ))}
      </svg>

      {/* Inner shadow for 3D depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow:
            'inset -30px -20px 60px rgba(0,0,0,0.5), inset 10px 10px 40px rgba(255,255,255,0.05)',
        }}
      />

      {/* Portrait Overlays */}
      <AnimatePresence>
        {showPortrait === 'engineering' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'linear-gradient(145deg, #0a1628 0%, #0d1f35 50%, #051018 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Code text overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.15,
                fontSize: 9,
                fontFamily: 'monospace',
                color: COLORS.cyan,
                lineHeight: 1.6,
                padding: 20,
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
            {/* Silhouette with laptop */}
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
                  transform:
                    'translateX(-50%) perspective(100px) rotateX(10deg)',
                  width: 80,
                  height: 50,
                  background:
                    'linear-gradient(180deg, #2a3a4a 0%, #1a2a35 100%)',
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 4,
                    background: `linear-gradient(180deg, ${COLORS.cyan}33 0%, ${COLORS.cyan}0d 100%)`,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
            {/* Cyan glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 40%, ${COLORS.cyanGlow} 0%, transparent 60%)`,
              }}
            />
          </motion.div>
        )}

        {showPortrait === 'adventure' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'linear-gradient(145deg, #1a1005 0%, #2a1a0a 50%, #100800 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Mountain silhouette */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: `linear-gradient(180deg, transparent 0%, ${COLORS.orangeGlow} 100%)`,
                clipPath:
                  'polygon(0% 100%, 15% 60%, 30% 80%, 45% 40%, 55% 55%, 70% 25%, 85% 50%, 100% 30%, 100% 100%)',
              }}
            />
            {/* Silhouette with camera */}
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
                  background:
                    'linear-gradient(180deg, #3a2a1a 0%, #2a1a0a 100%)',
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
            {/* Orange glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: `radial-gradient(circle at 70% 40%, ${COLORS.orangeGlow} 0%, transparent 60%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection({
  containerRef,
  scrollYProgress,
  mouseX,
  smoothMouseX,
  activeSide,
  lastActiveSide,
}) {
  // Scroll transforms for Hero
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Moon transforms
  const moonRotation = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const lightX = useTransform(smoothMouseX, [0, 1], [30, 70]);

  // Portrait reveals
  const leftReveal = useTransform(smoothMouseX, [0.1, 0.4], [1, 0]);
  const rightReveal = useTransform(smoothMouseX, [0.6, 0.9], [0, 1]);

  // Determine which portrait to show
  const showPortrait =
    activeSide === 'engineering'
      ? 'engineering'
      : activeSide === 'adventure'
        ? 'adventure'
        : null;

  return (
    <motion.div
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: heroContentOpacity,
        scale: heroScale,
      }}
    >
      {/* Name Title */}
      <motion.div
        style={{
          position: 'absolute',
          top: '12vh',
          textAlign: 'center',
          zIndex: 60,
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 style={styles.heroTitle}>ANINDYA</h1>
        <h1 style={styles.heroTitle}>MUKHERJEE</h1>
      </motion.div>

      {/* Moon Container with Labels */}
      <div style={styles.moonArea}>
        {/* Engineering Label */}
        <motion.div
          style={{
            ...styles.sideLabel,
            left: 'clamp(10px, 5%, 50px)',
            color: COLORS.cyan,
            opacity: useTransform(smoothMouseX, (x) =>
              x > 0.6 ? 0.2 : 0.6 + (0.4 - x) * 0.4,
            ),
          }}
        >
          <span>ENGINEERING</span>
          <motion.div
            style={styles.labelLine}
            animate={{
              background:
                activeSide === 'engineering'
                  ? `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan}40 100%)`
                  : `linear-gradient(90deg, ${COLORS.cyan}40 0%, ${COLORS.cyan}10 100%)`,
            }}
          />
        </motion.div>

        {/* The Moon */}
        <Moon
          lightX={lightX}
          moonRotation={moonRotation}
          showPortrait={showPortrait}
        />

        {/* Adventure Label */}
        <motion.div
          style={{
            ...styles.sideLabel,
            right: 'clamp(10px, 5%, 50px)',
            flexDirection: 'row-reverse',
            color: COLORS.orange,
            opacity: useTransform(smoothMouseX, (x) =>
              x < 0.4 ? 0.2 : 0.6 + (x - 0.6) * 0.4,
            ),
          }}
        >
          <span>ADVENTURE</span>
          <motion.div
            style={{ ...styles.labelLine, width: 'clamp(20px, 3vw, 30px)' }}
            animate={{
              background:
                activeSide === 'adventure'
                  ? `linear-gradient(270deg, ${COLORS.orange} 0%, ${COLORS.orange}40 100%)`
                  : `linear-gradient(270deg, ${COLORS.orange}40 0%, ${COLORS.orange}10 100%)`,
            }}
          />
        </motion.div>

        {/* Orbital Ring */}
        <div style={styles.orbitalRing}>
          <motion.div
            style={styles.orbitalRingDashed}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Tagline */}
      <motion.div style={styles.taglineContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            {activeSide === 'engineering' && (
              <>
                <p style={{ ...styles.tagline, color: COLORS.cyan }}>
                  Engineering systems.
                </p>
                <p style={styles.taglineSub}>Building what matters.</p>
              </>
            )}
            {activeSide === 'adventure' && (
              <>
                <p style={{ ...styles.tagline, color: COLORS.orange }}>
                  Exploring worlds.
                </p>
                <p style={styles.taglineSub}>Sharing what inspires.</p>
              </>
            )}
            {activeSide === 'neutral' && (
              <p style={{ ...styles.tagline, color: COLORS.text }}>
                Engineering systems. Exploring worlds.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={styles.scrollIndicator}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span
          style={{
            ...styles.scrollText,
            color:
              lastActiveSide === 'engineering'
                ? COLORS.cyan
                : lastActiveSide === 'adventure'
                  ? COLORS.orange
                  : COLORS.textTertiary,
          }}
        >
          {lastActiveSide === 'engineering'
            ? 'Scroll into Engineering'
            : lastActiveSide === 'adventure'
              ? 'Scroll into Adventure'
              : 'Scroll to explore'}
        </span>
        <motion.div
          style={{
            ...styles.scrollLine,
            background: `linear-gradient(180deg, ${
              lastActiveSide === 'engineering'
                ? COLORS.cyan
                : lastActiveSide === 'adventure'
                  ? COLORS.orange
                  : COLORS.textTertiary
            }80 0%, transparent 100%)`,
          }}
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// TRANSITION ZONE - The Magic Happens Here
// ============================================
function TransitionZone({ scrollYProgress }) {
  // This is the "morph" zone where moon becomes globe
  const transitionOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.35, 0.45],
    [0, 1, 1, 0],
  );
  const transitionScale = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4],
    [0.3, 1, 1.5],
  );
  const transitionY = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '-50%']);

  // Text reveals
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: transitionOpacity,
        scale: transitionScale,
        y: transitionY,
        zIndex: 30,
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Morphing visual */}
      <motion.div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 100%)`,
          border: `2px solid ${COLORS.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 40px',
        }}
      >
        <motion.span
          style={{ fontSize: 60, opacity: 0.3 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          🌍
        </motion.span>
      </motion.div>

      {/* Transition text */}
      <motion.div style={{ opacity: textOpacity }}>
        <h2 style={styles.transitionTitle}>THE JOURNEY</h2>
        <p style={styles.transitionSubtitle}>
          From Present Day Back to the Beginning
        </p>
        <p
          style={{
            ...styles.transitionSubtitle,
            color: COLORS.cyan,
            marginTop: 10,
          }}
        >
          2024 → 2013
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// JOURNEY GLOBE SECTION
// ============================================
function JourneySection({
  scrollYProgress,
  currentLocation,
  setCurrentLocation,
}) {
  const svgRef = useRef(null);
  const projectionRef = useRef(null);
  const baseScaleRef = useRef(null);

  // Section visibility
  const journeyOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const journeyY = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);

  // Globe rotation based on scroll
  const globeRotation = useTransform(scrollYProgress, [0.4, 1], [0, -75]);

  // Initialize D3 Globe
  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight * 0.7;
    const baseScale = Math.min(width, height) / 2.2;
    baseScaleRef.current = baseScale;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
    svg.selectAll('*').remove();

    const projection = d3
      .geoOrthographic()
      .scale(baseScale)
      .rotate([-88, -22])
      .translate([width / 2, height / 2]);
    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);
    const globe = svg.append('g');

    // Ocean
    globe
      .append('circle')
      .attr('class', 'ocean')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', projection.scale())
      .style('fill', COLORS.ocean);

    // Graticule
    globe
      .append('path')
      .datum(d3.geoGraticule().step([15, 15]))
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', 'rgba(42, 106, 122, 0.1)')
      .style('stroke-width', 0.5);

    const countriesGroup = globe.append('g').attr('class', 'countries');
    const markersGroup = globe.append('g').attr('class', 'markers');

    // Load world map
    d3.json(
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
    ).then((world) => {
      const worldFeatures = topojson.feature(
        world,
        world.objects.countries,
      ).features;

      countriesGroup
        .selectAll('path')
        .data(worldFeatures)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', COLORS.land)
        .style('stroke', COLORS.landStroke)
        .style('stroke-width', 0.5);

      // Add location markers
      LOCATIONS.forEach((loc) => {
        const g = markersGroup.append('g').attr('data-id', loc.id);
        const color = loc.type === 'adventure' ? COLORS.orange : COLORS.cyan;

        // Glow
        g.append('circle')
          .attr('r', 16)
          .style('fill', color)
          .style('opacity', 0.12)
          .style('filter', 'blur(5px)');

        // Pulse ring
        g.append('circle')
          .attr('class', 'pulse')
          .attr('r', 6)
          .style('fill', 'none')
          .style('stroke', color)
          .style('stroke-width', 1.5)
          .style('opacity', 0);

        // Core dot
        g.append('circle')
          .attr('r', 4)
          .style('fill', color)
          .style('stroke', '#fff')
          .style('stroke-width', 1.5);
      });

      // Pulse animation
      const pulse = () => {
        markersGroup
          .selectAll('.pulse')
          .transition()
          .duration(1800)
          .attr('r', 18)
          .style('opacity', 0.5)
          .transition()
          .duration(1800)
          .attr('r', 6)
          .style('opacity', 0)
          .on('end', pulse);
      };
      pulse();
    });
  }, []);

  // Update globe on scroll
  useEffect(() => {
    const unsubscribe = globeRotation.on('change', (rotation) => {
      if (!projectionRef.current || !svgRef.current) return;

      const projection = projectionRef.current;
      const path = d3.geoPath().projection(projection);
      const svg = d3.select(svgRef.current);

      // Rotate globe
      projection.rotate([-88 + rotation, -22]);

      // Update paths
      svg.selectAll('.countries path').attr('d', path);

      // Update markers
      const rot = projection.rotate();
      LOCATIONS.forEach((loc) => {
        const coords = projection(loc.coords);
        const visible =
          d3.geoDistance(loc.coords, [-rot[0], -rot[1]]) < Math.PI / 2;
        svg
          .select(`[data-id="${loc.id}"]`)
          .attr('transform', `translate(${coords[0]},${coords[1]})`)
          .style('opacity', visible ? 1 : 0);
      });
    });

    return () => unsubscribe();
  }, [globeRotation]);

  // Determine current location based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < 0.5) {
        setCurrentLocation(null);
      } else if (progress < 0.65) {
        setCurrentLocation(LOCATIONS[0]);
      } else if (progress < 0.8) {
        setCurrentLocation(LOCATIONS[1]);
      } else if (progress < 0.9) {
        setCurrentLocation(LOCATIONS[2]);
      } else {
        setCurrentLocation(LOCATIONS[3]);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, setCurrentLocation]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '15%',
        left: 0,
        right: 0,
        height: '85vh',
        opacity: journeyOpacity,
        y: journeyY,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {/* Year Display */}
      <motion.div style={styles.yearDisplay}>
        <AnimatePresence mode="wait">
          {currentLocation && (
            <motion.div
              key={currentLocation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div style={styles.yearNumber}>
                {currentLocation.period.split(' ')[0]}
              </div>
              <div style={styles.eraText}>{currentLocation.era}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Globe */}
      <div style={styles.globeContainer}>
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Location Display */}
      <AnimatePresence>
        {currentLocation && (
          <motion.div
            style={styles.locationDisplay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={styles.locationName}>{currentLocation.name}</div>
            <div style={styles.locationCountry}>{currentLocation.country}</div>
            <div style={styles.locationPeriod}>{currentLocation.period}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Labels */}
      <div style={{ ...styles.journeySideLabel, left: 12, color: COLORS.cyan }}>
        ENGINEERING
      </div>
      <div
        style={{ ...styles.journeySideLabel, right: 12, color: COLORS.orange }}
      >
        ADVENTURE
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN SEAMLESS PORTFOLIO COMPONENT
// ============================================
export default function SeamlessPortfolio() {
  const [activeSide, setActiveSide] = useState('neutral');
  const [lastActiveSide, setLastActiveSide] = useState('neutral');
  const [currentLocation, setCurrentLocation] = useState(null);

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  // Main scroll progress for the entire page
  const { scrollYProgress } = useScroll();

  // Mouse tracking for Hero section
  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      mouseX.set(Math.max(0, Math.min(1, x)));

      const newSide =
        x < 0.4 ? 'engineering' : x > 0.6 ? 'adventure' : 'neutral';
      setActiveSide(newSide);
      if (newSide !== 'neutral') {
        setLastActiveSide(newSide);
      }
    },
    [mouseX],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    setActiveSide('neutral');
  }, [mouseX]);

  // Determine which section is active based on scroll
  const isInHero = useTransform(scrollYProgress, (v) => v < 0.3);
  const isInTransition = useTransform(
    scrollYProgress,
    (v) => v >= 0.15 && v < 0.45,
  );
  const isInJourney = useTransform(scrollYProgress, (v) => v >= 0.4);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={styles.container}
    >
      {/* Background */}
      <div style={styles.background}>
        <div style={styles.starField} />
        <motion.div
          style={styles.accentGlow}
          animate={{
            background:
              lastActiveSide === 'engineering'
                ? `radial-gradient(ellipse 80% 60% at 30% 50%, ${COLORS.cyanGlow}15 0%, transparent 60%)`
                : lastActiveSide === 'adventure'
                  ? `radial-gradient(ellipse 80% 60% at 70% 50%, ${COLORS.orangeGlow}15 0%, transparent 60%)`
                  : 'transparent',
          }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Fixed Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={{ fontSize: 20, opacity: 0.7 }}>☽</span>
          ANINDYA
        </div>
        <nav style={styles.nav}>
          {['Engineering', 'Adventure', 'Journal'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                ...styles.navLink,
                color:
                  activeSide === item.toLowerCase()
                    ? item === 'Engineering'
                      ? COLORS.cyan
                      : COLORS.orange
                    : COLORS.textSecondary,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <a href="#contact" style={styles.contactBtn}>
          CONTACT →
        </a>
      </header>

      {/* Scroll Container - This creates the scroll height */}
      <div style={styles.scrollContainer}>
        {/* Hero Section (sticky) */}
        <section style={styles.heroSection}>
          <HeroSection
            containerRef={containerRef}
            scrollYProgress={scrollYProgress}
            mouseX={mouseX}
            smoothMouseX={smoothMouseX}
            activeSide={activeSide}
            lastActiveSide={lastActiveSide}
          />
        </section>

        {/* Transition Zone (fixed, controlled by scroll) */}
        <TransitionZone scrollYProgress={scrollYProgress} />

        {/* Journey Section (fixed, revealed by scroll) */}
        <JourneySection
          scrollYProgress={scrollYProgress}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
      </div>

      {/* Progress Indicator */}
      <motion.div style={styles.progressBar}>
        <motion.div
          style={{
            ...styles.progressFill,
            scaleX: scrollYProgress,
          }}
        />
      </motion.div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { 
          background: ${COLORS.bg}; 
          overflow-x: hidden;
          font-family: 'Sora', sans-serif;
        }
        a { text-decoration: none; }
        a:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  container: {
    minHeight: '400vh', // Extended height for scroll
    position: 'relative',
    background: COLORS.bg,
    fontFamily: "'Sora', 'Inter', -apple-system, sans-serif",
    cursor: 'crosshair',
  },

  // Background
  background: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
  },
  starField: {
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
      radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.35) 0%, transparent 100%)
    `,
  },
  accentGlow: {
    position: 'absolute',
    inset: 0,
    transition: 'background 0.8s ease',
  },

  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '24px clamp(24px, 5vw, 48px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  nav: {
    display: 'flex',
    gap: 'clamp(20px, 4vw, 40px)',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  navLink: {
    transition: 'color 0.3s ease',
  },
  contactBtn: {
    padding: '10px 24px',
    border: `1px solid ${COLORS.divider}`,
    borderRadius: 24,
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.1em',
    transition: 'all 0.3s ease',
  },

  // Scroll Container
  scrollContainer: {
    position: 'relative',
  },

  // Hero Section
  heroSection: {
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 'clamp(32px, 6vw, 72px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    lineHeight: 1.1,
    margin: 0,
  },

  // Moon Area
  moonArea: {
    position: 'relative',
    width: '100%',
    maxWidth: 900,
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideLabel: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 'clamp(9px, 1.2vw, 11px)',
    fontWeight: 600,
    letterSpacing: '0.2em',
    pointerEvents: 'none',
  },
  labelLine: {
    width: 'clamp(20px, 3vw, 30px)',
    height: 1,
  },
  orbitalRing: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(280px, 40vw, 400px)',
    height: 'clamp(280px, 40vw, 400px)',
    pointerEvents: 'none',
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '50%',
    opacity: 0.3,
  },
  orbitalRingDashed: {
    position: 'absolute',
    inset: 25,
    border: `1px dashed ${COLORS.divider}`,
    borderRadius: '50%',
    opacity: 0.2,
  },

  // Tagline
  taglineContainer: {
    position: 'absolute',
    bottom: 'clamp(100px, 15vh, 160px)',
    textAlign: 'center',
    minHeight: 80,
    width: '100%',
    padding: '0 24px',
  },
  tagline: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    fontWeight: 500,
    letterSpacing: '0.03em',
    marginBottom: 6,
  },
  taglineSub: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: COLORS.textSecondary,
    fontWeight: 400,
  },

  // Scroll Indicator
  scrollIndicator: {
    position: 'absolute',
    bottom: 'clamp(20px, 5vh, 40px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  scrollText: {
    fontSize: 'clamp(9px, 1vw, 10px)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  scrollLine: {
    width: 1,
    height: 'clamp(30px, 4vh, 40px)',
  },

  // Transition Zone
  transitionTitle: {
    fontSize: 'clamp(24px, 4vw, 40px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '0.1em',
    marginBottom: 16,
  },
  transitionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  // Journey Section
  yearDisplay: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    zIndex: 30,
  },
  yearNumber: {
    fontSize: 'clamp(42px, 7vw, 72px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.03em',
    opacity: 0.4,
    lineHeight: 1,
  },
  eraText: {
    fontSize: 10,
    color: COLORS.textTertiary,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    marginTop: 6,
  },
  globeContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 5,
  },
  locationDisplay: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    zIndex: 25,
  },
  locationName: {
    fontSize: 'clamp(36px, 7vw, 72px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '0.02em',
    marginBottom: 6,
    textShadow: '0 4px 40px rgba(0,0,0,0.6)',
  },
  locationCountry: {
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  locationPeriod: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  journeySideLabel: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    opacity: 0.3,
    zIndex: 24,
  },

  // Progress Bar
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: COLORS.divider,
    zIndex: 200,
  },
  progressFill: {
    height: '100%',
    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.orange} 100%)`,
    transformOrigin: 'left',
  },
};
