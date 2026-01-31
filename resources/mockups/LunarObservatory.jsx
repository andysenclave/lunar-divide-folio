'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

// ============================================
// LUNAR OBSERVATORY - 3D MOON VISUALIZATION
// Fully self-contained with procedural topology
// ============================================

// Moon crater and maria data - detailed topological features
const MOON_TOPOLOGY = {
  // Major Maria (dark basaltic plains) - coordinates in lat/lon, radius in degrees
  maria: [
    {
      name: 'Mare Tranquillitatis',
      lat: 8.5,
      lon: 31.4,
      radius: 18,
      depth: 0.15,
    },
    { name: 'Mare Serenitatis', lat: 28.0, lon: 17.5, radius: 14, depth: 0.12 },
    { name: 'Mare Imbrium', lat: 32.8, lon: -15.6, radius: 22, depth: 0.18 },
    { name: 'Mare Crisium', lat: 17.0, lon: 59.1, radius: 11, depth: 0.14 },
    {
      name: 'Mare Fecunditatis',
      lat: -7.8,
      lon: 51.3,
      radius: 16,
      depth: 0.11,
    },
    { name: 'Mare Nectaris', lat: -15.2, lon: 35.5, radius: 10, depth: 0.13 },
    { name: 'Mare Nubium', lat: -21.3, lon: -16.6, radius: 15, depth: 0.1 },
    { name: 'Mare Humorum', lat: -24.4, lon: -38.6, radius: 12, depth: 0.12 },
    { name: 'Mare Frigoris', lat: 56.0, lon: 1.4, radius: 20, depth: 0.08 },
    {
      name: 'Oceanus Procellarum',
      lat: 18.4,
      lon: -57.4,
      radius: 32,
      depth: 0.16,
    },
    { name: 'Mare Vaporum', lat: 13.3, lon: 3.6, radius: 6, depth: 0.09 },
    { name: 'Mare Cognitum', lat: -10.0, lon: -23.1, radius: 8, depth: 0.11 },
    { name: 'Mare Insularum', lat: 7.5, lon: -30.9, radius: 7, depth: 0.1 },
    { name: 'Mare Marginis', lat: 13.3, lon: 86.1, radius: 9, depth: 0.08 },
    { name: 'Mare Smythii', lat: 1.3, lon: 87.5, radius: 11, depth: 0.09 },
    { name: 'Mare Australe', lat: -38.9, lon: 93.0, radius: 13, depth: 0.07 },
    {
      name: 'Mare Moscoviense',
      lat: 27.3,
      lon: 147.9,
      radius: 14,
      depth: 0.12,
    },
    { name: 'Mare Orientale', lat: -19.4, lon: -92.8, radius: 16, depth: 0.2 },
  ],

  // Major impact craters - coordinates, radius, rim height, central peak
  craters: [
    // Near side prominent craters
    {
      name: 'Tycho',
      lat: -43.3,
      lon: -11.2,
      radius: 4.3,
      rimHeight: 0.08,
      peakHeight: 0.04,
      raySystem: true,
    },
    {
      name: 'Copernicus',
      lat: 9.6,
      lon: -20.1,
      radius: 4.7,
      rimHeight: 0.07,
      peakHeight: 0.035,
      raySystem: true,
    },
    {
      name: 'Kepler',
      lat: 8.1,
      lon: -38.0,
      radius: 1.6,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: true,
    },
    {
      name: 'Aristarchus',
      lat: 23.7,
      lon: -47.4,
      radius: 2.0,
      rimHeight: 0.06,
      peakHeight: 0.025,
      raySystem: true,
    },
    {
      name: 'Plato',
      lat: 51.6,
      lon: -9.3,
      radius: 5.1,
      rimHeight: 0.04,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Aristoteles',
      lat: 50.2,
      lon: 17.4,
      radius: 4.4,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Eudoxus',
      lat: 44.3,
      lon: 16.3,
      radius: 3.4,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Archimedes',
      lat: 29.7,
      lon: -4.0,
      radius: 4.1,
      rimHeight: 0.03,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Autolycus',
      lat: 30.7,
      lon: 1.5,
      radius: 1.9,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Theophilus',
      lat: -11.4,
      lon: 26.4,
      radius: 5.0,
      rimHeight: 0.06,
      peakHeight: 0.03,
      raySystem: false,
    },
    {
      name: 'Cyrillus',
      lat: -13.2,
      lon: 24.0,
      radius: 4.9,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Catharina',
      lat: -18.1,
      lon: 23.4,
      radius: 5.0,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Langrenus',
      lat: -8.9,
      lon: 61.1,
      radius: 6.6,
      rimHeight: 0.07,
      peakHeight: 0.035,
      raySystem: true,
    },
    {
      name: 'Petavius',
      lat: -25.3,
      lon: 60.4,
      radius: 8.8,
      rimHeight: 0.06,
      peakHeight: 0.03,
      raySystem: false,
    },
    {
      name: 'Grimaldi',
      lat: -5.2,
      lon: -68.6,
      radius: 8.6,
      rimHeight: 0.03,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Schickard',
      lat: -44.4,
      lon: -55.1,
      radius: 11.0,
      rimHeight: 0.04,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Clavius',
      lat: -58.4,
      lon: -14.4,
      radius: 11.5,
      rimHeight: 0.05,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Maginus',
      lat: -50.5,
      lon: -6.3,
      radius: 8.8,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Longomontanus',
      lat: -49.6,
      lon: -21.8,
      radius: 7.4,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Ptolemaeus',
      lat: -9.2,
      lon: -1.8,
      radius: 7.6,
      rimHeight: 0.03,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Alphonsus',
      lat: -13.4,
      lon: -2.8,
      radius: 5.9,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Arzachel',
      lat: -18.2,
      lon: -1.9,
      radius: 4.8,
      rimHeight: 0.05,
      peakHeight: 0.025,
      raySystem: false,
    },
    {
      name: 'Albategnius',
      lat: -11.2,
      lon: 4.1,
      radius: 6.8,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Hipparchus',
      lat: -5.5,
      lon: 4.8,
      radius: 7.5,
      rimHeight: 0.025,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Purbach',
      lat: -25.5,
      lon: -2.0,
      radius: 5.9,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Werner',
      lat: -28.0,
      lon: 3.3,
      radius: 3.5,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Eratosthenes',
      lat: 14.5,
      lon: -11.3,
      radius: 2.9,
      rimHeight: 0.06,
      peakHeight: 0.025,
      raySystem: false,
    },
    {
      name: 'Timocharis',
      lat: 26.7,
      lon: -13.1,
      radius: 1.7,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Lambert',
      lat: 25.8,
      lon: -21.0,
      radius: 1.5,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Pytheas',
      lat: 20.5,
      lon: -20.6,
      radius: 1.0,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Euler',
      lat: 23.3,
      lon: -29.2,
      radius: 1.4,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Marius',
      lat: 11.9,
      lon: -50.8,
      radius: 2.1,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Reiner',
      lat: 7.0,
      lon: -54.9,
      radius: 1.5,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Hevelius',
      lat: 2.2,
      lon: -67.6,
      radius: 5.8,
      rimHeight: 0.03,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Cavalerius',
      lat: 5.1,
      lon: -66.8,
      radius: 2.9,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Olbers',
      lat: 7.4,
      lon: -75.9,
      radius: 3.7,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Cardanus',
      lat: 13.2,
      lon: -72.5,
      radius: 2.5,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Kraft',
      lat: 16.6,
      lon: -72.6,
      radius: 2.6,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Seleucus',
      lat: 21.0,
      lon: -66.6,
      radius: 2.2,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Briggs',
      lat: 26.5,
      lon: -69.1,
      radius: 1.9,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Naumann',
      lat: 35.4,
      lon: -62.0,
      radius: 0.5,
      rimHeight: 0.025,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Lichtenberg',
      lat: 31.8,
      lon: -67.7,
      radius: 1.0,
      rimHeight: 0.03,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Wollaston',
      lat: 30.6,
      lon: -46.9,
      radius: 0.5,
      rimHeight: 0.025,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Delisle',
      lat: 29.9,
      lon: -34.6,
      radius: 1.2,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Diophantus',
      lat: 27.6,
      lon: -34.3,
      radius: 0.9,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },

    // Far side craters
    {
      name: 'Hertzsprung',
      lat: 2.6,
      lon: -128.7,
      radius: 14.0,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Korolev',
      lat: -4.4,
      lon: -157.4,
      radius: 11.0,
      rimHeight: 0.06,
      peakHeight: 0.025,
      raySystem: false,
    },
    {
      name: 'Apollo',
      lat: -36.1,
      lon: -151.8,
      radius: 13.5,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Gagarin',
      lat: -20.2,
      lon: 149.2,
      radius: 11.5,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Tsiolkovskiy',
      lat: -21.2,
      lon: 128.9,
      radius: 9.5,
      rimHeight: 0.07,
      peakHeight: 0.035,
      raySystem: false,
    },
    {
      name: 'Mendeleev',
      lat: 5.7,
      lon: 140.9,
      radius: 8.0,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Fermi',
      lat: -19.3,
      lon: 122.6,
      radius: 6.8,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Hilbert',
      lat: -18.0,
      lon: 108.2,
      radius: 4.8,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Pasteur',
      lat: -11.9,
      lon: 104.6,
      radius: 5.5,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Sklodowska',
      lat: -18.2,
      lon: 95.5,
      radius: 3.2,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Curie',
      lat: -22.9,
      lon: 91.0,
      radius: 4.0,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Janssen',
      lat: -45.0,
      lon: 40.0,
      radius: 9.5,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Fabricius',
      lat: -42.9,
      lon: 42.0,
      radius: 3.9,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Metius',
      lat: -40.3,
      lon: 43.3,
      radius: 4.4,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Rheita',
      lat: -37.1,
      lon: 47.2,
      radius: 3.5,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Stevinus',
      lat: -32.5,
      lon: 54.2,
      radius: 3.7,
      rimHeight: 0.055,
      peakHeight: 0.025,
      raySystem: false,
    },
    {
      name: 'Snellius',
      lat: -29.3,
      lon: 55.7,
      radius: 4.2,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Furnerius',
      lat: -36.3,
      lon: 60.4,
      radius: 6.3,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },

    // Additional medium craters for detail
    {
      name: 'Proclus',
      lat: 16.1,
      lon: 46.8,
      radius: 1.4,
      rimHeight: 0.06,
      peakHeight: 0.02,
      raySystem: true,
    },
    {
      name: 'Picard',
      lat: 14.6,
      lon: 54.7,
      radius: 1.1,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Peirce',
      lat: 18.3,
      lon: 53.5,
      radius: 0.9,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Macrobius',
      lat: 21.3,
      lon: 46.0,
      radius: 3.2,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Cleomedes',
      lat: 27.7,
      lon: 55.5,
      radius: 6.5,
      rimHeight: 0.045,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Geminus',
      lat: 34.5,
      lon: 56.7,
      radius: 4.3,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Messala',
      lat: 39.2,
      lon: 59.9,
      radius: 6.3,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Burckhardt',
      lat: 31.1,
      lon: 56.5,
      radius: 2.8,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Cepheus',
      lat: 40.8,
      lon: 45.8,
      radius: 2.0,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Franklin',
      lat: 38.8,
      lon: 47.7,
      radius: 2.8,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Atlas',
      lat: 46.7,
      lon: 44.4,
      radius: 4.4,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Hercules',
      lat: 46.7,
      lon: 39.1,
      radius: 3.5,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Endymion',
      lat: 53.6,
      lon: 56.5,
      radius: 6.2,
      rimHeight: 0.04,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'De La Rue',
      lat: 59.1,
      lon: 52.3,
      radius: 6.8,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Thales',
      lat: 61.8,
      lon: 50.3,
      radius: 1.6,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: true,
    },
    {
      name: 'Strabo',
      lat: 61.9,
      lon: 54.3,
      radius: 2.7,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Democritus',
      lat: 62.3,
      lon: 35.0,
      radius: 2.0,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Gartner',
      lat: 59.1,
      lon: 34.6,
      radius: 5.3,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Schwabe',
      lat: 65.1,
      lon: 45.6,
      radius: 1.3,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Barrow',
      lat: 71.3,
      lon: 7.7,
      radius: 4.6,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Goldschmidt',
      lat: 73.2,
      lon: 3.8,
      radius: 5.8,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Anaxagoras',
      lat: 73.4,
      lon: -10.1,
      radius: 2.6,
      rimHeight: 0.06,
      peakHeight: 0.025,
      raySystem: true,
    },
    {
      name: 'Philolaus',
      lat: 72.1,
      lon: -32.4,
      radius: 3.6,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Anaximenes',
      lat: 72.5,
      lon: -44.5,
      radius: 4.4,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Carpenter',
      lat: 69.4,
      lon: -50.9,
      radius: 3.0,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Pythagoras',
      lat: 63.5,
      lon: -63.0,
      radius: 6.5,
      rimHeight: 0.06,
      peakHeight: 0.03,
      raySystem: false,
    },
    {
      name: 'Babbage',
      lat: 59.7,
      lon: -57.1,
      radius: 4.7,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'South',
      lat: 58.0,
      lon: -50.8,
      radius: 5.4,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Robinson',
      lat: 59.0,
      lon: -45.9,
      radius: 1.2,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Harpalus',
      lat: 52.6,
      lon: -43.4,
      radius: 2.0,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: true,
    },
    {
      name: 'Foucault',
      lat: 50.4,
      lon: -39.7,
      radius: 1.2,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Birmingham',
      lat: 65.1,
      lon: -10.5,
      radius: 4.6,
      rimHeight: 0.035,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Epigenes',
      lat: 67.5,
      lon: -4.6,
      radius: 2.8,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'W. Bond',
      lat: 65.4,
      lon: 4.5,
      radius: 7.8,
      rimHeight: 0.03,
      peakHeight: 0,
      raySystem: false,
    },
    {
      name: 'Timaeus',
      lat: 62.8,
      lon: -0.5,
      radius: 1.6,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },

    // South polar region
    {
      name: 'Moretus',
      lat: -70.6,
      lon: -5.8,
      radius: 5.7,
      rimHeight: 0.07,
      peakHeight: 0.035,
      raySystem: false,
    },
    {
      name: 'Short',
      lat: -74.6,
      lon: -7.3,
      radius: 2.4,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Newton',
      lat: -76.7,
      lon: -16.9,
      radius: 3.9,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Cabeus',
      lat: -84.9,
      lon: -35.5,
      radius: 4.9,
      rimHeight: 0.04,
      peakHeight: 0.01,
      raySystem: false,
    },
    {
      name: 'Malapert',
      lat: -84.9,
      lon: -12.9,
      radius: 2.1,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
    {
      name: 'Shoemaker',
      lat: -88.1,
      lon: 44.9,
      radius: 2.6,
      rimHeight: 0.04,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Faustini',
      lat: -87.3,
      lon: 77.0,
      radius: 2.0,
      rimHeight: 0.045,
      peakHeight: 0.015,
      raySystem: false,
    },
    {
      name: 'Shackleton',
      lat: -89.9,
      lon: 0.0,
      radius: 1.1,
      rimHeight: 0.05,
      peakHeight: 0.02,
      raySystem: false,
    },
  ],

  // Mountain ranges
  mountains: [
    {
      name: 'Montes Apenninus',
      latStart: 18.9,
      lonStart: -3.7,
      latEnd: 29.0,
      lonEnd: 0.0,
      height: 0.06,
      width: 3,
    },
    {
      name: 'Montes Caucasus',
      latStart: 33.0,
      lonStart: 8.0,
      latEnd: 40.0,
      lonEnd: 12.0,
      height: 0.05,
      width: 2.5,
    },
    {
      name: 'Montes Alpes',
      latStart: 44.0,
      lonStart: -3.0,
      latEnd: 50.0,
      lonEnd: 3.0,
      height: 0.045,
      width: 3,
    },
    {
      name: 'Montes Jura',
      latStart: 44.0,
      lonStart: -37.0,
      latEnd: 50.0,
      lonEnd: -32.0,
      height: 0.04,
      width: 2,
    },
    {
      name: 'Montes Carpatus',
      latStart: 14.0,
      lonStart: -24.0,
      latEnd: 16.0,
      lonEnd: -15.0,
      height: 0.035,
      width: 2,
    },
    {
      name: 'Montes Taurus',
      latStart: 25.0,
      lonStart: 35.0,
      latEnd: 30.0,
      lonEnd: 42.0,
      height: 0.04,
      width: 3,
    },
    {
      name: 'Montes Haemus',
      latStart: 17.0,
      lonStart: 8.0,
      latEnd: 22.0,
      lonEnd: 17.0,
      height: 0.03,
      width: 2,
    },
    {
      name: 'Montes Pyrenaeus',
      latStart: -12.0,
      lonStart: 40.0,
      latEnd: -17.0,
      lonEnd: 43.0,
      height: 0.035,
      width: 1.5,
    },
    {
      name: 'Montes Cordillera',
      latStart: -15.0,
      lonStart: -85.0,
      latEnd: -25.0,
      lonEnd: -100.0,
      height: 0.07,
      width: 4,
    },
    {
      name: 'Montes Rook',
      latStart: -17.0,
      lonStart: -88.0,
      latEnd: -22.0,
      lonEnd: -97.0,
      height: 0.06,
      width: 3,
    },
  ],

  // Rilles (valleys)
  rilles: [
    {
      name: 'Vallis Schröteri',
      lat: 26.0,
      lon: -51.0,
      length: 8,
      width: 0.5,
      depth: 0.02,
    },
    {
      name: 'Rima Ariadaeus',
      lat: 7.0,
      lon: 13.0,
      length: 12,
      width: 0.3,
      depth: 0.015,
    },
    {
      name: 'Rima Hyginus',
      lat: 8.0,
      lon: 7.0,
      length: 10,
      width: 0.4,
      depth: 0.018,
    },
    {
      name: 'Vallis Alpes',
      lat: 49.0,
      lon: 3.0,
      length: 7,
      width: 1.0,
      depth: 0.025,
    },
    {
      name: 'Hadley Rille',
      lat: 25.0,
      lon: 3.0,
      length: 5,
      width: 0.4,
      depth: 0.02,
    },
  ],
};

// Simplex noise implementation for procedural detail
class SimplexNoise {
  constructor(seed = 1) {
    this.p = new Uint8Array(512);
    this.perm = new Uint8Array(512);

    const random = this.seededRandom(seed);
    for (let i = 0; i < 256; i++) {
      this.p[i] = i;
    }
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  seededRandom(seed) {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  grad3 = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1],
  ];

  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise3D(x, y, z) {
    const F3 = 1 / 3;
    const G3 = 1 / 6;

    let s = (x + y + z) * F3;
    let i = Math.floor(x + s);
    let j = Math.floor(y + s);
    let k = Math.floor(z + s);

    let t = (i + j + k) * G3;
    let X0 = i - t;
    let Y0 = j - t;
    let Z0 = k - t;
    let x0 = x - X0;
    let y0 = y - Y0;
    let z0 = z - Z0;

    let i1, j1, k1;
    let i2, j2, k2;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    }

    let x1 = x0 - i1 + G3;
    let y1 = y0 - j1 + G3;
    let z1 = z0 - k1 + G3;
    let x2 = x0 - i2 + 2 * G3;
    let y2 = y0 - j2 + 2 * G3;
    let z2 = z0 - k2 + 2 * G3;
    let x3 = x0 - 1 + 3 * G3;
    let y3 = y0 - 1 + 3 * G3;
    let z3 = z0 - 1 + 3 * G3;

    let ii = i & 255;
    let jj = j & 255;
    let kk = k & 255;

    let gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    let gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    let gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    let gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

    let n0, n1, n2, n3;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
  }

  // Fractal Brownian Motion for multi-scale detail
  fbm(x, y, z, octaves = 6, lacunarity = 2, gain = 0.5) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total +=
        this.noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }
}

