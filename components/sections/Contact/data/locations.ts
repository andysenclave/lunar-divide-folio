// Target Locations Data
// ============================================

import type { TargetLocation } from '../types';

export const TARGET_LOCATIONS: TargetLocation[] = [
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    coords: { x: 85, y: 72 },
    timezone: 'GMT+11',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    coords: { x: 68, y: 52 },
    timezone: 'GMT+8',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    coords: { x: 82, y: 38 },
    timezone: 'GMT+9',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    coords: { x: 52, y: 45 },
    timezone: 'GMT+4',
  },
  {
    id: 'hongkong',
    name: 'Hong Kong',
    country: 'China',
    flag: '🇭🇰',
    coords: { x: 75, y: 43 },
    timezone: 'GMT+8',
  },
];

export const CURRENT_LOCATION = {
  name: 'Kolkata',
  status: 'Current Base',
  coords: { x: 58, y: 48 },
} as const;
