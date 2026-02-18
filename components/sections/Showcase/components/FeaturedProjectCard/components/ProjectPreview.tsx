'use client';

import Image from 'next/image';
import { MotionDiv } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FeaturedProject } from '../../../types';
import StatusBadge from './StatusBadge';

interface ProjectPreviewProps {
  project: FeaturedProject;
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const { colors } = useTheme();

  return (
    <MotionDiv
      className="relative overflow-hidden"
      style={{ flex: '1 1 400px', borderRadius: '16px' }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          aspectRatio: '16/10',
          background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          gap: '12px',
          overflow: 'hidden',
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <>
            <span style={{ fontSize: '48px', opacity: 0.3 }}>
              {project.type === 'engineering' ? '💻' : '🌍'}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: colors.textMuted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Preview
            </span>
          </>
        )}
      </div>

      {project.status && <StatusBadge status={project.status} />}
    </MotionDiv>
  );
};

export default ProjectPreview;
