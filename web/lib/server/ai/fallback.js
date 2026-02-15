import { appendRiskReminderIfNeeded } from './risk';

const CARD_HINTS = {
  'The Fool': 'a leap, trust, fresh cycle',
  'The Magician': 'focus, agency, skill alignment',
  'The High Priestess': 'silence, intuition, hidden layers',
  'The Empress': 'nurture, growth, abundance',
  'The Emperor': 'structure, authority, boundaries',
  'The Hierophant': 'tradition, mentor wisdom, doctrine',
  'The Lovers': 'alignment, values, meaningful choice',
  'The Chariot': 'discipline, will, directional control',
  Strength: 'inner composure, courage, soft power',
  'The Hermit': 'retreat, discernment, inner guide',
  'Wheel of Fortune': 'timing, cycles, turning point',
  Justice: 'truth, accountability, clean decisions',
  'The Hanged Man': 'pause, surrender, reframing',
  Death: 'ending, release, transformation',
  Temperance: 'balance, pacing, integration',
  'The Devil': 'attachment, temptation, shadow work',
  'The Tower': 'disruption, revelation, reset',
  'The Star': 'hope, renewal, faith',
  'The Moon': 'uncertainty, projection, subconscious',
  'The Sun': 'clarity, vitality, confidence',
  Judgement: 'awakening, calling, audit',
  'The World': 'closure, mastery, completion'
};

export function generateFallbackReading({ question, locale, spread }) {
  return tarotReading(question, locale, spread);
}

function tarotReading(question, locale, spread) {
  const cards = spread?.cards || [];

  const lines = [
    `${tr(locale, 'Tarot spread for your question: ', 'Lectura de tarot para tu pregunta: ', 'あなたの質問に対するタロット展開：', '针对你问题的塔罗解析：')}${question}`,
    ''
  ];

  for (const card of cards) {
    const name = card.name;
    const reversed = card.orientation === 'REVERSED';
    const position = positionLabel(card.position, locale);
    const meaning = CARD_HINTS[name] || 'symbolic redirection and practical timing';

    lines.push(
      `${position}: ${name}${
        reversed
          ? tr(locale, ' (Reversed)', ' (Invertida)', '（逆位置）', '（逆位）')
          : tr(locale, ' (Upright)', ' (Derecha)', '（正位置）', '（正位）')
      }`
    );
    lines.push(
      reversed
        ? tr(
            locale,
            `Reversal: ${meaning} Watch for overcorrection and hidden assumptions.`,
            `Invertida: ${meaning} Vigila la sobrecorreccion y los supuestos ocultos.`,
            `逆位置: ${meaning} 行き過ぎた修正と見落とした前提に注意してください。`,
            `逆位：${meaning} 注意过度纠偏和隐藏假设。`
          )
        : meaning
    );
    lines.push('');
  }

  lines.push(
    tr(
      locale,
      'Practical direction: prioritize one action in 24 hours and let momentum answer the rest.',
      'Direccion practica: prioriza una accion en 24 horas y deja que el impulso responda al resto.',
      '実践アドバイス：24時間以内に一つ実行し、残りは流れに任せてください。',
      '实践建议：在24小时内先完成一个行动，其余答案会随势而来。'
    )
  );
  return appendRiskReminderIfNeeded({
    text: lines.join('\n'),
    locale,
    question
  });
}

function positionLabel(position, locale) {
  if (position === 'PAST') return tr(locale, 'Past', 'Pasado', '過去', '过去');
  if (position === 'PRESENT') return tr(locale, 'Present', 'Presente', '現在', '现在');
  return tr(locale, 'Future', 'Futuro', '未来', '未来');
}

function tr(locale, en, es, ja, zh) {
  if (locale === 'es') return es;
  if (locale === 'ja') return ja;
  if (locale === 'zh') return zh;
  return en;
}
