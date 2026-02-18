import Link from 'next/link';
import { resolveSiteUrl } from '../../lib/site-url';
import { tarotMeaningArticles } from '../../lib/tarot-meaning-articles';

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
  },
  keywords: [
    '塔罗牌义',
    '塔罗牌解释',
    '大阿卡纳牌义',
    '小阿卡纳牌义',
    '塔罗正位逆位',
    '塔罗入门文章'
  ]
};

export default function TarotCardMeaningsPage() {
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

  return (
    <main className="seo-page tarot-meaning-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <section className="seo-hero">
        <h1>塔罗牌义文章库（30篇）</h1>
        <p>
          本栏目收录 30 篇纯文字牌义文章，每篇围绕一张核心牌展开，包含正位、逆位、感情、事业、金钱与行动建议。
          所有内容用于帮助你把抽象牌义转成清晰可执行的判断。
        </p>
        <Link className="seo-cta" href="/">
          返回占卜主页
        </Link>
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
    </main>
  );
}
