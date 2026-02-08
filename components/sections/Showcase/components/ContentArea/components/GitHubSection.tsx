'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import GitHubCard from '../../GitHubCard';
import SubsectionTitle from './SubsectionTitle';
import { GitHubIcon } from '../../icons';
import type { GitHubProject } from '../../../types';

interface GitHubSectionProps {
  projects: GitHubProject[];
  showTitle: boolean;
  isVisible: boolean;
}

const GitHubSection = ({
  projects,
  showTitle,
  isVisible,
}: GitHubSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionDiv
          key="github"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginBottom: '64px' }}
        >
          {showTitle && (
            <SubsectionTitle icon={<GitHubIcon />}>Open Source</SubsectionTitle>
          )}

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {projects.map((project, idx) => (
              <GitHubCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default GitHubSection;
