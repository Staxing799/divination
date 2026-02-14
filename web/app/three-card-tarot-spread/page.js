import ThreeCardTarotContent from '../../components/three-card-tarot-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: '3 Card Tarot Spread Meaning | Past Present Future Guide',
  description:
    'Learn how a three-card Tarot spread works and how to read Past, Present, Future positions with upright and reversed cards.',
  alternates: {
    canonical: '/three-card-tarot-spread'
  },
  openGraph: {
    title: 'Three Card Tarot Spread Meaning | Past Present Future Guide',
    description:
      'Learn how to read Past, Present, Future positions with upright and reversed Tarot cards.',
    url: `${siteUrl}/three-card-tarot-spread`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three Card Tarot Spread Meaning | Past Present Future Guide',
    description:
      'Learn how to read Past, Present, Future positions with upright and reversed Tarot cards.'
  },
  keywords: [
    'three card tarot spread',
    '3 card tarot spread meaning',
    'past present future tarot',
    'past present future tarot spread',
    'how to read tarot cards',
    'upright and reversed tarot meaning',
    'tarot spread for beginners',
    'tarot card positions meaning',
    'three card tarot reading online',
    '塔罗三张牌',
    '过去现在未来塔罗',
    '塔罗牌位含义'
  ]
};

export default function ThreeCardTarotSpreadPage() {
  return <ThreeCardTarotContent />;
}
