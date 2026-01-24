'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import DesignSnapCard from '../../DesignSnapCard';
import SubsectionTitle from './SubsectionTitle';
import type { DesignSnap } from '../../../types';

interface DesignsSectionProps {
  designs: DesignSnap[];
  showTitle: boolean;
  isVisible: boolean;
}

const DesignsSection = ({
  designs,
  showTitle,
  isVisible,
}: DesignsSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionDiv
          key="designs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginBottom: '64px' }}
        >
          {showTitle && <SubsectionTitle icon="🎨">Design Snaps</SubsectionTitle>}

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {designs.map((design, idx) => (
              <DesignSnapCard key={design.id} design={design} index={idx} />
            ))}
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default DesignsSection;
