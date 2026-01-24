'use client';

import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

// ============================================
// THEME COLORS (matching other sections)
// ============================================
const COLORS = {
  bg: '#0A0E27',
  bgSecondary: '#1A1F3A',
  bgCard: 'rgba(26, 31, 58, 0.95)',
  bgCardHover: 'rgba(42, 47, 74, 0.95)',
  divider: '#2A2F4A',
  cyan: '#00D9FF',
  cyanGlow: 'rgba(0, 217, 255, 0.3)',
  cyanDim: 'rgba(0, 217, 255, 0.15)',
  orange: '#FF6B35',
  orangeGlow: 'rgba(255, 107, 53, 0.3)',
  orangeDim: 'rgba(255, 107, 53, 0.15)',
  purple: '#A855F7',
  purpleGlow: 'rgba(168, 85, 247, 0.3)',
  purpleDim: 'rgba(168, 85, 247, 0.15)',
  green: '#10B981',
  greenGlow: 'rgba(16, 185, 129, 0.3)',
  greenDim: 'rgba(16, 185, 129, 0.15)',
  gold: '#FFD700',
  goldGlow: 'rgba(255, 215, 0, 0.3)',
  goldDim: 'rgba(255, 215, 0, 0.15)',
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
};

// ============================================
// SHOWCASE DATA
// ============================================
const SHOWCASE = {
  featured: [
    {
      id: 'portfolio',
      title: 'Two Sides of the Moon',
      subtitle: 'Personal Portfolio',
      description:
        'An Awwwards-caliber portfolio showcasing my dual identity as an engineer and adventure content creator. Features interactive globe, scroll-driven animations, and the signature moon concept.',
      image: null,
      tags: ['Next.js 15', 'Framer Motion', 'Three.js', 'D3.js'],
      links: {
        live: '#',
        github: 'https://github.com/anindya/portfolio',
      },
      type: 'engineering',
      status: 'In Progress',
    },
    {
      id: 'localoi',
      title: 'Localoi',
      subtitle: 'Local Business Platform',
      description:
        'A platform connecting local businesses with communities through technology. Helping small businesses compete against platform giants.',
      image: null,
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      links: {
        live: 'https://localoi.com',
      },
      type: 'engineering',
      status: 'Active',
    },
  ],
  certifications: [
    {
      id: 'gh-300',
      title: 'GitHub Copilot',
      code: 'GH-300',
      issuer: 'GitHub',
      issuerLogo: '🐙',
      badgeImage: './badges/github-copilot.svg',
      description:
        'Certified in AI-assisted development with GitHub Copilot. Demonstrates expertise in prompt engineering, code generation, and AI pair programming workflows.',
      score: 92,
      passingScore: 70,
      earnedDate: 'January 2025',
      validUntil: 'January 2028',
      credentialId: 'GH-300-2025-XXXX',
      skills: [
        'AI Pair Programming',
        'Prompt Engineering',
        'Code Generation',
        'GitHub Copilot Enterprise',
      ],
      highlights: [
        'Scored 92% on certification exam',
        'Top performer in code generation patterns',
        'Expert in enterprise deployment scenarios',
      ],
      verifyUrl: 'https://www.credly.com/badges/xxx',
      featured: true,
      category: 'AI Development',
    },
  ],
  github: [
    {
      id: 'react-component-lib',
      title: 'React Component Library',
      description:
        'A collection of reusable, accessible React components with Storybook documentation.',
      stars: 24,
      forks: 8,
      language: 'TypeScript',
      tags: ['React', 'TypeScript', 'Storybook'],
      url: 'https://github.com/anindya/react-components',
    },
    {
      id: 'node-api-starter',
      title: 'Node.js API Starter',
      description:
        'Production-ready Express.js boilerplate with authentication, logging, and Docker setup.',
      stars: 45,
      forks: 12,
      language: 'JavaScript',
      tags: ['Node.js', 'Express', 'Docker'],
      url: 'https://github.com/anindya/node-api-starter',
    },
    {
      id: 'graphql-toolkit',
      title: 'GraphQL Toolkit',
      description:
        'Utilities and helpers for building GraphQL APIs with schema stitching and caching.',
      stars: 18,
      forks: 5,
      language: 'TypeScript',
      tags: ['GraphQL', 'Apollo', 'TypeScript'],
      url: 'https://github.com/anindya/graphql-toolkit',
    },
    {
      id: 'cli-tools',
      title: 'Developer CLI Tools',
      description:
        'Collection of CLI utilities for automating repetitive development tasks.',
      stars: 31,
      forks: 7,
      language: 'JavaScript',
      tags: ['Node.js', 'CLI', 'Automation'],
      url: 'https://github.com/anindya/cli-tools',
    },
  ],
  designs: [
    {
      id: 'hero-mockup-1',
      title: 'Hero Section - Neutral State',
      description: 'Moon in center with dual-side labels',
      image: '/Screenshot_1.png',
    },
    {
      id: 'hero-mockup-2',
      title: 'Hero Section - Engineering Hover',
      description: 'Left side hover reveals engineering persona',
      image: '/Screenshot_2_Hover_Left.png',
    },
    {
      id: 'hero-mockup-3',
      title: 'Hero Section - Adventure Hover',
      description: 'Right side hover reveals adventure persona',
      image: '/Screenshot_2_Hover_Right.png',
    },
  ],
};

