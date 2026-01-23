'use client';

import { useTheme } from '@/theme/ThemeProvider';
import { FooterNav, SocialLinks, Copyright, TechStack } from './components';

const Footer = () => {
  const { colors } = useTheme();

  return (
    <section className="pb-10">
      {/* Navigation */}
      <FooterNav />

      {/* Divider */}
      <div
        className="w-full h-px mb-8"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors.border} 50%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Bottom row */}
      <div className="flex justify-between items-center flex-wrap gap-5 mb-6">
        <Copyright />
        <SocialLinks />
      </div>

      {/* Tech stack */}
      <TechStack />
    </section>
  );
};

export default Footer;