// Generate moon height map based on topology data
function generateMoonHeightMap(width, height, topology) {
  const heightMap = new Float32Array(width * height);
  const noise = new SimplexNoise(42);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;

      // Convert to lat/lon
      const lon = (u - 0.5) * 360;
      const lat = (0.5 - v) * 180;

      // Convert to spherical coordinates for 3D noise
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;
      const nx = Math.cos(latRad) * Math.cos(lonRad);
      const ny = Math.cos(latRad) * Math.sin(lonRad);
      const nz = Math.sin(latRad);

      let elevation = 0;

      // Base terrain with multi-scale noise
      elevation += noise.fbm(nx * 2, ny * 2, nz * 2, 8, 2.1, 0.48) * 0.03;

      // Apply maria (dark lowlands)
      for (const mare of topology.maria) {
        const dist = getAngularDistance(lat, lon, mare.lat, mare.lon);
        if (dist < mare.radius * 1.5) {
          const factor = smoothstep(mare.radius * 1.5, mare.radius * 0.3, dist);
          elevation -= mare.depth * factor;
        }
      }

      // Apply craters
      for (const crater of topology.craters) {
        const dist = getAngularDistance(lat, lon, crater.lat, crater.lon);
        const craterRadius = crater.radius;

        if (dist < craterRadius * 2.5) {
          // Crater floor depression
          const floorFactor = smoothstep(craterRadius * 0.9, 0, dist);
          elevation -= crater.rimHeight * 0.8 * floorFactor;

          // Crater rim
          const rimDist = Math.abs(dist - craterRadius);
          const rimFactor = Math.exp(
            (-rimDist * rimDist) / (craterRadius * 0.15),
          );
          elevation += crater.rimHeight * rimFactor;

          // Central peak
          if (crater.peakHeight > 0 && dist < craterRadius * 0.3) {
            const peakFactor = smoothstep(craterRadius * 0.3, 0, dist);
            elevation += crater.peakHeight * peakFactor * peakFactor;
          }

          // Ray system (ejecta)
          if (
            crater.raySystem &&
            dist < craterRadius * 2.5 &&
            dist > craterRadius
          ) {
            const rayNoise = noise.noise3D(nx * 20, ny * 20, nz * 20);
            const rayFactor = smoothstep(
              craterRadius * 2.5,
              craterRadius,
              dist,
            );
            elevation += 0.005 * rayFactor * Math.max(0, rayNoise);
          }
        }
      }

      // Apply mountain ranges
      for (const mountain of topology.mountains) {
        const distToLine = pointToLineDistance(
          lat,
          lon,
          mountain.latStart,
          mountain.lonStart,
          mountain.latEnd,
          mountain.lonEnd,
        );

        if (distToLine < mountain.width * 2) {
          const factor = smoothstep(mountain.width * 2, 0, distToLine);
          const variation =
            noise.noise3D(nx * 10, ny * 10, nz * 10) * 0.3 + 0.7;
          elevation += mountain.height * factor * variation;
        }
      }

      // Apply rilles (valleys)
      for (const rille of topology.rilles) {
        const dist = getAngularDistance(lat, lon, rille.lat, rille.lon);
        if (dist < rille.length) {
          const widthFactor = smoothstep(
            rille.width,
            0,
            Math.abs(dist - rille.length * 0.5),
          );
          elevation -= rille.depth * widthFactor;
        }
      }

      // Add fine-scale crater detail
      const microCraterNoise = noise.fbm(
        nx * 50,
        ny * 50,
        nz * 50,
        4,
        2.0,
        0.5,
      );
      if (microCraterNoise > 0.3) {
        elevation -= (microCraterNoise - 0.3) * 0.015;
      }

      // Store height
      heightMap[y * width + x] = elevation;
    }
  }

  return heightMap;
}

