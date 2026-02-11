// Re-export opengraph-image for Twitter
export { default, alt, size, contentType } from './opengraph-image';

// Route segment config must be defined directly, not re-exported
export const runtime = 'edge';
