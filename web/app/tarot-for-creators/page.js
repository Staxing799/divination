import Link from 'next/link';

export const metadata = {
  title: 'Tarot for Creators and Founders | Clarity for Work and Strategy',
  description:
    'Use Tarot as a reflection framework for product strategy, creative blocks, timing, and difficult decisions in work and life.',
  alternates: {
    canonical: '/tarot-for-creators'
  },
  keywords: [
    'tarot for creators',
    'tarot for entrepreneurs',
    'tarot for business decisions',
    'creative block tarot reading'
  ]
};

export default function TarotForCreatorsPage() {
  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>Tarot for Creators, Builders, and Founders</h1>
        <p>
          Nebula Arcana focuses on modern users who want structured reflection. This is
          <strong> Tarot for decision quality</strong>, not passive fortune consumption.
        </p>
        <Link className="seo-cta" href="/">
          Start a Focused Reading
        </Link>
      </section>

      <section className="seo-section">
        <h2>Use Cases That Convert Insight Into Action</h2>
        <p>
          Product direction, co-founder conflict, hiring uncertainty, launch timing, creative paralysis,
          and relationship stress are all high-leverage reading prompts.
        </p>
      </section>

      <section className="seo-section">
        <h2>How to Ask Better Questions</h2>
        <p>
          Ask process-focused questions: “What pattern am I missing?” “What risk should I reduce first?”
          “Where should I focus this week?” This creates clearer card interpretation.
        </p>
      </section>

      <section className="seo-section">
        <h2>What to Expect From Nebula Arcana</h2>
        <p>
          A cinematic Tarot experience, structured spread logic, and practical guidance in plain language for
          global users across English, Chinese, Spanish, and Japanese.
        </p>
      </section>
    </main>
  );
}
