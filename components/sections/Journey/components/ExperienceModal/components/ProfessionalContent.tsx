'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { MotionDiv } from '@/components/motion';
import type { Experience, ProfessionalData, TechStackEntry } from '../../../types';

interface ProfessionalContentProps {
  exp: Experience;
}

// ============================================
// Section wrapper with optional title + divider
// ============================================
const SectionBlock = ({
  title,
  children,
  borderColor,
  accentColor,
  delay = 0,
}: {
  title?: string;
  children: React.ReactNode;
  borderColor: string;
  accentColor: string;
  delay?: number;
}) => (
  <MotionDiv
    className="pt-5"
    style={{ borderTop: `1px solid ${borderColor}` }}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {title && (
      <h3
        className="font-heading uppercase tracking-[0.15em] mb-4"
        style={{ fontSize: '11px', color: accentColor, fontWeight: 600 }}
      >
        {title}
      </h3>
    )}
    {children}
  </MotionDiv>
);

// ============================================
// Employment type formatter
// ============================================
const formatEmploymentType = (type: ProfessionalData['employmentType']) => {
  const map: Record<ProfessionalData['employmentType'], string> = {
    'full-time': 'Full-time',
    contract: 'Contract',
    'co-founder': 'Co-founder',
    freelance: 'Freelance',
  };
  return map[type];
};

// ============================================
// Main Component
// ============================================
const ProfessionalContent = ({ exp }: ProfessionalContentProps) => {
  const { colors } = useTheme();
  const pro = exp.professional!;
  const accent = colors.cyan;

  return (
    <div className="space-y-6">
      {/* --- Project Description --- */}
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{ color: colors.text, fontSize: '15px', lineHeight: 1.8 }}>
          {pro.projectDescription}
        </p>
      </MotionDiv>

      {/* --- Meta Row: Domain, Employment Type, Location --- */}
      <MotionDiv
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { label: 'Domain', value: pro.domain },
          { label: 'Type', value: formatEmploymentType(pro.employmentType) },
          { label: 'Location', value: pro.location },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-3 py-3 text-center"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
            }}
          >
            <span
              className="block uppercase tracking-[0.1em] mb-1"
              style={{ fontSize: '9px', color: colors.textMuted }}
            >
              {item.label}
            </span>
            <span
              className="block font-medium"
              style={{ fontSize: '12px', color: colors.textSecondary }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </MotionDiv>

      {/* --- Consulting Badge: Employer → Client --- */}
      {pro.client && pro.employer && (
        <MotionDiv
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: colors.cyanGlow,
            border: `1px solid ${accent}22`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ fontSize: '13px', color: colors.textSecondary }}>
            {pro.employer}
          </span>
          <span style={{ fontSize: '13px', color: accent }}>→</span>
          <span style={{ fontSize: '13px', color: colors.text, fontWeight: 600 }}>
            {pro.client}
          </span>
        </MotionDiv>
      )}

      {/* --- Team & Scope --- */}
      {(pro.team.directReports || pro.team.totalTeam || pro.team.programSize) && (
        <SectionBlock
          title="Team & Scope"
          borderColor={colors.border}
          accentColor={accent}
          delay={0.2}
        >
          <div className="flex flex-wrap gap-3 mb-3">
            {pro.team.directReports != null && (
              <MetricCard
                value={pro.team.directReports}
                label="Direct Reports"
                colors={colors}
                accent={accent}
              />
            )}
            {pro.team.totalTeam != null && (
              <MetricCard
                value={pro.team.totalTeam}
                label="Total Team"
                colors={colors}
                accent={accent}
              />
            )}
            {pro.team.programSize != null && (
              <MetricCard
                value={`~${pro.team.programSize}`}
                label="Program Size"
                colors={colors}
                accent={accent}
              />
            )}
          </div>
          {pro.team.structure && (
            <p style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.6 }}>
              {pro.team.structure}
            </p>
          )}
        </SectionBlock>
      )}

      {/* --- My Role --- */}
      <SectionBlock
        title="My Role"
        borderColor={colors.border}
        accentColor={accent}
        delay={0.25}
      >
        <p style={{ color: colors.textSecondary, fontSize: '14px', lineHeight: 1.7 }}>
          {pro.roleDescription}
        </p>
      </SectionBlock>

      {/* --- Key Responsibilities --- */}
      <SectionBlock
        title="Key Responsibilities"
        borderColor={colors.border}
        accentColor={accent}
        delay={0.3}
      >
        <ul className="space-y-2.5">
          {pro.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 shrink-0"
                style={{ fontSize: '10px', color: accent }}
              >
                ▸
              </span>
              <span style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* --- Achievements --- */}
      <SectionBlock
        title="Achievements"
        borderColor={colors.border}
        accentColor={accent}
        delay={0.35}
      >
        <ul className="space-y-2.5">
          {pro.achievements.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-1 shrink-0"
                style={{ fontSize: '11px', color: colors.verified }}
              >
                ✓
              </span>
              <span style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* --- Tech Stack --- */}
      <SectionBlock
        title="Tech Stack"
        borderColor={colors.border}
        accentColor={accent}
        delay={0.4}
      >
        <div className="space-y-3">
          {pro.techStack.map((group: TechStackEntry) => (
            <div key={group.category} className="flex items-start gap-3">
              <span
                className="shrink-0 font-mono pt-1.5"
                style={{
                  fontSize: '11px',
                  color: accent,
                  minWidth: '80px',
                }}
              >
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md font-mono"
                    style={{
                      fontSize: '11px',
                      background: colors.bgSecondary,
                      border: `1px solid ${colors.border}`,
                      color: colors.textSecondary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* --- Certifications (optional) --- */}
      {pro.certifications && pro.certifications.length > 0 && (
        <SectionBlock
          title="Certifications"
          borderColor={colors.border}
          accentColor={accent}
          delay={0.45}
        >
          <div className="space-y-2">
            {pro.certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                style={{
                  background: colors.verifiedGlow,
                  border: `1px solid ${colors.verified}22`,
                }}
              >
                <span style={{ fontSize: '14px' }}>🏅</span>
                <span style={{ fontSize: '13px', color: colors.text }}>
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}
    </div>
  );
};

// ============================================
// Metric Card helper
// ============================================
const MetricCard = ({
  value,
  label,
  colors,
  accent,
}: {
  value: number | string;
  label: string;
  colors: Record<string, string>;
  accent: string;
}) => (
  <div
    className="rounded-xl px-4 py-3 text-center min-w-[90px]"
    style={{
      background: colors.bgSecondary,
      border: `1px solid ${colors.border}`,
    }}
  >
    <span
      className="block font-bold"
      style={{ fontSize: '22px', color: accent }}
    >
      {value}
    </span>
    <span
      className="block uppercase tracking-[0.08em] mt-0.5"
      style={{ fontSize: '9px', color: colors.textMuted }}
    >
      {label}
    </span>
  </div>
);

export default ProfessionalContent;
