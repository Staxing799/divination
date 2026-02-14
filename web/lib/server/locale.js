const SUPPORTED = ['en', 'zh', 'es', 'ja'];

const MESSAGES = {
  en: {
    'error.auth.email_registered': 'Email is already registered',
    'error.auth.invalid_credentials': 'Invalid credentials',
    'error.auth.unauthorized': 'Authentication required',
    'error.user.not_found': 'User not found',
    'error.legal.consent_required': 'Legal acknowledgements are required before starting readings',
    'error.divination.history_not_found': 'History record not found',
    'error.billing.stripe_checkout_disabled': 'Stripe checkout is temporarily disabled',
    'error.billing.stripe_webhook_disabled': 'Stripe webhook is temporarily disabled',
    'error.server.invalid_json': 'Invalid JSON payload',
    'error.server.unexpected': 'Unexpected server error',
    'validation.email.invalid': 'must be a valid email',
    'validation.required': 'is required',
    'validation.password.length': 'must be 8-128 characters',
    'validation.display_name.length': 'must be 2-80 characters',
    'validation.question.length': 'must be 3-500 characters',
    'validation.type.required': 'type is required',
    'validation.birth_date.invalid': 'birthDate must be a valid date',
    'validation.legal.age18_required': 'must confirm you are 18+',
    'validation.legal.entertainment_required': 'must accept entertainment-only usage',
    'validation.legal.advisory_required': 'must accept professional-advice limitations'
  },
  zh: {
    'error.auth.email_registered': '邮箱已被注册',
    'error.auth.invalid_credentials': '账号或密码错误',
    'error.auth.unauthorized': '请先登录',
    'error.user.not_found': '用户不存在',
    'error.legal.consent_required': '请先完成法律确认再开始占卜',
    'error.divination.history_not_found': '历史记录不存在',
    'error.billing.stripe_checkout_disabled': 'Stripe 支付入口已关闭',
    'error.billing.stripe_webhook_disabled': 'Stripe Webhook 已关闭',
    'error.server.invalid_json': '请求 JSON 无效',
    'error.server.unexpected': '服务器发生异常',
    'validation.email.invalid': '邮箱格式不正确',
    'validation.required': '为必填项',
    'validation.password.length': '密码长度需为 8-128 位',
    'validation.display_name.length': '昵称长度需为 2-80 个字符',
    'validation.question.length': '问题长度需为 3-500 个字符',
    'validation.type.required': '占卜类型不能为空',
    'validation.birth_date.invalid': 'birthDate 不是有效日期',
    'validation.legal.age18_required': '必须确认已满 18 岁',
    'validation.legal.entertainment_required': '必须同意仅供娱乐与自我反思',
    'validation.legal.advisory_required': '必须同意专业建议免责声明'
  },
  es: {
    'error.auth.email_registered': 'El correo ya esta registrado',
    'error.auth.invalid_credentials': 'Credenciales invalidas',
    'error.auth.unauthorized': 'Autenticacion requerida',
    'error.user.not_found': 'Usuario no encontrado',
    'error.legal.consent_required': 'Debes aceptar los avisos legales antes de iniciar lecturas',
    'error.divination.history_not_found': 'Registro de historial no encontrado',
    'error.billing.stripe_checkout_disabled': 'Stripe checkout esta deshabilitado temporalmente',
    'error.billing.stripe_webhook_disabled': 'Stripe webhook esta deshabilitado temporalmente',
    'error.server.invalid_json': 'Payload JSON invalido',
    'error.server.unexpected': 'Error inesperado del servidor',
    'validation.email.invalid': 'debe ser un correo valido',
    'validation.required': 'es obligatorio',
    'validation.password.length': 'debe tener entre 8 y 128 caracteres',
    'validation.display_name.length': 'debe tener entre 2 y 80 caracteres',
    'validation.question.length': 'debe tener entre 3 y 500 caracteres',
    'validation.type.required': 'type es obligatorio',
    'validation.birth_date.invalid': 'birthDate debe ser una fecha valida',
    'validation.legal.age18_required': 'debes confirmar que tienes 18+',
    'validation.legal.entertainment_required': 'debes aceptar el uso solo para entretenimiento',
    'validation.legal.advisory_required': 'debes aceptar la limitacion de asesoramiento profesional'
  },
  ja: {
    'error.auth.email_registered': 'メールアドレスは既に登録されています',
    'error.auth.invalid_credentials': '認証情報が正しくありません',
    'error.auth.unauthorized': '認証が必要です',
    'error.user.not_found': 'ユーザーが見つかりません',
    'error.legal.consent_required': '鑑定を開始する前に法的確認が必要です',
    'error.divination.history_not_found': '履歴が見つかりません',
    'error.billing.stripe_checkout_disabled': 'Stripe チェックアウトは一時停止中です',
    'error.billing.stripe_webhook_disabled': 'Stripe Webhook は一時停止中です',
    'error.server.invalid_json': 'JSON ペイロードが不正です',
    'error.server.unexpected': 'サーバーで予期しないエラーが発生しました',
    'validation.email.invalid': '有効なメールアドレスを入力してください',
    'validation.required': 'は必須です',
    'validation.password.length': '8〜128文字で入力してください',
    'validation.display_name.length': '2〜80文字で入力してください',
    'validation.question.length': '3〜500文字で入力してください',
    'validation.type.required': 'type は必須です',
    'validation.birth_date.invalid': 'birthDate は有効な日付である必要があります',
    'validation.legal.age18_required': '18歳以上であることの確認が必要です',
    'validation.legal.entertainment_required': '娯楽利用への同意が必要です',
    'validation.legal.advisory_required': '専門助言に関する免責への同意が必要です'
  }
};

export function normalizeLanguage(input) {
  const value = (input || '').toLowerCase();
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('es')) return 'es';
  if (value.startsWith('ja')) return 'ja';
  return 'en';
}

export function resolveRequestLanguage(request) {
  return normalizeLanguage(request.headers.get('accept-language') || 'en');
}

export function t(language, key) {
  const lang = SUPPORTED.includes(language) ? language : 'en';
  return MESSAGES[lang][key] || MESSAGES.en[key] || key;
}
