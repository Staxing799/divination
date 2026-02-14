export const TAROT_META_PREFIX = '[[TAROT_META_V1]]';

export function packTarotResult(meta, text) {
  return `${TAROT_META_PREFIX}${JSON.stringify(meta)}\n${String(text || '').trim()}`;
}

export function unpackTarotResult(input) {
  const text = String(input || '');
  if (!text.startsWith(TAROT_META_PREFIX)) {
    return { meta: null, text };
  }

  const newlineIndex = text.indexOf('\n');
  if (newlineIndex === -1) {
    return { meta: null, text };
  }

  const metaPart = text.slice(TAROT_META_PREFIX.length, newlineIndex).trim();
  const body = text.slice(newlineIndex + 1).trim();

  try {
    return { meta: JSON.parse(metaPart), text: body };
  } catch {
    return { meta: null, text };
  }
}
