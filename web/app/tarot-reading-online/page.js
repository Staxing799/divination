import TarotReadingOnlineContent from '../../components/tarot-reading-online-content';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: 'Free AI Tarot Reading Online | AI塔罗牌免费占卜',
  description:
    'Get a free AI tarot reading online. Ask one question and draw a three-card spread (Past, Present, Future) for love, career, and life clarity. 支持 AI 塔罗牌免费占卜。',
  alternates: {
    canonical: '/tarot-reading-online'
  },
  openGraph: {
    title: 'Free AI Tarot Reading Online | AI塔罗牌免费占卜',
    description:
      'Ask one question and draw a three-card AI tarot spread for love, career, and life clarity.',
    url: `${siteUrl}/tarot-reading-online`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Tarot Reading Online | AI塔罗牌免费占卜',
    description:
      'Ask one question and draw a three-card AI tarot spread for love, career, and life clarity.'
  }
};

export default function TarotReadingOnlinePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Free AI Tarot Reading Online',
        item: `${siteUrl}/tarot-reading-online`
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free AI Tarot Reading Online: A Practical 3-Card Method',
    description:
      'A practical guide to AI tarot reading online with a Past, Present, Future spread for clearer decisions.',
    mainEntityOfPage: `${siteUrl}/tarot-reading-online`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <TarotReadingOnlineContent />
    </>
  );
}
