import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Anindya Mukherjee | Portfolio',
    short_name: 'Anindya',
    description:
      'Portfolio of Anindya Mukherjee — Senior Technical Lead & Adventure Creator',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0E27',
    theme_color: '#0A0E27',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
