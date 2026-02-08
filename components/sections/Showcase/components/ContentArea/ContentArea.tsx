'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { useShowcase } from '../../context';
import { SHOWCASE } from '../../data';
import CTASection from '../CTASection';
import {
  CertificationsSection,
  FeaturedSection,
  GitHubSection,
  DesignsSection,
} from './components';

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
  const showAllSectionTitles = activeFilter === 'all';

  return (
    <div
      ref={contentRef}
      className="flex-1 overflow-y-auto showcase-scroll"
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
        <CertificationsSection
          certifications={featuredCerts}
          showTitle={showAllSectionTitles}
          isVisible={showCertifications}
        />

        {/* Featured Projects */}
        <FeaturedSection
          projects={SHOWCASE.featured}
          showTitle={showAllSectionTitles}
          isVisible={showFeatured}
        />

        {/* GitHub Projects */}
        <GitHubSection
          projects={SHOWCASE.github}
          showTitle={showAllSectionTitles}
          isVisible={showGitHub}
        />

        {/* Design Snaps */}
        <DesignsSection
          designs={SHOWCASE.designs}
          showTitle={showAllSectionTitles}
          isVisible={showDesigns}
        />
      </div>
    </div>
  );
};

export default ContentArea;