// ============================================
// FILTER TABS
// ============================================
function FilterTabs({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: 'all', label: 'All', icon: '◈' },
    { id: 'featured', label: 'Featured', icon: '⭐' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'github', label: 'GitHub', icon: '⌨' },
    { id: 'designs', label: 'Design Snaps', icon: '🎨' },
  ];

  return (
    <div style={styles.filterContainer}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          style={{
            ...styles.filterButton,
            background:
              activeFilter === filter.id ? COLORS.cyanDim : 'transparent',
            borderColor:
              activeFilter === filter.id ? COLORS.cyan : COLORS.divider,
            color:
              activeFilter === filter.id ? COLORS.cyan : COLORS.textSecondary,
          }}
          whileHover={{ borderColor: COLORS.cyan, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveFilter(filter.id)}
        >
          <span style={styles.filterIcon}>{filter.icon}</span>
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}

// ============================================
// CERTIFICATION BADGE VISUAL
// ============================================
function CertificationBadge({ cert, isHovered }) {
  // If badge image is provided, show that instead of the generated badge
  if (cert.badgeImage) {
    return (
      <motion.div
        style={styles.badgeImageContainer}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Outer glow */}
        <motion.div
          style={styles.badgeImageGlow}
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.15 : 1,
          }}
        />

        {/* Badge Image */}
        <img
          src={cert.badgeImage}
          alt={`${cert.title} Badge`}
          style={styles.badgeImage}
        />

        {/* Shine effect on hover */}
        <motion.div
          style={styles.badgeImageShine}
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%',
            opacity: isHovered ? [0, 0.4, 0] : 0,
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    );
  }

  // Fallback: Generated badge visual
  return (
    <motion.div
      style={styles.badgeContainer}
      animate={{
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Outer glow ring */}
      <motion.div
        style={styles.badgeGlowRing}
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scale: isHovered ? 1.1 : 1,
        }}
      />

      {/* Badge shape - Hexagonal */}
      <div style={styles.badgeHexagon}>
        {/* Inner gradient */}
        <div style={styles.badgeInnerGradient} />

        {/* GitHub logo / Issuer */}
        <div style={styles.badgeIssuerIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill={COLORS.text}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>

        {/* Copilot icon */}
        <div style={styles.badgeCopilotIcon}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke={COLORS.cyan}
              strokeWidth="1.5"
              fill={`${COLORS.cyan}20`}
            />
            <path d="M2 17l10 5 10-5" stroke={COLORS.cyan} strokeWidth="1.5" />
            <path d="M2 12l10 5 10-5" stroke={COLORS.cyan} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Certification code */}
        <div style={styles.badgeCode}>{cert.code}</div>

        {/* Certified text */}
        <div style={styles.badgeCertifiedText}>CERTIFIED</div>

        {/* Decorative lines */}
        <div style={styles.badgeLine1} />
        <div style={styles.badgeLine2} />
      </div>

      {/* Shine effect */}
      <motion.div
        style={styles.badgeShine}
        animate={{
          x: isHovered ? ['0%', '200%'] : '0%',
          opacity: isHovered ? [0, 0.6, 0] : 0,
        }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}

