// Motion components
export { default as MotionButton } from './MotionButton';
export { default as MotionDiv } from './MotionDiv';
export { default as MotionHeader } from './MotionHeader';
export { default as MotionLink } from './MotionLink';
export { default as MotionSpan } from './MotionSpan';
export { default as MotionSection } from './MotionSection';

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
} from './types';
