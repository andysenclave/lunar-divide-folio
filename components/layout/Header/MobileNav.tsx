'use client';

import { useState } from 'react';
import { MotionDiv, MotionLink, MotionButton } from '@/components/motion';
import { NAV_ITEMS } from '@/constants/navigation';
import { useTheme } from '@/theme/ThemeProvider';
import { AnimatePresence } from 'framer-motion';

const GLASS = {
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
} as const;

export default function MobileNav() {
  const { colors, mode, toggle } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MotionDiv
      className="fixed bottom-0 left-0 right-0 z-100 md:hidden flex justify-center"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        pointerEvents: 'none',
      }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <MotionDiv
            key="expanded"
            role="navigation"
            aria-label="Mobile navigation"
            className="mb-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '6px 8px',
              borderRadius: '22px',
              background: `${colors.bg}c0`,
              ...GLASS,
              border: `0.5px solid ${colors.border}50`,
              boxShadow: `0 4px 30px rgba(0,0,0,0.2)`,
              fontFamily: 'var(--font-heading), var(--font-body), sans-serif',
              pointerEvents: 'auto',
            }}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            {NAV_ITEMS.map((item) => (
              <MotionLink
                key={item.label}
                href={item.href}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsExpanded(false)}
                style={{
                  color: colors.textSecondary,
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '9px 14px',
                  borderRadius: '16px',
                  transition: 'background 0.15s ease',
                }}
              >
                {item.label}
              </MotionLink>
            ))}

            {/* Subtle divider */}
            <span
              style={{
                width: '1px',
                height: '20px',
                background: colors.border,
                opacity: 0.3,
                margin: '0 2px',
                flexShrink: 0,
              }}
            />

            <MotionButton
              onClick={() => { toggle(); }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                background: 'transparent',
                color: colors.text,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}
              aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </MotionButton>

            <MotionButton
              onClick={() => setIsExpanded(false)}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                background: `${colors.border}20`,
                color: colors.textMuted,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 300,
                flexShrink: 0,
              }}
              aria-label="Close menu"
            >
              ×
            </MotionButton>
          </MotionDiv>
        ) : (
          <MotionDiv
            key="collapsed"
            className="mb-3"
            onClick={() => setIsExpanded(true)}
            role="button"
            aria-label="Open navigation"
            tabIndex={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '20px',
              background: `${colors.bg}80`,
              ...GLASS,
              border: `0.5px solid ${colors.border}30`,
              boxShadow: `0 2px 16px rgba(0,0,0,0.1)`,
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 0.55, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            whileTap={{ scale: 0.95, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <span style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: colors.cyan }} />
              <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: colors.textMuted }} />
              <span style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: colors.orange }} />
            </span>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
