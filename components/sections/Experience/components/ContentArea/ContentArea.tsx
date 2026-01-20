'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import { useExperience } from '../../context';
import { SKILL_CATEGORIES } from '../../data';
import ExperienceTimeline from '../ExperienceTimeline';
import SkillConstellation from '../SkillConstellation';
import ToolsGrid from '../ToolsGrid';

const ContentArea = () => {
  const { activeTab, activeSide } = useExperience();

  return (
    <section className="flex-1 overflow-y-auto max-w-300 w-full mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <MotionDiv
            key="experience"
            preset="slideUp"
            transition={{ duration: 0.4 }}
          >
            <ExperienceTimeline />
          </MotionDiv>
        )}

        {activeTab === 'expertise' && (
          <MotionDiv
            key={`expertise-${activeSide}`}
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
            preset="slideUp"
            transition={{ duration: 0.4 }}
          >
            {SKILL_CATEGORIES[activeSide].map((category) => (
              <SkillConstellation
                key={category.id}
                category={category}
                side={activeSide}
              />
            ))}
          </MotionDiv>
        )}

        {activeTab === 'tools' && (
          <MotionDiv
            key={`tools-${activeSide}`}
            preset="slideUp"
            transition={{ duration: 0.4 }}
          >
            <ToolsGrid />
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContentArea;
