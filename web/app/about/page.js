import Link from 'next/link';
import { resolveSiteUrl } from '../../lib/site-url';

const siteUrl = resolveSiteUrl();

export const metadata = {
  title: '关于我们 | AI Tarot Reading',
  description:
    '了解 AI Tarot Reading 的定位、内容边界、更新原则与可执行解读方法。',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: '关于我们 | AI Tarot Reading',
    description:
      '了解 AI Tarot Reading 的定位、内容边界、更新原则与可执行解读方法。',
    url: `${siteUrl}/about`,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 | AI Tarot Reading',
    description:
      '了解 AI Tarot Reading 的定位、内容边界、更新原则与可执行解读方法。'
  }
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: '关于我们 | AI Tarot Reading',
    url: `${siteUrl}/about`,
    isPartOf: siteUrl,
    inLanguage: 'zh-CN'
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
        name: '关于我们',
        item: `${siteUrl}/about`
      }
    ]
  };

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="seo-hero">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">首页</Link>
          <span>/</span>
          <span>关于我们</span>
        </nav>
        <h1>关于 AI Tarot Reading</h1>
        <p>
          我们的目标不是做“玄学标题站”，而是提供结构化、可执行、可复盘的免费塔罗解读体验，帮助用户把模糊情绪转成清晰行动。
        </p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/">
            返回占卜主页
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-reading-methodology">
            查看解读方法论
          </Link>
        </div>
      </section>

      <section className="seo-section">
        <h2>我们解决什么问题</h2>
        <p>
          同类网站普遍存在“文案同质化、结果不可执行、只追短词流量”三类问题。我们围绕真实决策场景构建页面与内容，优先回答“下一步怎么做”，而不是堆砌关键词。
        </p>
      </section>

      <section className="seo-section">
        <h2>内容更新原则</h2>
        <p>
          每篇牌义文章会保持固定结构以方便阅读，但会持续补充具体场景和行动建议。我们优先更新可验证、有反馈价值的内容，不做低质量批量扩页。
        </p>
      </section>

      <section className="seo-section">
        <h2>边界与免责声明</h2>
        <p>
          本站内容仅用于娱乐与自我反思，不构成医疗、法律、财务或心理健康专业建议。使用者应结合自身情况独立判断，并在需要时咨询持证专业人士。
        </p>
      </section>
    </main>
  );
}
