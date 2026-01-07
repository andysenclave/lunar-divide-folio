'use client';

import { MotionSection } from '@/components/motion';
import { ThemeMode } from '@/theme/theme';
import { MotionValue, useTransform } from 'framer-motion';
import React from 'react';

interface MoonSurfaceProps {
  lightX: MotionValue<number>;
  moonRotation: MotionValue<number>;
  mode: ThemeMode;
}

const MoonSurface = ({ lightX, moonRotation, mode }: MoonSurfaceProps) => {
  const moonColors =
    mode === 'dark'
      ? {
          highlight: '#E8E8E0',
          mid: '#A8A8A0',
          dark: '#484848',
          shadow: '#282828',
        }
      : {
          highlight: '#F5F5F0',
          mid: '#D0D0C8',
          dark: '#787878',
          shadow: '#484848',
        };
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        position: 'relative',
        boxShadow:
          mode === 'dark'
            ? '0 0 60px rgba(180, 190, 180, 0.15)'
            : '0 0 60px rgba(0, 0, 0, 0.1)',
      }}
    >
      <MotionSection
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: useTransform(
            lightX,
            (x) => `
                radial-gradient(circle at ${x}% 35%, 
                  ${moonColors.highlight} 0%, 
                  #D0D0C8 15%,
                  ${moonColors.mid} 35%, 
                  ${moonColors.dark} 55%,
                  ${moonColors.dark} 75%,
                  ${moonColors.shadow} 100%)
              `,
          ),
        }}
      />

      <MotionSection
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: useTransform(
            moonRotation,
            (r) => `
                linear-gradient(${90 + r}deg, 
                  transparent 0%, 
                  transparent 45%, 
                  rgba(0,0,0,0.3) 50%, 
                  rgba(0,0,0,0.6) 60%,
                  rgba(0,0,0,0.8) 100%)
              `,
          ),
        }}
      />

      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 300 300"
      >
        <ellipse cx="180" cy="200" rx="35" ry="32" fill="rgba(0,0,0,0.15)" />
        <ellipse cx="180" cy="200" rx="28" ry="25" fill="rgba(60,60,55,0.3)" />
        <ellipse cx="175" cy="195" rx="12" ry="10" fill="rgba(90,90,85,0.2)" />
        <ellipse cx="120" cy="100" rx="28" ry="26" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="120" cy="100" rx="22" ry="20" fill="rgba(70,70,65,0.25)" />
        <ellipse cx="90" cy="160" rx="50" ry="45" fill="rgba(40,45,40,0.2)" />
        <ellipse cx="220" cy="90" rx="18" ry="16" fill="rgba(0,0,0,0.1)" />
        <ellipse cx="200" cy="140" rx="35" ry="30" fill="rgba(50,55,50,0.15)" />
        {[
          [70, 80],
          [250, 180],
          [150, 60],
          [60, 220],
          [160, 240],
        ].map(([cx, cy], i) => (
          <React.Fragment key={i}>
            <ellipse cx={cx} cy={cy} r={12 - i} fill="rgba(0,0,0,0.1)" />
            <ellipse cx={cx} cy={cy} r={9 - i} fill="rgba(80,80,75,0.12)" />
          </React.Fragment>
        ))}
      </svg>

      <section
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow:
            'inset -30px -20px 60px rgba(0,0,0,0.5), inset 10px 10px 40px rgba(255,255,255,0.05)',
        }}
      />
    </section>
  );
};

export default MoonSurface;
