import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveSiteUrl } from '../../../lib/site-url';
import { getTarotMeaningArticleBySlug, tarotMeaningArticles } from '../../../lib/tarot-meaning-articles';

const siteUrl = resolveSiteUrl();

export function generateStaticParams() {
  return tarotMeaningArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getTarotMeaningArticleBySlug(slug);
  if (!article) {
    return {
      title: '文章不存在'
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/tarot-card-meanings/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${siteUrl}/tarot-card-meanings/${article.slug}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt
    },
    keywords: [
      article.cardName,
      `${article.cardName}牌义`,
      `${article.cardName}正位逆位`,
      '塔罗牌义详解',
      '塔罗占卜解读'
    ]
  };
}

export default async function TarotMeaningArticlePage({ params }) {
  const { slug } = await params;
  const article = getTarotMeaningArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: `${siteUrl}/tarot-card-meanings/${article.slug}`,
    inLanguage: 'zh-CN',
    wordCount: article.charCount,
    author: {
      '@type': 'Organization',
      name: 'Arcana Noire'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Arcana Noire'
    }
  };

  return (
    <main className="seo-page tarot-meaning-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="seo-hero">
        <h1>{article.title}</h1>
        <p>{article.arcana} · {article.cardName} · 纯文字深度解读（{article.charCount}字）</p>
        <Link className="seo-cta" href="/tarot-card-meanings">
          返回文章目录
        </Link>
      </section>

      <article className="seo-section tarot-meaning-article">
        {article.paragraphs.map((paragraph, index) => (
          <p key={`${article.slug}-${index}`}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
