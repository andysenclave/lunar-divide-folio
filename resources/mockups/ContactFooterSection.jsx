'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

// ============================================
// THEME COLORS
// ============================================
const COLORS = {
  bg: '#0A0E27',
  bgSecondary: '#1A1F3A',
  bgDark: '#050812',
  divider: '#2A2F4A',
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.4)',
  cyanDim: 'rgba(0, 217, 255, 0.1)',
  orange: '#FF6B35',
  orangeGlow: 'rgba(255, 107, 53, 0.4)',
  orangeDim: 'rgba(255, 107, 53, 0.1)',
  gold: '#FFD700',
  goldGlow: 'rgba(255, 215, 0, 0.3)',
  purple: '#A855F7',
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
  textDim: '#4A5166',
};

// ============================================
// TARGET LOCATIONS
// ============================================
const TARGET_LOCATIONS = [
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    coords: { x: 85, y: 72 },
    timezone: 'GMT+11',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    coords: { x: 68, y: 52 },
    timezone: 'GMT+8',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    coords: { x: 82, y: 38 },
    timezone: 'GMT+9',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    coords: { x: 52, y: 45 },
    timezone: 'GMT+4',
  },
  {
    id: 'hongkong',
    name: 'Hong Kong',
    country: 'China',
    flag: '🇭🇰',
    coords: { x: 75, y: 43 },
    timezone: 'GMT+8',
  },
];

