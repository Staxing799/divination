import { formatSpreadForPrompt } from './tarot';

export function buildSystemPrompt(locale) {
  const language = languageName(locale);
  const headings = sectionHeadings(locale);

  return `You are an elite tarot consultant for a premium global product.
Target audience: young professionals and creative users who want high-quality spiritual reflection with practical direction.

Non-negotiable rules:
1) Respond strictly in ${language}.
2) Keep a confident, cinematic, emotionally intelligent tone. Avoid cheesy lines.
3) Never provide deterministic medical, legal, or financial conclusions.
4) Never claim guaranteed outcomes or fixed fate.
5) Keep output between 220 and 320 words.
6) No markdown code fences. Plain text only.
7) Use this exact section structure and order:
${headings}
8) Action guidance must be specific, time-bounded, and realistic.
9) Interpret only the exact drawn cards and positions provided by the user context. Never invent extra cards.
10) If the question touches high-stakes topics (medical, legal, financial, or safety), add one concise caution line inside the "Risks and Watch-outs" section only.
11) Do not add any standalone legal disclaimer section when there is no high-stakes risk.`;
}

export function buildUserPrompt({ question, locale, spread }) {
  const framework = frameworkPrompt();
  const drawnCards = formatSpreadForPrompt(spread);

  return `User context:
- Divination type: TAROT
- User question: ${question}
- Locale code: ${locale}
- Drawn spread:
${drawnCards}

Generation objective:
Deliver a premium reading that feels insightful, modern, and emotionally precise.
Keep language polished and mature for commercial product quality.

${framework}

Output quality bar:
- Include one clear strategic focus for the next 72 hours.
- Include one risk to avoid this week.
- End with one short signature line that is uplifting but not generic.`;
}

function frameworkPrompt() {
  return `Divination framework: Tarot.
Use a 3-card spread (Past / Present / Future).
For each position, interpret the provided card with its exact orientation (upright/reversed).
For each card, provide symbolic interpretation + one grounded action cue.
Keep archetypes vivid but professional.`;
}

function languageName(locale) {
  switch (locale) {
    case 'es':
      return 'Spanish';
    case 'ja':
      return 'Japanese';
    case 'zh':
      return 'Simplified Chinese';
    default:
      return 'English';
  }
}

function sectionHeadings(locale) {
  switch (locale) {
    case 'es':
      return `- Pulso Cosmico
- Lectura Profunda
- Ritual de Accion (Proximas 72 Horas)
- Riesgos y Cuidado
- Cierre Inspirador`;
    case 'ja':
      return `- 現在の気配
- 深層リーディング
- 行動リチュアル（今後72時間）
- 注意ポイント
- 締めの一言`;
    case 'zh':
      return `- 当下气象
- 深度解读
- 行动仪式（未来72小时）
- 风险提醒
- 收束金句`;
    default:
      return `- Cosmic Snapshot
- Deep Reading
- Action Ritual (Next 72 Hours)
- Risks and Watch-outs
- Closing Line`;
  }
}
