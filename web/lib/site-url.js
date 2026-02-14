export const DEFAULT_SITE_URL = 'https://divination-eight.vercel.app';

export function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}
