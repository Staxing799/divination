'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  acceptLegalConsent,
  clearDivinationHistory,
  createDivination,
  deleteDivinationHistoryItem,
  getDivinationHistory,
  login,
  me,
  register
} from '../lib/api';
import { unpackTarotResult } from '../lib/tarot-payload';
import { COPY, SUPPORTED_LANGUAGES, translate } from '../lib/locale';
import { createRitualPool, createSpreadFromPool, makeGuestReading } from '../lib/tarot-ritual';
import { useLanguage } from './language-provider';
import HomeSeoContent from './home-seo-content';

const READING_TYPES = [{ id: 'TAROT', key: 'tarot' }];
const RITUAL_STATUSES = {
  IDLE: 'IDLE',
  SELECTING: 'SELECTING',
  REVEALING: 'REVEALING',
  DONE: 'DONE'
};

const LANGUAGE_LABELS = {
  en: 'EN',
  zh: '中文',
  es: 'ES',
  ja: '日本語'
};

const INITIAL_AUTH_FORM = {
  displayName: '',
  email: '',
  password: '',
  entertainmentOnlyAccepted: false,
  age18Confirmed: false,
  advisoryNoticeAccepted: false
};

const INITIAL_READING_FORM = {
  type: 'TAROT',
  question: ''
};

