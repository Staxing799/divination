import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading'
});

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nebula Arcana | Tarot, I Ching, and Eastern Guidance',
    template: '%s | Nebula Arcana'
  },
  description:
    'Nebula Arcana is an international divination web experience for creators, founders, and reflective minds. Get Tarot, I Ching, and Eastern guidance in a cinematic interface.',
  keywords: [
    'tarot reading online',
    'i ching reading',
    'eastern fate reading',
    'spiritual reflection app',
    'divination website',
    'oracle guidance'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Nebula Arcana',
    description:
      'Tarot, I Ching, and Eastern divination in a premium international web experience.',
    url: siteUrl,
    siteName: 'Nebula Arcana',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nebula Arcana',
    description:
      'Tarot, I Ching, and Eastern divination in a premium international web experience.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>{children}</body>
    </html>
  );
}