// ============================================
// CERTIFICATION CARD - FEATURED (Large)
// ============================================
function FeaturedCertificationCard({ cert }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={styles.featuredCertCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        style={styles.certGlow}
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.05 : 1,
        }}
      />

      {/* Top ribbon */}
      <div style={styles.featuredRibbon}>
        <span style={styles.featuredRibbonText}>🏅 VERIFIED CREDENTIAL</span>
      </div>

      <div style={styles.certCardInner}>
        {/* Left: Badge Visual */}
        <div style={styles.certVisual}>
          {/* The Badge */}
          <CertificationBadge cert={cert} isHovered={isHovered} />

          {/* Score - Small below badge */}
          <motion.div
            style={styles.scoreSmall}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div style={styles.scoreSmallInner}>
              <span style={styles.scoreSmallValue}>{cert.score}%</span>
              <span style={styles.scoreSmallLabel}>EXAM SCORE</span>
            </div>
            <div style={styles.scoreSmallBar}>
              <motion.div
                style={styles.scoreSmallFill}
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
              />
            </div>
            <span style={styles.scoreSmallPassing}>
              Passing: {cert.passingScore}%
            </span>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div style={styles.certContent}>
          <div style={styles.certHeader}>
            <span style={styles.certCategory}>{cert.category}</span>
            <span style={styles.earnedDate}>📅 {cert.earnedDate}</span>
          </div>

          <h3 style={styles.certTitle}>{cert.title}</h3>

          {/* Issuer info */}
          <div style={styles.issuerRow}>
            <span style={styles.issuerLogo}>{cert.issuerLogo}</span>
            <span style={styles.issuerName}>{cert.issuer}</span>
          </div>

          <p style={styles.certDescription}>{cert.description}</p>

          {/* Highlights */}
          <div style={styles.certHighlights}>
            {cert.highlights?.map((highlight, idx) => (
              <motion.div
                key={idx}
                style={styles.highlightItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <span style={styles.highlightCheck}>✓</span>
                <span>{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <div style={styles.certSkills}>
            {cert.skills.map((skill) => (
              <span key={skill} style={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={styles.certActions}>
            {cert.verifyUrl && (
              <motion.a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.verifyButton}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 8px 30px ${COLORS.cyanGlow}`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <VerifyIcon />
                Verify Credential
              </motion.a>
            )}
            <span style={styles.validUntil}>Valid until {cert.validUntil}</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div style={styles.certDecor1} />
      <div style={styles.certDecor2} />
    </motion.div>
  );
}

// ============================================
// FEATURED PROJECT CARD
// ============================================
function FeaturedProjectCard({ project, index }) {
  const isEven = index % 2 === 0;
  const accentColor =
    project.type === 'engineering' ? COLORS.cyan : COLORS.orange;

  return (
    <motion.div
      style={styles.featuredCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        style={{
          ...styles.featuredInner,
          flexDirection: isEven ? 'row' : 'row-reverse',
        }}
      >
        {/* Image/Preview */}
        <motion.div style={styles.featuredImage} whileHover={{ scale: 1.02 }}>
          <div style={styles.imagePlaceholder}>
            <span style={styles.placeholderIcon}>
              {project.type === 'engineering' ? '💻' : '🌍'}
            </span>
            <span style={styles.placeholderText}>Preview</span>
          </div>

          {/* Status Badge */}
          <span
            style={{
              ...styles.statusBadge,
              background:
                project.status === 'Active'
                  ? COLORS.greenGlow
                  : COLORS.purpleDim,
              color: project.status === 'Active' ? COLORS.green : COLORS.purple,
            }}
          >
            {project.status}
          </span>
        </motion.div>

        {/* Content */}
        <div style={styles.featuredContent}>
          <span style={{ ...styles.featuredSubtitle, color: accentColor }}>
            {project.subtitle}
          </span>
          <h3 style={styles.featuredTitle}>{project.title}</h3>
          <p style={styles.featuredDescription}>{project.description}</p>

          {/* Tags */}
          <div style={styles.featuredTags}>
            {project.tags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={styles.featuredLinks}>
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.projectLink}
                whileHover={{ color: COLORS.cyan, x: 2 }}
              >
                <GitHubIcon /> Code
              </motion.a>
            )}
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.projectLink, color: accentColor }}
                whileHover={{ x: 2 }}
              >
                <ExternalLinkIcon /> Live →
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// GITHUB PROJECT CARD
// ============================================
function GitHubCard({ project, index }) {
  const languageColors = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
  };

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.githubCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -4,
        borderColor: COLORS.cyan,
        boxShadow: `0 10px 40px ${COLORS.cyanGlow}`,
      }}
    >
      {/* Header */}
      <div style={styles.githubHeader}>
        <FolderIcon />
        <div style={styles.githubStats}>
          <span style={styles.githubStat}>
            <StarIcon /> {project.stars}
          </span>
          <span style={styles.githubStat}>
            <ForkIcon /> {project.forks}
          </span>
        </div>
      </div>

      {/* Content */}
      <h4 style={styles.githubTitle}>{project.title}</h4>
      <p style={styles.githubDescription}>{project.description}</p>

      {/* Footer */}
      <div style={styles.githubFooter}>
        <span style={styles.githubLanguage}>
          <span
            style={{
              ...styles.languageDot,
              background: languageColors[project.language] || COLORS.cyan,
            }}
          />
          {project.language}
        </span>
        <div style={styles.githubTags}>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={styles.miniTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

// ============================================
// DESIGN SNAP CARD
// ============================================
function DesignSnapCard({ design, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={styles.designCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <motion.div
        style={styles.designImageWrapper}
        whileHover={{ scale: 1.02 }}
      >
        <div style={styles.designImagePlaceholder}>
          <span style={styles.designPlaceholderIcon}>🎨</span>
          <span style={styles.designPlaceholderText}>{design.title}</span>
        </div>

        {/* Overlay on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              style={styles.designOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span style={styles.viewIcon}>🔍</span>
              <span style={styles.viewText}>View Full</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Info */}
      <div style={styles.designInfo}>
        <h4 style={styles.designTitle}>{design.title}</h4>
        <p style={styles.designDescription}>{design.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// ICONS
// ============================================
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.cyan}
    strokeWidth="1.5"
  >
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ForkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9M12 12v3" />
  </svg>
);

const VerifyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <ellipse cx="12" cy="5" rx="9" ry="3" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const showFeatured = activeFilter === 'all' || activeFilter === 'featured';
  const showCertifications =
    activeFilter === 'all' || activeFilter === 'certifications';
  const showGitHub = activeFilter === 'all' || activeFilter === 'github';
  const showDesigns = activeFilter === 'all' || activeFilter === 'designs';

  const featuredCerts = SHOWCASE.certifications.filter((c) => c.featured);

  return (
    <section ref={sectionRef} style={styles.section} id="showcase">
      {/* Background */}
      <motion.div style={{ ...styles.background, y: backgroundY }}>
        <div style={styles.gradientOrb1} />
        <div style={styles.gradientOrb2} />
        <div style={styles.noiseOverlay} />
      </motion.div>

      {/* Content */}
      <div style={styles.container}>
        {/* Header */}
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            style={styles.sectionLabel}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            ◈ PORTFOLIO
          </motion.span>
          <h2 style={styles.sectionTitle}>Showcase</h2>
          <p style={styles.sectionSubtitle}>
            Featured work, certifications, and experiments from engineering to
            exploration.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Certifications Section */}
        <AnimatePresence mode="wait">
          {showCertifications && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.certificationsSection}
            >
              {activeFilter === 'all' && (
                <h3 style={styles.subsectionTitle}>
                  <span style={styles.subsectionIcon}>🏆</span> Certifications
                </h3>
              )}

              {/* Featured Certifications */}
              {featuredCerts.map((cert) => (
                <FeaturedCertificationCard key={cert.id} cert={cert} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          {showFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.featuredSection}
            >
              {activeFilter === 'all' && (
                <h3 style={styles.subsectionTitle}>
                  <span style={styles.subsectionIcon}>⭐</span> Featured
                  Projects
                </h3>
              )}
              {SHOWCASE.featured.map((project, idx) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* GitHub Projects */}
        <AnimatePresence mode="wait">
          {showGitHub && (
            <motion.div
              key="github"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.githubSection}
            >
              {activeFilter === 'all' && (
                <h3 style={styles.subsectionTitle}>
                  <span style={styles.subsectionIcon}>
                    <GitHubIcon />
                  </span>{' '}
                  Open Source
                </h3>
              )}
              <div style={styles.githubGrid}>
                {SHOWCASE.github.map((project, idx) => (
                  <GitHubCard key={project.id} project={project} index={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Design Snaps */}
        <AnimatePresence mode="wait">
          {showDesigns && (
            <motion.div
              key="designs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.designsSection}
            >
              {activeFilter === 'all' && (
                <h3 style={styles.subsectionTitle}>
                  <span style={styles.subsectionIcon}>🎨</span> Design Snaps
                </h3>
              )}
              <div style={styles.designsGrid}>
                {SHOWCASE.designs.map((design, idx) => (
                  <DesignSnapCard key={design.id} design={design} index={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          style={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={styles.ctaText}>
            Want to see more or collaborate on something?
          </p>
          <div style={styles.ctaButtons}>
            <motion.a
              href="https://github.com/anindya"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaButtonPrimary}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 8px 30px ${COLORS.cyanGlow}`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <GitHubIcon /> View GitHub
            </motion.a>
            <motion.a
              href="#contact"
              style={styles.ctaButtonSecondary}
              whileHover={{ borderColor: COLORS.cyan }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    padding: 'clamp(80px, 12vh, 140px) 0',
    fontFamily: "'Sora', sans-serif",
    background: COLORS.bg,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  gradientOrb1: {
    position: 'absolute',
    top: '20%',
    right: '-15%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.purpleGlow}15 0%, transparent 60%)`,
    filter: 'blur(80px)',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '10%',
    left: '-10%',
    width: '40vw',
    height: '40vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.cyanGlow}10 0%, transparent 60%)`,
    filter: 'blur(60px)',
  },
  noiseOverlay: {
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  },
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 48px)',
    zIndex: 10,
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  sectionLabel: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: COLORS.cyan,
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    marginBottom: '16px',
  },
  sectionSubtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: COLORS.textSecondary,
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '48px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '24px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Sora', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterIcon: {
    fontSize: '14px',
  },
  subsectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS.textSecondary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  subsectionIcon: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },

  // Certifications
  certificationsSection: {
    marginBottom: '64px',
  },
  featuredCertCard: {
    position: 'relative',
    background: `linear-gradient(135deg, ${COLORS.bgCard} 0%, rgba(16, 185, 129, 0.05) 100%)`,
    border: `1px solid ${COLORS.green}40`,
    borderRadius: '24px',
    padding: 'clamp(24px, 4vw, 40px)',
    marginBottom: '32px',
    overflow: 'hidden',
  },
  certGlow: {
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '60%',
    height: '150%',
    background: `radial-gradient(ellipse, ${COLORS.greenGlow} 0%, transparent 60%)`,
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  featuredBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: COLORS.goldDim,
    border: `1px solid ${COLORS.gold}40`,
    borderRadius: '20px',
  },
  featuredBadgeIcon: {
    fontSize: '16px',
  },
  featuredBadgeText: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: COLORS.gold,
  },
  featuredRibbon: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '8px 16px',
    background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.cyan} 100%)`,
    borderRadius: '20px',
    zIndex: 10,
    boxShadow: `0 4px 16px ${COLORS.greenGlow}`,
  },
  featuredRibbonText: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: COLORS.bg,
    textTransform: 'uppercase',
  },
  certCardInner: {
    display: 'flex',
    gap: 'clamp(24px, 4vw, 48px)',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  certVisual: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    minWidth: '180px',
  },
  // Badge Image styles (for actual badge from Microsoft/Credly)
  badgeImageContainer: {
    position: 'relative',
    width: '180px',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
  },
  badgeImageGlow: {
    position: 'absolute',
    inset: '-20px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 70%)`,
    filter: 'blur(20px)',
  },
  badgeImage: {
    width: '160px',
    height: '160px',
    objectFit: 'contain',
    borderRadius: '12px',
    position: 'relative',
    zIndex: 2,
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
  },
  badgeImageShine: {
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: '50%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
    transform: 'skewX(-20deg)',
    zIndex: 3,
    pointerEvents: 'none',
  },
  // Generated badge placeholder styles
  badgeContainer: {
    position: 'relative',
    width: '180px',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
  },
  badgeGlowRing: {
    position: 'absolute',
    inset: '-10px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.cyanGlow} 0%, transparent 60%)`,
    filter: 'blur(15px)',
  },
  badgeHexagon: {
    width: '150px',
    height: '170px',
    background: `linear-gradient(180deg, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 100%)`,
    border: `2px solid ${COLORS.cyan}50`,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
  },
  badgeInnerGradient: {
    position: 'absolute',
    inset: '2px',
    borderRadius: '14px',
    background: `linear-gradient(180deg, transparent 0%, ${COLORS.cyanGlow}10 100%)`,
    pointerEvents: 'none',
  },
  badgeIssuerIcon: {
    marginTop: '10px',
  },
  badgeCopilotIcon: {
    marginTop: '4px',
  },
  badgeCode: {
    fontSize: '18px',
    fontWeight: 700,
    color: COLORS.cyan,
    letterSpacing: '0.05em',
    fontFamily: "'JetBrains Mono', monospace",
  },
  badgeCertifiedText: {
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: COLORS.textTertiary,
    marginBottom: '10px',
  },
  badgeLine1: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${COLORS.divider}, transparent)`,
  },
  badgeLine2: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${COLORS.divider}, transparent)`,
  },
  badgeShine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '60%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
    transform: 'skewX(-20deg)',
    pointerEvents: 'none',
  },
  // Small score display at bottom
  scoreSmall: {
    width: '100%',
    maxWidth: '180px',
    padding: '12px 16px',
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '12px',
  },
  scoreSmallInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  scoreSmallValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: COLORS.green,
    fontFamily: "'JetBrains Mono', monospace",
  },
  scoreSmallLabel: {
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    color: COLORS.textTertiary,
  },
  scoreSmallBar: {
    width: '100%',
    height: '4px',
    background: COLORS.divider,
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '6px',
  },
  scoreSmallFill: {
    height: '100%',
    background: `linear-gradient(90deg, ${COLORS.green} 0%, ${COLORS.cyan} 100%)`,
    borderRadius: '2px',
  },
  scoreSmallPassing: {
    fontSize: '10px',
    color: COLORS.textTertiary,
  },
  issuerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  issuerLogo: {
    fontSize: '20px',
  },
  issuerName: {
    fontSize: '13px',
    fontWeight: 500,
    color: COLORS.textSecondary,
  },
  certCode: {
    display: 'block',
    fontSize: '10px',
    color: COLORS.cyan,
    fontFamily: "'JetBrains Mono', monospace",
  },
  certContent: {
    flex: 1,
    minWidth: '280px',
  },
  certHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  certCategory: {
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    color: COLORS.cyan,
    textTransform: 'uppercase',
    padding: '4px 10px',
    background: COLORS.cyanDim,
    borderRadius: '10px',
  },
  earnedDate: {
    fontSize: '12px',
    color: COLORS.textTertiary,
  },
  certTitle: {
    fontSize: 'clamp(22px, 3vw, 28px)',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '10px',
    lineHeight: 1.2,
  },
  certDescription: {
    fontSize: '14px',
    color: COLORS.textSecondary,
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  certHighlights: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  highlightItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: COLORS.textSecondary,
  },
  highlightCheck: {
    color: COLORS.green,
    fontWeight: 700,
  },
  certSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  skillTag: {
    fontSize: '11px',
    fontWeight: 500,
    color: COLORS.text,
    background: COLORS.bgSecondary,
    border: `1px solid ${COLORS.divider}`,
    padding: '6px 12px',
    borderRadius: '14px',
  },
  certActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  verifyButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: COLORS.cyan,
    color: COLORS.bg,
    borderRadius: '24px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  validUntil: {
    fontSize: '12px',
    color: COLORS.textTertiary,
  },
  certDecor1: {
    position: 'absolute',
    bottom: '-20px',
    left: '-20px',
    width: '100px',
    height: '100px',
    border: `1px solid ${COLORS.green}20`,
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  certDecor2: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    width: '60px',
    height: '60px',
    border: `1px solid ${COLORS.green}15`,
    borderRadius: '50%',
    pointerEvents: 'none',
  },

  // Featured Projects
  featuredSection: {
    marginBottom: '64px',
  },
  featuredCard: {
    marginBottom: '32px',
  },
  featuredInner: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  featuredImage: {
    flex: '1 1 400px',
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    aspectRatio: '16/10',
    background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 100%)`,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  placeholderIcon: {
    fontSize: '48px',
    opacity: 0.3,
  },
  placeholderText: {
    fontSize: '12px',
    color: COLORS.textTertiary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  statusBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  featuredContent: {
    flex: '1 1 400px',
  },
  featuredSubtitle: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  featuredTitle: {
    fontSize: 'clamp(24px, 3vw, 32px)',
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  featuredDescription: {
    fontSize: '14px',
    color: COLORS.textSecondary,
    lineHeight: 1.7,
    marginBottom: '20px',
  },
  featuredTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  tag: {
    fontSize: '11px',
    fontWeight: 500,
    color: COLORS.cyan,
    background: COLORS.cyanDim,
    padding: '6px 12px',
    borderRadius: '14px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  featuredLinks: {
    display: 'flex',
    gap: '20px',
  },
  projectLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 500,
    color: COLORS.textSecondary,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  // GitHub
  githubSection: {
    marginBottom: '64px',
  },
  githubGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  githubCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '14px',
    padding: '24px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  githubHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  githubStats: {
    display: 'flex',
    gap: '12px',
  },
  githubStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: COLORS.textTertiary,
  },
  githubTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '8px',
  },
  githubDescription: {
    fontSize: '13px',
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    flex: 1,
    marginBottom: '16px',
  },
  githubFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  githubLanguage: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: COLORS.textSecondary,
  },
  languageDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  githubTags: {
    display: 'flex',
    gap: '6px',
  },
  miniTag: {
    fontSize: '9px',
    color: COLORS.textTertiary,
    background: COLORS.divider,
    padding: '3px 8px',
    borderRadius: '8px',
  },

  // Design Snaps
  designsSection: {
    marginBottom: '64px',
  },
  designsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  designCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '14px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  designImageWrapper: {
    position: 'relative',
    cursor: 'pointer',
  },
  designImagePlaceholder: {
    aspectRatio: '16/10',
    background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bg} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  designPlaceholderIcon: {
    fontSize: '36px',
    opacity: 0.3,
  },
  designPlaceholderText: {
    fontSize: '11px',
    color: COLORS.textTertiary,
    textAlign: 'center',
    padding: '0 20px',
  },
  designOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10, 14, 39, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  viewIcon: {
    fontSize: '24px',
  },
  viewText: {
    fontSize: '11px',
    color: COLORS.cyan,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  designInfo: {
    padding: '16px 20px',
  },
  designTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '4px',
  },
  designDescription: {
    fontSize: '12px',
    color: COLORS.textTertiary,
  },

  // CTA
  ctaSection: {
    textAlign: 'center',
    paddingTop: '48px',
    borderTop: `1px solid ${COLORS.divider}`,
  },
  ctaText: {
    fontSize: '16px',
    color: COLORS.textSecondary,
    marginBottom: '24px',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  ctaButtonPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    background: COLORS.cyan,
    color: COLORS.bg,
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  ctaButtonSecondary: {
    padding: '14px 28px',
    background: 'transparent',
    border: `1px solid ${COLORS.divider}`,
    color: COLORS.text,
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
};
