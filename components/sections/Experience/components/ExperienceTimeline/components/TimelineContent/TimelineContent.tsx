'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import type { WorkExperience } from '../../types';
import { useTimeline } from '../../context';
import { TechTags } from '../TechTags';
import { ExpandedDetails } from '../ExpandedDetails';

interface TimelineContentProps {
  experience: WorkExperience;
}

const TimelineContent = ({ experience }: TimelineContentProps) => {
  const { colors } = useTheme();
  const { expandedId, toggleExpanded } = useTimeline();
  const isExpanded = expandedId === experience.id;

  return (
    <MotionDiv
      className="flex-1 rounded-xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: colors.bgSecondary,
        border: `1px solid ${isExpanded ? colors.cyan : colors.border}`,
      }}
      whileHover={{ borderColor: colors.cyan, x: 4 }}
      onClick={() => toggleExpanded(experience.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpanded(experience.id);
        }
      }}
      aria-expanded={isExpanded}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-2.5">
        <time
          className="text-[11px] font-medium tracking-wider"
          style={{
            color: colors.textMuted,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {experience.period}
        </time>
        {experience.current && (
          <mark
            className="text-[9px] font-semibold tracking-widest px-2.5 py-1 rounded-lg"
            style={{
              color: colors.cyan,
              background: colors.cyanGlow,
              border: `1px solid ${colors.cyan}40`,
            }}
          >
            CURRENT
          </mark>
        )}
      </header>

      {/* Role & Company */}
      <h3
        className="text-base font-semibold mb-1 leading-snug"
        style={{ color: colors.text }}
      >
        {experience.role}
      </h3>
      <p className="text-sm mb-3" style={{ color: colors.cyan }}>
        {experience.company}{' '}
        <span style={{ color: colors.textMuted }}>
          &bull; {experience.location}
        </span>
      </p>

      {/* Expanded Content */}
      <ExpandedDetails
        isExpanded={isExpanded}
        description={experience.description}
        highlights={experience.highlights}
      />

      {/* Tech Tags */}
      <TechTags
        technologies={experience.technologies}
        isExpanded={isExpanded}
      />

      {/* Expand Hint */}
      <small
        className="text-[10px] tracking-wide opacity-70 block"
        style={{ color: colors.textMuted }}
      >
        {isExpanded ? '\u2190 Collapse' : 'Click to expand \u2192'}
      </small>
    </MotionDiv>
  );
};

export default TimelineContent;
