'use client';

import Image from 'next/image';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { cdn } from '@/config/cdn';
import ImageCarousel from './ImageCarousel';
import type { Experience } from '../../../types';

interface ModalHeroProps {
  exp: Experience;
}

const ModalHero = ({ exp }: ModalHeroProps) => {
  const { colors } = useTheme();
  const accent = colors.orange;
  const accentGlow = colors.orangeGlow;

  const hasMedia = exp.hasVideo || exp.hasPhotos;
  const images = exp.images ?? [];
  const hasImages = images.length > 0;
  const isCarousel = images.length > 1;

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
      {/* Image carousel, single image, or fallback gradient */}
      {isCarousel ? (
        <ImageCarousel images={images} alt={exp.title} />
      ) : hasImages ? (
        <Image
          src={cdn.journey(images[0])}
          alt={exp.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentGlow} 0%, ${colors.bg} 50%, ${colors.bgSecondary} 100%)`,
          }}
        />
      )}

      {/* Dark overlay for text contrast on images */}
      {hasImages && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${colors.bg}cc 0%, ${colors.bg}40 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Fallback pattern + icon (only when no image) */}
      {!hasImages && (
        <>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, ${accent}20 1px, transparent 1px),
                 radial-gradient(circle at 80% 70%, ${accent}15 1px, transparent 1px),
                 radial-gradient(circle at 50% 50%, ${accent}10 2px, transparent 2px)`,
              backgroundSize: '60px 60px, 80px 80px, 100px 100px',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: '60%',
              left: '20%',
              width: '50%',
              height: '50%',
              background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <span
              className="mb-4"
              style={{
                fontSize: 'clamp(48px, 8vw, 72px)',
                filter: `drop-shadow(0 0 20px ${accentGlow})`,
              }}
            >
              {exp.icon || '🌍'}
            </span>
            <span
              className="uppercase tracking-[0.2em] font-semibold"
              style={{ fontSize: '11px', color: colors.textMuted }}
            >
              Adventure Story
            </span>
          </div>
        </>
      )}

      {/* Bottom content overlay (on images) */}
      {hasImages && (
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          {/* Location badge */}
          {exp.places && exp.places[0] && (
            <span
              className="font-heading uppercase tracking-widest"
              style={{
                fontSize: '11px',
                color: colors.text,
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              📍 {exp.places[0]}
            </span>
          )}

          {/* Media indicator */}
          {hasMedia && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: `${colors.bgSecondary}cc`,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(8px)',
              }}
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
            </div>
          )}
        </div>
      )}

      {/* Fallback media indicator (no image) */}
      {!hasImages && hasMedia && (
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
    </MotionDiv>
  );
};

export default ModalHero;
