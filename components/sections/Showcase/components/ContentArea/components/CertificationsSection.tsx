'use client';

import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion';
import CertificationCard from '../../CertificationCard';
import SubsectionTitle from './SubsectionTitle';
import type { Certification } from '../../../types';

interface CertificationsSectionProps {
  certifications: Certification[];
  showTitle: boolean;
  isVisible: boolean;
}

const CertificationsSection = ({
  certifications,
  showTitle,
  isVisible,
}: CertificationsSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionDiv
          key="certifications"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ marginBottom: '64px' }}
        >
          {showTitle && <SubsectionTitle icon="🏆">Certifications</SubsectionTitle>}

          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default CertificationsSection;
