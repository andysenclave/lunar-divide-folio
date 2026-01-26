'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { Experience } from '../../../types';

interface ModalHeroProps {
  exp: Experience;
}

const ModalHero = ({ exp }: ModalHeroProps) => {
  const { colors } = useTheme();
  const isEng = exp.type === 'engineering';
  const accent = isEng ? colors.cyan : colors.orange;
  const accentGlow = isEng ? colors.cyanGlow : colors.orangeGlow;

  const hasMedia = exp.hasVideo || exp.hasPhotos;

  return (
    <MotionDiv
      className="w-full rounded-2xl mb-8 relative overflow-hidden"
      style={{
        aspectRatio: '16 / 10',
        minHeight: '200px',
        maxHeight: '400px',
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isEng
            ? `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 50%, ${accentGlow} 100%)`
            : `linear-gradient(135deg, ${accentGlow} 0%, ${colors.bg} 50%, ${colors.bgSecondary} 100%)`,
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isEng
            ? `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                ${accent}15 20px,
                ${accent}15 21px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                ${accent}10 40px,
                ${accent}10 41px
              )`
            : `radial-gradient(circle at 20% 30%, ${accent}20 1px, transparent 1px),
               radial-gradient(circle at 80% 70%, ${accent}15 1px, transparent 1px),
               radial-gradient(circle at 50% 50%, ${accent}10 2px, transparent 2px)`,
          backgroundSize: isEng ? '100% 100%' : '60px 60px, 80px 80px, 100px 100px',
        }}
      />

      {/* Glow accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: isEng ? '20%' : '60%',
          left: isEng ? '70%' : '20%',
          width: '50%',
          height: '50%',
          background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Location name as stylized typography */}
        {exp.places && exp.places[0] && (
          <span
            className="font-heading uppercase tracking-widest mb-2"
            style={{
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: accent,
              opacity: 0.8,
            }}
          >
            {exp.places[0]}
          </span>
        )}

        {/* Icon with enhanced styling */}
        <span
          className="mb-4"
          style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            filter: `drop-shadow(0 0 20px ${accentGlow})`,
          }}
        >
          {exp.icon || (isEng ? '💻' : '🌍')}
        </span>

        {/* Experience type indicator */}
        <span
          className="uppercase tracking-[0.2em] font-semibold"
          style={{
            fontSize: '11px',
            color: colors.textMuted,
          }}
        >
          {isEng ? 'Engineering Experience' : 'Adventure Story'}
        </span>

        {/* Media indicator */}
        {hasMedia && (
          <MotionDiv
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
            }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {exp.hasVideo && (
              <span
                className="flex items-center gap-1"
                style={{ fontSize: '11px', color: colors.textSecondary }}
              >
                🎬 Video
              </span>
            )}
            {exp.hasVideo && exp.hasPhotos && (
              <span style={{ color: colors.border }}>•</span>
            )}
            {exp.hasPhotos && (
              <span
                className="flex items-center gap-1"
                style={{ fontSize: '11px', color: colors.textSecondary }}
              >
                📷 Photos
              </span>
            )}
            <span
              style={{
                fontSize: '10px',
                color: colors.textMuted,
                fontStyle: 'italic',
              }}
            >
              coming soon
            </span>
          </MotionDiv>
        )}
      </div>

      {/* Bottom fade for text contrast */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${colors.bg}60, transparent)`,
        }}
      />
    </MotionDiv>
  );
};

export default ModalHero;
