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
import { useLanguage } from './language-provider';
import HomeSeoContent from './home-seo-content';

const READING_TYPES = [{ id: 'TAROT', key: 'tarot' }];

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

export default function OracleConsole() {
  const { language, setLanguage, hydrated } = useLanguage();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState(INITIAL_AUTH_FORM);
  const [readingForm, setReadingForm] = useState(INITIAL_READING_FORM);

  const [booting, setBooting] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [readingBusy, setReadingBusy] = useState(false);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [ritualTick, setRitualTick] = useState(0);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const authPanelRef = useRef(null);
  const messageTimerRef = useRef(null);

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
    };
  }, []);

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
        if (profile?.legalReady) {
          setUser(profile);
        } else {
          const consented = await acceptLegalConsent(
            {
              age18Confirmed: true,
              entertainmentOnlyAccepted: true,
              advisoryNoticeAccepted: true
            },
            token,
            language
          );
          if (!canceled) {
            setUser(consented);
          }
        }
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
    setActiveHistoryId(null);
    setAuthForm(INITIAL_AUTH_FORM);
    setReadingForm(INITIAL_READING_FORM);
    setConfirmingClear(false);
    setError('');
    setMessage('');
  }

  function scrollToAuth() {
    authPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function refreshHistory() {
    if (!token) {
      return;
    }
    try {
      const records = await getDivinationHistory(token, language);
      applyHistory(records);
      flash(t('refresh'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    }
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
            age18Confirmed: authForm.entertainmentOnlyAccepted,
            entertainmentOnlyAccepted: authForm.entertainmentOnlyAccepted,
            advisoryNoticeAccepted: authForm.entertainmentOnlyAccepted
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
      flash(t('authSuccess'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setAuthBusy(false);
    }
  }

  async function onReadingSubmit(event) {
    event.preventDefault();
    if (!token) {
      return;
    }

    const question = readingForm.question.trim();
    if (question.length < 3) {
      setError(t('questionTooShort'));
      return;
    }

    setReadingBusy(true);
    setError('');
    setMessage('');
    setRitualTick((value) => value + 1);
    setResult(null);

    try {
      const data = await createDivination(
        {
          type: readingForm.type,
          question,
          locale: language
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
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setReadingBusy(false);
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
      const records = await getDivinationHistory(token, language);
      applyHistory(records);
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
    setActiveHistoryId(item.id);
  }

  const ritualCards = readingBusy && !result
    ? [{}, {}, {}]
    : (result?.tarotMeta || []);

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
              <button type="button" className="primary-btn" onClick={scrollToAuth}>
                {copy.heroCta}
              </button>
              <p className="hero-trust">{copy.heroTrust}</p>
            </div>
          </section>
        )}

        {!authenticated && (
          <section ref={authPanelRef} className="card auth-card">
            <div className="auth-ornament" aria-hidden="true">
              <span className="auth-ornament-line" />
              <p>{copy.authOrnament}</p>
              <span className="auth-ornament-line" />
            </div>
            <div className="auth-inner">
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
                  </div>
                )}

                <button type="submit" className="primary-btn" disabled={authBusy}>
                  {authBusy ? copy.loading : authMode === 'register' ? copy.signUp : copy.signIn}
                </button>
              </form>
            </div>
          </section>
        )}

        {authenticated && (
          <>
            <section className="card reading-card">
              <div className="section-head">
                <h3>{copy.dashboardTitle}</h3>
                <button type="button" className="ghost-btn" onClick={refreshHistory}>
                  {copy.refresh}
                </button>
              </div>
              <p className="muted">{copy.dashboardSubtitle}</p>

              <form className="form-grid" onSubmit={onReadingSubmit}>
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

                <button type="submit" className="primary-btn" disabled={readingBusy}>
                  {readingBusy ? copy.loading : copy.generateReading}
                </button>
              </form>
            </section>

            <section className="card result-card">
              <div className="section-head">
                <h3>{copy.latestReading}</h3>
              </div>

              {result ? (
                <article className="result-content">
                  {result?.tarotMeta?.length > 0 && (
                    <div className="tarot-stage" key={`${result.id}-${ritualTick}`}>
                      {result.tarotMeta.map((card, index) => (
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
                  <p className="result-meta">{typeLabel(result.type)} · {formatDate(result.createdAt, language)}</p>
                  <pre>{result.resultText}</pre>
                </article>
              ) : (
                <>
                  {ritualCards.length > 0 && (
                    <div className="tarot-stage" key={`ritual-${ritualTick}`}>
                      {ritualCards.map((_, index) => (
                        <article key={`ritual-card-${index}`} className="tarot-card is-loading" style={{ '--delay': `${index * 120}ms` }}>
                          <div className="tarot-back-star" />
                        </article>
                      ))}
                    </div>
                  )}
                  <p className="muted">{readingBusy ? copy.tarotShuffling : copy.emptyReading}</p>
                </>
              )}

            </section>

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
          </>
        )}
      </main>
      {!authenticated && <HomeSeoContent />}

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
