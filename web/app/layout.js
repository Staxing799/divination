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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '64x64' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/icon.png', sizes: '64x64' }]
  },
  title: {
    default: 'Nebula Arcana | Tarot Guidance',
    template: '%s | Nebula Arcana'
  },
  description:
    'Nebula Arcana is an international Tarot web experience for creators, founders, and reflective minds. Get cinematic Tarot guidance with modern clarity.',
  keywords: [
    'tarot reading online',
    'tarot spread',
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
      'Premium international Tarot divination in a cinematic web experience.',
    url: siteUrl,
    siteName: 'Nebula Arcana',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nebula Arcana',
    description:
      'Premium international Tarot divination in a cinematic web experience.'
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
