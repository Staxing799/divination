import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../components/language-provider';
import { resolveSiteUrl } from '../lib/site-url';

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

const siteUrl = resolveSiteUrl();

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
    default: 'Arcana Noire | Tarot Guidance',
    template: '%s | Arcana Noire'
  },
  description:
    'Arcana Noire is a high-end online tarot reading experience with structured three-card guidance for real-world decisions.',
  keywords: [
    'free tarot reading online',
    'tarot reading online',
    'three card tarot spread',
    'past present future tarot',
    'tarot spread',
    'spiritual reflection app',
    'divination website',
    'oracle guidance'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Arcana Noire | Free Online Tarot Reading',
    description:
      'Get a free online tarot reading with a structured three-card spread and clear reflective guidance.',
    url: siteUrl,
    siteName: 'Arcana Noire',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcana Noire | Free Online Tarot Reading',
    description:
      'Get a free online tarot reading with a structured three-card spread and clear reflective guidance.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
