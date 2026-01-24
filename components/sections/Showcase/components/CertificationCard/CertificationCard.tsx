'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/theme/ThemeProvider';
import type { Certification } from '../../types';
import { VerifyIcon } from '../icons';
import CertificationBadge from './CertificationBadge';

interface CertificationCardProps {
  cert: Certification;
}

const CertificationCard = ({ cert }: CertificationCardProps) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.bgSecondary}95 0%, rgba(16, 185, 129, 0.05) 100%)`,
        border: `1px solid rgba(16, 185, 129, 0.4)`,
        borderRadius: '24px',
        padding: 'clamp(24px, 4vw, 40px)',
        marginBottom: '32px',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '150%',
          background: `radial-gradient(ellipse, rgba(16, 185, 129, 0.3) 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.05 : 1,
        }}
      />

      {/* Featured Ribbon */}
      <div
        className="absolute z-10"
        style={{
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: `linear-gradient(135deg, #10B981 0%, ${colors.cyan} 100%)`,
          borderRadius: '20px',
          boxShadow: `0 4px 16px rgba(16, 185, 129, 0.3)`,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: colors.bg,
            textTransform: 'uppercase',
          }}
        >
          🏅 VERIFIED CREDENTIAL
        </span>
      </div>

      <div
        className="flex flex-wrap"
        style={{ gap: 'clamp(24px, 4vw, 48px)', alignItems: 'flex-start' }}
      >
        {/* Left: Badge Visual */}
        <div
          className="flex flex-col items-center"
          style={{ gap: '16px', minWidth: '180px' }}
        >
          <CertificationBadge cert={cert} isHovered={isHovered} />

          {/* Score Display */}
          <motion.div
            style={{
              width: '100%',
              maxWidth: '180px',
              padding: '12px 16px',
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="flex justify-between items-center"
              style={{ marginBottom: '8px' }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#10B981',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {cert.score}%
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: colors.textMuted,
                }}
              >
                EXAM SCORE
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: '4px',
                background: colors.border,
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '6px',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, #10B981 0%, ${colors.cyan} 100%)`,
                  borderRadius: '2px',
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
              />
            </div>

            <span style={{ fontSize: '10px', color: colors.textMuted }}>
              Passing: {cert.passingScore}%
            </span>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="flex-1" style={{ minWidth: '280px' }}>
          <div
            className="flex flex-wrap items-center"
            style={{ gap: '16px', marginBottom: '12px' }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: colors.cyan,
                textTransform: 'uppercase',
                padding: '4px 10px',
                background: `rgba(0, 217, 255, 0.15)`,
                borderRadius: '10px',
              }}
            >
              {cert.category}
            </span>
            <span style={{ fontSize: '12px', color: colors.textMuted }}>
              📅 {cert.earnedDate}
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '10px',
              lineHeight: 1.2,
            }}
          >
            {cert.title}
          </h3>

          {/* Issuer */}
          <div
            className="flex items-center"
            style={{ gap: '8px', marginBottom: '12px' }}
          >
            <span style={{ fontSize: '20px' }}>{cert.issuerLogo}</span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: colors.textSecondary,
              }}
            >
              {cert.issuer}
            </span>
          </div>

          <p
            style={{
              fontSize: '14px',
              color: colors.textSecondary,
              lineHeight: 1.7,
              marginBottom: '16px',
            }}
          >
            {cert.description}
          </p>

          {/* Highlights */}
          <div
            className="flex flex-col"
            style={{ gap: '8px', marginBottom: '16px' }}
          >
            {cert.highlights?.map((highlight, idx) => (
              <motion.div
                key={idx}
                className="flex items-center"
                style={{
                  gap: '10px',
                  fontSize: '13px',
                  color: colors.textSecondary,
                }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <span style={{ color: '#10B981', fontWeight: 700 }}>✓</span>
                <span>{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <div
            className="flex flex-wrap"
            style={{ gap: '8px', marginBottom: '20px' }}
          >
            {cert.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: colors.white,
                  background: colors.bgSecondary,
                  border: `1px solid ${colors.border}`,
                  padding: '6px 12px',
                  borderRadius: '14px',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            className="flex flex-wrap items-center"
            style={{ gap: '20px' }}
          >
            {cert.verifyUrl && (
              <motion.a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                style={{
                  gap: '8px',
                  padding: '12px 24px',
                  background: colors.cyan,
                  color: colors.bg,
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 8px 30px ${colors.cyanGlow}`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <VerifyIcon />
                Verify Credential
              </motion.a>
            )}
            <span style={{ fontSize: '12px', color: colors.textMuted }}>
              Valid until {cert.validUntil}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          border: `1px solid rgba(16, 185, 129, 0.2)`,
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10px',
          left: '10px',
          width: '60px',
          height: '60px',
          border: `1px solid rgba(16, 185, 129, 0.15)`,
          borderRadius: '50%',
        }}
      />
    </motion.div>
  );
};

export default CertificationCard;
