'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useShowcase } from '../../context';

const SectionHeader = () => {
  const { colors } = useTheme();
  const { isScrolled } = useShowcase();

  return (
    <motion.div
      className="text-center shrink-0"
      style={{
        padding: 'clamp(24px, 4vh, 40px) clamp(20px, 5vw, 48px)',
        paddingBottom: isScrolled ? '12px' : 'clamp(16px, 2vh, 24px)',
        background: `linear-gradient(to bottom, ${colors.bg} 0%, ${colors.bg}ee 70%, transparent 100%)`,
      }}
      animate={{
        paddingTop: isScrolled ? '16px' : 'clamp(24px, 4vh, 40px)',
        paddingBottom: isScrolled ? '8px' : 'clamp(16px, 2vh, 24px)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.h2
        className="t-h1"
        style={{
          fontWeight: 700,
          color: colors.white,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
        animate={{
          fontSize: isScrolled ? 'clamp(24px, 3vw, 32px)' : 'clamp(32px, 5vw, 52px)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        Showcase
      </motion.h2>

      <motion.p
        style={{
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: colors.textSecondary,
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: 1.5,
          overflow: 'hidden',
        }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          height: isScrolled ? 0 : 'auto',
          marginTop: isScrolled ? 0 : '12px',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        Featured work, certifications, and experiments from engineering to
        exploration.
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
