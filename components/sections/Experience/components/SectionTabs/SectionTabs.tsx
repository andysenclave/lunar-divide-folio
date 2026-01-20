'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionButton } from '@/components/motion';
import { useExperience } from '../../context';
import type { TabType } from '../../types';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'experience', label: 'Experience', icon: '\u25C9' },
  { id: 'expertise', label: 'Skills', icon: '\u25C8' },
  { id: 'tools', label: 'Tools', icon: '\u25C6' },
];

const SectionTabs = () => {
  const { colors } = useTheme();
  const { activeTab, setActiveTab } = useExperience();

  return (
    <div className="flex justify-center gap-3 mb-8 flex-wrap">
      {TABS.map((tab) => (
        <MotionButton
          key={tab.id}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide cursor-pointer transition-all duration-300"
          style={{
            background: activeTab === tab.id ? colors.bgSecondary : 'transparent',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: activeTab === tab.id ? colors.cyan : colors.border,
            color: activeTab === tab.id ? colors.cyan : colors.textSecondary,
            fontFamily: 'var(--font-heading)',
          }}
          whileHover={{ borderColor: colors.cyan }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="text-sm opacity-70">{tab.icon}</span>
          {tab.label}
        </MotionButton>
      ))}
    </div>
  );
};

export default SectionTabs;
