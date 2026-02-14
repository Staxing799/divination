import TarotReadingOnlineContent from '../../components/tarot-reading-online-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: 'Free Tarot Reading Online | 3-Card Spread for Clarity',
  description:
    'Get a free online Tarot reading with a structured 3-card spread (Past, Present, Future). Designed for creators, founders, and professionals making real decisions.',
  alternates: {
    canonical: '/tarot-reading-online'
  },
  openGraph: {
    title: 'Free Tarot Reading Online | 3-Card Spread for Clarity',
    description:
      'Get a free online Tarot reading with a structured 3-card spread (Past, Present, Future).',
    url: `${siteUrl}/tarot-reading-online`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tarot Reading Online | 3-Card Spread for Clarity',
    description:
      'Get a free online Tarot reading with a structured 3-card spread (Past, Present, Future).'
  },
  keywords: [
    'free tarot reading online',
    'online tarot reading',
    '3 card tarot spread online',
    'tarot reading for decision making',
    'tarot reading for career and love'
  ]
};

export default function TarotReadingOnlinePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does this online tarot reading work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You ask one focused question, then a three-card spread is generated for Past, Present, and Future positions with upright or reversed orientation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tarot reading free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The reading flow is free to use and built for reflection and personal decision support.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use this for career decisions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many users ask questions about career moves, business timing, and relationship dynamics. Treat results as reflective guidance, not guaranteed outcomes.'
        }
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free Tarot Reading Online: A Practical 3-Card Method',
    description:
      'A practical guide to online tarot reading with a Past, Present, Future spread for clearer decisions.',
    mainEntityOfPage: `${siteUrl}/tarot-reading-online`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <TarotReadingOnlineContent />
    </>
  );
}
