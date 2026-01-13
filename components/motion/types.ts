import { HTMLMotionProps } from 'framer-motion';
import { VariantPreset } from './variants';

// Extended props for motion components with presets
export interface MotionPresetProps {
  /** Animation preset to use */
  preset?: VariantPreset;
  /** Override reduced motion behavior (default: auto-detect) */
  reduceMotion?: boolean;
}

// Component-specific prop types
export type MotionDivProps = HTMLMotionProps<'div'> & MotionPresetProps;
export type MotionSectionProps = HTMLMotionProps<'section'> & MotionPresetProps;
export type MotionSpanProps = HTMLMotionProps<'span'> & MotionPresetProps;
export type MotionButtonProps = HTMLMotionProps<'button'> & MotionPresetProps;
export type MotionHeaderProps = HTMLMotionProps<'header'> & MotionPresetProps;
export type MotionLinkProps = HTMLMotionProps<'a'> & MotionPresetProps;
