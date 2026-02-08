'use client';

import { MotionLink } from '@/components/motion';
import { useTheme } from '@/theme/ThemeProvider';
import { GitHubIcon, ExternalLinkIcon } from '../../icons';

interface ProjectLinksProps {
  github?: string;
  live?: string;
  accentColor: string;
}

const ProjectLinks = ({ github, live, accentColor }: ProjectLinksProps) => {
  const { colors } = useTheme();

  return (
    <div className="flex" style={{ gap: '20px' }}>
      {github && (
        <MotionLink
          href={github}
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
        </MotionLink>
      )}
      {live && (
        <MotionLink
          href={live}
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
        </MotionLink>
      )}
    </div>
  );
};

export default ProjectLinks;
