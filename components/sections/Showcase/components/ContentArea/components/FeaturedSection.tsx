'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import FeaturedProjectCard from '../../FeaturedProjectCard';
import SubsectionTitle from './SubsectionTitle';
import type { FeaturedProject } from '../../../types';

interface FeaturedSectionProps {
  projects: FeaturedProject[];
  showTitle: boolean;
  isVisible: boolean;
}

const FeaturedSection = ({
  projects,
  showTitle,
  isVisible,
}: FeaturedSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionDiv
          key="featured"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginBottom: '64px' }}
        >
          {showTitle && <SubsectionTitle icon="⭐">Featured Projects</SubsectionTitle>}

          {projects.map((project, idx) => (
            <FeaturedProjectCard key={project.id} project={project} index={idx} />
          ))}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default FeaturedSection;
