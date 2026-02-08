'use client';

import { MotionLink } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { VerifyIcon } from '../../icons';

interface VerifyButtonProps {
  verifyUrl: string;
  validUntil: string;
}

const VerifyButton = ({ verifyUrl, validUntil }: VerifyButtonProps) => {
  const { colors } = useTheme();

  return (
    <div
      className="flex flex-wrap items-center"
      style={{ gap: '20px' }}
    >
      <MotionLink
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
        style={{
          gap: '8px',
          padding: '12px 24px',
          background: colors.cyan,
          color: colors.bg,
          borderRadius: '24px',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: `0 8px 30px ${colors.cyanGlow}`,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <VerifyIcon />
        Verify Credential
      </MotionLink>
      <span style={{ fontSize: '12px', color: colors.textMuted }}>
        Valid until {validUntil}
      </span>
    </div>
  );
};

export default VerifyButton;
