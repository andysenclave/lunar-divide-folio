'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { FeaturedProject } from '../../types';
import { GitHubIcon, ExternalLinkIcon } from '../icons';

interface FeaturedProjectCardProps {
  project: FeaturedProject;
  index: number;
}

const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
  const { colors } = useTheme();
  const isEven = index % 2 === 0;
  const accentColor = project.type === 'engineering' ? colors.cyan : colors.orange;

  return (
    <motion.div
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
        {/* Image/Preview */}
        <motion.div
          className="relative overflow-hidden"
          style={{ flex: '1 1 400px', borderRadius: '16px' }}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="flex flex-col items-center justify-center"
            style={{
              aspectRatio: '16/10',
              background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bg} 100%)`,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              gap: '12px',
            }}
          >
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
          </div>

          {/* Status Badge */}
          <span
            className="absolute"
            style={{
              top: '16px',
              right: '16px',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background:
                project.status === 'Active'
                  ? 'rgba(16, 185, 129, 0.3)'
                  : 'rgba(168, 85, 247, 0.15)',
              color: project.status === 'Active' ? '#10B981' : '#A855F7',
            }}
          >
            {project.status}
          </span>
        </motion.div>

        {/* Content */}
        <div style={{ flex: '1 1 400px' }}>
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
          <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '20px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: colors.cyan,
                  background: 'rgba(0, 217, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '14px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex" style={{ gap: '20px' }}>
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                style={{
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.textSecondary,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ color: colors.cyan, x: 2 }}
              >
                <GitHubIcon /> Code
              </motion.a>
            )}
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                style={{
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: accentColor,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ x: 2 }}
              >
                <ExternalLinkIcon /> Live →
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
