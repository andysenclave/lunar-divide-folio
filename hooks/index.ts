// Re-export from context for backward compatibility
export { useAnimation, type ActiveSide } from '@/context';

// Legacy hook - use useAnimation from context instead
export { default as useActiveSide } from './useActiveSide';
