import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
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
const GA_MEASUREMENT_ID = 'G-VPXXRX0KSE';
const ADSENSE_CLIENT = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3566921583810316').trim();

export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/icon.png', sizes: '96x96' }]
  },
  title: {
    default: 'AI Tarot Reading Free | 免费AI塔罗牌占卜',
    template: '%s | AI Tarot Reading'
  },
  description:
    'Free AI tarot card reading online. 免费AI塔罗牌占卜，支持三张牌阵（过去/现在/未来），用于感情、事业与人生决策参考。',
  keywords: [
    'ai tarot reading',
    'ai tarot',
    'free ai tarot reading',
    'ai tarot card reading',
    'ai tarot reading online',
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
    'ai塔罗牌',
    'ai塔罗',
    'ai塔罗占卜',
    '免费ai塔罗牌占卜',
    'ai塔罗牌在线',
    '塔罗在线占卜',
    '免费塔罗',
    '三张牌塔罗',
    '塔罗牌解读'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'AI Tarot Reading Free | 免费AI塔罗牌占卜',
    description:
      'AI-powered free tarot reading online with a practical 3-card spread for love, career, and life.',
    url: siteUrl,
    siteName: 'AI Tarot Reading',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tarot Reading Free | 免费AI塔罗牌占卜',
    description:
      'AI-powered free tarot reading online with a practical 3-card spread for love, career, and life.'
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
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
