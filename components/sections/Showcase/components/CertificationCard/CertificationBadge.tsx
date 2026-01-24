'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { Certification } from '../../types';

interface CertificationBadgeProps {
  cert: Certification;
  isHovered: boolean;
}

// ============================================
// SUB-COMPONENTS
// ============================================

interface BadgeGlowProps {
  isHovered: boolean;
  glowColor: string;
  inset?: string;
  blurAmount?: string;
}

const BadgeGlow = ({ isHovered, glowColor, inset = '-20px', blurAmount = '20px' }: BadgeGlowProps) => (
  <MotionDiv
    className="absolute rounded-full"
    style={{
      inset,
      background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
      filter: `blur(${blurAmount})`,
    }}
    animate={{
      opacity: isHovered ? 0.6 : 0.3,
      scale: isHovered ? 1.15 : 1,
    }}
  />
);

interface ShineEffectProps {
  isHovered: boolean;
  opacity?: number;
}

const ShineEffect = ({ isHovered, opacity = 0.4 }: ShineEffectProps) => (
  <MotionDiv
    className="absolute pointer-events-none"
    style={{
      top: 0,
      left: '-50%',
      width: '50%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
      transform: 'skewX(-20deg)',
      zIndex: 3,
    }}
    animate={{
      x: isHovered ? ['0%', '200%'] : '0%',
      opacity: isHovered ? [0, opacity, 0] : 0,
    }}
    transition={{ duration: 0.8 }}
  />
);

// ============================================
// IMAGE BADGE
// ============================================

interface ImageBadgeProps {
  cert: Certification;
  isHovered: boolean;
  glowColor: string;
}

const ImageBadge = ({ cert, isHovered, glowColor }: ImageBadgeProps) => (
  <>
    <BadgeGlow isHovered={isHovered} glowColor={glowColor} />
    <img
      src={cert.badgeImage}
      alt={`${cert.title} Badge`}
      style={{
        width: '160px',
        height: '160px',
        objectFit: 'contain',
        borderRadius: '12px',
        position: 'relative',
        zIndex: 2,
        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
      }}
    />
    <ShineEffect isHovered={isHovered} />
  </>
);

// ============================================
// FALLBACK BADGE
// ============================================

interface FallbackBadgeProps {
  cert: Certification;
  isHovered: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
}

const FallbackBadge = ({ cert, isHovered, colors }: FallbackBadgeProps) => (
  <>
    {/* Outer glow ring */}
    <MotionDiv
      className="absolute rounded-full"
      style={{
        inset: '-10px',
        background: `radial-gradient(circle, ${colors.cyanGlow} 0%, transparent 60%)`,
        filter: 'blur(15px)',
      }}
      animate={{
        opacity: isHovered ? 0.8 : 0.4,
        scale: isHovered ? 1.1 : 1,
      }}
    />

    {/* Badge shape */}
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: '150px',
        height: '170px',
        background: `linear-gradient(180deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
        border: `2px solid ${colors.cyan}50`,
        borderRadius: '16px',
        gap: '8px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      {/* Inner gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '2px',
          borderRadius: '14px',
          background: `linear-gradient(180deg, transparent 0%, ${colors.cyanGlow}10 100%)`,
        }}
      />

      {/* Issuer Icon */}
      <div style={{ marginTop: '10px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill={colors.white}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>

      {/* Code */}
      <div
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: colors.cyan,
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {cert.code}
      </div>

      {/* Certified text */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: colors.textMuted,
          marginBottom: '10px',
        }}
      >
        CERTIFIED
      </div>

      {/* Decorative lines */}
      <div
        className="absolute"
        style={{
          top: '20px',
          left: '20px',
          right: '20px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '20px',
          left: '20px',
          right: '20px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
        }}
      />
    </div>

    {/* Shine effect */}
    <MotionDiv
      className="absolute pointer-events-none"
      style={{
        top: 0,
        left: '-100%',
        width: '60%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
        transform: 'skewX(-20deg)',
      }}
      animate={{
        x: isHovered ? ['0%', '200%'] : '0%',
        opacity: isHovered ? [0, 0.6, 0] : 0,
      }}
      transition={{ duration: 0.8 }}
    />
  </>
);

// ============================================
// MAIN COMPONENT
// ============================================

const CertificationBadge = ({ cert, isHovered }: CertificationBadgeProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="relative flex items-center justify-center"
      style={{
        width: '180px',
        height: '180px',
        perspective: '1000px',
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {cert.badgeImage ? (
        <ImageBadge cert={cert} isHovered={isHovered} glowColor={colors.cyanGlow} />
      ) : (
        <FallbackBadge cert={cert} isHovered={isHovered} colors={colors} />
      )}
    </MotionDiv>
  );
};

export default CertificationBadge;
