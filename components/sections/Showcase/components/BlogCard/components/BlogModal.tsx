'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { BlogPost } from '../../../types';

interface BlogModalProps {
  blog: BlogPost | null;
  onClose: () => void;
}

const BlogModal = ({ blog, onClose }: BlogModalProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    if (!blog) return;

    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [blog, onClose]);

  if (!blog) return null;

  return (
    <AnimatePresence>
      {blog && (
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
                  background: colors.orangeGlow,
                  color: colors.orange,
                }}
              >
                ✍ Blog Post
              </span>

              {/* Title */}
              <h1
                className="font-bold mb-2 leading-tight"
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  color: colors.text,
                }}
              >
                {blog.title}
              </h1>

              {/* Subtitle & Date */}
              <p
                className="mb-1"
                style={{
                  fontSize: '16px',
                  color: colors.orange,
                  lineHeight: 1.6,
                }}
              >
                {blog.subtitle}
              </p>
              <p
                className="mb-4"
                style={{
                  fontSize: '13px',
                  color: colors.textMuted,
                }}
              >
                {blog.date}
              </p>

              {/* Divider */}
              <div
                className="mb-8 pb-6"
                style={{ borderBottom: `1px solid ${colors.border}` }}
              />

              {/* Image — non-zoomable */}
              <div
                className="relative w-full rounded-xl overflow-hidden mb-8"
                style={{
                  aspectRatio: '16/10',
                  background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
                }}
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Summary */}
              <div
                className="mb-8"
                style={{
                  color: colors.textSecondary,
                  fontSize: '15px',
                  lineHeight: 1.8,
                }}
              >
                <p>{blog.summary}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: colors.orangeGlow,
                      color: colors.orange,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read on Medium link */}
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
                style={{
                  background: colors.orange,
                  color: colors.bg,
                }}
              >
                Read on Medium
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </MotionDiv>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
