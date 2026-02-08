'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useHoverState } from '../../hooks';
import type { Certification } from '../../types';
import CertificationBadge from './CertificationBadge';
import {
  ScoreDisplay,
  FeatureRibbon,
  GlowEffect,
  DecorativeCircles,
  CertificationContent,
} from './components';

interface CertificationCardProps {
  cert: Certification;
}

const CertificationCard = ({ cert }: CertificationCardProps) => {
  const { colors } = useTheme();
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  return (
    <MotionDiv
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.bgSecondary}95 0%, ${colors.verifiedGlow} 100%)`,
        border: `1px solid ${colors.verified}66`,
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 40px)',
        marginBottom: '32px',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow Effect */}
      <GlowEffect isHovered={isHovered} />

      {/* Featured Ribbon */}
      <FeatureRibbon />

      {/* Main Content */}
      <div
        className="flex flex-wrap"
        style={{ gap: 'clamp(24px, 4vw, 48px)', alignItems: 'flex-start' }}
      >
        {/* Left: Badge Visual */}
        <div
          className="flex flex-col items-center"
          style={{ gap: '16px', minWidth: '180px' }}
        >
          <CertificationBadge cert={cert} isHovered={isHovered} />
          <ScoreDisplay score={cert.score} passingScore={cert.passingScore} />
        </div>

        {/* Right: Content */}
        <CertificationContent cert={cert} />
      </div>

      {/* Decorative circles */}
      <DecorativeCircles />
    </MotionDiv>
  );
};

export default CertificationCard;
