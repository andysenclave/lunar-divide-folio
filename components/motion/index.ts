// Motion components
export { default as MotionButton } from './MotionButton';
export { default as MotionDiv } from './MotionDiv';
export { default as MotionHeader } from './MotionHeader';
export { default as MotionLink } from './MotionLink';
export { default as MotionSpan } from './MotionSpan';
export { default as MotionSection } from './MotionSection';
export { default as MotionH1 } from './MotionH1';
export { default as MotionH2 } from './MotionH2';
export { default as MotionP } from './MotionP';

// Animation utilities
export { variants, reducedMotionVariants, transitions } from './variants';
export type { VariantPreset } from './variants';
export { useReducedMotion } from './useReducedMotion';

// Types
export type {
  MotionPresetProps,
  MotionDivProps,
  MotionSectionProps,
  MotionSpanProps,
  MotionButtonProps,
  MotionHeaderProps,
  MotionLinkProps,
  MotionH1Props,
  MotionH2Props,
  MotionPProps,
} from './types';
