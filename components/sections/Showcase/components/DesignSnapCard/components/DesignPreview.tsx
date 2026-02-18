'use client';

import Image from 'next/image';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import ImageOverlay from './ImageOverlay';

interface DesignPreviewProps {
  image: string;
  title: string;
  isHovered: boolean;
}

const DesignPreview = ({ image, title, isHovered }: DesignPreviewProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="relative cursor-pointer overflow-hidden"
      style={{ borderRadius: '8px' }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="relative"
        style={{
          aspectRatio: '16/10',
          background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <ImageOverlay isVisible={isHovered} />
    </MotionDiv>
  );
};

export default DesignPreview;
