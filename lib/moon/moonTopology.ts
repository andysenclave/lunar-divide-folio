// Moon topology data for procedural texture generation
// Based on real lunar maria and crater positions

export interface Mare {
  lat: number;
  lon: number;
  radius: number;
  depth: number;
}

export interface Crater {
  lat: number;
  lon: number;
  radius: number;
  rim: number;
  peak: number;
  rays: boolean;
}

export const MOON_MARIA: Mare[] = [
  { lat: 8.5, lon: 31.4, radius: 18, depth: 0.18 },
  { lat: 28.0, lon: 17.5, radius: 14, depth: 0.15 },
  { lat: 32.8, lon: -15.6, radius: 22, depth: 0.2 },
  { lat: 17.0, lon: 59.1, radius: 11, depth: 0.16 },
  { lat: -7.8, lon: 51.3, radius: 16, depth: 0.14 },
  { lat: -15.2, lon: 35.5, radius: 10, depth: 0.15 },
  { lat: -21.3, lon: -16.6, radius: 15, depth: 0.12 },
  { lat: -24.4, lon: -38.6, radius: 12, depth: 0.14 },
  { lat: 56.0, lon: 1.4, radius: 20, depth: 0.1 },
  { lat: 18.4, lon: -57.4, radius: 32, depth: 0.18 },
  { lat: 13.3, lon: 3.6, radius: 6, depth: 0.11 },
  { lat: -10.0, lon: -23.1, radius: 8, depth: 0.13 },
  { lat: 27.3, lon: 147.9, radius: 14, depth: 0.14 },
  { lat: -19.4, lon: -92.8, radius: 16, depth: 0.22 },
  { lat: -38.9, lon: 93.0, radius: 13, depth: 0.09 },
  { lat: 13.3, lon: 86.1, radius: 9, depth: 0.1 },
  { lat: 1.3, lon: 87.5, radius: 11, depth: 0.11 },
  { lat: 7.5, lon: -30.9, radius: 7, depth: 0.12 },
];

