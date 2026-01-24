'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useShowcase } from '../../context';
import { SHOWCASE } from '../../data';
import CertificationCard from '../CertificationCard';
import FeaturedProjectCard from '../FeaturedProjectCard';
import GitHubCard from '../GitHubCard';
import DesignSnapCard from '../DesignSnapCard';
import CTASection from '../CTASection';
import { GitHubIcon } from '../icons';

const SubsectionTitle = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const { colors } = useTheme();

  return (
    <h3
      className="flex items-center"
      style={{
        fontSize: '14px',
        fontWeight: 600,
        color: colors.textSecondary,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '24px',
        gap: '10px',
      }}
    >
      <span className="flex items-center" style={{ fontSize: '16px' }}>
        {icon}
      </span>
      {children}
    </h3>
  );
};

const ContentArea = () => {
  const { colors } = useTheme();
  const {
    activeFilter,
    showFeatured,
    showCertifications,
    showGitHub,
    showDesigns,
    contentRef,
  } = useShowcase();

  const featuredCerts = SHOWCASE.certifications.filter((c) => c.featured);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    // Scroll state is managed in context via onScroll
  }, []);

  return (
    <div
      ref={contentRef}
      className="flex-1 overflow-y-auto showcase-scroll"
      onScroll={handleScroll}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.border} transparent`,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 48px)',
          paddingBottom: 'clamp(80px, 10vh, 120px)',
        }}
      >
        {/* Certifications Section */}
        <AnimatePresence mode="wait">
          {showCertifications && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginBottom: '64px' }}
            >
              {activeFilter === 'all' && (
                <SubsectionTitle icon="🏆">Certifications</SubsectionTitle>
              )}

              {featuredCerts.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
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
              style={{ marginBottom: '64px' }}
            >
              {activeFilter === 'all' && (
                <SubsectionTitle icon="⭐">Featured Projects</SubsectionTitle>
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
              style={{ marginBottom: '64px' }}
            >
              {activeFilter === 'all' && (
                <SubsectionTitle icon={<GitHubIcon />}>Open Source</SubsectionTitle>
              )}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
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
              style={{ marginBottom: '64px' }}
            >
              {activeFilter === 'all' && (
                <SubsectionTitle icon="🎨">Design Snaps</SubsectionTitle>
              )}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px',
                }}
              >
                {SHOWCASE.designs.map((design, idx) => (
                  <DesignSnapCard key={design.id} design={design} index={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <CTASection />
      </div>
    </div>
  );
};

export default ContentArea;
