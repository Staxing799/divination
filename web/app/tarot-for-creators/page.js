import TarotForCreatorsContent from '../../components/tarot-for-creators-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: 'Tarot for Work Decisions | Creators, Founders, and Entrepreneurs',
  description:
    'Use Tarot as a reflection framework for product strategy, creative blocks, timing, and difficult decisions in work and life.',
  alternates: {
    canonical: '/tarot-for-creators'
  },
  openGraph: {
    title: 'Tarot for Work Decisions | Creators, Founders, and Entrepreneurs',
    description:
      'Use Tarot as a reflection framework for strategy, timing, and difficult creative decisions.',
    url: `${siteUrl}/tarot-for-creators`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarot for Work Decisions | Creators, Founders, and Entrepreneurs',
    description:
      'Use Tarot as a reflection framework for strategy, timing, and difficult creative decisions.'
  }
};

export default function TarotForCreatorsPage() {
  return <TarotForCreatorsContent />;
}
