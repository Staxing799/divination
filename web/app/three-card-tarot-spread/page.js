import Link from 'next/link';

export const metadata = {
  title: 'Three Card Tarot Spread Meaning | Past Present Future Guide',
  description:
    'Learn how a three-card Tarot spread works and how to read Past, Present, Future positions with upright and reversed cards.',
  alternates: {
    canonical: '/three-card-tarot-spread'
  },
  keywords: [
    'three card tarot spread',
    'past present future tarot',
    'how to read tarot cards',
    'upright and reversed tarot meaning'
  ]
};

export default function ThreeCardTarotSpreadPage() {
  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>Three Card Tarot Spread: Past, Present, Future</h1>
        <p>
          The <strong>three card Tarot spread</strong> is one of the most useful layouts for decision support.
          It balances speed and depth while staying practical.
        </p>
        <Link className="seo-cta" href="/">
          Try the 3-Card Spread
        </Link>
      </section>

      <section className="seo-section">
        <h2>Card Position Meaning</h2>
        <p>
          Past shows momentum and context. Present shows your active tension. Future shows the likely direction
          if the current pattern continues.
        </p>
      </section>

      <section className="seo-section">
        <h2>Upright vs Reversed Cards</h2>
        <p>
          Upright cards describe direct expression. Reversed cards often indicate blocked energy, delay,
          internal conflict, or overcorrection. Orientation must be interpreted with position, not in isolation.
        </p>
      </section>

      <section className="seo-section">
        <h2>How to Use This in Daily Life</h2>
        <p>
          After receiving your spread, choose one action for the next 24 to 72 hours. This creates measurable
          momentum and turns reflection into execution.
        </p>
      </section>
    </main>
  );
}
