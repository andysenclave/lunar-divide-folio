'use client';

import { useEffect } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import { AnimatePresence } from 'framer-motion';
import type { Experience } from '../../types';
import { ModalHero } from './components';

interface ExperienceModalProps {
  exp: Experience | null;
  onClose: () => void;
}

const ExperienceModal = ({ exp, onClose }: ExperienceModalProps) => {
  const { colors } = useTheme();

  // Handle escape key and body scroll
  useEffect(() => {
    if (!exp) return;

    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [exp, onClose]);

  if (!exp) return null;

  const isEng = exp.type === 'engineering';
  const accent = isEng ? colors.cyan : colors.orange;
  const accentGlow = isEng ? colors.cyanGlow : colors.orangeGlow;

  return (
    <AnimatePresence>
      {exp && (
        <MotionDiv
          className="fixed inset-0 z-1000"
          style={{
            background: `${colors.bg}f8`, // 97% opacity
            backdropFilter: 'blur(30px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="fixed top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-1001"
            style={{
              border: `1px solid ${colors.border}`,
              background: colors.bgSecondary,
              color: colors.text,
              fontSize: '24px',
            }}
            onClick={onClose}
          >
            ×
          </button>

          {/* Modal scroll container */}
          <div className="absolute inset-0 overflow-y-auto py-20 px-6">
            <MotionDiv
              className="max-w-[800px] mx-auto"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Badge */}
              <span
                className="inline-block px-3.5 py-1.5 rounded-[20px] text-[10px] font-semibold uppercase tracking-[0.12em] mb-4"
                style={{
                  background: accentGlow,
                  color: accent,
                }}
              >
                {exp.featured ? '⭐ Featured • ' : ''}
                {exp.type}
              </span>

              {/* Title */}
              <h1
                className="font-bold mb-2 leading-tight"
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  color: colors.text,
                }}
              >
                {exp.title}
              </h1>

              {/* Subtitle */}
              {exp.subtitle && (
                <p
                  className="mb-4"
                  style={{
                    fontSize: '16px',
                    color: accent,
                  }}
                >
                  {exp.subtitle}
                </p>
              )}

              {/* Meta */}
              <div
                className="flex flex-wrap gap-4 mb-8 pb-6"
                style={{
                  color: colors.textSecondary,
                  fontSize: '13px',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span>📅 {exp.date}</span>
                {exp.places && <span>📍 {exp.places[0]}</span>}
              </div>

              {/* Hero visual */}
              <ModalHero exp={exp} />

              {/* Body content */}
              <div
                className="mb-8"
                style={{
                  color: colors.textSecondary,
                  fontSize: '15px',
                  lineHeight: 1.8,
                }}
              >
                <p>
                  <strong>{exp.content.intro}</strong>
                </p>
                <div dangerouslySetInnerHTML={{ __html: exp.content.body }} />
              </div>

              {/* Fun fact */}
              {exp.funFact && (
                <div
                  className="flex items-start gap-3 rounded-xl p-4 my-6"
                  style={{
                    background: `linear-gradient(135deg, ${colors.goldGlow} 0%, ${colors.goldGlow}80 100%)`,
                    border: `1px solid ${colors.gold}33`,
                  }}
                >
                  <span className="text-xl">🎉</span>
                  <span
                    style={{
                      fontSize: '14px',
                      color: colors.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {exp.funFact}
                  </span>
                </div>
              )}

              {/* Places */}
              {exp.places && (
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {exp.places.map((place, i) => (
                    <span
                      key={i}
                      className="px-4 py-2.5 rounded-[20px]"
                      style={{
                        background: colors.bgSecondary,
                        border: `1px solid ${colors.border}`,
                        fontSize: '12px',
                        color: colors.textSecondary,
                      }}
                    >
                      📍 {place}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div
                className="flex flex-wrap gap-2 pt-5"
                style={{ borderTop: `1px solid ${colors.border}` }}
              >
                {exp.content.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-2 rounded-[20px]"
                    style={{
                      background: colors.bgSecondary,
                      border: `1px solid ${colors.border}`,
                      fontSize: '11px',
                      color: colors.textSecondary,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ExperienceModal;
