'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ============================================
// THEME COLORS (matching Hero Section)
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
  gold: '#FFD700',
  text: '#FFFFFF',
  textSecondary: '#B0B9C6',
  textTertiary: '#7A8396',
};

// ============================================
// SKILL DATA - Engineering & Adventure
// ============================================
const SKILL_CATEGORIES = {
  engineering: [
    {
      id: 'frontend',
      name: 'Frontend Architecture',
      icon: '⚛',
      description: 'Building scalable, accessible UIs',
      skills: [
        { name: 'React', level: 95, years: 7 },
        { name: 'Next.js', level: 92, years: 4 },
        { name: 'TypeScript', level: 90, years: 5 },
        { name: 'Redux', level: 88, years: 6 },
        { name: 'Framer Motion', level: 85, years: 3 },
      ],
    },
    {
      id: 'backend',
      name: 'Backend & APIs',
      icon: '⚡',
      description: 'Designing robust service architectures',
      skills: [
        { name: 'Node.js', level: 92, years: 8 },
        { name: 'Express.js', level: 90, years: 8 },
        { name: 'GraphQL', level: 88, years: 5 },
        { name: 'REST APIs', level: 95, years: 10 },
        { name: 'PostgreSQL', level: 82, years: 6 },
      ],
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      icon: '☁',
      description: 'CI/CD, deployment & infrastructure',
      skills: [
        { name: 'AWS', level: 85, years: 5 },
        { name: 'Docker', level: 88, years: 5 },
        { name: 'GitHub Actions', level: 90, years: 4 },
        { name: 'Jenkins', level: 82, years: 6 },
        { name: 'Kubernetes', level: 75, years: 3 },
      ],
    },
    {
      id: 'leadership',
      name: 'Technical Leadership',
      icon: '👥',
      description: 'Leading teams, defining architecture',
      skills: [
        { name: 'Team Leadership', level: 95, years: 6 },
        { name: 'Code Review', level: 95, years: 8 },
        { name: 'Architecture', level: 90, years: 7 },
        { name: 'Mentoring', level: 92, years: 6 },
        { name: 'Agile/Scrum', level: 88, years: 8 },
      ],
    },
  ],
  adventure: [
    {
      id: 'video',
      name: 'Video Production',
      icon: '🎬',
      description: 'Travel vlogs & storytelling',
      skills: [
        { name: 'DaVinci Resolve', level: 80, years: 3 },
        { name: 'Final Cut Pro', level: 75, years: 2 },
        { name: 'Color Grading', level: 78, years: 3 },
        { name: 'Motion Graphics', level: 70, years: 2 },
      ],
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '📷',
      description: 'Travel & landscape photography',
      skills: [
        { name: 'Lightroom', level: 85, years: 5 },
        { name: 'Composition', level: 82, years: 6 },
        { name: 'Sony Alpha', level: 80, years: 4 },
        { name: 'Drone (DJI)', level: 78, years: 3 },
      ],
    },
    {
      id: 'audio',
      name: 'Audio & Podcasting',
      icon: '🎙',
      description: 'Audio stories & sound design',
      skills: [
        { name: 'Audio Recording', level: 75, years: 2 },
        { name: 'Podcast Editing', level: 72, years: 2 },
        { name: 'Sound Design', level: 68, years: 2 },
      ],
    },
  ],
};

