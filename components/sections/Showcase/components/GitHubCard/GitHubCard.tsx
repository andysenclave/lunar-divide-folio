'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { GitHubProject } from '../../types';
import { LANGUAGE_COLORS } from '../../data';
import { FolderIcon, StarIcon, ForkIcon } from '../icons';

interface GitHubCardProps {
  project: GitHubProject;
  index: number;
}

const GitHubCard = ({ project, index }: GitHubCardProps) => {
  const { colors } = useTheme();

  return (
    <motion.a
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
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: '16px' }}
      >
        <FolderIcon color={colors.cyan} />
        <div className="flex" style={{ gap: '12px' }}>
          <span
            className="flex items-center"
            style={{
              gap: '4px',
              fontSize: '11px',
              color: colors.textMuted,
            }}
          >
            <StarIcon /> {project.stars}
          </span>
          <span
            className="flex items-center"
            style={{
              gap: '4px',
              fontSize: '11px',
              color: colors.textMuted,
            }}
          >
            <ForkIcon /> {project.forks}
          </span>
        </div>
      </div>

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
        <span
          className="flex items-center"
          style={{
            gap: '6px',
            fontSize: '11px',
            color: colors.textSecondary,
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background:
                LANGUAGE_COLORS[project.language] || colors.cyan,
            }}
          />
          {project.language}
        </span>
        <div className="flex" style={{ gap: '6px' }}>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '9px',
                color: colors.textMuted,
                background: colors.border,
                padding: '3px 8px',
                borderRadius: '8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default GitHubCard;
