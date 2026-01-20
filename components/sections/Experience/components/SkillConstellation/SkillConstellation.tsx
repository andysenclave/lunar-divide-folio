'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { SkillCategory, SideType } from '../../types';

interface SkillConstellationProps {
  category: SkillCategory;
  side: SideType;
}

const SkillConstellation = ({ category, side }: SkillConstellationProps) => {
  const { colors } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const isEngineering = side === 'engineering';
  const accentColor = isEngineering ? colors.cyan : colors.orange;
  const glowColor = isEngineering ? colors.cyanGlow : colors.orangeGlow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Card Header */}
      <div className="flex items-start gap-3.5 mb-5">
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: glowColor }}
        >
          {category.icon}
        </span>
        <div>
          <h3
            className="text-base font-semibold mb-1"
            style={{ color: colors.text }}
          >
            {category.name}
          </h3>
          <p
            className="text-xs leading-snug"
            style={{ color: colors.textMuted }}
          >
            {category.description}
          </p>
        </div>
      </div>

      {/* Skills List */}
      <div className="flex flex-col gap-3.5">
        {category.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="flex items-center gap-3 cursor-default"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            initial={{ opacity: 0, x: isEngineering ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* Skill Info */}
            <div className="w-[90px] shrink-0 flex flex-col gap-0.5">
              <span
                className="text-xs font-medium"
                style={{ color: colors.text }}
              >
                {skill.name}
              </span>
              <span
                className="text-[9px] tracking-wider"
                style={{ color: colors.textMuted }}
              >
                {skill.years}y
              </span>
            </div>

            {/* Proficiency Bar */}
            <div
              className="flex-1 h-1 rounded relative overflow-visible"
              style={{ background: colors.border }}
            >
              <motion.div
                className="h-full rounded relative"
                style={{
                  background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
              />

              {/* Skill Node */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  right: `${100 - skill.level}%`,
                  marginRight: '-4px',
                  background: accentColor,
                  boxShadow:
                    hoveredSkill === skill.name
                      ? `0 0 20px ${accentColor}, 0 0 40px ${glowColor}`
                      : `0 0 10px ${glowColor}`,
                }}
                animate={{
                  scale: hoveredSkill === skill.name ? 1.3 : 1,
                }}
              />
            </div>

            {/* Percentage */}
            <span
              className="text-[10px] font-semibold w-[35px] text-right"
              style={{
                color: accentColor,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {skill.level}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Decorative Constellation SVG */}
      <svg
        className="absolute top-0 right-0 w-[100px] h-[60px] opacity-50 pointer-events-none"
      >
        <defs>
          <linearGradient id={`grad-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 10 20 Q 50 ${30 + Math.random() * 20} 90 40`}
          stroke={`url(#grad-${category.id})`}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

export default SkillConstellation;