// Generate moon color map based on topology
function generateMoonColorMap(width, height, heightMap, topology) {
  const colorMap = new Uint8ClampedArray(width * height * 4);
  const noise = new SimplexNoise(123);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const v = y / height;
      const lon = (u - 0.5) * 360;
      const lat = (0.5 - v) * 180;

      const idx = (y * width + x) * 4;
      const elevation = heightMap[y * width + x];

      // Convert to spherical for noise
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;
      const nx = Math.cos(latRad) * Math.cos(lonRad);
      const ny = Math.cos(latRad) * Math.sin(lonRad);
      const nz = Math.sin(latRad);

      // Base highland color (lighter gray)
      let r = 140,
        g = 138,
        b = 135;

      // Check if in maria (darker)
      let inMare = false;
      for (const mare of topology.maria) {
        const dist = getAngularDistance(lat, lon, mare.lat, mare.lon);
        if (dist < mare.radius) {
          inMare = true;
          const factor = smoothstep(mare.radius, mare.radius * 0.3, dist);
          // Maria are darker basalt
          r = lerp(r, 70, factor);
          g = lerp(g, 68, factor);
          b = lerp(b, 72, factor);
        }
      }

      // Add variation based on noise
      const colorNoise = noise.fbm(nx * 8, ny * 8, nz * 8, 4, 2.0, 0.5) * 20;
      r += colorNoise;
      g += colorNoise;
      b += colorNoise;

      // Elevation-based shading
      const elevationShade = elevation * 200;
      r += elevationShade;
      g += elevationShade;
      b += elevationShade;

      // Ray systems (bright ejecta)
      for (const crater of topology.craters) {
        if (crater.raySystem) {
          const dist = getAngularDistance(lat, lon, crater.lat, crater.lon);
          if (dist > crater.radius && dist < crater.radius * 3) {
            const rayNoise = noise.noise3D(nx * 30, ny * 30, nz * 30);
            if (rayNoise > 0.2) {
              const rayFactor =
                smoothstep(crater.radius * 3, crater.radius, dist) *
                (rayNoise - 0.2);
              r = lerp(r, 180, rayFactor * 0.5);
              g = lerp(g, 178, rayFactor * 0.5);
              b = lerp(b, 175, rayFactor * 0.5);
            }
          }
        }
      }

      // Fine grain texture
      const grain = noise.noise3D(nx * 100, ny * 100, nz * 100) * 8;
      r += grain;
      g += grain;
      b += grain;

      colorMap[idx] = Math.max(0, Math.min(255, r));
      colorMap[idx + 1] = Math.max(0, Math.min(255, g));
      colorMap[idx + 2] = Math.max(0, Math.min(255, b));
      colorMap[idx + 3] = 255;
    }
  }

  return colorMap;
}