// ============================================
// EXPERIENCE TIMELINE DATA
// ============================================
const EXPERIENCE_DATA = [
  {
    id: 'cognizant-2',
    period: '2021 — Present',
    role: 'Senior Technical Lead',
    company: 'Cognizant Technology Solutions',
    location: 'Kolkata, India',
    type: 'engineering',
    current: true,
    description:
      'Leading multiple engineering teams delivering enterprise solutions for global clients in finance and ratings. Architecture ownership, CI/CD implementation, and mentoring engineers.',
    highlights: [
      'Led 3-5 developer teams across multiple workstreams',
      'Enterprise delivery for AXA, Allianz, S&P Global',
      'Established coding standards and review culture',
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'AWS', 'GitHub Actions', 'Docker'],
  },
  {
    id: 'fincompare',
    period: '2019 — 2021',
    role: 'Senior UI Lead',
    company: 'FinCompare GmbH',
    location: 'Berlin, Germany',
    type: 'engineering',
    description:
      'Led team of 3 UI developers at FinTech startup. Built shared component library and SME onboarding flows.',
    highlights: [
      'Built reusable component library from scratch',
      'Implemented SME financing onboarding',
      'Met Dan Abramov at a Berlin hackathon 🎉',
    ],
    technologies: ['React', 'Redux', 'Styled Components', 'Node.js', 'Jest'],
  },
  {
    id: 'storebrand',
    period: '2016 — 2019',
    role: 'UI Developer & Knowledge Lead',
    company: 'Storebrand ASA',
    location: 'Oslo, Norway',
    type: 'engineering',
    description:
      'Led knowledge transition for React applications. Full ownership of TrackMyCase application with Express.js backend.',
    highlights: [
      'Full-stack ownership of customer portal',
      'Knowledge transition lead for React apps',
      'Real-time updates with MQTT',
    ],
    technologies: ['React', 'Redux Saga', 'Express.js', 'MQTT', 'CouchDB'],
  },
  {
    id: 'cognizant-1',
    period: '2013 — 2016',
    role: 'Software Engineer → Programmer Analyst',
    company: 'Cognizant Technology Solutions',
    location: 'Chennai → Kolkata, India',
    type: 'engineering',
    description:
      'Started career in healthcare domain, moved to European Insurance vertical. Hackathon champion and COE member.',
    highlights: [
      'Progressed from trainee to analyst',
      'Built mobile apps for innovation demos',
      'Center of Excellence member',
    ],
    technologies: ['JavaScript', 'AngularJS', 'Java', 'Cordova', 'jQuery'],
  },
];

// ============================================
// TOOLS ARSENAL
// ============================================
const TOOLS = {
  engineering: [
    { name: 'VS Code', icon: '💻', category: 'Editor' },
    { name: 'Git', icon: '🔀', category: 'Version Control' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'Postman', icon: '📬', category: 'API Testing' },
    { name: 'Jira', icon: '📋', category: 'Project Mgmt' },
    { name: 'Notion', icon: '📝', category: 'Documentation' },
    { name: 'Terminal', icon: '⌨️', category: 'CLI' },
    { name: 'Chrome DevTools', icon: '🔍', category: 'Debugging' },
  ],
  adventure: [
    { name: 'DJI Osmo', icon: '📹', category: 'Gimbal' },
    { name: 'Sony A6000', icon: '📷', category: 'Camera' },
    { name: 'iPhone 13 Pro', icon: '📱', category: 'Mobile' },
    { name: 'iPad Pro', icon: '📱', category: 'Tablet' },
    { name: 'GoPro', icon: '🎥', category: 'Action Cam' },
    { name: 'Rode Mic', icon: '🎙', category: 'Audio' },
  ],
};

