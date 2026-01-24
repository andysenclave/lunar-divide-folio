'use client';

import { useTheme } from '@/theme/ThemeProvider';
import type { FeaturedProject } from '../../../types';
import ProjectTags from './ProjectTags';
import ProjectLinks from './ProjectLinks';

interface ProjectContentProps {
  project: FeaturedProject;
  accentColor: string;
}

const ProjectContent = ({ project, accentColor }: ProjectContentProps) => {
  const { colors } = useTheme();

  return (
    <div style={{ flex: '1 1 400px' }}>
      {/* Subtitle */}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '8px',
          display: 'block',
          color: accentColor,
        }}
      >
        {project.subtitle}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 700,
          color: colors.white,
          marginBottom: '12px',
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: colors.textSecondary,
          lineHeight: 1.7,
          marginBottom: '20px',
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <ProjectTags tags={project.tags} />

      {/* Links */}
      <ProjectLinks
        github={project.links.github}
        live={project.links.live}
        accentColor={accentColor}
      />
    </div>
  );
};

export default ProjectContent;