export const MOON_CRATERS: Crater[] = [
  { lat: -43.3, lon: -11.2, radius: 4.3, rim: 0.09, peak: 0.045, rays: true },
  { lat: 9.6, lon: -20.1, radius: 4.7, rim: 0.08, peak: 0.04, rays: true },
  { lat: 8.1, lon: -38.0, radius: 1.6, rim: 0.055, peak: 0.025, rays: true },
  { lat: 23.7, lon: -47.4, radius: 2.0, rim: 0.065, peak: 0.03, rays: true },
  { lat: 51.6, lon: -9.3, radius: 5.1, rim: 0.045, peak: 0, rays: false },
  { lat: 50.2, lon: 17.4, radius: 4.4, rim: 0.055, peak: 0.025, rays: false },
  { lat: 44.3, lon: 16.3, radius: 3.4, rim: 0.05, peak: 0.02, rays: false },
  { lat: 29.7, lon: -4.0, radius: 4.1, rim: 0.035, peak: 0, rays: false },
  { lat: -11.4, lon: 26.4, radius: 5.0, rim: 0.065, peak: 0.035, rays: false },
  { lat: -13.2, lon: 24.0, radius: 4.9, rim: 0.055, peak: 0.025, rays: false },
  { lat: -18.1, lon: 23.4, radius: 5.0, rim: 0.045, peak: 0.02, rays: false },
  { lat: -8.9, lon: 61.1, radius: 6.6, rim: 0.075, peak: 0.04, rays: true },
  { lat: -25.3, lon: 60.4, radius: 8.8, rim: 0.065, peak: 0.035, rays: false },
  { lat: -5.2, lon: -68.6, radius: 8.6, rim: 0.035, peak: 0, rays: false },
  { lat: -58.4, lon: -14.4, radius: 11.5, rim: 0.055, peak: 0.015, rays: false },
  { lat: -9.2, lon: -1.8, radius: 7.6, rim: 0.035, peak: 0, rays: false },
  { lat: -13.4, lon: -2.8, radius: 5.9, rim: 0.045, peak: 0.02, rays: false },
  { lat: -18.2, lon: -1.9, radius: 4.8, rim: 0.055, peak: 0.03, rays: false },
  { lat: 14.5, lon: -11.3, radius: 2.9, rim: 0.065, peak: 0.03, rays: false },
  { lat: 16.1, lon: 46.8, radius: 1.4, rim: 0.065, peak: 0.025, rays: true },
  { lat: 63.5, lon: -63.0, radius: 6.5, rim: 0.065, peak: 0.035, rays: false },
  { lat: 73.4, lon: -10.1, radius: 2.6, rim: 0.065, peak: 0.03, rays: true },
  { lat: -21.2, lon: 128.9, radius: 9.5, rim: 0.075, peak: 0.04, rays: false },
  { lat: -4.4, lon: -157.4, radius: 11.0, rim: 0.065, peak: 0.03, rays: false },
  { lat: 2.6, lon: -128.7, radius: 14.0, rim: 0.055, peak: 0.025, rays: false },
  { lat: -36.1, lon: -151.8, radius: 13.5, rim: 0.045, peak: 0.02, rays: false },
  { lat: -20.2, lon: 149.2, radius: 11.5, rim: 0.05, peak: 0.025, rays: false },
  { lat: -70.6, lon: -5.8, radius: 5.7, rim: 0.075, peak: 0.04, rays: false },
  { lat: -89.9, lon: 0.0, radius: 1.1, rim: 0.055, peak: 0.025, rays: false },
  { lat: -44.4, lon: -55.1, radius: 11.0, rim: 0.045, peak: 0, rays: false },
  { lat: -50.5, lon: -6.3, radius: 8.8, rim: 0.045, peak: 0.02, rays: false },
  { lat: -49.6, lon: -21.8, radius: 7.4, rim: 0.05, peak: 0.025, rays: false },
  { lat: -11.2, lon: 4.1, radius: 6.8, rim: 0.05, peak: 0.025, rays: false },
  { lat: -5.5, lon: 4.8, radius: 7.5, rim: 0.03, peak: 0, rays: false },
  { lat: -25.5, lon: -2.0, radius: 5.9, rim: 0.045, peak: 0.02, rays: false },
  { lat: -28.0, lon: 3.3, radius: 3.5, rim: 0.055, peak: 0.025, rays: false },
  { lat: 26.7, lon: -13.1, radius: 1.7, rim: 0.05, peak: 0.025, rays: false },
  { lat: 25.8, lon: -21.0, radius: 1.5, rim: 0.045, peak: 0.02, rays: false },
  { lat: 23.3, lon: -29.2, radius: 1.4, rim: 0.045, peak: 0.02, rays: false },
  { lat: 11.9, lon: -50.8, radius: 2.1, rim: 0.04, peak: 0.015, rays: false },
  { lat: 7.0, lon: -54.9, radius: 1.5, rim: 0.045, peak: 0.02, rays: false },
  { lat: 2.2, lon: -67.6, radius: 5.8, rim: 0.035, peak: 0, rays: false },
  { lat: 52.6, lon: -43.4, radius: 2.0, rim: 0.055, peak: 0.025, rays: true },
  { lat: 61.8, lon: 50.3, radius: 1.6, rim: 0.055, peak: 0.025, rays: true },
  { lat: 27.7, lon: 55.5, radius: 6.5, rim: 0.05, peak: 0.025, rays: false },
  { lat: 34.5, lon: 56.7, radius: 4.3, rim: 0.055, peak: 0.025, rays: false },
  { lat: 39.2, lon: 59.9, radius: 6.3, rim: 0.04, peak: 0.015, rays: false },
  { lat: 46.7, lon: 44.4, radius: 4.4, rim: 0.055, peak: 0.025, rays: false },
  { lat: 46.7, lon: 39.1, radius: 3.5, rim: 0.05, peak: 0.02, rays: false },
  { lat: 53.6, lon: 56.5, radius: 6.2, rim: 0.045, peak: 0.015, rays: false },
  { lat: -45.0, lon: 40.0, radius: 9.5, rim: 0.04, peak: 0.015, rays: false },
  { lat: -42.9, lon: 42.0, radius: 3.9, rim: 0.055, peak: 0.025, rays: false },
  { lat: -32.5, lon: 54.2, radius: 3.7, rim: 0.06, peak: 0.03, rays: false },
  { lat: -36.3, lon: 60.4, radius: 6.3, rim: 0.04, peak: 0.015, rays: false },
  { lat: 21.3, lon: 46.0, radius: 3.2, rim: 0.055, peak: 0.025, rays: false },
  { lat: 14.6, lon: 54.7, radius: 1.1, rim: 0.045, peak: 0.02, rays: false },
  { lat: 18.3, lon: 53.5, radius: 0.9, rim: 0.04, peak: 0.015, rays: false },
  { lat: 30.7, lon: 1.5, radius: 1.9, rim: 0.045, peak: 0.02, rays: false },
  { lat: 27.6, lon: -34.3, radius: 0.9, rim: 0.04, peak: 0.015, rays: false },
  { lat: 29.9, lon: -34.6, radius: 1.2, rim: 0.045, peak: 0.02, rays: false },
];
