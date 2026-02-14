const TAROT_CARDS = [
  ['The Wanderer', 'A leap of faith opens a hidden route.'],
  ['The Magus', 'Skill and timing can turn pressure into advantage.'],
  ['The Moonkeeper', 'Listen to intuition before making visible moves.'],
  ['The Empress', 'Nurture the project that is already showing life.'],
  ['The Emperor', 'Structure and boundaries will protect your progress.'],
  ['The Lantern', 'A short retreat now avoids a long detour later.'],
  ['Wheel of Seasons', 'Change follows a larger pattern, not random luck.'],
  ['The Strength', 'Consistency beats intensity in your current phase.'],
  ['The Hanging Sky', 'Pause and reframe before the next step.'],
  ['The Dawn', 'An ending is clearing space for a cleaner beginning.'],
  ['The Starpath', 'Small signals today point to long-term alignment.'],
  ['The World Tree', 'Your scattered efforts are ready to converge.']
];

const ICHING_ARCHETYPES = [
  'Initiation',
  'Receptivity',
  'Difficulty at the Beginning',
  'Youthful Learning',
  'Patience',
  'Constructive Conflict',
  'Collective Momentum',
  'Measured Flow',
  'Integrity',
  'Strategic Treading',
  'Harmony',
  'Standstill',
  'Community',
  'Great Possession',
  'Modesty',
  'Enthusiasm'
];

export function generateFallbackReading({ type, question, birthDate, locale }) {
  if (type === 'TAROT') return tarotReading(question, locale);
  if (type === 'EASTERN_FATE') return easternReading(question, birthDate, locale);
  return iChingReading(question, locale);
}

function tarotReading(question, locale) {
  const deck = [...TAROT_CARDS].sort(() => Math.random() - 0.5).slice(0, 3);
  const slots = [
    tr(locale, 'Past', 'Pasado', '過去', '过去'),
    tr(locale, 'Present', 'Presente', '現在', '现在'),
    tr(locale, 'Future', 'Futuro', '未来', '未来')
  ];

  const lines = [
    `${tr(locale, 'Tarot spread for your question: ', 'Lectura de tarot para tu pregunta: ', 'あなたの質問に対するタロット展開：', '针对你问题的塔罗解析：')}${question}`,
    ''
  ];

  for (let i = 0; i < deck.length; i += 1) {
    const [name, meaning] = deck[i];
    const reversed = Math.random() >= 0.5;
    lines.push(
      `${slots[i]}: ${name}${
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
  lines.push('');
  lines.push(legalNotice(locale));

  return lines.join('\n');
}

function easternReading(question, birthDate, locale) {
  const date = birthDate || new Date();
  const year = date.getUTCFullYear();
  const day = date.getUTCDate();

  const zodiac = zodiacNames(locale);
  const elements = elementNames(locale);
  const zodiacIndex = ((year - 4) % 12 + 12) % 12;
  const elementIndex = ((year - 4) % 5 + 5) % 5;

  const tendency = tendencyText(day % 4, locale);
  const animal = zodiac[zodiacIndex];
  const element = elements[elementIndex];

  const lines = [
    tr(locale, 'Eastern fortune analysis', 'Analisis de destino oriental', '東洋運勢分析', '东方命理分析'),
    `${tr(locale, 'Question: ', 'Pregunta: ', '質問: ', '问题：')}${question}`,
    `${tr(locale, 'Birth energy: ', 'Energia de nacimiento: ', '生まれの気: ', '出生能量：')}${element} ${animal}`,
    '',
    `${tr(locale, 'Current cycle favors ', 'El ciclo actual favorece ', '現在の流れは ', '当前运势倾向于')}${tendency}. ${tr(
      locale,
      'If you make decisions with clear timing, support will appear from an unexpected channel.',
      'Si decides con un tiempo claro, el apoyo aparecera desde un canal inesperado.',
      '明確なタイミングで判断すれば、思わぬ場所から支援が現れます。',
      '若你以明确节奏做决策，支持会从意想不到的方向出现。'
    )}`,
    '',
    tr(
      locale,
      'Balance tip: combine one bold move with one conservative safeguard this week.',
      'Consejo de equilibrio: combina un movimiento audaz con una proteccion conservadora esta semana.',
      'バランス提案：今週は大胆な一手と堅実な保険を一つずつ組み合わせましょう。',
      '平衡建议：本周采取一项大胆行动，同时保留一项保守防线。'
    ),
    '',
    legalNotice(locale)
  ];

  return lines.join('\n');
}

function iChingReading(question, locale) {
  const upper = Math.floor(Math.random() * 8);
  const lower = Math.floor(Math.random() * 8);
  const hexagramNo = upper * 8 + lower + 1;
  const archetype = ICHING_ARCHETYPES[hexagramNo % ICHING_ARCHETYPES.length];

  const lines = Array.from({ length: 6 })
    .map(() => (Math.random() > 0.5 ? '------' : '--  --'))
    .join('\n');

  return [
    `${tr(locale, 'I Ching casting for: ', 'Lectura del I Ching para: ', '易経占い: ', '易经占卜：')}${question}`,
    '',
    `${tr(locale, 'Hexagram #', 'Hexagrama #', '卦 #', '卦象 #')}${hexagramNo} - ${archetype}`,
    '',
    lines,
    '',
    tr(
      locale,
      'Message: move with integrity, avoid forcing outcomes, and respond to timing rather than urgency.',
      'Mensaje: actua con integridad, evita forzar resultados y responde al momento, no a la urgencia.',
      'メッセージ: 誠実に動き、結果を無理に押し込まず、焦りよりタイミングを優先してください。',
      '启示：以正直行动，不强求结果，顺时而动而非急于求成。'
    ),
    '',
    legalNotice(locale)
  ].join('\n');
}

function legalNotice(locale) {
  return tr(
    locale,
    'Legal notice: For entertainment and self-reflection only (18+). Not a substitute for professional medical, legal, or financial advice.',
    'Aviso legal: solo para entretenimiento y reflexion personal (18+). No reemplaza asesoramiento medico, legal o financiero profesional.',
    '法的注意: 本サービスは娯楽および自己内省目的（18+）です。医療・法律・金融の専門的助言の代替ではありません。',
    '法律提示：本服务仅供娱乐与自我反思（18+），不构成医疗、法律或财务等专业建议。'
  );
}

function zodiacNames(locale) {
  if (locale === 'es') return ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragon', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
  if (locale === 'ja') return ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  if (locale === 'zh') return ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  return ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
}

function elementNames(locale) {
  if (locale === 'es') return ['Madera', 'Fuego', 'Tierra', 'Metal', 'Agua'];
  if (locale === 'ja') return ['木', '火', '土', '金', '水'];
  if (locale === 'zh') return ['木', '火', '土', '金', '水'];
  return ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
}

function tendencyText(index, locale) {
  const map = {
    en: ['expansion', 'stability', 'transition', 'discipline'],
    es: ['expansion', 'estabilidad', 'transicion', 'disciplina'],
    ja: ['拡張', '安定', '転換', '規律'],
    zh: ['扩张', '稳定', '转化', '自律']
  };
  return (map[locale] || map.en)[index] || (map[locale] || map.en)[0];
}

function tr(locale, en, es, ja, zh) {
  if (locale === 'es') return es;
  if (locale === 'ja') return ja;
  if (locale === 'zh') return zh;
  return en;
}
