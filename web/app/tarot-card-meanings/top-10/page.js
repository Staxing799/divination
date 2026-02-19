import Link from 'next/link';
import { resolveSiteUrl } from '../../../lib/site-url';
import { tarotMeaningArticles } from '../../../lib/tarot-meaning-articles';
import { tarotTop10Roadmap } from '../../../lib/tarot-seo-clusters';

const siteUrl = resolveSiteUrl();
const articleMap = new Map(tarotMeaningArticles.map((item) => [item.slug, item]));

export const metadata = {
  title: '塔罗牌义 Top 10 入门清单 | AI Tarot Reading',
  description:
    '按真实检索场景整理的 10 篇优先阅读牌义：感情、事业、转型、关系选择与行动落地。',
  alternates: {
    canonical: '/tarot-card-meanings/top-10'
  },
  openGraph: {
    title: '塔罗牌义 Top 10 入门清单 | AI Tarot Reading',
    description:
      '按真实检索场景整理的 10 篇优先阅读牌义：感情、事业、转型、关系选择与行动落地。',
    url: `${siteUrl}/tarot-card-meanings/top-10`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: '塔罗牌义 Top 10 入门清单 | AI Tarot Reading',
    description:
      '按真实检索场景整理的 10 篇优先阅读牌义：感情、事业、转型、关系选择与行动落地。'
  }
};

export default function TarotTop10Page() {
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tarotTop10Roadmap.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/tarot-card-meanings/${item.slug}`,
      name: articleMap.get(item.slug)?.title || item.slug
    }))
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
        name: 'Top 10 入门清单',
        item: `${siteUrl}/tarot-card-meanings/top-10`
      }
    ]
  };

  return (
    <main className="seo-page tarot-meaning-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
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
          <span>Top 10 入门清单</span>
        </nav>
        <h1>塔罗牌义 Top 10 入门清单</h1>
        <p>
          这是按真实搜索需求排序的 10 篇优先阅读文章。先读这 10 篇，再扩展到全库，理解速度最快。
        </p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/tarot-card-meanings">
            返回全部文章目录
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-methodology">
            先看解读方法论
          </Link>
        </div>
      </section>

      <section className="seo-section">
        <h2>优先阅读顺序</h2>
        <div className="tarot-meaning-grid">
          {tarotTop10Roadmap.map((item, index) => {
            const article = articleMap.get(item.slug);
            if (!article) {
              return null;
            }

            return (
              <article key={item.slug} className="tarot-meaning-item">
                <h3>
                  #{index + 1} <Link href={`/tarot-card-meanings/${item.slug}`}>{article.title}</Link>
                </h3>
                <p>{item.intent}</p>
                <p className="tarot-meaning-meta">中文词：{item.targetQueryZh}</p>
                <p className="tarot-meaning-meta">英文词：{item.targetQueryEn}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
