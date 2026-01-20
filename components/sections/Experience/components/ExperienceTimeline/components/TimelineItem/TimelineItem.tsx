'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv, MotionButton } from '@/components/motion';
import type { WorkExperience } from '../../types';
import { TimelineContent } from '../TimelineContent';

interface TimelineItemProps {
  experience: WorkExperience;
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ experience, index, isLast }: TimelineItemProps) => {
  const { colors } = useTheme();

  return (
    <article>
      <MotionDiv
        className="flex gap-5"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <aside className="flex flex-col items-center w-5 shrink-0">
          <MotionButton
            className="w-3 h-3 rounded-full shrink-0 cursor-pointer transition-all duration-300"
            style={{
              background: experience.current ? colors.cyan : colors.border,
              boxShadow: experience.current
                ? `0 0 20px ${colors.cyanGlow}`
                : 'none',
            }}
            whileHover={{ scale: 1.3 }}
            aria-label={
              experience.current ? 'Current position' : 'Past position'
            }
          />
          {!isLast && (
            <div
              className="w-0.5 flex-1 mt-2"
              style={{
                background: `linear-gradient(180deg, ${colors.border} 0%, ${colors.border}50 100%)`,
              }}
              aria-hidden="true"
            />
          )}
        </aside>

        <TimelineContent experience={experience} />
      </MotionDiv>
    </article>
  );
};

export default TimelineItem;
