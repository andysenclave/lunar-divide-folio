'use client';

import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv, MotionSpan } from '@/components/motion';

interface ExpandedDetailsProps {
  isExpanded: boolean;
  description: string;
  highlights: string[];
}

const ExpandedDetails = ({
  isExpanded,
  description,
  highlights,
}: ExpandedDetailsProps) => {
  const { colors } = useTheme();

  return (
    <AnimatePresence>
      {isExpanded && (
        <MotionDiv
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-3"
        >
          <p
            className="text-sm leading-relaxed mb-3.5"
            style={{ color: colors.textSecondary }}
          >
            {description}
          </p>

          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {highlights.map((highlight, i) => (
              <li key={i}>
                <MotionSpan
                  className="text-xs flex items-start gap-2 leading-relaxed"
                  style={{ color: colors.textSecondary }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: colors.cyan }}
                    aria-hidden="true"
                  >
                    {'\u2192'}
                  </span>
                  {highlight}
                </MotionSpan>
              </li>
            ))}
          </ul>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ExpandedDetails;
