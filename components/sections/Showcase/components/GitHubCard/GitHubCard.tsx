'use client';

import { MotionLink } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { GitHubProject } from '../../types';
import { CardHeader, LanguageBadge, CardTags } from './components';

interface GitHubCardProps {
  project: GitHubProject;
  index: number;
}

const GitHubCard = ({ project, index }: GitHubCardProps) => {
  const { colors } = useTheme();

  return (
    <MotionLink
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col"
      style={{
        background: `${colors.bgSecondary}95`,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        padding: '24px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -4,
        borderColor: colors.cyan,
        boxShadow: `0 10px 40px ${colors.cyanGlow}`,
      }}
    >
      {/* Header */}
      <CardHeader stars={project.stars} forks={project.forks} />

      {/* Content */}
      <h4
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: colors.white,
          marginBottom: '8px',
        }}
      >
        {project.title}
      </h4>
      <p
        className="flex-1"
        style={{
          fontSize: '13px',
          color: colors.textSecondary,
          lineHeight: 1.6,
          marginBottom: '16px',
        }}
      >
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <LanguageBadge language={project.language} />
        <CardTags tags={project.tags} />
      </div>
    </MotionLink>
  );
};

export default GitHubCard;
