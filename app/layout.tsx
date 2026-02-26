import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://anindya.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Anindya Mukherjee | Senior Technical Lead & Adventure Creator',
    template: '%s | Anindya Mukherjee',
  },
  description:
    'Portfolio of Anindya Mukherjee — Senior Technical Lead specializing in React, Node.js, and enterprise architecture. Adventure vlogger documenting journeys across India and Europe.',
  keywords: [
    'Anindya Mukherjee',
    'Senior Technical Lead',
    'React Developer',
    'Node.js',
    'TypeScript',
    'Full Stack Engineer',
    'Travel Vlogger',
    'Berlin',
    'Kolkata',
    'Frontend Architecture',
  ],
  authors: [{ name: 'Anindya Mukherjee', url: SITE_URL }],
  creator: 'Anindya Mukherjee',
  publisher: 'Thimple Solutions Pvt Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Anindya Mukherjee',
    title: 'Anindya Mukherjee | Senior Technical Lead & Adventure Creator',
    description:
      'Bridging the divide between Engineering excellence and Adventure storytelling. React, Node.js, TypeScript specialist with a passion for travel content creation.',
    // Images are auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anindya Mukherjee | Senior Technical Lead & Adventure Creator',
    description:
      'Bridging the divide between Engineering excellence and Adventure storytelling.',
    creator: '@andysenclave',
    // Images are auto-generated from app/twitter-image.tsx
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E27' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ErrorBoundary>
          {/* Skip link for keyboard navigation */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ThemeProvider>{children}</ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
      </body>
    </html>
  );
}
