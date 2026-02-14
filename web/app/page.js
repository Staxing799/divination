import OracleConsole from '../components/oracle-console';
import { resolveSiteUrl } from '../lib/site-url';

export default function HomePage() {
  const siteUrl = resolveSiteUrl();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arcana Noire',
    url: siteUrl,
    description:
      'A high-end Tarot ritual experience for reflective decision support.',
    inLanguage: ['en', 'zh', 'es', 'ja']
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Arcana Noire',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best way to do an online tarot reading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use one clear question and a structured spread. Arcana Noire uses a three-card Past, Present, Future layout with upright and reversed card orientation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can beginners use this tarot reading tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The reading flow is beginner-friendly while preserving core tarot logic, including card position and orientation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tarot app free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The current reading experience is free to use for reflective guidance.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OracleConsole />
    </>
  );
}
