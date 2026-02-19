import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveSiteUrl } from '../../../lib/site-url';
import { getTarotMeaningArticleBySlug, tarotMeaningArticles } from '../../../lib/tarot-meaning-articles';
import { getTarotSeoBrief } from '../../../lib/tarot-seo-clusters';

const siteUrl = resolveSiteUrl();
const ARTICLE_PUBLISHED_ISO = '2026-01-15T00:00:00.000Z';
const ARTICLE_UPDATED_ISO = '2026-02-19T00:00:00.000Z';

function getRelatedArticles(slug, limit = 4) {
  const currentIndex = tarotMeaningArticles.findIndex((item) => item.slug === slug);
  if (currentIndex === -1) {
    return [];
  }

  const related = [];
  for (let offset = 1; offset < tarotMeaningArticles.length && related.length < limit; offset += 1) {
    const nextIndex = (currentIndex + offset) % tarotMeaningArticles.length;
    related.push(tarotMeaningArticles[nextIndex]);
  }
  return related;
}

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
      type: 'article',
      publishedTime: ARTICLE_PUBLISHED_ISO,
      modifiedTime: ARTICLE_UPDATED_ISO
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt
    }
  };
}

export default async function TarotMeaningArticlePage({ params }) {
  const { slug } = await params;
  const article = getTarotMeaningArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 4);
  const pageUrl = `${siteUrl}/tarot-card-meanings/${article.slug}`;
  const seoBrief = getTarotSeoBrief(article);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: pageUrl,
    inLanguage: 'zh-CN',
    wordCount: article.charCount,
    datePublished: ARTICLE_PUBLISHED_ISO,
    dateModified: ARTICLE_UPDATED_ISO,
    articleSection: ['塔罗牌义', article.arcana, article.cardName],
    author: {
      '@type': 'Organization',
      name: 'AI Tarot Reading',
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Tarot Reading',
      url: siteUrl
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '塔罗牌义文章库',
        item: `${siteUrl}/tarot-card-meanings`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl
      }
    ]
  };

  return (
    <main className="seo-page tarot-meaning-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="seo-hero">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <Link href="/tarot-card-meanings">塔罗牌义文章库</Link>
          <span>/</span>
          <span>{article.cardName}</span>
        </nav>
        <h1>{article.title}</h1>
        <p>{article.arcana} · {article.cardName} · 纯文字深度解读（{article.charCount}字）</p>
        <p className="tarot-meaning-update">最近更新：2026-02-19</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/tarot-card-meanings">
            返回文章目录
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-online">
            开始在线占卜
          </Link>
        </div>
      </section>

      <article className="seo-section tarot-meaning-article">
        {article.paragraphs.map((paragraph, index) => (
          <p key={`${article.slug}-${index}`}>{paragraph}</p>
        ))}
      </article>

      <section className="seo-section tarot-seo-brief">
        <h2>{seoBrief.heading}</h2>
        <p>{seoBrief.summary}</p>
        <ul className="seo-bullet-list">
          <li>中文检索词：{seoBrief.targetQueryZh}</li>
          <li>英文检索词：{seoBrief.targetQueryEn}</li>
        </ul>
      </section>

      <section className="seo-section tarot-seo-brief">
        <h2>可直接套用的提问模板</h2>
        <ul className="seo-bullet-list">
          {seoBrief.questionTemplates.map((question) => (
            <li key={`${article.slug}-${question}`}>{question}</li>
          ))}
        </ul>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/">
            带着这个问题去占卜
          </Link>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="seo-section">
          <h2>继续阅读</h2>
          <div className="tarot-meaning-grid">
            {relatedArticles.map((item) => (
              <article key={item.slug} className="tarot-meaning-item">
                <h3>
                  <Link href={`/tarot-card-meanings/${item.slug}`}>{item.title}</Link>
                </h3>
                <p>{item.excerpt}</p>
                <p className="tarot-meaning-meta">{item.arcana} · {item.cardName}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="seo-section">
        <h2>下一步</h2>
        <p>读完牌义后，建议回到三张牌阵实测：先提出一个具体问题，再把结果落到 24-72 小时可执行动作。</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/three-card-tarot-spread">
            阅读三张牌阵指南
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-methodology">
            查看解读方法论
          </Link>
        </div>
      </section>
    </main>
  );
}
