'use client';

import { MotionDiv, MotionLink } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { GitHubIcon } from '../icons';

const CTASection = () => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="text-center"
      style={{
        paddingTop: '48px',
        borderTop: `1px solid ${colors.border}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p
        style={{
          fontSize: '16px',
          color: colors.textSecondary,
          marginBottom: '24px',
        }}
      >
        Want to see more or collaborate on something?
      </p>

      <div
        className="flex justify-center flex-wrap"
        style={{ gap: '16px' }}
      >
        <MotionLink
          href="https://github.com/anindya"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
          style={{
            gap: '10px',
            padding: '14px 28px',
            background: colors.cyan,
            color: colors.bg,
            borderRadius: '30px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: `0 8px 30px ${colors.cyanGlow}`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <GitHubIcon /> View GitHub
        </MotionLink>

        <MotionLink
          href="#contact"
          style={{
            padding: '14px 28px',
            background: 'transparent',
            border: `1px solid ${colors.border}`,
            color: colors.white,
            borderRadius: '30px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          whileHover={{ borderColor: colors.cyan }}
          whileTap={{ scale: 0.98 }}
        >
          Get in Touch →
        </MotionLink>
      </div>
    </MotionDiv>
  );
};

export default CTASection;
