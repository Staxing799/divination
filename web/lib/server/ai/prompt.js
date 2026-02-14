export function buildSystemPrompt(locale) {
  const language = languageName(locale);
  const headings = sectionHeadings(locale);

  return `You are an elite cross-tradition divination consultant for a premium global product.
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
9) Integrate symbolic insight with practical execution advice.
10) In the final "Legal Notice" section, clearly state:
   - This reading is for entertainment and self-reflection only.
   - User should consult licensed professionals for medical, legal, and financial decisions.
   - Service is intended for users age 18+.`;
}

export function buildUserPrompt({ type, question, birthDate, locale }) {
  const framework = frameworkPrompt(type);
  const birthText = birthDate ? birthDate.toISOString().slice(0, 10) : 'not provided';

  return `User context:
- Divination type: ${type}
- User question: ${question}
- Birth date: ${birthText}
- Locale code: ${locale}

Generation objective:
Deliver a premium reading that feels insightful, modern, and emotionally precise.
Keep language polished and mature for commercial product quality.

${framework}

Output quality bar:
- Include one clear strategic focus for the next 72 hours.
- Include one risk to avoid this week.
- End with one short signature line that is uplifting but not generic.`;
}

function frameworkPrompt(type) {
  switch (type) {
    case 'TAROT':
      return `Divination framework: Tarot.
Use a 3-card spread (Past / Present / Future).
For each card, provide symbolic interpretation + one grounded action cue.
Keep archetypes vivid but professional.`;
    case 'EASTERN_FATE':
      return `Divination framework: Eastern fate reading.
Integrate five elements, yin-yang balance, and cycle momentum.
Use birth-date context when available, but avoid overclaiming precision.
Translate metaphysics into practical weekly strategy.`;
    case 'I_CHING':
      return `Divination framework: I Ching-inspired reading.
Provide a plausible hexagram number and name.
Explain core meaning, transition signal, and response strategy.
Focus on timing, restraint, and leverage points.`;
    default:
      return 'Divination framework: mixed symbolic reflection with practical guidance.';
  }
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
- Cierre Inspirador
- Aviso Legal`;
    case 'ja':
      return `- 現在の気配
- 深層リーディング
- 行動リチュアル（今後72時間）
- 注意ポイント
- 締めの一言
- 法的注意`;
    case 'zh':
      return `- 当下气象
- 深度解读
- 行动仪式（未来72小时）
- 风险提醒
- 收束金句
- 法律提示`;
    default:
      return `- Cosmic Snapshot
- Deep Reading
- Action Ritual (Next 72 Hours)
- Risks and Watch-outs
- Closing Line
- Legal Notice`;
  }
}
