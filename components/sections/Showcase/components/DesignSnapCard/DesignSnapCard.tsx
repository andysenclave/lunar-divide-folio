'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { DesignSnap } from '../../types';

interface DesignSnapCardProps {
  design: DesignSnap;
  index: number;
}

const DesignSnapCard = ({ design, index }: DesignSnapCardProps) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="overflow-hidden"
      style={{
        background: `${colors.bgSecondary}95`,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        transition: 'all 0.3s ease',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{
            aspectRatio: '16/10',
            background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '36px', opacity: 0.3 }}>🎨</span>
          <span
            style={{
              fontSize: '11px',
              color: colors.textMuted,
              textAlign: 'center',
              padding: '0 20px',
            }}
          >
            {design.title}
          </span>
        </div>

        {/* Overlay on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background: 'rgba(10, 14, 39, 0.85)',
                gap: '8px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span style={{ fontSize: '24px' }}>🔍</span>
              <span
                style={{
                  fontSize: '11px',
                  color: colors.cyan,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                View Full
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Info */}
      <div style={{ padding: '16px 20px' }}>
        <h4
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: colors.white,
            marginBottom: '4px',
          }}
        >
          {design.title}
        </h4>
        <p
          style={{
            fontSize: '12px',
            color: colors.textMuted,
          }}
        >
          {design.description}
        </p>
      </div>
    </motion.div>
  );
};

export default DesignSnapCard;
