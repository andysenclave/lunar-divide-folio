'use client';

import { EXPERIENCE_DATA } from './data';
import { TimelineProvider } from './context';
import { TimelineItem } from './components';

const ExperienceTimeline = () => {
  return (
    <TimelineProvider>
      <section className="max-w-200 mx-auto">
        <nav aria-label="Work experience timeline" className="flex flex-col gap-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={idx}
              isLast={idx === EXPERIENCE_DATA.length - 1}
            />
          ))}
        </nav>
      </section>
    </TimelineProvider>
  );
};

export default ExperienceTimeline;
