import Link from 'next/link';
import { resolveSiteUrl } from '../../lib/site-url';
import { tarotMeaningArticles } from '../../lib/tarot-meaning-articles';
import { tarotTop10Roadmap } from '../../lib/tarot-seo-clusters';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: '塔罗牌义文章库 | 30篇牌义详解',
  description:
    '30篇纯文字塔罗牌义文章，覆盖大阿卡纳与小阿卡纳重点牌，帮助你把占卜结果转成可执行判断。',
  alternates: {
    canonical: '/tarot-card-meanings'
  },
  openGraph: {
    title: '塔罗牌义文章库 | 30篇牌义详解',
    description:
      '系统整理30篇塔罗牌义解读，包含正位、逆位、感情、事业、金钱和行动建议。',
    url: `${siteUrl}/tarot-card-meanings`,
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: '塔罗牌义文章库 | 30篇牌义详解',
    description:
      '系统整理30篇塔罗牌义解读，包含正位、逆位、感情、事业、金钱和行动建议。'
  }
};

export default function TarotCardMeaningsPage() {
  const top10Articles = tarotTop10Roadmap
    .map((item) => tarotMeaningArticles.find((article) => article.slug === item.slug))
    .filter(Boolean);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tarotMeaningArticles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/tarot-card-meanings/${article.slug}`,
      name: article.title
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
      }
    ]
  };

  return (
    <main className="seo-page tarot-meaning-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="seo-hero">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <span>塔罗牌义文章库</span>
        </nav>
        <h1>塔罗牌义文章库（30篇）</h1>
        <p>
          本栏目收录 30 篇纯文字牌义文章，每篇围绕一张核心牌展开，包含正位、逆位、感情、事业、金钱与行动建议。
          所有内容用于帮助你把抽象牌义转成清晰可执行的判断。
        </p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/">
            返回占卜主页
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-card-meanings/top-10">
            先看 Top 10 入门清单
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-online">
            进入在线占卜
          </Link>
        </div>
      </section>

      <section className="seo-section">
        <h2>入门推荐 Top 10</h2>
        <p>如果你时间有限，建议先读这 10 篇高频检索主题，再扩展到完整牌义库。</p>
        <div className="tarot-meaning-grid">
          {top10Articles.map((article, index) => (
            <article key={article.slug} className="tarot-meaning-item">
              <h3>
                #{index + 1} <Link href={`/tarot-card-meanings/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.excerpt}</p>
              <p className="tarot-meaning-meta">{article.arcana} · {article.cardName}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-section">
        <h2>文章目录</h2>
        <div className="tarot-meaning-grid">
          {tarotMeaningArticles.map((article) => (
            <article key={article.slug} className="tarot-meaning-item">
              <h3>
                <Link href={`/tarot-card-meanings/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.excerpt}</p>
              <p className="tarot-meaning-meta">{article.arcana} · {article.cardName} · {article.charCount}字</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-section">
        <h2>相关阅读入口</h2>
        <p>如果你想先学方法再看单牌，可从三张牌阵指南与解读方法论开始，理解速度会更快。</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/three-card-tarot-spread">
            三张牌阵指南
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-methodology">
            解读方法论
          </Link>
        </div>
      </section>
    </main>
  );
}