function formatDate(isoText, language) {
  const date = new Date(isoText);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  try {
    return new Intl.DateTimeFormat(language, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

function normalizeReadingRecord(record) {
  if (!record) return record;
  if (record.tarotMeta !== undefined) return record;

  const parsed = unpackTarotResult(record.resultText);
  return {
    ...record,
    resultText: parsed.text,
    tarotMeta: parsed.meta?.spread?.cards || []
  };
}

function ritualStepLabel(language) {
  if (language === 'zh') {
    return ['1 提问', '2 选三张', '3 翻牌', '4 解读', '5 72小时行动'];
  }
  return ['1 Ask', '2 Pick 3', '3 Reveal', '4 Read', '5 72h Action'];
}

function ritualStatusText(language, status, picks) {
  if (language === 'zh') {
    if (status === RITUAL_STATUSES.SELECTING) {
      return `从 6 张牌中选择 3 张（已选 ${picks}/3）`;
    }
    if (status === RITUAL_STATUSES.REVEALING) {
      return '正在揭示牌阵并生成解读...';
    }
    return '输入问题并开始本轮三张牌仪式。';
  }

  if (status === RITUAL_STATUSES.SELECTING) {
    return `Pick 3 cards from 6 (${picks}/3 selected).`;
  }
  if (status === RITUAL_STATUSES.REVEALING) {
    return 'Revealing your spread and generating reading...';
  }
  return 'Enter one clear question and start your 3-card ritual.';
}

function copyByLanguage(language, values) {
  if (values[language]) return values[language];
  return values.en;
}

function quickInterpretationTitle(language) {
  return copyByLanguage(language, {
    en: 'Spread Interpretation',
    zh: '牌阵补充解读',
    es: 'Interpretacion de la tirada',
    ja: 'スプレッド補足解釈'
  });
}

function positionInterpretation(position, language) {
  if (position === 'PAST') {
    return copyByLanguage(language, {
      en: 'This card shows the old pattern still shaping the situation.',
      zh: '这张牌在说明仍在影响当下的旧模式。',
      es: 'Esta carta muestra el patron anterior que aun influye en la situacion.',
      ja: 'このカードは、今も影響している過去のパターンを示します。'
    });
  }

  if (position === 'PRESENT') {
    return copyByLanguage(language, {
      en: 'This card points to your current core tension and choice.',
      zh: '这张牌对应你现在最核心的张力与选择。',
      es: 'Esta carta senala la tension central y la eleccion actual.',
      ja: 'このカードは、現在の中心的な緊張点と選択を示します。'
    });
  }

  return copyByLanguage(language, {
    en: 'This card points to the likely direction if your current rhythm continues.',
    zh: '这张牌指向你保持当前节奏时最可能出现的走向。',
    es: 'Esta carta indica la direccion probable si mantienes el ritmo actual.',
    ja: 'このカードは、今の流れを続けた場合の向かう先を示します。'
  });
}

function arcanaInterpretation(card, language) {
  if (card.arcana === 'MAJOR') {
    return copyByLanguage(language, {
      en: 'Major Arcana theme: long-cycle turning point and high-impact lesson.',
      zh: '大阿卡纳主题：这是长周期转折与高影响课题。',
      es: 'Tema de Arcanos Mayores: punto de giro de ciclo largo y leccion de alto impacto.',
      ja: '大アルカナの主題: 長期サイクルの転換点と重要な学びです。'
    });
  }

  if (card.suit === 'Wands') {
    return copyByLanguage(language, {
      en: 'Wands focus: initiative, drive, and execution speed.',
      zh: '权杖主题：主动性、推进力与执行速度。',
      es: 'Enfoque de Bastos: iniciativa, impulso y velocidad de ejecucion.',
      ja: 'ワンドの焦点: 主体性、推進力、実行スピード。'
    });
  }

  if (card.suit === 'Cups') {
    return copyByLanguage(language, {
      en: 'Cups focus: emotions, trust, and relationship signals.',
      zh: '圣杯主题：情绪流动、信任与关系信号。',
      es: 'Enfoque de Copas: emociones, confianza y senales relacionales.',
      ja: 'カップの焦点: 感情、信頼、関係のサイン。'
    });
  }

  if (card.suit === 'Swords') {
    return copyByLanguage(language, {
      en: 'Swords focus: clarity, conflict, and decision quality.',
      zh: '宝剑主题：认知清晰度、冲突与决策质量。',
      es: 'Enfoque de Espadas: claridad, conflicto y calidad de decision.',
      ja: 'ソードの焦点: 明晰さ、対立、意思決定の質。'
    });
  }

  if (card.suit === 'Pentacles') {
    return copyByLanguage(language, {
      en: 'Pentacles focus: resources, money rhythm, and tangible stability.',
      zh: '星币主题：资源配置、金钱节奏与现实稳定性。',
      es: 'Enfoque de Oros: recursos, ritmo financiero y estabilidad tangible.',
      ja: 'ペンタクルの焦点: 資源配分、金銭リズム、現実的な安定。'
    });
  }

  return copyByLanguage(language, {
    en: 'Minor Arcana theme: practical adjustment in daily decisions.',
    zh: '小阿卡纳主题：日常层面的务实调整。',
    es: 'Tema de Arcanos Menores: ajuste practico en decisiones cotidianas.',
    ja: '小アルカナの主題: 日常判断での実務的な調整。'
  });
}

function orientationInterpretation(orientation, language) {
  if (orientation === 'REVERSED') {
    return copyByLanguage(language, {
      en: 'Reversed cue: reduce overcorrection and clear internal friction first.',
      zh: '逆位提示：先降低用力过度，优先清理内在阻滞。',
      es: 'Clave invertida: reduce la sobrecorreccion y limpia primero la friccion interna.',
      ja: '逆位置の示唆: 修正しすぎを抑え、まず内側の摩擦を整える。'
    });
  }

  return copyByLanguage(language, {
    en: 'Upright cue: the energy is available now, so act in a simple and direct way.',
    zh: '正位提示：这股能量可直接使用，行动宜简洁直接。',
    es: 'Clave derecha: la energia esta disponible, actua de forma simple y directa.',
    ja: '正位置の示唆: 今はエネルギーを使えるため、シンプルに前進する。'
  });
}

function positionLabelFromCopy(position, copy) {
  if (position === 'PAST') return copy.tarotPosPAST;
  if (position === 'PRESENT') return copy.tarotPosPRESENT;
  return copy.tarotPosFUTURE;
}

function buildQuickInterpretation(cards, language, copy) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return [];
  }

  return cards.map((card, index) => {
    const positionLabel = positionLabelFromCopy(card.position, copy);
    const orientationLabel = card.orientation === 'REVERSED' ? copy.tarotReversed : copy.tarotUpright;
    const title = language === 'zh' || language === 'ja'
      ? `${positionLabel}｜${card.name}（${orientationLabel}）`
      : `${positionLabel} | ${card.name} (${orientationLabel})`;

    const body = [
      positionInterpretation(card.position, language),
      arcanaInterpretation(card, language),
      orientationInterpretation(card.orientation, language)
    ].join(' ');

    return {
      key: `${card.cardId || card.name}-${card.position}-${index}`,
      title,
      body
    };
  });
}

export default function OracleConsole() {
  const { language, setLanguage, hydrated } = useLanguage();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [guestResult, setGuestResult] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  const [authMode, setAuthMode] = useState('login');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authForm, setAuthForm] = useState(INITIAL_AUTH_FORM);
  const [readingForm, setReadingForm] = useState(INITIAL_READING_FORM);

  const [booting, setBooting] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [readingBusy, setReadingBusy] = useState(false);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [ritualTick, setRitualTick] = useState(0);

  const [ritualStatus, setRitualStatus] = useState(RITUAL_STATUSES.IDLE);
  const [ritualPool, setRitualPool] = useState([]);
  const [selectedPoolIndexes, setSelectedPoolIndexes] = useState([]);
  const [ritualSpread, setRitualSpread] = useState(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const messageTimerRef = useRef(null);
  const revealTimerRef = useRef(null);

  const copy = useMemo(() => COPY[language] || COPY.en, [language]);
  const t = (key, vars) => translate(language, key, vars);
  const authenticated = Boolean(token);
  const typeLabel = (type) => {
    const matched = READING_TYPES.find((item) => item.id === type);
    return matched ? copy[matched.key] : type;
  };

  function flash(text) {
    setMessage(text);
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    messageTimerRef.current = setTimeout(() => {
      setMessage('');
    }, 2800);
  }

  function clearRevealTimer() {
    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedToken = localStorage.getItem('oracle_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
      clearRevealTimer();
    };
  }, []);

  useEffect(() => {
    if (!authModalOpen) {
      return undefined;
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setAuthModalOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [authModalOpen]);

  useEffect(() => {
    if (!authenticated) {
      setUser(null);
      setHistory([]);
      setResult(null);
      setActiveHistoryId(null);
      return;
    }

    let canceled = false;

    async function bootstrap() {
      setBooting(true);
      setError('');
      try {
        const [profile, records] = await Promise.all([
          me(token, language),
          getDivinationHistory(token, language)
        ]);
        if (canceled) {
          return;
        }
        setUser(profile);
        applyHistory(records);
      } catch (err) {
        if (canceled) {
          return;
        }
        setError(err.message || t('errorRequestFallback'));
        if (err.status === 401) {
          handleLogout();
        }
      } finally {
        if (!canceled) {
          setBooting(false);
        }
      }
    }

    bootstrap();

    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, token, language]);

  function applyHistory(items) {
    const normalized = items.map(normalizeReadingRecord);
    setHistory(normalized);
    if (!activeHistoryId) {
      return;
    }
    const selected = normalized.find((item) => item.id === activeHistoryId);
    if (!selected) {
      if (result?.id === activeHistoryId) {
        setResult(null);
      }
      setActiveHistoryId(null);
      return;
    }
    if (result?.id === selected.id) {
      setResult(selected);
    }
  }

  function persistToken(nextToken) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('oracle_token', nextToken);
    }
    setToken(nextToken);
  }

  function clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oracle_token');
    }
    setToken(null);
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    setHistory([]);
    setResult(null);
    setGuestResult(null);
    setActiveHistoryId(null);
    setAuthForm(INITIAL_AUTH_FORM);
    setReadingForm(INITIAL_READING_FORM);
    setConfirmingClear(false);
    setError('');
    setMessage('');
  }

  function openAuthModal(nextMode = 'login') {
    setAuthMode(nextMode);
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    if (authBusy) {
      return;
    }
    setAuthModalOpen(false);
  }

  function resetRitualBoard() {
    clearRevealTimer();
    setRitualPool([]);
    setSelectedPoolIndexes([]);
    setRitualSpread(null);
    setRevealedCount(0);
    setRitualStatus(RITUAL_STATUSES.IDLE);
    setRitualTick((value) => value + 1);
  }

  async function onAuthSubmit(event) {
    event.preventDefault();
    setAuthBusy(true);
    setError('');
    setMessage('');

    try {
      const payload = authMode === 'register'
        ? {
            email: authForm.email,
            password: authForm.password,
            displayName: authForm.displayName,
            locale: language,
            age18Confirmed: authForm.age18Confirmed,
            entertainmentOnlyAccepted: authForm.entertainmentOnlyAccepted,
            advisoryNoticeAccepted: authForm.advisoryNoticeAccepted
          }
        : {
            email: authForm.email,
            password: authForm.password
          };

      const response = authMode === 'register'
        ? await register(payload, language)
        : await login(payload, language);

      persistToken(response.token);
      setUser(response.user);
      setAuthForm(INITIAL_AUTH_FORM);
      setAuthModalOpen(false);
      flash(t('authSuccess'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setAuthBusy(false);
    }
  }

  function startSelectionStage() {
    const question = readingForm.question.trim();
    if (question.length < 3) {
      setError(t('questionTooShort'));
      return;
    }

    setError('');
    setMessage('');
    setResult(null);
    setGuestResult(null);
    setActiveHistoryId(null);
    setRitualPool(createRitualPool(6));
    setSelectedPoolIndexes([]);
    setRitualSpread(null);
    setRevealedCount(0);
    setRitualStatus(RITUAL_STATUSES.SELECTING);
    setRitualTick((value) => value + 1);
  }

  function togglePoolCard(index) {
    if (ritualStatus !== RITUAL_STATUSES.SELECTING) {
      return;
    }

    setSelectedPoolIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((value) => value !== index);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, index];
    });
  }

  async function runReadingWithSpread(spread) {
    setReadingBusy(true);

    try {
      const question = readingForm.question.trim();
      if (authenticated) {
        if (!user?.legalReady) {
          setError(t('legalGateNeededError'));
          return;
        }

        const data = await createDivination(
          {
            type: readingForm.type,
            question,
            locale: language,
            spread
          },
          token,
          language
        );

        setResult(normalizeReadingRecord(data));
        setActiveHistoryId(data.id);
        setReadingForm((prev) => ({
          ...prev,
          question: ''
        }));

        const records = await getDivinationHistory(token, language);
        applyHistory(records);
        flash(t('readGenerated'));
      } else {
        const guestText = makeGuestReading({ question, spread, locale: language });
        setGuestResult({
          id: `guest-${Date.now()}`,
          type: 'TAROT',
          question,
          resultText: guestText,
          createdAt: new Date().toISOString(),
          tarotMeta: spread.cards
        });
      }
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setReadingBusy(false);
      setRitualStatus(RITUAL_STATUSES.DONE);
    }
  }

  async function onRitualSubmit(event) {
    event.preventDefault();

    if (ritualStatus !== RITUAL_STATUSES.SELECTING) {
      startSelectionStage();
      return;
    }

    if (selectedPoolIndexes.length !== 3) {
      return;
    }

    const spread = createSpreadFromPool(ritualPool, selectedPoolIndexes);
    setRitualSpread(spread);
    setRitualStatus(RITUAL_STATUSES.REVEALING);
    setRevealedCount(0);

    clearRevealTimer();
    revealTimerRef.current = setInterval(() => {
      setRevealedCount((value) => {
        if (value >= 3) {
          clearRevealTimer();
          return 3;
        }
        return value + 1;
      });
    }, 320);

    await runReadingWithSpread(spread);
  }

  async function onConfirmLegal() {
    if (!token || !user || user.legalReady) {
      return;
    }

    try {
      const profile = await acceptLegalConsent(
        {
          age18Confirmed: true,
          entertainmentOnlyAccepted: true,
          advisoryNoticeAccepted: true
        },
        token,
        language
      );
      setUser(profile);
      flash(t('legalGateSaved'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    }
  }

  async function onDeleteHistory(recordId) {
    if (!token || removingId || historyBusy) {
      return;
    }

    setRemovingId(recordId);
    setError('');

    try {
      await deleteDivinationHistoryItem(recordId, token, language);
      if (result?.id === recordId) {
        setResult(null);
        setActiveHistoryId(null);
      }
      setHistory((items) => items.filter((item) => item.id !== recordId));
      flash(t('historyDeleted'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setRemovingId(null);
    }
  }

  function requestClearHistory() {
    if (!token || history.length === 0 || historyBusy) {
      return;
    }
    setConfirmingClear(true);
  }

  async function onClearHistory() {
    if (!token || history.length === 0 || historyBusy) {
      return;
    }
    setHistoryBusy(true);
    setError('');

    try {
      const payload = await clearDivinationHistory(token, language);
      setHistory([]);
      setResult(null);
      setActiveHistoryId(null);
      setConfirmingClear(false);
      flash(t('historyCleared', { count: payload?.deletedCount ?? 0 }));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setHistoryBusy(false);
    }
  }

  function viewHistory(item) {
    setResult(normalizeReadingRecord(item));
    setGuestResult(null);
    setActiveHistoryId(item.id);
    setRitualStatus(RITUAL_STATUSES.DONE);
    setRitualSpread({ spread: 'THREE_CARD', cards: item.tarotMeta || [] });
    setRevealedCount(3);
    setRitualTick((value) => value + 1);
  }

  const displayResult = authenticated ? result : guestResult;
  const displayCards = displayResult?.tarotMeta || [];
  const quickInterpretationItems = useMemo(
    () => buildQuickInterpretation(displayCards, language, copy),
    [displayCards, language, copy]
  );
  const showSelectionGrid = ritualStatus === RITUAL_STATUSES.SELECTING;
  const showRevealGrid = ritualSpread?.cards?.length > 0 && (ritualStatus === RITUAL_STATUSES.REVEALING || ritualStatus === RITUAL_STATUSES.DONE);
  const ritualButtonText = ritualStatus === RITUAL_STATUSES.SELECTING
    ? (language === 'zh' ? '确认三张牌并揭示' : 'Confirm 3 cards and reveal')
    : (language === 'zh' ? '开始三张牌仪式' : 'Start 3-card ritual');

  return (
    <div className="site-shell">
      <div className="nebula-layer layer-1" aria-hidden="true" />
      <div className="nebula-layer layer-2" aria-hidden="true" />
      <div className="nebula-layer layer-3" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark" aria-hidden="true">
            <img src="/nebula-arcana-mark.svg" alt="" />
          </span>
          <div>
            <h1>{copy.brandName}</h1>
            <p>{copy.brandTagline}</p>
          </div>
        </div>

        <div className="top-tools">
          <div className="lang-switch" role="group" aria-label={copy.localeLabel}>
            {SUPPORTED_LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                className={language === code ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLanguage(code)}
              >
                {LANGUAGE_LABELS[code]}
              </button>
            ))}
          </div>
          {authenticated && (
            <button type="button" className="ghost-btn" onClick={handleLogout}>
              {copy.logout}
            </button>
          )}
          {!authenticated && (
            <button type="button" className="ghost-btn" onClick={() => openAuthModal('login')}>
              {copy.signIn}
            </button>
          )}
        </div>
      </header>

      <main className={authenticated ? 'content-wrap is-auth' : 'content-wrap'}>
        {authenticated && (
          <>
            <div className="ritual-aura ritual-aura-left" aria-hidden="true" />
            <div className="ritual-aura ritual-aura-right" aria-hidden="true" />
          </>
        )}

        {!authenticated && (
          <section className="hero-card card">
            <p className="hero-kicker">{copy.brandName}</p>
            <div className="hero-chip-row">
              <span>{copy.heroAudience1}</span>
              <span>{copy.heroAudience2}</span>
              <span>{copy.heroAudience3}</span>
            </div>
            <h2>{copy.heroTitle}</h2>
            <p>{copy.heroSubtitle}</p>
            <div className="hero-cta-row">
              <button type="button" className="primary-btn" onClick={() => openAuthModal('register')}>
                {copy.heroCta}
              </button>
              <p className="hero-trust">{copy.heroTrust}</p>
            </div>
          </section>
        )}

        <section className="card reading-card">
          <div className="section-head">
            <h3>{authenticated ? copy.dashboardTitle : (language === 'zh' ? '塔罗游戏规则' : 'Tarot Ritual Rules')}</h3>
          </div>

          <p className="muted">{authenticated ? copy.dashboardSubtitle : ritualStatusText(language, ritualStatus, selectedPoolIndexes.length)}</p>

          <div className="ritual-steps">
            {ritualStepLabel(language).map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>

          {authenticated && user && !user.legalReady && (
            <div className="legal-box legal-inline-box">
              <p>{copy.legalGateDesc}</p>
              <button type="button" className="ghost-btn" onClick={onConfirmLegal}>
                {copy.legalGateAction}
              </button>
            </div>
          )}

          <form className="form-grid" onSubmit={onRitualSubmit}>
            <div className="field-label">{copy.tarot}</div>

            <label>
              <span>{copy.questionLabel}</span>
              <textarea
                required
                minLength={3}
                maxLength={500}
                value={readingForm.question}
                onChange={(event) =>
                  setReadingForm((prev) => ({ ...prev, question: event.target.value }))
                }
              />
            </label>

            <div className="ritual-action-row">
              <button
                type="submit"
                className="primary-btn"
                disabled={readingBusy || ritualStatus === RITUAL_STATUSES.REVEALING || (ritualStatus === RITUAL_STATUSES.SELECTING && selectedPoolIndexes.length !== 3)}
              >
                {readingBusy ? copy.loading : ritualButtonText}
              </button>
              {(ritualStatus !== RITUAL_STATUSES.IDLE || displayResult) && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={resetRitualBoard}
                  disabled={readingBusy}
                >
                  {language === 'zh' ? '重置本轮' : 'Reset Ritual'}
                </button>
              )}
            </div>
          </form>

          {showSelectionGrid && (
            <div className="ritual-pool" role="list" aria-label={language === 'zh' ? '抽牌区' : 'Card selection area'}>
              {ritualPool.map((card, index) => {
                const selected = selectedPoolIndexes.includes(index);
                return (
                  <button
                    key={`${card.id}-${index}`}
                    type="button"
                    className={selected ? 'ritual-pool-card selected' : 'ritual-pool-card'}
                    onClick={() => togglePoolCard(index)}
                  >
                    <span>{selected ? `${selectedPoolIndexes.indexOf(index) + 1}` : '✦'}</span>
                  </button>
                );
              })}
            </div>
          )}

          {showRevealGrid && (
            <div className="tarot-stage" key={`reveal-${ritualTick}`}>
              {ritualSpread.cards.map((card, index) => {
                const visible = ritualStatus === RITUAL_STATUSES.DONE || revealedCount > index;
                return (
                  <article
                    key={`${card.cardId}-${card.position}-${index}`}
                    className={`tarot-card ${card.orientation === 'REVERSED' ? 'reversed' : ''} ${visible ? 'is-visible' : 'is-loading'}`}
                    style={{ '--delay': `${index * 160}ms` }}
                  >
                    {visible ? (
                      <>
                        <p className="tarot-pos">{t(`tarotPos${card.position}`)}</p>
                        <h4>{card.name}</h4>
                        <span>{card.orientation === 'REVERSED' ? copy.tarotReversed : copy.tarotUpright}</span>
                      </>
                    ) : (
                      <div className="tarot-back-star" />
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="card result-card">
          <div className="section-head">
            <h3>{copy.latestReading}</h3>
          </div>

          {displayResult ? (
            <article className="result-content">
              {displayCards.length > 0 && ritualStatus === RITUAL_STATUSES.IDLE && (
                <div className="tarot-stage" key={`${displayResult.id}-${ritualTick}`}>
                  {displayCards.map((card, index) => (
                    <article
                      key={`${card.cardId}-${card.position}-${index}`}
                      className={`tarot-card ${card.orientation === 'REVERSED' ? 'reversed' : ''}`}
                      style={{ '--delay': `${index * 140}ms` }}
                    >
                      <p className="tarot-pos">{t(`tarotPos${card.position}`)}</p>
                      <h4>{card.name}</h4>
                      <span>{card.orientation === 'REVERSED' ? copy.tarotReversed : copy.tarotUpright}</span>
                    </article>
                  ))}
                </div>
              )}
              <p className="result-meta">{typeLabel(displayResult.type)} · {formatDate(displayResult.createdAt, language)}</p>
              <pre>{displayResult.resultText}</pre>
              {quickInterpretationItems.length > 0 && (
                <section className="result-interpretation">
                  <p className="result-interpretation-title">{quickInterpretationTitle(language)}</p>
                  <ul>
                    {quickInterpretationItems.map((item) => (
                      <li key={item.key}>
                        <strong>{item.title}</strong>
                        <span>{item.body}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {!authenticated && (
                <div className="guest-upgrade">
                  <p>{language === 'zh' ? '游客模式不会保存历史，注册后可保存每次牌阵与解读。' : 'Guest mode does not save history. Create an account to keep your spread timeline.'}</p>
                  <button type="button" className="primary-btn" onClick={() => openAuthModal('register')}>
                    {copy.signUp}
                  </button>
                </div>
              )}
            </article>
          ) : (
            <p className="muted">{readingBusy ? copy.tarotShuffling : copy.emptyReading}</p>
          )}
        </section>

        {authenticated && (
          <section className="card history-card">
            <div className="section-head">
              <h3>{copy.historyTitle}</h3>
              <button
                type="button"
                className="ghost-btn"
                onClick={requestClearHistory}
                disabled={historyBusy || history.length === 0}
              >
                {historyBusy ? copy.loading : copy.clearHistory}
              </button>
            </div>

            {history.length === 0 && <p className="muted">{copy.noHistory}</p>}

            {history.length > 0 && (
              <ul className="history-list">
                {history.map((item) => (
                  <li key={item.id} className={activeHistoryId === item.id ? 'active' : ''}>
                    <div className="history-top">
                      <div>
                        <strong>{typeLabel(item.type)}</strong>
                        <span>{formatDate(item.createdAt, language)}</span>
                      </div>
                      <div className="history-actions">
                        <button
                          type="button"
                          className={activeHistoryId === item.id ? 'ghost-btn tiny active' : 'ghost-btn tiny'}
                          onClick={() => viewHistory(item)}
                        >
                          {copy.viewHistory}
                        </button>
                        <button
                          type="button"
                          className="danger-btn tiny"
                          onClick={() => onDeleteHistory(item.id)}
                          disabled={Boolean(removingId) || historyBusy}
                        >
                          {removingId === item.id ? copy.loading : copy.deleteHistory}
                        </button>
                      </div>
                    </div>
                    <p>{item.question}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      {!authenticated && <HomeSeoContent />}

      {authModalOpen && !authenticated && (
        <div className="auth-modal-backdrop" role="presentation" onClick={closeAuthModal}>
          <section className="auth-modal-shell" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="auth-ornament" aria-hidden="true">
              <span className="auth-ornament-line" />
              <p>{copy.authOrnament}</p>
              <span className="auth-ornament-line" />
            </div>
            <button type="button" className="auth-modal-close" onClick={closeAuthModal} aria-label="Close">×</button>
            <div className="auth-inner auth-modal-body">
              <div className="section-head">
                <h3>{copy.authPanelTitle}</h3>
              </div>
              <p className="muted">{copy.authHint}</p>

              <div className="tab-row">
                <button
                  type="button"
                  className={authMode === 'login' ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setAuthMode('login')}
                >
                  {copy.signIn}
                </button>
                <button
                  type="button"
                  className={authMode === 'register' ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setAuthMode('register')}
                >
                  {copy.signUp}
                </button>
              </div>

              <form className="form-grid" onSubmit={onAuthSubmit}>
                {authMode === 'register' && (
                  <label>
                    <span>{copy.displayName}</span>
                    <input
                      required
                      value={authForm.displayName}
                      onChange={(event) =>
                        setAuthForm((prev) => ({ ...prev, displayName: event.target.value }))
                      }
                    />
                  </label>
                )}

                <label>
                  <span>{copy.email}</span>
                  <input
                    type="email"
                    required
                    value={authForm.email}
                    onChange={(event) => setAuthForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>

                <label>
                  <span>{copy.password}</span>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={authForm.password}
                    onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
                  />
                </label>

                {authMode === 'register' && (
                  <div className="legal-box">
                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        required
                        checked={authForm.age18Confirmed}
                        onChange={(event) =>
                          setAuthForm((prev) => ({
                            ...prev,
                            age18Confirmed: event.target.checked
                          }))
                        }
                      />
                      <span>{copy.confirmAge18}</span>
                    </label>
                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        required
                        checked={authForm.entertainmentOnlyAccepted}
                        onChange={(event) =>
                          setAuthForm((prev) => ({
                            ...prev,
                            entertainmentOnlyAccepted: event.target.checked
                          }))
                        }
                      />
                      <span>{copy.confirmEntertainment}</span>
                    </label>
                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        required
                        checked={authForm.advisoryNoticeAccepted}
                        onChange={(event) =>
                          setAuthForm((prev) => ({
                            ...prev,
                            advisoryNoticeAccepted: event.target.checked
                          }))
                        }
                      />
                      <span>{copy.confirmAdviceLimits}</span>
                    </label>
                  </div>
                )}

                <button type="submit" className="primary-btn" disabled={authBusy}>
                  {authBusy ? copy.loading : authMode === 'register' ? copy.signUp : copy.signIn}
                </button>
              </form>
            </div>
          </section>
        </div>
        )}

      {confirmingClear && (
        <div className="ritual-modal-backdrop" role="presentation" onClick={() => setConfirmingClear(false)}>
          <section
            className="ritual-modal"
            role="dialog"
            aria-modal="true"
            aria-label={copy.clearHistoryDialogTitle}
            onClick={(event) => event.stopPropagation()}
          >
            <h4>{copy.clearHistoryDialogTitle}</h4>
            <p>{copy.clearHistoryDialogBody || copy.clearHistoryConfirm}</p>
            <div className="ritual-modal-actions">
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setConfirmingClear(false)}
                disabled={historyBusy}
              >
                {copy.cancel}
              </button>
              <button type="button" className="danger-btn" onClick={onClearHistory} disabled={historyBusy}>
                {historyBusy ? copy.loading : copy.confirmClearHistory}
              </button>
            </div>
          </section>
        </div>
      )}

      {(booting || error || message) && (
        <div className={error ? 'status-bar error' : 'status-bar'}>{booting ? copy.loading : error || message}</div>
      )}

      {!hydrated && <div className="status-bar">{copy.globalLoading}</div>}
    </div>
  );
}
