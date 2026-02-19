import Link from 'next/link';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();
const UPDATED_AT = '2026-02-19T00:00:00.000Z';

export const metadata = {
  title: '塔罗解读方法论 | AI Tarot Reading',
  description:
    '了解本站如何使用三张牌阵、正逆位与行动框架生成可执行解读。',
  alternates: {
    canonical: '/tarot-reading-methodology'
  },
  openGraph: {
    title: '塔罗解读方法论 | AI Tarot Reading',
    description:
      '了解本站如何使用三张牌阵、正逆位与行动框架生成可执行解读。',
    url: `${siteUrl}/tarot-reading-methodology`,
    type: 'article',
    modifiedTime: UPDATED_AT
  },
  twitter: {
    card: 'summary_large_image',
    title: '塔罗解读方法论 | AI Tarot Reading',
    description:
      '了解本站如何使用三张牌阵、正逆位与行动框架生成可执行解读。'
  }
};

export default function TarotReadingMethodologyPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '塔罗解读方法论',
    description: '本站如何将三张牌阵输出转化为可执行行动建议。',
    mainEntityOfPage: `${siteUrl}/tarot-reading-methodology`,
    dateModified: UPDATED_AT,
    inLanguage: 'zh-CN',
    author: {
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
        name: '塔罗解读方法论',
        item: `${siteUrl}/tarot-reading-methodology`
      }
    ]
  };

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="seo-hero">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <span>塔罗解读方法论</span>
        </nav>
        <h1>塔罗解读方法论</h1>
        <p>
          本页面解释本站如何把“过去/现在/未来”三张牌阵、正逆位信息和用户问题组合成可执行建议，避免只给抽象结论。
        </p>
        <p className="tarot-meaning-update">最近更新：2026-02-19</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/tarot-reading-online">
            开始在线占卜
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-card-meanings">
            查看牌义文章库
          </Link>
        </div>
      </section>

      <section className="seo-section">
        <h2>1) 问题输入</h2>
        <p>
          我们要求用户输入一个具体决策或冲突问题。问题越聚焦，牌阵解释越稳定，输出越容易落实到行动。
        </p>
      </section>

      <section className="seo-section">
        <h2>2) 牌阵结构</h2>
        <p>
          使用固定三张牌位：过去（形成背景）、现在（核心张力）、未来（当前模式延续方向）。每张牌同时记录正位或逆位。
        </p>
      </section>

      <section className="seo-section">
        <h2>3) 解读框架</h2>
        <p>
          我们先解释牌位，再解释牌种（大阿卡纳/小阿卡纳及花色），最后结合正逆位做风险提示。输出目标是“下一步做什么”，而不是“只讲情绪”。
        </p>
      </section>

      <section className="seo-section">
        <h2>4) 行动落地</h2>
        <p>
          建议将结果转成 24-72 小时内可执行动作，并在下一次占卜前复盘：做了什么、遇到什么阻力、需要调整什么。
        </p>
      </section>
    </main>
  );
}