// Generate normal map from height map
function generateNormalMap(width, height, heightMap) {
  const normalMap = new Uint8ClampedArray(width * height * 4);
  const strength = 3.0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Sample neighboring heights
      const x0 = (x - 1 + width) % width;
      const x1 = (x + 1) % width;
      const y0 = Math.max(0, y - 1);
      const y1 = Math.min(height - 1, y + 1);

      const hL = heightMap[y * width + x0];
      const hR = heightMap[y * width + x1];
      const hD = heightMap[y0 * width + x];
      const hU = heightMap[y1 * width + x];

      // Calculate normal
      const dx = (hR - hL) * strength;
      const dy = (hU - hD) * strength;
      const dz = 1.0;

      // Normalize
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = dx / len;
      const ny = dy / len;
      const nz = dz / len;

      // Convert to color (0-255 range)
      normalMap[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
      normalMap[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      normalMap[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      normalMap[idx + 3] = 255;
    }
  }

  return normalMap;
}

// Helper functions
function getAngularDistance(lat1, lon1, lat2, lon2) {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (c * 180) / Math.PI; // Return in degrees
}

function pointToLineDistance(lat, lon, lat1, lon1, lat2, lon2) {
  const A = lat - lat1;
  const B = lon - lon1;
  const C = lat2 - lat1;
  const D = lon2 - lon1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = lat1;
    yy = lon1;
  } else if (param > 1) {
    xx = lat2;
    yy = lon2;
  } else {
    xx = lat1 + param * C;
    yy = lon1 + param * D;
  }

  return getAngularDistance(lat, lon, xx, yy);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Moon phases
const MOON_PHASES = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent',
];

