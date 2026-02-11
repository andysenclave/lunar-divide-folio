/**
 * CDN Configuration
 * Centralizes all blob storage URLs with environment-aware defaults
 */

const BLOB_BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL;

if (!BLOB_BASE_URL && typeof window !== 'undefined') {
  console.warn(
    '[CDN Config] NEXT_PUBLIC_BLOB_BASE_URL is not set. Assets may not load correctly.'
  );
}

/**
 * CDN path configuration with defaults
 */
export const CDN = {
  baseUrl: BLOB_BASE_URL ?? '',

  paths: {
    portraits: process.env.NEXT_PUBLIC_PORTRAITS_PATH ?? 'portraits',
    textures: process.env.NEXT_PUBLIC_TEXTURES_PATH ?? 'textures',
    badges: process.env.NEXT_PUBLIC_BADGES_PATH ?? 'badges',
    journey: process.env.NEXT_PUBLIC_JOURNEY_PATH ?? 'journey',
    showcase: process.env.NEXT_PUBLIC_SHOWCASE_PATH ?? 'showcase',
  },
} as const;

/**
 * Build a full CDN URL for an asset
 * @param path - Asset path relative to CDN base (e.g., 'portraits/engineering.png')
 * @returns Full CDN URL
 */
export function cdnUrl(path: string): string {
  if (!CDN.baseUrl) {
    // In development without CDN, return path as-is (for local fallback)
    return `/${path}`;
  }
  return `${CDN.baseUrl}/${path}`;
}

/**
 * Build CDN URLs for specific asset types
 */
export const cdn = {
  portrait: (filename: string) => cdnUrl(`${CDN.paths.portraits}/${filename}`),
  texture: (filename: string) => cdnUrl(`${CDN.paths.textures}/${filename}`),
  badge: (filename: string) => cdnUrl(`${CDN.paths.badges}/${filename}`),
  journey: (filename: string) => cdnUrl(`${CDN.paths.journey}/${filename}`),
  showcase: (filename: string) => cdnUrl(`${CDN.paths.showcase}/${filename}`),
} as const;
