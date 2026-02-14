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
    default: 'Free Tarot Reading Online | 3-Card Tarot Spread',
    template: '%s | Tarot Reading Online'
  },
  description:
    'Free online tarot reading with a three-card spread. Ask one question and get clear past, present, future guidance for love, career, and life decisions.',
  keywords: [
    'free tarot reading online',
    'tarot reading free',
    'tarot reading online',
    'online tarot card reading',
    'tarot yes or no',
    'love tarot reading',
    'career tarot reading',
    'daily tarot reading',
    'tarot cards meaning',
    'tarot spread for beginners',
    'three card tarot spread online',
    'three card tarot spread',
    'past present future tarot',
    'how to read tarot cards',
    'upright and reversed tarot',
    'best tarot reading website',
    'online divination',
    '塔罗在线占卜',
    '免费塔罗',
    '三张牌塔罗',
    '塔罗牌解读'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Free Tarot Reading Online | 3-Card Tarot Spread',
    description:
      'Free online tarot reading for love, career, and life. Try a practical three-card spread with clear guidance.',
    url: siteUrl,
    siteName: 'Tarot Reading Online',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tarot Reading Online | 3-Card Tarot Spread',
    description:
      'Free online tarot reading for love, career, and life. Try a practical three-card spread with clear guidance.'
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
