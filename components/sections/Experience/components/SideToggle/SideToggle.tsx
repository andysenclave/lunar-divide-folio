'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv, MotionButton } from '@/components/motion';
import { useExperience } from '../../context';

const SideToggle = () => {
  const { colors } = useTheme();
  const { activeSide, setActiveSide } = useExperience();

  const isEngineering = activeSide === 'engineering';

  return (
    <MotionDiv
      className="flex justify-center items-center gap-4 mb-10"
      preset="slideUp"
      transition={{ delay: 0.2 }}
    >
      <MotionButton
        className="flex items-center gap-2 px-5 py-2.5 rounded-3xl text-xs font-medium tracking-wider cursor-pointer transition-all duration-300"
        style={{
          background: isEngineering ? colors.cyanGlow : 'transparent',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: isEngineering ? colors.cyan : colors.border,
          color: isEngineering ? colors.cyan : colors.textSecondary,
          fontFamily: 'var(--font-heading)',
        }}
        whileHover={{ borderColor: colors.cyan }}
        onClick={() => setActiveSide('engineering')}
      >
        <span className="text-sm">{'\u2699'}</span>
        Engineering
      </MotionButton>

      {/* Moon Divider */}
      <div className="flex items-center justify-center w-10 h-10">
        <span
          className="text-xl opacity-50"
          style={{ color: colors.textMuted }}
        >
          {'\u263D'}
        </span>
      </div>

      <MotionButton
        className="flex items-center gap-2 px-5 py-2.5 rounded-3xl text-xs font-medium tracking-wider cursor-pointer transition-all duration-300"
        style={{
          background: !isEngineering ? colors.orangeGlow : 'transparent',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: !isEngineering ? colors.orange : colors.border,
          color: !isEngineering ? colors.orange : colors.textSecondary,
          fontFamily: 'var(--font-heading)',
        }}
        whileHover={{ borderColor: colors.orange }}
        onClick={() => setActiveSide('adventure')}
      >
        <span className="text-sm">{'\uD83C\uDF0D'}</span>
        Adventure
      </MotionButton>
    </MotionDiv>
  );
};

export default SideToggle;
