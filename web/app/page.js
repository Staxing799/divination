import OracleConsole from '../components/oracle-console';
import Link from 'next/link';

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nebula Arcana',
    url: siteUrl,
    description:
      'A premium, international Tarot experience for reflective decision support.',
    inLanguage: ['en', 'zh', 'es', 'ja']
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nebula Arcana',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best way to do an online tarot reading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use one clear question and a structured spread. Nebula Arcana uses a three-card Past, Present, Future layout with upright and reversed card orientation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can beginners use this tarot reading tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The reading flow is beginner-friendly while preserving core tarot logic, including card position and orientation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tarot app free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The current reading experience is free to use for reflective guidance.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OracleConsole />
      <section className="seo-home-shell">
        <div className="seo-home-grid">
          <article className="seo-home-card">
            <h2>Online Tarot Reading That Follows Real Spread Logic</h2>
            <p>
              Nebula Arcana is built for users searching for a <strong>free tarot reading online</strong>
              with practical clarity. Every reading uses a structured three-card spread, so results are
              consistent, readable, and actionable.
            </p>
          </article>
          <article className="seo-home-card">
            <h2>Three Card Tarot Spread: Past, Present, Future</h2>
            <p>
              Learn how to interpret <strong>past present future tarot</strong> positions and use upright
              and reversed cards for better decisions.
            </p>
            <Link href="/three-card-tarot-spread">Read the 3-card guide</Link>
          </article>
          <article className="seo-home-card">
            <h2>Tarot for Creators, Founders, and Professionals</h2>
            <p>
              Use tarot for product strategy, creative blocks, and relationship decisions without vague
              advice loops.
            </p>
            <Link href="/tarot-for-creators">Explore creator-focused tarot</Link>
          </article>
          <article className="seo-home-card">
            <h2>Start a Free Tarot Reading Online</h2>
            <p>
              If you searched for <strong>online tarot reading</strong> or <strong>three card tarot spread online</strong>,
              this is your best starting point.
            </p>
            <Link href="/tarot-reading-online">Go to tarot reading landing page</Link>
          </article>
        </div>
      </section>
    </>
  );
}