// ============================================
// AURORA + STAR BACKGROUND
// ============================================
function CosmicBackground({ scrollProgress }) {
  const auroraOpacity = useTransform(scrollProgress, [0, 0.5], [0, 1]);

  return (
    <div style={styles.cosmicBg}>
      {/* Deep space gradient */}
      <div style={styles.spaceGradient} />

      {/* Aurora waves */}
      <motion.div style={{ ...styles.auroraLayer, opacity: auroraOpacity }}>
        <motion.div
          style={styles.aurora1}
          animate={{
            x: ['-20%', '20%', '-20%'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={styles.aurora2}
          animate={{
            x: ['20%', '-20%', '20%'],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={styles.aurora3}
          animate={{
            x: ['-10%', '30%', '-10%'],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Stars */}
      <div style={styles.starsLayer}>
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2.5 + 0.5,
              height: Math.random() * 2.5 + 0.5,
              borderRadius: '50%',
              background:
                i % 5 === 0
                  ? COLORS.cyan
                  : i % 7 === 0
                    ? COLORS.orange
                    : '#fff',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Horizon glow */}
      <div style={styles.horizonGlow} />
    </div>
  );
}

// ============================================
// DESTINATION MAP VISUALIZATION
// ============================================
function DestinationMap({ activeLocation, setActiveLocation }) {
  return (
    <div style={styles.mapContainer}>
      {/* Connection lines from center (Kolkata) to targets */}
      <svg
        style={styles.connectionSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {TARGET_LOCATIONS.map((loc, idx) => (
          <motion.path
            key={loc.id}
            d={`M 58 48 Q ${(58 + loc.coords.x) / 2} ${Math.min(loc.coords.y, 48) - 10} ${loc.coords.x} ${loc.coords.y}`}
            fill="none"
            stroke={activeLocation === loc.id ? COLORS.gold : COLORS.divider}
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: activeLocation === loc.id ? 0.8 : 0.3,
            }}
            transition={{ duration: 1.5, delay: idx * 0.2 }}
          />
        ))}
      </svg>

      {/* Current location - Kolkata */}
      <motion.div
        style={{ ...styles.locationDot, ...styles.currentLocation }}
        animate={{
          boxShadow: [
            `0 0 20px ${COLORS.cyanGlow}`,
            `0 0 40px ${COLORS.cyanGlow}`,
            `0 0 20px ${COLORS.cyanGlow}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={styles.currentFlag}>📍</span>
        <div style={styles.currentLabel}>
          <span style={styles.currentCity}>Kolkata</span>
          <span style={styles.currentStatus}>Current Base</span>
        </div>
      </motion.div>

      {/* Target locations */}
      {TARGET_LOCATIONS.map((loc, idx) => (
        <motion.div
          key={loc.id}
          style={{
            ...styles.targetDot,
            left: `${loc.coords.x}%`,
            top: `${loc.coords.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + idx * 0.15, type: 'spring' }}
          onMouseEnter={() => setActiveLocation(loc.id)}
          onMouseLeave={() => setActiveLocation(null)}
          whileHover={{ scale: 1.2 }}
        >
          <motion.div
            style={styles.targetPulse}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
          />
          <span style={styles.targetFlag}>{loc.flag}</span>

          {/* Tooltip */}
          <AnimatePresence>
            {activeLocation === loc.id && (
              <motion.div
                style={styles.targetTooltip}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
              >
                <span style={styles.tooltipCity}>{loc.name}</span>
                <span style={styles.tooltipCountry}>{loc.country}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// AVAILABILITY BADGE
// ============================================
function AvailabilityBadge() {
  return (
    <motion.div
      style={styles.availabilityBadge}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <motion.span
        style={styles.availabilityDot}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span style={styles.availabilityText}>
        Open to opportunities in{' '}
        <span style={{ color: COLORS.gold }}>Australia</span>,
        <span style={{ color: COLORS.cyan }}> APAC</span> &
        <span style={{ color: COLORS.orange }}> UAE</span>
      </span>
    </motion.div>
  );
}

// ============================================
// MAIN CTA BUTTONS
// ============================================
function CTAButtons() {
  return (
    <motion.div
      style={styles.ctaContainer}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      {/* Primary CTA */}
      <motion.a
        href="mailto:hello@anindya.dev?subject=Let's Connect"
        style={styles.primaryCta}
        whileHover={{
          scale: 1.03,
          boxShadow: `0 20px 60px ${COLORS.cyanGlow}`,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span style={styles.ctaIcon}>✉</span>
        <span style={styles.ctaText}>Get in Touch</span>
        <motion.span
          style={styles.ctaArrow}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.a>

      {/* Secondary CTAs */}
      <div style={styles.secondaryCtaRow}>
        <motion.a
          href="https://linkedin.com/in/anindya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.secondaryCta}
          whileHover={{ borderColor: COLORS.cyan, color: COLORS.cyan }}
        >
          <LinkedInIcon />
          LinkedIn
        </motion.a>

        <motion.a
          href="/resume.pdf"
          download
          style={styles.secondaryCta}
          whileHover={{ borderColor: COLORS.orange, color: COLORS.orange }}
        >
          <DownloadIcon />
          Resume
        </motion.a>

        <motion.a
          href="https://github.com/anindya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.secondaryCta}
          whileHover={{ borderColor: COLORS.text, color: COLORS.text }}
        >
          <GitHubIcon />
          GitHub
        </motion.a>
      </div>
    </motion.div>
  );
}

// ============================================
// TWO SIDES SIGNATURE
// ============================================
function TwoSidesSignature() {
  return (
    <motion.div
      style={styles.signature}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <div style={styles.signatureInner}>
        <motion.span
          style={{ ...styles.signatureSide, color: COLORS.cyan }}
          whileHover={{ textShadow: `0 0 20px ${COLORS.cyanGlow}` }}
        >
          Engineering
        </motion.span>

        <motion.span
          style={styles.signatureMoon}
          animate={{
            rotate: [0, 5, -5, 0],
            textShadow: [
              `0 0 20px ${COLORS.cyanGlow}`,
              `0 0 30px ${COLORS.orangeGlow}`,
              `0 0 20px ${COLORS.cyanGlow}`,
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ☽
        </motion.span>

        <motion.span
          style={{ ...styles.signatureSide, color: COLORS.orange }}
          whileHover={{ textShadow: `0 0 20px ${COLORS.orangeGlow}` }}
        >
          Adventure
        </motion.span>
      </div>
      <p style={styles.signatureTagline}>Two sides of the moon. One journey.</p>
    </motion.div>
  );
}

// ============================================
// FOOTER BOTTOM
// ============================================
function FooterBottom() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
  ];

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      href: 'https://github.com/anindya',
      label: 'GitHub',
    },
    {
      icon: <LinkedInIcon />,
      href: 'https://linkedin.com/in/anindya',
      label: 'LinkedIn',
    },
    {
      icon: <TwitterIcon />,
      href: 'https://twitter.com/anindya',
      label: 'Twitter',
    },
    {
      icon: <YouTubeIcon />,
      href: 'https://youtube.com/@andysenclave',
      label: 'YouTube',
    },
    {
      icon: <InstagramIcon />,
      href: 'https://instagram.com/andysenclave',
      label: 'Instagram',
    },
  ];

  return (
    <div style={styles.footerBottom}>
      {/* Navigation */}
      <nav style={styles.footerNav}>
        {footerLinks.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.href}
            style={styles.footerNavLink}
            whileHover={{ color: COLORS.cyan }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            {link.name}
          </motion.a>
        ))}
      </nav>

      {/* Divider */}
      <div style={styles.footerDivider} />

      {/* Bottom row */}
      <div style={styles.footerBottomRow}>
        {/* Copyright */}
        <div style={styles.copyright}>
          <span>© {currentYear} Anindya Mukherjee</span>
          <span style={styles.copyrightDot}>•</span>
          <span style={styles.madeWith}>
            Crafted with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >
              ☕
            </motion.span>{' '}
            in Kolkata
          </span>
        </div>

        {/* Social links */}
        <div style={styles.socialLinks}>
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
              whileHover={{
                color: COLORS.cyan,
                borderColor: COLORS.cyan,
                y: -3,
              }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <motion.p
        style={styles.techStack}
        whileHover={{ color: COLORS.textSecondary }}
      >
        Built with Next.js, Framer Motion & Three.js
      </motion.p>
    </div>
  );
}

// ============================================
// BACK TO TOP
// ============================================
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          style={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 30px ${COLORS.cyanGlow}`,
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↑
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ============================================
// ICONS
// ============================================
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ContactFooter() {
  const [activeLocation, setActiveLocation] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  return (
    <footer ref={sectionRef} style={styles.section} id="contact">
      {/* Cosmic Background */}
      <CosmicBackground scrollProgress={scrollYProgress} />

      {/* Content */}
      <div style={styles.container}>
        {/* Hero Text */}
        <motion.div
          style={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            style={styles.preTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            THE NEXT HORIZON
          </motion.span>

          <h2 style={styles.heroTitle}>
            <span style={styles.titleLine}>
              Let's <span style={styles.titleHighlight}>innovate</span>
            </span>
            <span style={styles.titleLine}>together.</span>
          </h2>

          <p style={styles.heroSubtitle}>
            Senior Technical Lead with 12+ years of experience, seeking the next
            chapter across the globe.
          </p>
        </motion.div>

        {/* Availability Badge */}
        <AvailabilityBadge />

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Footer Bottom */}
        <FooterBottom />
      </div>

      {/* Back to Top */}
      <BackToTop />

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
      `}</style>
    </footer>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    background: COLORS.bg,
    fontFamily: "'Sora', sans-serif",
    overflow: 'hidden',
    paddingTop: 'clamp(80px, 15vh, 140px)',
  },
  cosmicBg: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  spaceGradient: {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgDark} 60%, #020408 100%)`,
  },
  auroraLayer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
  },
  aurora1: {
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: '200%',
    height: '400px',
    background: `linear-gradient(90deg, transparent 0%, ${COLORS.cyanDim} 25%, ${COLORS.purple}20 50%, ${COLORS.orangeDim} 75%, transparent 100%)`,
    borderRadius: '50%',
    filter: 'blur(80px)',
  },
  aurora2: {
    position: 'absolute',
    top: '100px',
    left: '-30%',
    width: '160%',
    height: '300px',
    background: `linear-gradient(90deg, transparent 0%, ${COLORS.orangeDim} 30%, ${COLORS.cyanDim} 70%, transparent 100%)`,
    borderRadius: '50%',
    filter: 'blur(60px)',
  },
  aurora3: {
    position: 'absolute',
    top: '50px',
    left: '-20%',
    width: '140%',
    height: '250px',
    background: `linear-gradient(90deg, transparent 0%, ${COLORS.purple}15 50%, transparent 100%)`,
    borderRadius: '50%',
    filter: 'blur(70px)',
  },
  starsLayer: {
    position: 'absolute',
    inset: 0,
  },
  horizonGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${COLORS.cyanGlow}10 0%, transparent 60%)`,
  },
  container: {
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 48px)',
    zIndex: 10,
  },
  heroContent: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  preTitle: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: COLORS.gold,
    marginBottom: '24px',
    padding: '8px 16px',
    border: `1px solid ${COLORS.gold}30`,
    borderRadius: '20px',
    background: `${COLORS.gold}10`,
  },
  heroTitle: {
    fontSize: 'clamp(32px, 6vw, 56px)',
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: '24px',
  },
  titleLine: {
    display: 'block',
    color: COLORS.text,
  },
  titleHighlight: {
    background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.orange} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(14px, 2vw, 18px)',
    color: COLORS.textSecondary,
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: 1.7,
  },
  availabilityBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '48px',
  },
  availabilityDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#10B981',
    boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
  },
  availabilityText: {
    fontSize: '13px',
    color: COLORS.textSecondary,
    letterSpacing: '0.02em',
  },
  mapSection: {
    marginBottom: '48px',
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    height: '280px',
    margin: '0 auto',
    background: `radial-gradient(ellipse 100% 100% at 50% 50%, ${COLORS.bgSecondary}50 0%, transparent 70%)`,
    borderRadius: '20px',
    border: `1px solid ${COLORS.divider}30`,
  },
  connectionSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  currentLocation: {
    position: 'absolute',
    left: '58%',
    top: '48%',
    transform: 'translate(-50%, -50%)',
  },
  locationDot: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 14px',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.cyan}50`,
    borderRadius: '20px',
    zIndex: 10,
  },
  currentFlag: {
    fontSize: '16px',
  },
  currentLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  currentCity: {
    fontSize: '12px',
    fontWeight: 600,
    color: COLORS.text,
  },
  currentStatus: {
    fontSize: '9px',
    color: COLORS.cyan,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  targetDot: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    zIndex: 5,
  },
  targetPulse: {
    position: 'absolute',
    inset: -8,
    borderRadius: '50%',
    border: `1px solid ${COLORS.gold}`,
    pointerEvents: 'none',
  },
  targetFlag: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  },
  targetTooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '8px',
    padding: '8px 14px',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.gold}40`,
    borderRadius: '10px',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: `0 8px 30px rgba(0,0,0,0.4)`,
  },
  tooltipCity: {
    fontSize: '13px',
    fontWeight: 600,
    color: COLORS.gold,
  },
  tooltipCountry: {
    fontSize: '10px',
    color: COLORS.textSecondary,
  },
  ctaContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '64px',
  },
  primaryCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 40px',
    background: `linear-gradient(135deg, ${COLORS.cyan} 0%, #0099CC 100%)`,
    color: COLORS.bg,
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.4s ease',
    boxShadow: `0 10px 40px ${COLORS.cyanGlow}`,
  },
  ctaIcon: {
    fontSize: '20px',
  },
  ctaText: {},
  ctaArrow: {
    fontSize: '18px',
  },
  secondaryCtaRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  secondaryCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'transparent',
    border: `1px solid ${COLORS.divider}`,
    color: COLORS.textSecondary,
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  signature: {
    textAlign: 'center',
    marginBottom: '64px',
    borderTop: `1px solid ${COLORS.divider}30`,
  },
  signatureInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '12px',
  },
  signatureSide: {
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'default',
    transition: 'text-shadow 0.3s ease',
  },
  signatureMoon: {
    fontSize: '36px',
  },
  signatureTagline: {
    fontSize: '13px',
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },
  footerBottom: {
    paddingBottom: '40px',
  },
  footerNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(16px, 4vw, 40px)',
    flexWrap: 'wrap',
    marginBottom: '32px',
  },
  footerNavLink: {
    fontSize: '12px',
    fontWeight: 500,
    color: COLORS.textSecondary,
    textDecoration: 'none',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
  },
  footerDivider: {
    width: '100%',
    height: '1px',
    background: `linear-gradient(90deg, transparent 0%, ${COLORS.divider} 50%, transparent 100%)`,
    marginBottom: '32px',
  },
  footerBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '24px',
  },
  copyright: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: COLORS.textTertiary,
    flexWrap: 'wrap',
  },
  copyrightDot: {
    color: COLORS.divider,
  },
  madeWith: {
    color: COLORS.textTertiary,
  },
  socialLinks: {
    display: 'flex',
    gap: '10px',
  },
  socialLink: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: `1px solid ${COLORS.divider}`,
    color: COLORS.textTertiary,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  techStack: {
    textAlign: 'center',
    fontSize: '11px',
    color: COLORS.textDim,
    letterSpacing: '0.05em',
    cursor: 'default',
    transition: 'color 0.3s ease',
  },
  backToTop: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.cyan}50`,
    color: COLORS.cyan,
    fontSize: '20px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    transition: 'all 0.3s ease',
  },
};
