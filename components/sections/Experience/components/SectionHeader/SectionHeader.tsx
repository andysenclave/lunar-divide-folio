'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionH2, MotionP } from '@/components/motion';
import { useExperience } from '../../context';
import SectionTabs from '../SectionTabs';
import SideToggle from '../SideToggle';

const SectionHeader = () => {
  const { colors } = useTheme();
  const { activeTab } = useExperience();

  return (
    <section className="text-center mb-6 shrink-0">
      <MotionH2
        className="font-bold tracking-tight mb-2"
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          color: colors.text,
          lineHeight: 1.1,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Expertise
      </MotionH2>
      <MotionP
        className="max-w-125 mx-auto leading-relaxed mb-6"
        style={{
          fontSize: 'clamp(13px, 1.8vw, 15px)',
          color: colors.textSecondary,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        A decade of building systems, leading teams, and exploring new
        frontiers.
      </MotionP>

      <SectionTabs />

      {(activeTab === 'expertise' || activeTab === 'tools') && <SideToggle />}
    </section>
  );
};

export default SectionHeader;
