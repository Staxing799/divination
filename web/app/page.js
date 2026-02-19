import OracleConsole from '../components/oracle-console';
import { resolveSiteUrl } from '../lib/site-url';

export default function HomePage() {
  const siteUrl = resolveSiteUrl();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tarot Reading | 免费AI塔罗牌占卜',
    alternateName: ['Free AI Tarot Reading', 'AI塔罗牌', '免费AI塔罗占卜'],
    url: siteUrl,
    description:
      'AI-powered free tarot card reading online with practical three-card guidance for real decisions.',
    inLanguage: ['en', 'zh', 'es', 'ja']
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Tarot Reading',
    url: siteUrl,
    logo: `${siteUrl}/nebula-arcana-logo.svg`,
    description:
      'A free AI tarot reading website with a structured three-card spread and practical interpretation guidance.'
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Tarot Card Reading Tool',
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'AI Tarot Reading',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <OracleConsole />
    </>
  );
}
