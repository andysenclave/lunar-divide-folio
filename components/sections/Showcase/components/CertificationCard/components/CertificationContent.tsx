'use client';

import { useTheme } from '@/theme/ThemeProvider';
import type { Certification } from '../../../types';
import HighlightList from './HighlightList';
import SkillTags from './SkillTags';
import VerifyButton from './VerifyButton';

interface CertificationContentProps {
  cert: Certification;
}

const CertificationContent = ({ cert }: CertificationContentProps) => {
  const { colors } = useTheme();

  return (
    <div className="flex-1" style={{ minWidth: '280px' }}>
      {/* Category & Date */}
      <div
        className="flex flex-wrap items-center"
        style={{ gap: '16px', marginBottom: '12px' }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: colors.cyan,
            textTransform: 'uppercase',
            padding: '4px 10px',
            background: `rgba(0, 217, 255, 0.15)`,
            borderRadius: '10px',
          }}
        >
          {cert.category}
        </span>
        <span style={{ fontSize: '12px', color: colors.textMuted }}>
          📅 {cert.earnedDate}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(22px, 3vw, 28px)',
          fontWeight: 700,
          color: colors.white,
          marginBottom: '10px',
          lineHeight: 1.2,
        }}
      >
        {cert.title}
      </h3>

      {/* Issuer */}
      <div
        className="flex items-center"
        style={{ gap: '8px', marginBottom: '12px' }}
      >
        <span style={{ fontSize: '20px' }}>{cert.issuerLogo}</span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: colors.textSecondary,
          }}
        >
          {cert.issuer}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: colors.textSecondary,
          lineHeight: 1.7,
          marginBottom: '16px',
        }}
      >
        {cert.description}
      </p>

      {/* Highlights */}
      {cert.highlights && <HighlightList highlights={cert.highlights} />}

      {/* Skills */}
      <SkillTags skills={cert.skills} />

      {/* Actions */}
      {cert.verifyUrl && (
        <VerifyButton verifyUrl={cert.verifyUrl} validUntil={cert.validUntil} />
      )}
    </div>
  );
};

export default CertificationContent;
