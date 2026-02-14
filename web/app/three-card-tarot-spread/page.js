import ThreeCardTarotContent from '../../components/three-card-tarot-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: 'Three Card Tarot Spread Meaning | Past Present Future Guide',
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
    'past present future tarot',
    'how to read tarot cards',
    'upright and reversed tarot meaning'
  ]
};

export default function ThreeCardTarotSpreadPage() {
  return <ThreeCardTarotContent />;
}
