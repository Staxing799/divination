import TarotReadingOnlineContent from '../../components/tarot-reading-online-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: 'Free Tarot Reading Online | Ask and Draw 3 Tarot Cards',
  description:
    'Get a free tarot reading online. Ask one question and draw a three-card spread (Past, Present, Future) for love, career, and life clarity.',
  alternates: {
    canonical: '/tarot-reading-online'
  },
  openGraph: {
    title: 'Free Tarot Reading Online | Ask and Draw 3 Tarot Cards',
    description:
      'Ask one question and draw a three-card tarot spread for love, career, and life clarity.',
    url: `${siteUrl}/tarot-reading-online`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tarot Reading Online | Ask and Draw 3 Tarot Cards',
    description:
      'Ask one question and draw a three-card tarot spread for love, career, and life clarity.'
  },
  keywords: [
    'free tarot reading online',
    'online tarot reading',
    'tarot reading free',
    '3 card tarot spread online',
    'past present future tarot',
    'tarot reading for love',
    'tarot reading for career',
    'tarot yes or no',
    'daily tarot reading online',
    'tarot reading for beginners',
    'free tarot card reading no signup',
    '塔罗在线占卜',
    '免费塔罗占卜',
    '塔罗牌在线解读'
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
