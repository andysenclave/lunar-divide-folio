'use client';

import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FeaturedProject } from '../../types';
import { ProjectPreview, ProjectContent } from './components';

interface FeaturedProjectCardProps {
  project: FeaturedProject;
  index: number;
}

const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
  const { colors } = useTheme();
  const isEven = index % 2 === 0;
  const accentColor = project.type === 'engineering' ? colors.cyan : colors.orange;

  return (
    <MotionDiv
      style={{ marginBottom: '32px' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className="flex flex-wrap items-center"
        style={{
          gap: '40px',
          flexDirection: isEven ? 'row' : 'row-reverse',
        }}
      >
        <ProjectPreview project={project} />
        <ProjectContent project={project} accentColor={accentColor} />
      </div>
    </MotionDiv>
  );
};

export default FeaturedProjectCard;