// ============================================
// SKILL CONSTELLATION COMPONENT
// ============================================
function SkillConstellation({ category, isActive, side }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const isEngineering = side === 'engineering';
  const accentColor = isEngineering ? COLORS.cyan : COLORS.orange;
  const glowColor = isEngineering ? COLORS.cyanGlow : COLORS.orangeGlow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={styles.constellationCard}
    >
      {/* Card Header */}
      <div style={styles.cardHeader}>
        <span style={{ ...styles.cardIcon, background: glowColor }}>{category.icon}</span>
        <div>
          <h3 style={{ ...styles.cardTitle, color: COLORS.text }}>{category.name}</h3>
          <p style={styles.cardDescription}>{category.description}</p>
        </div>
      </div>

      {/* Skills List with Constellation Lines */}
      <div style={styles.skillsList}>
        {category.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            style={styles.skillItem}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            initial={{ opacity: 0, x: isEngineering ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div style={styles.skillInfo}>
              <span style={styles.skillName}>{skill.name}</span>
              <span style={styles.skillYears}>{skill.years}y</span>
            </div>
            
            {/* Proficiency Bar */}
            <div style={styles.skillBarContainer}>
              <motion.div
                style={{
                  ...styles.skillBar,
                  background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
              />
              
              {/* Skill Node */}
              <motion.div
                style={{
                  ...styles.skillNode,
                  background: accentColor,
                  boxShadow:
                    hoveredSkill === skill.name
                      ? `0 0 20px ${accentColor}, 0 0 40px ${glowColor}`
                      : `0 0 10px ${glowColor}`,
                }}
                animate={{
                  scale: hoveredSkill === skill.name ? 1.3 : 1,
                }}
              />
            </div>
            
            {/* Percentage */}
            <span style={{ ...styles.skillPercent, color: accentColor }}>
              {skill.level}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Connecting constellation lines (decorative) */}
      <svg style={styles.constellationSvg}>
        <defs>
          <linearGradient id={`grad-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Decorative connection lines */}
        <motion.path
          d={`M 10 20 Q 50 ${30 + Math.random() * 20} 90 40`}
          stroke={`url(#grad-${category.id})`}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

// ============================================
// EXPERIENCE TIMELINE COMPONENT
// ============================================
function ExperienceTimeline({ experiences }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={styles.timelineContainer}>
      {experiences.map((exp, idx) => (
        <motion.div
          key={exp.id}
          style={styles.timelineItem}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          {/* Timeline Line */}
          <div style={styles.timelineLine}>
            <motion.div
              style={{
                ...styles.timelineDot,
                background: exp.current ? COLORS.cyan : COLORS.divider,
                boxShadow: exp.current ? `0 0 20px ${COLORS.cyanGlow}` : 'none',
              }}
              whileHover={{ scale: 1.3 }}
            />
            {idx < experiences.length - 1 && <div style={styles.timelineConnector} />}
          </div>

          {/* Content */}
          <motion.div
            style={{
              ...styles.timelineContent,
              borderColor: expandedId === exp.id ? COLORS.cyan : COLORS.divider,
            }}
            whileHover={{ borderColor: COLORS.cyan, x: 4 }}
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
          >
            <div style={styles.timelineHeader}>
              <span style={styles.timelinePeriod}>{exp.period}</span>
              {exp.current && <span style={styles.currentBadge}>CURRENT</span>}
            </div>

            <h3 style={styles.timelineRole}>{exp.role}</h3>
            <p style={styles.timelineCompany}>
              {exp.company} • <span style={{ color: COLORS.textTertiary }}>{exp.location}</span>
            </p>

            <AnimatePresence>
              {expandedId === exp.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={styles.timelineExpanded}
                >
                  <p style={styles.timelineDescription}>{exp.description}</p>

                  <ul style={styles.highlightsList}>
                    {exp.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        style={styles.highlightItem}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span style={styles.highlightArrow}>→</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tech Tags */}
            <div style={styles.techTags}>
              {exp.technologies.slice(0, expandedId === exp.id ? undefined : 4).map((tech) => (
                <span key={tech} style={styles.techTag}>
                  {tech}
                </span>
              ))}
              {expandedId !== exp.id && exp.technologies.length > 4 && (
                <span style={{ ...styles.techTag, color: COLORS.cyan }}>
                  +{exp.technologies.length - 4}
                </span>
              )}
            </div>

            <span style={styles.expandHint}>
              {expandedId === exp.id ? '← Collapse' : 'Click to expand →'}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// TOOLS GRID COMPONENT
// ============================================
function ToolsGrid({ tools, side }) {
  const accentColor = side === 'engineering' ? COLORS.cyan : COLORS.orange;

  return (
    <div style={styles.toolsGrid}>
      {tools.map((tool, idx) => (
        <motion.div
          key={tool.name}
          style={styles.toolItem}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{
            scale: 1.1,
            background: COLORS.bgCardHover,
            borderColor: accentColor,
          }}
        >
          <span style={styles.toolIcon}>{tool.icon}</span>
          <span style={styles.toolName}>{tool.name}</span>
          <span style={styles.toolCategory}>{tool.category}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// SECTION TABS
// ============================================
function SectionTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'expertise', label: 'Skills', icon: '◈' },
    { id: 'experience', label: 'Experience', icon: '◉' },
    { id: 'tools', label: 'Tools', icon: '◆' },
  ];

  return (
    <div style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          style={{
            ...styles.tab,
            background: activeTab === tab.id ? COLORS.bgCard : 'transparent',
            borderColor: activeTab === tab.id ? COLORS.cyan : COLORS.divider,
            color: activeTab === tab.id ? COLORS.cyan : COLORS.textSecondary,
          }}
          whileHover={{ borderColor: COLORS.cyan }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab(tab.id)}
        >
          <span style={styles.tabIcon}>{tab.icon}</span>
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('expertise');
  const [activeSide, setActiveSide] = useState('engineering');
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} style={styles.section} id="expertise">
      {/* Background */}
      <motion.div style={{ ...styles.background, y: backgroundY }}>
        <div style={styles.gradientOrb1} />
        <div style={styles.gradientOrb2} />
        <div style={styles.gridPattern} />
      </motion.div>

      {/* Content Container */}
      <motion.div style={{ ...styles.container, opacity }}>
        {/* Section Header */}
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>
            Expertise
          </h2>
          <p style={styles.sectionSubtitle}>
            A decade of building systems, leading teams, and exploring new frontiers.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <SectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dual Side Toggle (for Expertise & Tools) */}
        {(activeTab === 'expertise' || activeTab === 'tools') && (
          <motion.div
            style={styles.sideToggle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              style={{
                ...styles.sideButton,
                background: activeSide === 'engineering' ? COLORS.cyanDim : 'transparent',
                borderColor: activeSide === 'engineering' ? COLORS.cyan : COLORS.divider,
                color: activeSide === 'engineering' ? COLORS.cyan : COLORS.textSecondary,
              }}
              whileHover={{ borderColor: COLORS.cyan }}
              onClick={() => setActiveSide('engineering')}
            >
              <span style={styles.sideIcon}>⚙</span>
              Engineering
            </motion.button>

            <div style={styles.toggleDivider}>
              <span style={styles.toggleMoon}>☽</span>
            </div>

            <motion.button
              style={{
                ...styles.sideButton,
                background: activeSide === 'adventure' ? COLORS.orangeDim : 'transparent',
                borderColor: activeSide === 'adventure' ? COLORS.orange : COLORS.divider,
                color: activeSide === 'adventure' ? COLORS.orange : COLORS.textSecondary,
              }}
              whileHover={{ borderColor: COLORS.orange }}
              onClick={() => setActiveSide('adventure')}
            >
              <span style={styles.sideIcon}>🌍</span>
              Adventure
            </motion.button>
          </motion.div>
        )}

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'expertise' && (
            <motion.div
              key={`expertise-${activeSide}`}
              style={styles.contentGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {SKILL_CATEGORIES[activeSide].map((category) => (
                <SkillConstellation
                  key={category.id}
                  category={category}
                  isActive={true}
                  side={activeSide}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              style={styles.experienceWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ExperienceTimeline experiences={EXPERIENCE_DATA} />
            </motion.div>
          )}

          {activeTab === 'tools' && (
            <motion.div
              key={`tools-${activeSide}`}
              style={styles.toolsWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div style={styles.toolsHeader}>
                <h3 style={styles.toolsTitle}>
                  {activeSide === 'engineering' ? 'Development Tools' : 'Creative Gear'}
                </h3>
                <p style={styles.toolsSubtitle}>
                  {activeSide === 'engineering'
                    ? 'The tools I use daily to ship quality software'
                    : 'The gear behind my content creation journey'}
                </p>
              </div>
              <ToolsGrid tools={TOOLS[activeSide]} side={activeSide} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <motion.div
          style={styles.statsRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '12+', label: 'Years Experience' },
            { value: '35+', label: 'Projects Delivered' },
            { value: '3', label: 'Countries Worked' },
            { value: '15+', label: 'Engineers Mentored' },
          ].map((stat, idx) => (
            <div key={idx} style={styles.statItem}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Global Styles */}
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
    top: '10%',
    left: '-10%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.cyanGlow}15 0%, transparent 60%)`,
    filter: 'blur(60px)',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '10%',
    right: '-10%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.orangeGlow}15 0%, transparent 60%)`,
    filter: 'blur(60px)',
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(${COLORS.divider}15 1px, transparent 1px),
      linear-gradient(90deg, ${COLORS.divider}15 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    opacity: 0.3,
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
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '12px 24px',
    border: '1px solid',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Sora', sans-serif",
  },
  tabIcon: {
    fontSize: '14px',
    opacity: 0.7,
  },
  sideToggle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '40px',
  },
  sideButton: {
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '24px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Sora', sans-serif",
  },
  sideIcon: {
    fontSize: '14px',
  },
  toggleDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
  },
  toggleMoon: {
    fontSize: '20px',
    color: COLORS.textTertiary,
    opacity: 0.5,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  constellationCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '16px',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '20px',
  },
  cardIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
  },
  cardDescription: {
    fontSize: '12px',
    color: COLORS.textTertiary,
    lineHeight: 1.4,
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'default',
  },
  skillInfo: {
    width: '90px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  skillName: {
    fontSize: '12px',
    fontWeight: 500,
    color: COLORS.text,
  },
  skillYears: {
    fontSize: '9px',
    color: COLORS.textTertiary,
    letterSpacing: '0.1em',
  },
  skillBarContainer: {
    flex: 1,
    height: '4px',
    background: COLORS.divider,
    borderRadius: '2px',
    position: 'relative',
    overflow: 'visible',
  },
  skillBar: {
    height: '100%',
    borderRadius: '2px',
    position: 'relative',
  },
  skillNode: {
    position: 'absolute',
    right: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  },
  skillPercent: {
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    width: '35px',
    textAlign: 'right',
  },
  constellationSvg: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '60px',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  experienceWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  timelineItem: {
    display: 'flex',
    gap: '20px',
  },
  timelineLine: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20px',
    flexShrink: 0,
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  timelineConnector: {
    width: '2px',
    flex: 1,
    background: `linear-gradient(180deg, ${COLORS.divider} 0%, ${COLORS.divider}50 100%)`,
    marginTop: '8px',
  },
  timelineContent: {
    flex: 1,
    background: COLORS.bgCard,
    border: '1px solid',
    borderRadius: '14px',
    padding: '20px 24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  timelineHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  timelinePeriod: {
    fontSize: '11px',
    color: COLORS.textTertiary,
    fontWeight: 500,
    letterSpacing: '0.1em',
    fontFamily: "'JetBrains Mono', monospace",
  },
  currentBadge: {
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    color: COLORS.cyan,
    background: COLORS.cyanDim,
    padding: '4px 10px',
    borderRadius: '10px',
    border: `1px solid ${COLORS.cyan}40`,
  },
  timelineRole: {
    fontSize: '16px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '4px',
    lineHeight: 1.3,
  },
  timelineCompany: {
    fontSize: '13px',
    color: COLORS.cyan,
    marginBottom: '12px',
  },
  timelineExpanded: {
    overflow: 'hidden',
    marginBottom: '12px',
  },
  timelineDescription: {
    fontSize: '13px',
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    marginBottom: '14px',
  },
  highlightsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  highlightItem: {
    fontSize: '12px',
    color: COLORS.textSecondary,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    lineHeight: 1.5,
  },
  highlightArrow: {
    color: COLORS.cyan,
    flexShrink: 0,
    marginTop: '2px',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '8px',
  },
  techTag: {
    fontSize: '10px',
    fontWeight: 500,
    color: COLORS.textSecondary,
    background: COLORS.divider,
    padding: '4px 10px',
    borderRadius: '10px',
    fontFamily: "'JetBrains Mono', monospace",
  },
  expandHint: {
    fontSize: '10px',
    color: COLORS.textTertiary,
    letterSpacing: '0.05em',
    opacity: 0.7,
  },
  toolsWrapper: {
    marginBottom: '48px',
  },
  toolsHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  toolsTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '8px',
  },
  toolsSubtitle: {
    fontSize: '13px',
    color: COLORS.textSecondary,
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: '14px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  toolItem: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.divider}`,
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  toolIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  toolName: {
    fontSize: '12px',
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: '4px',
  },
  toolCategory: {
    fontSize: '9px',
    color: COLORS.textTertiary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '32px 0',
    borderTop: `1px solid ${COLORS.divider}`,
    marginTop: '32px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '6px',
  },
  statValue: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 700,
    color: COLORS.cyan,
    letterSpacing: '-0.02em',
    fontFamily: "'JetBrains Mono', monospace",
  },
  statLabel: {
    fontSize: '11px',
    color: COLORS.textTertiary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};
