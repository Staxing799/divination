import { appConfig } from '../config';
import { normalizeLocale } from '../validators';
import { packTarotResult } from '../../tarot-payload';
import { generateFallbackReading } from './fallback';
import { generateWithOpenAiCompatible } from './openai-compatible';
import { drawThreeCardSpread } from './tarot';

export async function generateDivinationText(input) {
  const prompt = {
    ...input,
    locale: normalizeLocale(input.locale)
  };
  const spread = drawThreeCardSpread();

  if (!appConfig.ai.enabled) {
    const text = generateFallbackReading({ ...prompt, spread });
    return packTarotResult({ spread }, text);
  }

  const provider = appConfig.ai.provider;
  try {
    if (provider === 'openrouter' || provider === 'openai-compatible') {
      const text = await generateWithOpenAiCompatible({ ...prompt, spread });
      return packTarotResult({ spread }, text);
    }
    const text = await generateWithOpenAiCompatible({ ...prompt, spread });
    return packTarotResult({ spread }, text);
  } catch (error) {
    console.warn('[ai-fallback]', error?.message || error);
    const text = generateFallbackReading({ ...prompt, spread });
    return packTarotResult({ spread }, text);
  }
}
