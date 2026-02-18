'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { DesignSnap } from '../../../types';
import FullscreenViewer from './FullscreenViewer';

interface DesignModalProps {
  design: DesignSnap | null;
  onClose: () => void;
}

const DesignModal = ({ design, onClose }: DesignModalProps) => {
  const { colors } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!design) return;

    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFullscreen) onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [design, onClose, isFullscreen]);

  useEffect(() => {
    if (!design) setIsFullscreen(false);
  }, [design]);

  if (!design) return null;

  return (
    <>
      <AnimatePresence>
        {design && (
          <MotionDiv
            className="fixed inset-0 z-1000"
            style={{
              background: `${colors.bg}f8`,
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
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Modal scroll container */}
            <div className="absolute inset-0 overflow-y-auto py-20 px-6">
              <MotionDiv
                className="max-w-200 mx-auto"
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
                    background: colors.cyanGlow,
                    color: colors.cyan,
                  }}
                >
                  🎨 Design Snap
                </span>

                {/* Title */}
                <h1
                  className="font-bold mb-2 leading-tight"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    color: colors.text,
                  }}
                >
                  {design.title}
                </h1>

                {/* Subtitle */}
                <p
                  className="mb-4"
                  style={{
                    fontSize: '16px',
                    color: colors.cyan,
                    lineHeight: 1.6,
                  }}
                >
                  {design.subtitle}
                </p>

                {/* Divider */}
                <div
                  className="mb-8 pb-6"
                  style={{ borderBottom: `1px solid ${colors.border}` }}
                />

                {/* Hero image — clickable for fullscreen */}
                <div
                  className="relative w-full rounded-xl overflow-hidden mb-8 group"
                  style={{
                    aspectRatio: '16/10',
                    background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
                    cursor: 'zoom-in',
                  }}
                  onClick={() => setIsFullscreen(true)}
                >
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 800px"
                    className="object-contain"
                    priority
                  />
                  {/* Hover hint */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <span
                      className="px-4 py-2 rounded-full"
                      style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: colors.text,
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      🔍 Click to view fullscreen
                    </span>
                  </div>
                </div>

                {/* Detail */}
                <div
                  className="mb-8"
                  style={{
                    color: colors.textSecondary,
                    fontSize: '15px',
                    lineHeight: 1.8,
                  }}
                >
                  <p>{design.detail}</p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <FullscreenViewer
        src={isFullscreen ? design.image : null}
        alt={design.title}
        onClose={() => setIsFullscreen(false)}
      />
    </>
  );
};

export default DesignModal;
