import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://anindya.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/mockup/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
