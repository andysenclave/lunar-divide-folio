'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
};

// ============================================
// PROJECTS DATA
// ============================================
const PROJECTS = {
  featured: [
    {
      id: 'portfolio',
      title: 'Two Sides of the Moon',
      subtitle: 'Personal Portfolio',
      description: 'An Awwwards-caliber portfolio showcasing my dual identity as an engineer and adventure content creator. Features interactive globe, scroll-driven animations, and the signature moon concept.',
      image: null, // Will be placeholder
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
      description: 'A platform connecting local businesses with communities through technology. Helping small businesses compete against platform giants.',
      image: null,
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      links: {
        live: 'https://localoi.com',
      },
      type: 'engineering',
      status: 'Active',
    },
  ],
  github: [
    {
      id: 'react-component-lib',
      title: 'React Component Library',
      description: 'A collection of reusable, accessible React components with Storybook documentation.',
      stars: 24,
      forks: 8,
      language: 'TypeScript',
      tags: ['React', 'TypeScript', 'Storybook'],
      url: 'https://github.com/anindya/react-components',
    },
    {
      id: 'node-api-starter',
      title: 'Node.js API Starter',
      description: 'Production-ready Express.js boilerplate with authentication, logging, and Docker setup.',
      stars: 45,
      forks: 12,
      language: 'JavaScript',
      tags: ['Node.js', 'Express', 'Docker'],
      url: 'https://github.com/anindya/node-api-starter',
    },
    {
      id: 'graphql-toolkit',
      title: 'GraphQL Toolkit',
      description: 'Utilities and helpers for building GraphQL APIs with schema stitching and caching.',
      stars: 18,
      forks: 5,
      language: 'TypeScript',
      tags: ['GraphQL', 'Apollo', 'TypeScript'],
      url: 'https://github.com/anindya/graphql-toolkit',
    },
    {
      id: 'cli-tools',
      title: 'Developer CLI Tools',
      description: 'Collection of CLI utilities for automating repetitive development tasks.',
      stars: 31,
      forks: 7,
      language: 'JavaScript',
      tags: ['Node.js', 'CLI', 'Automation'],
      url: 'https://github.com/anindya/cli-tools',
    },
  ],
  ideas: [
    {
      id: 'travel-log',
      title: 'Interactive Travel Log',
      description: 'A visual storytelling platform that combines maps, photos, and narratives to document travel experiences.',
      status: 'Concept',
      icon: '🗺️',
      type: 'adventure',
    },
    {
      id: 'code-review-ai',
      title: 'AI Code Review Assistant',
      description: 'An intelligent code review tool that learns team patterns and suggests improvements.',
      status: 'Exploring',
      icon: '🤖',
      type: 'engineering',
    },
    {
      id: 'audio-stories',
      title: 'Ambient Audio Stories',
      description: 'Immersive audio experiences combining travel sounds, narration, and music.',
      status: 'Planning',
      icon: '🎧',
      type: 'adventure',
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
    { id: 'all', label: 'All' },
    { id: 'featured', label: 'Featured' },
    { id: 'github', label: 'GitHub' },
    { id: 'ideas', label: 'Ideas' },
    { id: 'designs', label: 'Design Snaps' },
  ];

  return (
    <div style={styles.filterContainer}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          style={{
            ...styles.filterButton,
            background: activeFilter === filter.id ? COLORS.cyanDim : 'transparent',
            borderColor: activeFilter === filter.id ? COLORS.cyan : COLORS.divider,
            color: activeFilter === filter.id ? COLORS.cyan : COLORS.textSecondary,
          }}
          whileHover={{ borderColor: COLORS.cyan }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}

// ============================================
// FEATURED PROJECT CARD
// ============================================
function FeaturedProjectCard({ project, index }) {
  const isEven = index % 2 === 0;
  const accentColor = project.type === 'engineering' ? COLORS.cyan : COLORS.orange;

  return (
    <motion.div
      style={styles.featuredCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div style={{ ...styles.featuredInner, flexDirection: isEven ? 'row' : 'row-reverse' }}>
        {/* Image/Preview */}
        <motion.div
          style={styles.featuredImage}
          whileHover={{ scale: 1.02 }}
        >
          <div style={styles.imagePlaceholder}>
            <span style={styles.placeholderIcon}>
              {project.type === 'engineering' ? '💻' : '🌍'}
            </span>
            <span style={styles.placeholderText}>Preview</span>
          </div>
          
          {/* Status Badge */}
          <span style={{
            ...styles.statusBadge,
            background: project.status === 'Active' ? COLORS.greenGlow : COLORS.purpleDim,
            color: project.status === 'Active' ? COLORS.green : COLORS.purple,
          }}>
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
              <span key={tag} style={styles.tag}>{tag}</span>
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
          <span style={{
            ...styles.languageDot,
            background: languageColors[project.language] || COLORS.cyan,
          }} />
          {project.language}
        </span>
        <div style={styles.githubTags}>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={styles.miniTag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

// ============================================
// IDEA CARD
// ============================================
function IdeaCard({ idea, index }) {
  const accentColor = idea.type === 'engineering' ? COLORS.cyan : COLORS.orange;
  const statusColors = {
    'Concept': { bg: COLORS.purpleDim, color: COLORS.purple },
    'Exploring': { bg: COLORS.cyanDim, color: COLORS.cyan },
    'Planning': { bg: COLORS.orangeDim, color: COLORS.orange },
  };

  return (
    <motion.div
      style={styles.ideaCard}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        borderColor: accentColor,
        boxShadow: `0 8px 30px ${accentColor}20`,
      }}
    >
      <div style={styles.ideaHeader}>
        <span style={styles.ideaIcon}>{idea.icon}</span>
        <span style={{
          ...styles.ideaStatus,
          background: statusColors[idea.status]?.bg || COLORS.divider,
          color: statusColors[idea.status]?.color || COLORS.textSecondary,
        }}>
          {idea.status}
        </span>
      </div>
      
      <h4 style={styles.ideaTitle}>{idea.title}</h4>
      <p style={styles.ideaDescription}>{idea.description}</p>
      
      <span style={{ ...styles.ideaType, color: accentColor }}>
        {idea.type === 'engineering' ? '⚙ Engineering' : '🌍 Adventure'}
      </span>
    </motion.div>
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
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.cyan} strokeWidth="1.5">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ForkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
    <path d="M18 9v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9M12 12v3"/>
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const showFeatured = activeFilter === 'all' || activeFilter === 'featured';
  const showGitHub = activeFilter === 'all' || activeFilter === 'github';
  const showIdeas = activeFilter === 'all' || activeFilter === 'ideas';
  const showDesigns = activeFilter === 'all' || activeFilter === 'designs';

  return (
    <section ref={sectionRef} style={styles.section} id="projects">
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
          <h2 style={styles.sectionTitle}>Projects</h2>
          <p style={styles.sectionSubtitle}>
            A collection of work, experiments, and ideas I'm exploring.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

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
                </h3>
              )}
              {PROJECTS.featured.map((project, idx) => (
                <FeaturedProjectCard key={project.id} project={project} index={idx} />
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
                  <span style={styles.subsectionIcon}><GitHubIcon /></span> Open Source
                </h3>
              )}
              <div style={styles.githubGrid}>
                {PROJECTS.github.map((project, idx) => (
                  <GitHubCard key={project.id} project={project} index={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ideas */}
        <AnimatePresence mode="wait">
          {showIdeas && (
            <motion.div
              key="ideas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.ideasSection}
            >
              {activeFilter === 'all' && (
                <h3 style={styles.subsectionTitle}>
                  <span style={styles.subsectionIcon}>💡</span> Ideas & Experiments
                </h3>
              )}
              <div style={styles.ideasGrid}>
                {PROJECTS.ideas.map((idea, idx) => (
                  <IdeaCard key={idea.id} idea={idea} index={idx} />
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
                {PROJECTS.designs.map((design, idx) => (
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
          <p style={styles.ctaText}>Want to see more or collaborate on something?</p>
          <div style={styles.ctaButtons}>
            <motion.a
              href="https://github.com/anindya"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaButtonPrimary}
              whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${COLORS.cyanGlow}` }}
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
  ideasSection: {
    marginBottom: '64px',
  },
  ideasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  ideaCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '14px',
    padding: '24px',
    transition: 'all 0.3s ease',
  },
  ideaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  ideaIcon: {
    fontSize: '32px',
  },
  ideaStatus: {
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    borderRadius: '10px',
  },
  ideaTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '8px',
  },
  ideaDescription: {
    fontSize: '13px',
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    marginBottom: '16px',
  },
  ideaType: {
    fontSize: '11px',
    fontWeight: 500,
  },
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
