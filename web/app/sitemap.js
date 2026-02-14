export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ];
}
