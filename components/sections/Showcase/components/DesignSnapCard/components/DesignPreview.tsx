'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import ImageOverlay from './ImageOverlay';

interface DesignPreviewProps {
  title: string;
  isHovered: boolean;
}

const DesignPreview = ({ title, isHovered }: DesignPreviewProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="relative cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{
          aspectRatio: '16/10',
          background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '36px', opacity: 0.3 }}>🎨</span>
        <span
          style={{
            fontSize: '11px',
            color: colors.textMuted,
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          {title}
        </span>
      </div>

      <ImageOverlay isVisible={isHovered} />
    </MotionDiv>
  );
};

export default DesignPreview;
