'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useShowcase } from '../../context';
import { FILTERS } from '../../data';

const FilterTabs = () => {
  const { colors } = useTheme();
  const { activeFilter, setActiveFilter, isScrolled } = useShowcase();
  const [isHovered, setIsHovered] = useState(false);

  // Show full labels when not scrolled OR when hovered
  const showLabels = !isScrolled || isHovered;

  return (
    <motion.div
      className="flex justify-center flex-wrap shrink-0"
      style={{
        gap: showLabels ? '10px' : '6px',
        padding: '0 clamp(20px, 5vw, 48px)',
        paddingBottom: showLabels ? '24px' : '16px',
        background: `linear-gradient(to bottom, ${colors.bg}ee 0%, ${colors.bg}dd 50%, transparent 100%)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        paddingBottom: showLabels ? '24px' : '12px',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <motion.button
            key={filter.id}
            className="relative"
            style={{
              border: '1px solid',
              borderRadius: '24px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: showLabels ? '8px' : '0',
              background: isActive
                ? `rgba(0, 217, 255, 0.15)`
                : 'transparent',
              borderColor: isActive ? colors.cyan : colors.border,
              color: isActive ? colors.cyan : colors.textSecondary,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            animate={{
              padding: showLabels ? '10px 20px' : '10px 14px',
              minWidth: showLabels ? 'auto' : '44px',
            }}
            whileHover={{
              borderColor: colors.cyan,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFilter(filter.id)}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <motion.span
              style={{ fontSize: showLabels ? '14px' : '16px' }}
              animate={{
                fontSize: showLabels ? '14px' : '16px',
              }}
              transition={{ duration: 0.2 }}
            >
              {filter.icon}
            </motion.span>

            <AnimatePresence mode="wait">
              {showLabels && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  {filter.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Active indicator dot for compact mode */}
            {!showLabels && isActive && (
              <motion.div
                className="absolute"
                style={{
                  bottom: '4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: colors.cyan,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        );
      })}

      {/* Hint text when compact */}
      <AnimatePresence>
        {isScrolled && !isHovered && (
          <motion.span
            className="absolute"
            style={{
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '9px',
              color: colors.textMuted,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            hover to expand
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterTabs;
