'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';

interface FullscreenViewerProps {
  src: string | null;
  alt: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;

const FullscreenViewer = ({ src, alt, onClose }: FullscreenViewerProps) => {
  const { colors } = useTheme();
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!src) return;

    resetView();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=')
        setScale((s) => Math.min(s + ZOOM_STEP, MAX_SCALE));
      if (e.key === '-') {
        setScale((s) => {
          const next = Math.max(s - ZOOM_STEP, MIN_SCALE);
          if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
          return next;
        });
      }
      if (e.key === '0') resetView();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [src, onClose, resetView]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((s) => {
      const next = Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE);
      if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (scale <= 1) return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [scale, translate],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setTranslate({
      x: translateStart.current.x + (e.clientX - dragStart.current.x),
      y: translateStart.current.y + (e.clientY - dragStart.current.y),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetView();
    } else {
      setScale(2);
    }
  }, [scale, resetView]);

  const zoomIn = () => setScale((s) => Math.min(s + ZOOM_STEP, MAX_SCALE));
  const zoomOut = () => {
    setScale((s) => {
      const next = Math.max(s - ZOOM_STEP, MIN_SCALE);
      if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
      return next;
    });
  };

  const zoomPercent = Math.round(scale * 100);

  return (
    <AnimatePresence>
      {src && (
        <MotionDiv
          className="fixed inset-0 z-1002 flex flex-col"
          style={{ background: 'rgba(0, 0, 0, 0.95)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 shrink-0"
            style={{
              height: '56px',
              borderBottom: `1px solid ${colors.border}40`,
            }}
          >
            {/* Zoom controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: colors.bgSecondary,
                  border: `1px solid ${colors.border}`,
                  color: scale <= MIN_SCALE ? colors.textMuted : colors.text,
                  fontSize: '18px',
                  opacity: scale <= MIN_SCALE ? 0.4 : 1,
                }}
                aria-label="Zoom out"
              >
                −
              </button>
              <span
                style={{
                  fontSize: '12px',
                  color: colors.textSecondary,
                  minWidth: '44px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {zoomPercent}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: colors.bgSecondary,
                  border: `1px solid ${colors.border}`,
                  color: scale >= MAX_SCALE ? colors.textMuted : colors.text,
                  fontSize: '18px',
                  opacity: scale >= MAX_SCALE ? 0.4 : 1,
                }}
                aria-label="Zoom in"
              >
                +
              </button>
              {scale > 1 && (
                <button
                  onClick={resetView}
                  className="px-2.5 py-1 rounded-md cursor-pointer"
                  style={{
                    background: colors.bgSecondary,
                    border: `1px solid ${colors.border}`,
                    color: colors.textSecondary,
                    fontSize: '11px',
                  }}
                >
                  Reset
                </button>
              )}
            </div>

            {/* Close */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgSecondary,
                color: colors.text,
                fontSize: '20px',
              }}
              onClick={onClose}
              aria-label="Close fullscreen"
            >
              ×
            </button>
          </div>

          {/* Image area */}
          <div
            className="flex-1 overflow-hidden relative"
            style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                // eslint-disable-next-line react-hooks/refs
                transition: isDragging.current ? 'none' : 'transform 0.2s ease',
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ pointerEvents: 'none' }}
                priority
                draggable={false}
              />
            </div>
          </div>

          {/* Hint */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              height: '36px',
              fontSize: '11px',
              color: colors.textMuted,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Scroll to zoom · Double-click to toggle · Drag to pan · Esc to close
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default FullscreenViewer;
