export const DEFAULT_SITE_URL = 'https://prod-divination.vercel.app';

export function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}
