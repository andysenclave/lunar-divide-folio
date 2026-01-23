'use client';

import { MotionDiv } from '@/components/motion';
import { PrimaryCTA, SecondaryCTA } from './components';

const CTAButtons = () => {
  return (
    <MotionDiv
      className="flex flex-col items-center gap-5 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <PrimaryCTA />
      <SecondaryCTA />
    </MotionDiv>
  );
};

export default CTAButtons;
