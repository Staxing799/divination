import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata = {
  title: 'Free Tarot Reading Online | 3-Card Spread for Clarity',
  description:
    'Get a free online Tarot reading with a structured 3-card spread (Past, Present, Future). Designed for creators, founders, and professionals making real decisions.',
  alternates: {
    canonical: '/tarot-reading-online'
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
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="seo-hero">
        <h1>Free Tarot Reading Online for Real-World Decisions</h1>
        <p>
          Nebula Arcana gives you a structured <strong>online Tarot reading</strong> with a classic
          <strong> 3-card spread</strong>. It is built for people who want practical clarity in love, work,
          and life direction.
        </p>
        <Link className="seo-cta" href="/">
          Start Your Tarot Reading
        </Link>
      </section>

      <section className="seo-section">
        <h2>Why This Tarot Reading Is Different</h2>
        <p>
          Instead of vague one-line fortune text, this flow uses a Past-Present-Future spread and keeps the
          interpretation grounded in action. Each card orientation (upright or reversed) changes the meaning,
          so you get a reading that matches proper Tarot usage.
        </p>
      </section>

      <section className="seo-section">
        <h2>Best Questions to Ask in a Tarot Session</h2>
        <p>
          Strong questions improve reading quality. Ask about one decision, one conflict, or one opportunity.
          Avoid yes/no wording. Example: “What should I focus on in the next 30 days to improve my career
          direction?”
        </p>
      </section>

      <section className="seo-section">
        <h2>Who This Is For</h2>
        <p>
          This reading style is designed for creators, startup founders, product builders, and reflective
          professionals who want insight with structure.
        </p>
      </section>
    </main>
  );
}
