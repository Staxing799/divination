import { appConfig } from '../config';
import { buildSystemPrompt, buildUserPrompt } from './prompt';

export async function generateWithOpenAiCompatible(prompt) {
  const ai = appConfig.ai;
  if (!ai.apiKey || !ai.baseUrl || !ai.model) {
    throw new Error('AI provider not configured');
  }

  const payload = {
    model: ai.model,
    temperature: ai.temperature,
    max_tokens: ai.maxTokens,
    messages: [
      { role: 'system', content: buildSystemPrompt(prompt.locale) },
      { role: 'user', content: buildUserPrompt(prompt) }
    ]
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ai.timeoutMs);

  try {
    const response = await fetch(ai.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ai.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store'
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`AI provider status ${response.status}: ${detail.slice(0, 180)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error('AI provider returned empty content');
    }

    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
}
