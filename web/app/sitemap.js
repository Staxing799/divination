import { resolveSiteUrl } from '../lib/site-url';
import { tarotMeaningArticles } from '../lib/tarot-meaning-articles';

export default function sitemap() {
  const siteUrl = resolveSiteUrl();
  const now = new Date();

  const staticPages = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteUrl}/tarot-reading-online`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${siteUrl}/three-card-tarot-spread`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85
    },
    {
      url: `${siteUrl}/tarot-for-creators`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  const meaningPages = tarotMeaningArticles.map((article) => ({
    url: `${siteUrl}/tarot-card-meanings/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.72
  }));

  return [
    ...staticPages,
    {
      url: `${siteUrl}/tarot-card-meanings`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.86
    },
    ...meaningPages
  ];
}
