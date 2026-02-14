import { resolveSiteUrl } from '../lib/site-url';

export default function sitemap() {
  const siteUrl = resolveSiteUrl();
  const now = new Date();

  return [
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
}
