function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const appConfig = {
  jwtSecret: process.env.APP_JWT_SECRET || '',
  jwtExpirationSeconds: toNumber(process.env.APP_JWT_EXPIRATION_SECONDS, 60 * 60 * 24 * 30),
  ai: {
    enabled: (process.env.APP_AI_ENABLED || 'true').toLowerCase() !== 'false',
    provider: (process.env.APP_AI_PROVIDER || 'openrouter').trim().toLowerCase(),
    baseUrl: process.env.APP_AI_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: process.env.APP_AI_API_KEY || '',
    model: process.env.APP_AI_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
    temperature: toNumber(process.env.APP_AI_TEMPERATURE, 0.8),
    maxTokens: toNumber(process.env.APP_AI_MAX_TOKENS, 700),
    timeoutMs: toNumber(process.env.APP_AI_TIMEOUT_MS, 15000)
  }
};

export function ensureJwtSecret() {
  if (!appConfig.jwtSecret || appConfig.jwtSecret.length < 32) {
    throw new Error('APP_JWT_SECRET must be set and at least 32 characters long.');
  }
}