// Main Component
export default function LunarObservatory() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [lightAngle, setLightAngle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(3);
  const [autoRotate, setAutoRotate] = useState(false);
  const [lightingEnabled, setLightingEnabled] = useState(true);
  const [bloomEnabled, setBloomEnabled] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Generate textures
  const textures = useMemo(() => {
    setLoadProgress(10);
    const width = 2048;
    const height = 1024;

    setLoadProgress(20);
    const heightMap = generateMoonHeightMap(width, height, MOON_TOPOLOGY);

    setLoadProgress(50);
    const colorMap = generateMoonColorMap(
      width,
      height,
      heightMap,
      MOON_TOPOLOGY,
    );

    setLoadProgress(80);
    const normalMap = generateNormalMap(width, height, heightMap);

    setLoadProgress(100);

    return { heightMap, colorMap, normalMap, width, height };
  }, []);

  // Create canvas texture from data
  const createTextureFromData = useCallback((data, width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(data);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup (inline to avoid external dependency issues)
    const THREE = window.THREE;
    if (!THREE) {
      console.error('Three.js not loaded');
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000508);
    sceneRef.current = { scene };

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create textures
    const textureLoader = new THREE.TextureLoader();

    const colorCanvas = createTextureFromData(
      textures.colorMap,
      textures.width,
      textures.height,
    );
    const colorTexture = new THREE.CanvasTexture(colorCanvas);
    colorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const normalCanvas = createTextureFromData(
      textures.normalMap,
      textures.width,
      textures.height,
    );
    const normalTexture = new THREE.CanvasTexture(normalCanvas);

    // Moon geometry with displacement
    const moonGeometry = new THREE.SphereGeometry(1, 256, 256);

    // Apply displacement from height map
    const positions = moonGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);

      // Convert to UV
      const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
      const v = 0.5 - Math.asin(y) / Math.PI;

      const px = Math.floor(u * textures.width) % textures.width;
      const py = Math.floor(v * textures.height) % textures.height;
      const heightIdx = py * textures.width + px;
      const displacement = textures.heightMap[heightIdx] * 0.15;

      const len = Math.sqrt(x * x + y * y + z * z);
      const scale = 1 + displacement;
      positions.setXYZ(
        i,
        (x / len) * scale,
        (y / len) * scale,
        (z / len) * scale,
      );
    }
    moonGeometry.computeVertexNormals();

    // Moon material
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: colorTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(1.5, 1.5),
      roughness: 0.92,
      metalness: 0.0,
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);
    sceneRef.current.moon = moon;

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.03, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        lightDirection: { value: new THREE.Vector3(1, 0.3, 1).normalize() },
        glowColor: { value: new THREE.Color(0x8888aa) },
      },
      vertexShader: `
        varying float intensity;
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 vNorm = normalize(vNormal);
          vec3 vCam = normalize(-vec3(modelViewMatrix * vec4(position, 1.0)));
          intensity = pow(1.0 - abs(dot(vNorm, vCam)), 3.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform vec3 lightDirection;
        varying float intensity;
        varying vec3 vNormal;
        void main() {
          float lightFactor = max(0.0, dot(normalize(vNormal), lightDirection));
          vec3 color = glowColor * intensity * (0.2 + lightFactor * 0.8);
          gl_FragColor = vec4(color, intensity * 0.35);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    sceneRef.current.atmosphere = atmosphere;

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 80 + Math.random() * 120;

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorTemp = Math.random();
      if (colorTemp > 0.92) {
        starColors[i * 3] = 0.7;
        starColors[i * 3 + 1] = 0.85;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorTemp > 0.8) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 0.75;
      } else {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 1.0;
        starColors[i * 3 + 2] = 1.0;
      }

      starSizes[i] = Math.random() * 2 + 0.3;
    }

    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3),
    );
    starsGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(starColors, 3),
    );
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float twinkle = sin(time * 1.5 + position.x * 0.05) * 0.3 + 0.7;
          gl_PointSize = size * twinkle * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.9);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    sceneRef.current.stars = stars;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.15);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 1, 5);
    scene.add(sunLight);
    sceneRef.current.sunLight = sunLight;

    const earthshineLight = new THREE.DirectionalLight(0x4a6fa5, 0.06);
    earthshineLight.position.set(-3, -1, 2);
    scene.add(earthshineLight);

    // Controls (simple orbit)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationY = 0;
    let rotationX = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let cameraDistance = 3.5;
    let targetCameraDistance = 3.5;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, targetRotationX),
      );
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetCameraDistance += e.deltaY * 0.002;
      targetCameraDistance = Math.max(2, Math.min(8, targetCameraDistance));
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, targetRotationX),
      );
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Store refs for animation
    sceneRef.current = {
      ...sceneRef.current,
      camera,
      renderer,
      scene,
      rotationY: { current: 0, target: 0 },
      rotationX: { current: 0, target: 0 },
      cameraDistance: { current: 3.5, target: 3.5 },
      autoRotate: false,
      lightingEnabled: true,
    };

    // Animation
    let lastTime = performance.now();
    let localLightAngle = 0;
    const lightCycleTime = 10000; // 10 seconds

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Update light position
      if (sceneRef.current.lightingEnabled) {
        localLightAngle += (deltaTime / lightCycleTime) * Math.PI * 2;
        if (localLightAngle >= Math.PI * 2) localLightAngle -= Math.PI * 2;

        const radius = 5;
        const lx = Math.cos(localLightAngle) * radius;
        const lz = Math.sin(localLightAngle) * radius;
        const ly = Math.sin(localLightAngle * 0.5) * 1.5;

        sunLight.position.set(lx, ly, lz);
        atmosphere.material.uniforms.lightDirection.value
          .set(lx, ly, lz)
          .normalize();

        // Update state
        setLightAngle(localLightAngle);
        const phaseIdx = Math.floor((localLightAngle / (Math.PI * 2)) * 8) % 8;
        setCurrentPhase(phaseIdx);
      }

      // Auto rotate
      if (sceneRef.current.autoRotate) {
        targetRotationY += deltaTime * 0.0002;
      }

      // Smooth camera movement
      rotationY += (targetRotationY - rotationY) * 0.08;
      rotationX += (targetRotationX - rotationX) * 0.08;
      cameraDistance += (targetCameraDistance - cameraDistance) * 0.08;

      // Update camera position
      camera.position.x =
        Math.sin(rotationY) * Math.cos(rotationX) * cameraDistance;
      camera.position.y = Math.sin(rotationX) * cameraDistance;
      camera.position.z =
        Math.cos(rotationY) * Math.cos(rotationX) * cameraDistance;
      camera.lookAt(0, 0, 0);

      // Slow moon rotation
      moon.rotation.y += 0.0001;

      // Update star twinkle
      stars.material.uniforms.time.value = currentTime * 0.001;

      renderer.render(scene, camera);
    };

    // Start animation after short delay
    setTimeout(() => {
      setIsLoading(false);
      animate();
    }, 500);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [textures, createTextureFromData]);

  // Update scene settings
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.autoRotate = autoRotate;
      sceneRef.current.lightingEnabled = lightingEnabled;
    }
  }, [autoRotate, lightingEnabled]);

  const formatAngle = (angle) => {
    return `${Math.round(((angle * 180) / Math.PI) % 360)}°`;
  };

  const formatCycleTime = (angle) => {
    const progress = (angle / (Math.PI * 2)) * 10;
    const seconds = Math.floor(progress);
    const ms = Math.floor((progress - seconds) * 100);
    return `${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  // Calculate light dot position
  const lightDotX = 40 + Math.cos(lightAngle - Math.PI / 2) * 32;
  const lightDotY = 40 + Math.sin(lightAngle - Math.PI / 2) * 32;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-radial from-gray-900 to-black">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-2xl animate-pulse relative">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gray-700/60 rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-gray-700/40 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-gray-700/50 rounded-full" />
          </div>
          <div className="mt-10 text-xs tracking-widest uppercase text-white/50">
            Generating Lunar Topology
          </div>
          <div className="w-48 h-0.5 mt-5 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Three.js Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Header */}
      <div className="absolute top-8 left-10 z-10">
        <div className="text-xs font-semibold tracking-widest uppercase text-white/90">
          Lunar Observatory
        </div>
        <div className="text-[9px] tracking-wider uppercase text-white/40 mt-1">
          Procedural 3D Visualization
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="absolute top-8 right-10 z-10 text-right">
        <div className="text-[9px] tracking-wider uppercase text-white/40 mb-1">
          Current Phase
        </div>
        <div className="text-lg font-light tracking-wide text-white/90">
          {MOON_PHASES[currentPhase]}
        </div>
        <div className="text-[10px] text-white/30 mt-1 font-mono">
          Cycle: {formatCycleTime(lightAngle)}
        </div>
      </div>

      {/* Light Position Compass */}
      <div className="absolute bottom-10 left-10 z-10">
        <div className="w-20 h-20 border border-white/15 rounded-full relative bg-gradient-radial from-white/5 to-transparent">
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

          {/* Light indicator */}
          <div
            className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
            style={{
              left: `${lightDotX}px`,
              top: `${lightDotY}px`,
              boxShadow: '0 0 15px #ffd700, 0 0 30px rgba(255, 215, 0, 0.5)',
            }}
          />

          {/* Compass labels */}
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-white/30 tracking-wider">
            N
          </span>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-white/30 tracking-wider">
            S
          </span>
          <span className="absolute top-1/2 -right-4 -translate-y-1/2 text-[8px] text-white/30 tracking-wider">
            E
          </span>
          <span className="absolute top-1/2 -left-4 -translate-y-1/2 text-[8px] text-white/30 tracking-wider">
            W
          </span>
        </div>

        <div className="mt-4 text-[9px] tracking-wider uppercase text-white/40">
          Solar Position
        </div>
        <div className="text-sm font-light text-white/70 mt-1 font-mono">
          {formatAngle(lightAngle)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-3">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
            autoRotate
              ? 'border-blue-500 bg-blue-500/15 text-blue-400'
              : 'border-white/15 bg-black/40 text-white/60 hover:border-white/40 hover:text-white/90'
          }`}
          title="Auto Rotate"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
          </svg>
        </button>

        <button
          onClick={() => setLightingEnabled(!lightingEnabled)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
            lightingEnabled
              ? 'border-blue-500 bg-blue-500/15 text-blue-400'
              : 'border-white/15 bg-black/40 text-white/60 hover:border-white/40 hover:text-white/90'
          }`}
          title="Dynamic Lighting"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
          </svg>
        </button>

        <button
          onClick={() => setShowStats(!showStats)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
            showStats
              ? 'border-blue-500 bg-blue-500/15 text-blue-400'
              : 'border-white/15 bg-black/40 text-white/60 hover:border-white/40 hover:text-white/90'
          }`}
          title="Show Statistics"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
          </svg>
        </button>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10 flex flex-col gap-7 animate-fadeIn">
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Diameter
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              3,474.8 km
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Distance
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              384,400 km
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Surface Gravity
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              1.62 m/s²
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Orbital Period
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              27.3 days
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Craters Rendered
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              {MOON_TOPOLOGY.craters.length}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[8px] tracking-wider uppercase text-white/35">
              Maria Rendered
            </div>
            <div className="text-sm font-light text-white/80 font-mono">
              {MOON_TOPOLOGY.maria.length}
            </div>
          </div>
        </div>
      )}

      {/* Phase Timeline */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {MOON_PHASES.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => {
              const newAngle = (idx / 8) * Math.PI * 2;
              setLightAngle(newAngle);
              setCurrentPhase(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentPhase
                ? 'bg-blue-500 shadow-lg scale-125'
                : 'bg-white/20 hover:bg-white/50 hover:scale-110'
            }`}
            style={
              idx === currentPhase
                ? { boxShadow: '0 0 10px rgba(74, 158, 255, 0.5)' }
                : {}
            }
            title={phase}
          />
        ))}
      </div>

      {/* Info Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-center">
        <div className="text-[10px] tracking-wider uppercase text-white/25">
          Drag to rotate • Scroll to zoom • Light cycles every 10 seconds
        </div>
      </div>

      {/* Tailwind animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px) translateY(-50%); }
          to { opacity: 1; transform: translateX(0) translateY(-50%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </div>
  );
}
