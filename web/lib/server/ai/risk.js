const EN_RISK_PATTERN =
  /\b(lawsuit|sue|court|contract|custody|divorce|tax|immigration|visa|debt|loan|invest|investment|stock|crypto|bankrupt|bankruptcy|diagnos|prescription|therapy|suicide|self[-\s]?harm|harm|crime|arrest|police)\b/i;

const ES_RISK_PATTERN =
  /\b(demanda|tribunal|contrato|custodia|divorcio|impuestos|inmigracion|visa|deuda|prestamo|inversion|acciones|cripto|bancarrota|diagnostico|terapia|suicidio|autolesion|delito|arresto|policia)\b/i;

const ZH_RISK_KEYWORDS = [
  '法律',
  '起诉',
  '法院',
  '合同',
  '离婚',
  '抚养权',
  '移民',
  '签证',
  '税务',
  '债务',
  '贷款',
  '投资',
  '股票',
  '加密货币',
  '破产',
  '医疗',
  '诊断',
  '处方',
  '心理治疗',
  '自杀',
  '自残',
  '犯罪',
  '报警'
];

const JA_RISK_KEYWORDS = [
  '法律',
  '訴訟',
  '裁判',
  '契約',
  '離婚',
  '親権',
  '移民',
  'ビザ',
  '税金',
  '借金',
  'ローン',
  '投資',
  '株',
  '暗号資産',
  '破産',
  '医療',
  '診断',
  '処方',
  'カウンセリング',
  '自殺',
  '自傷',
  '犯罪',
  '逮捕',
  '警察'
];

export function shouldShowRiskReminder({ question = '', text = '' }) {
  const source = `${question}\n${text}`.toLowerCase();

  if (EN_RISK_PATTERN.test(source)) return true;
  if (ES_RISK_PATTERN.test(source)) return true;
  if (ZH_RISK_KEYWORDS.some((keyword) => source.includes(keyword))) return true;
  if (JA_RISK_KEYWORDS.some((keyword) => source.includes(keyword))) return true;

  return false;
}

export function riskReminder(locale) {
  if (locale === 'es') {
    return 'Recordatorio de riesgo: este tema puede tener impacto legal, medico, financiero o de seguridad. Usa esta lectura como reflexion y verifica decisiones criticas con profesionales calificados.';
  }
  if (locale === 'ja') {
    return 'リスク注意: このテーマは法務・医療・金銭・安全面に影響する可能性があります。結果は内省の参考として扱い、重要な判断は有資格の専門家に確認してください。';
  }
  if (locale === 'zh') {
    return '风险提醒：该议题可能涉及法律、医疗、财务或人身安全影响。请将本次结果用于反思，并就关键决策向合格专业人士确认。';
  }
  return 'Risk reminder: this topic may affect legal, medical, financial, or personal safety decisions. Use this reading for reflection and confirm critical actions with qualified professionals.';
}

export function appendRiskReminderIfNeeded({ text = '', locale = 'en', question = '' }) {
  if (!shouldShowRiskReminder({ question, text })) {
    return text;
  }

  const reminder = riskReminder(locale);
  if (text.includes(reminder)) {
    return text;
  }

  return `${text.trim()}\n\n${reminder}`;
}
