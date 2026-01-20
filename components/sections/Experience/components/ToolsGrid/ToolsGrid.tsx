'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import { useExperience } from '../../context';
import { TOOLS } from '../../data';

const ToolsGrid = () => {
  const { colors } = useTheme();
  const { activeSide } = useExperience();

  const isEngineering = activeSide === 'engineering';
  const accentColor = isEngineering ? colors.cyan : colors.orange;
  const tools = TOOLS[activeSide];

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: colors.text }}
        >
          {isEngineering ? 'Development Tools' : 'Creative Gear'}
        </h3>
        <p
          className="text-sm"
          style={{ color: colors.textSecondary }}
        >
          {isEngineering
            ? 'The tools I use daily to ship quality software'
            : 'The gear behind my content creation journey'}
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid gap-3.5 max-w-[800px] mx-auto"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        }}
      >
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.name}
            className="flex flex-col items-center text-center p-4 rounded-xl cursor-default transition-all duration-300"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{
              scale: 1.1,
              background: colors.surfaceHover,
              borderColor: accentColor,
            }}
          >
            <span className="text-[28px] mb-2">{tool.icon}</span>
            <span
              className="text-xs font-semibold mb-1"
              style={{ color: colors.text }}
            >
              {tool.name}
            </span>
            <span
              className="text-[9px] tracking-wider uppercase"
              style={{ color: colors.textMuted }}
            >
              {tool.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
