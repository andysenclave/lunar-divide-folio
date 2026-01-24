'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useHoverState } from '../../hooks';
import type { DesignSnap } from '../../types';
import { DesignPreview, DesignInfo } from './components';

interface DesignSnapCardProps {
  design: DesignSnap;
  index: number;
}

const DesignSnapCard = ({ design, index }: DesignSnapCardProps) => {
  const { colors } = useTheme();
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  return (
    <MotionDiv
      className="overflow-hidden"
      style={{
        background: `${colors.bgSecondary}95`,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        transition: 'all 0.3s ease',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <DesignPreview title={design.title} isHovered={isHovered} />
      <DesignInfo title={design.title} description={design.description} />
    </MotionDiv>
  );
};

export default DesignSnapCard;
