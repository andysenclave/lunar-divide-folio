'use client';

import { MotionButton, MotionHeader, MotionLink } from '@/components/motion';
import { NAV_ITEMS } from '@/constants/navigation';
import { useAnimation } from '@/context';
import { useTheme } from '@/theme/ThemeProvider';
import { useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const { colors, mode, toggle } = useTheme();
  const { scrollYProgress } = useAnimation();
  const navOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <MotionHeader
      style={{
        opacity: navOpacity,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px clamp(24px, 5vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        fontFamily: 'var(--font-heading), var(--font-body), sans-serif',
      }}
    >
      <MotionButton
        type="button"
        whileHover={{ scale: 1.02 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: colors.text,
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        <Image
          src="/images/avatar.jpg"
          alt=""
          width={28}
          height={28}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: '-5px',
            width: '28px',
            height: '28px',
          }}
        />
        ANDYSENCLAVE
      </MotionButton>

      <nav
        style={{
          display: 'flex',
          gap: 'clamp(20px, 4vw, 40px)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
        className="hide-mobile"
      >
        {NAV_ITEMS.map((item) => (
          <MotionLink
            key={item.label}
            href={item.href}
            whileHover={{ y: -2, color: colors.text }}
            style={{
              color: colors.textSecondary,
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
          >
            {item.label}
          </MotionLink>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        <MotionButton
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `1px solid ${colors.border}`,
            background: colors.bgSecondary,
            color: colors.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.3s ease',
          }}
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          {mode === 'dark' ? '☀️' : '🌙'}
        </MotionButton>

        <MotionLink
          href="#contact"
          whileHover={{ scale: 1.05, borderColor: colors.text }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '10px 24px',
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            color: colors.text,
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            transition: 'all 0.3s ease',
          }}
        >
          CONTACT →
        </MotionLink>
      </div>
    </MotionHeader>
  );
}
