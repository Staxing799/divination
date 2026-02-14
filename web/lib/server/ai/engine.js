import { appConfig } from '../config';
import { normalizeLocale } from '../validators';
import { generateFallbackReading } from './fallback';
import { generateWithOpenAiCompatible } from './openai-compatible';

export async function generateDivinationText(input) {
  const prompt = {
    ...input,
    locale: normalizeLocale(input.locale)
  };

  if (!appConfig.ai.enabled) {
    return generateFallbackReading(prompt);
  }

  const provider = appConfig.ai.provider;
  try {
    if (provider === 'openrouter' || provider === 'openai-compatible') {
      return await generateWithOpenAiCompatible(prompt);
    }
    return await generateWithOpenAiCompatible(prompt);
  } catch (error) {
    console.warn('[ai-fallback]', error?.message || error);
    return generateFallbackReading(prompt);
  }
}
