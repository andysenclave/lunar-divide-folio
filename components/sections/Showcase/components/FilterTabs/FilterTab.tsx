'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionButton, MotionDiv, MotionSpan } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FilterItem } from '../../types';

interface FilterTabProps {
  filter: FilterItem;
  isActive: boolean;
  showLabels: boolean;
  onSelect: () => void;
}

const FilterTab = ({
  filter,
  isActive,
  showLabels,
  onSelect,
}: FilterTabProps) => {
  const { colors } = useTheme();

  return (
    <MotionButton
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
        background: isActive ? `rgba(0, 217, 255, 0.15)` : 'transparent',
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
      onClick={onSelect}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <MotionSpan
        style={{ fontSize: showLabels ? '14px' : '16px' }}
        animate={{ fontSize: showLabels ? '14px' : '16px' }}
        transition={{ duration: 0.2 }}
      >
        {filter.icon}
      </MotionSpan>

      <AnimatePresence mode="wait">
        {showLabels && (
          <MotionSpan
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {filter.label}
          </MotionSpan>
        )}
      </AnimatePresence>

      {/* Active indicator dot for compact mode */}
      {!showLabels && isActive && (
        <MotionDiv
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
    </MotionButton>
  );
};

export default FilterTab;
