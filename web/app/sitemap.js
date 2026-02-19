import { resolveSiteUrl } from '../lib/site-url';
import { tarotMeaningArticles } from '../lib/tarot-meaning-articles';

export default function sitemap() {
  const siteUrl = resolveSiteUrl();
  const staticPaths = [
    '/',
    '/tarot-reading-online',
    '/three-card-tarot-spread',
    '/tarot-for-creators',
    '/tarot-card-meanings',
    '/tarot-card-meanings/top-10',
    '/about',
    '/tarot-reading-methodology'
  ];

  const staticPages = staticPaths.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`
  }));

  const meaningPages = tarotMeaningArticles.map((article) => ({
    url: `${siteUrl}/tarot-card-meanings/${article.slug}`
  }));

  return [...staticPages, ...meaningPages];
}
