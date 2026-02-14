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
import { COPY, normalizeLanguage, SUPPORTED_LANGUAGES, translate } from '../lib/locale';

const READING_TYPES = [
  { id: 'TAROT', key: 'tarot' },
  { id: 'EASTERN_FATE', key: 'eastern' },
  { id: 'I_CHING', key: 'iching' }
];

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
  age18Confirmed: false,
  entertainmentOnlyAccepted: false,
  advisoryNoticeAccepted: false
};

const INITIAL_LEGAL_FORM = {
  age18Confirmed: false,
  entertainmentOnlyAccepted: false,
  advisoryNoticeAccepted: false
};

const INITIAL_READING_FORM = {
  type: 'TAROT',
  question: '',
  birthDate: ''
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

export default function OracleConsole() {
  const [hydrated, setHydrated] = useState(false);
  const [language, setLanguage] = useState('en');

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState(INITIAL_AUTH_FORM);
  const [legalForm, setLegalForm] = useState(INITIAL_LEGAL_FORM);
  const [readingForm, setReadingForm] = useState(INITIAL_READING_FORM);

  const [booting, setBooting] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [readingBusy, setReadingBusy] = useState(false);
  const [legalBusy, setLegalBusy] = useState(false);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const authPanelRef = useRef(null);
  const messageTimerRef = useRef(null);

  const copy = useMemo(() => COPY[language] || COPY.en, [language]);
  const t = (key, vars) => translate(language, key, vars);
  const authenticated = Boolean(token);
  const legalReady = Boolean(user?.legalReady);
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

    const savedLanguage = localStorage.getItem('oracle_locale');
    const preferredLanguage = savedLanguage || navigator.language || 'en';
    setLanguage(normalizeLanguage(preferredLanguage));

    const savedToken = localStorage.getItem('oracle_token');
    if (savedToken) {
      setToken(savedToken);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }
    localStorage.setItem('oracle_locale', language);
  }, [hydrated, language]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

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

  useEffect(() => {
    if (!authenticated || !user || legalReady) {
      return;
    }
    setLegalForm({
      age18Confirmed: Boolean(user.age18Confirmed),
      entertainmentOnlyAccepted: Boolean(user.entertainmentOnlyAccepted),
      advisoryNoticeAccepted: Boolean(user.advisoryNoticeAccepted)
    });
  }, [authenticated, legalReady, user]);

  function applyHistory(items) {
    setHistory(items);
    if (!activeHistoryId) {
      return;
    }
    const selected = items.find((item) => item.id === activeHistoryId);
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
    setLegalForm(INITIAL_LEGAL_FORM);
    setReadingForm(INITIAL_READING_FORM);
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
      flash(t('authSuccess'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setAuthBusy(false);
    }
  }

  async function onLegalSubmit(event) {
    event.preventDefault();
    if (!token) {
      return;
    }

    setLegalBusy(true);
    setError('');
    setMessage('');

    try {
      const profile = await acceptLegalConsent(legalForm, token, language);
      setUser(profile);
      flash(t('legalGateSaved'));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setLegalBusy(false);
    }
  }

  async function onReadingSubmit(event) {
    event.preventDefault();
    if (!token) {
      return;
    }
    if (!legalReady) {
      setError(t('legalGateNeededError'));
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

    try {
      const data = await createDivination(
        {
          type: readingForm.type,
          question,
          birthDate: readingForm.birthDate || null,
          locale: language
        },
        token,
        language
      );

      setResult(data);
      setActiveHistoryId(data.id);
      setReadingForm((prev) => ({
        ...prev,
        question: '',
        birthDate: prev.type === 'EASTERN_FATE' ? prev.birthDate : ''
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

  async function onClearHistory() {
    if (!token || history.length === 0 || historyBusy) {
      return;
    }

    if (!window.confirm(t('clearHistoryConfirm'))) {
      return;
    }

    setHistoryBusy(true);
    setError('');

    try {
      const payload = await clearDivinationHistory(token, language);
      setHistory([]);
      setResult(null);
      setActiveHistoryId(null);
      flash(t('historyCleared', { count: payload?.deletedCount ?? 0 }));
    } catch (err) {
      setError(err.message || t('errorRequestFallback'));
    } finally {
      setHistoryBusy(false);
    }
  }

  function viewHistory(item) {
    setResult(item);
    setActiveHistoryId(item.id);
  }

  return (
    <div className="site-shell">
      <div className="nebula-layer layer-1" aria-hidden="true" />
      <div className="nebula-layer layer-2" aria-hidden="true" />
      <div className="nebula-layer layer-3" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">✦</span>
          <div>
            <h1>{copy.brandName}</h1>
            <p>{copy.brandTagline}</p>
          </div>
        </div>

        <div className="top-tools">
          <span className="legal-chip">{copy.legalBadge}</span>
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

      <main className="content-wrap">
        {!authenticated && (
          <section className="hero-card card">
            <div className="hero-chip-row">
              <span>{copy.heroAudience1}</span>
              <span>{copy.heroAudience2}</span>
              <span>{copy.heroAudience3}</span>
            </div>
            <h2>{copy.heroTitle}</h2>
            <p>{copy.heroSubtitle}</p>
            <button type="button" className="primary-btn" onClick={scrollToAuth}>
              {copy.heroCta}
            </button>
          </section>
        )}

        {!authenticated && (
          <section ref={authPanelRef} className="card auth-card">
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
                  <p>{copy.registerLegalTitle}</p>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      required
                      checked={authForm.age18Confirmed}
                      onChange={(event) =>
                        setAuthForm((prev) => ({ ...prev, age18Confirmed: event.target.checked }))
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
                        setAuthForm((prev) => ({ ...prev, advisoryNoticeAccepted: event.target.checked }))
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
          </section>
        )}

        {authenticated && (
          <>
            <section className="card reading-card">
              <div className="section-head">
                <h3>{legalReady ? copy.dashboardTitle : copy.legalGateTitle}</h3>
                <button type="button" className="ghost-btn" onClick={refreshHistory}>
                  {copy.refresh}
                </button>
              </div>
              <p className="muted">{copy.dashboardSubtitle}</p>

              {legalReady ? (
                <form className="form-grid" onSubmit={onReadingSubmit}>
                  <div>
                    <span className="field-label">{copy.readingType}</span>
                    <div className="option-grid">
                      {READING_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={readingForm.type === type.id ? 'option-btn active' : 'option-btn'}
                          onClick={() => setReadingForm((prev) => ({ ...prev, type: type.id }))}
                        >
                          {copy[type.key]}
                        </button>
                      ))}
                    </div>
                  </div>

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

                  {readingForm.type === 'EASTERN_FATE' && (
                    <label>
                      <span>{copy.birthDate}</span>
                      <input
                        type="date"
                        value={readingForm.birthDate}
                        onChange={(event) =>
                          setReadingForm((prev) => ({ ...prev, birthDate: event.target.value }))
                        }
                      />
                    </label>
                  )}

                  <button type="submit" className="primary-btn" disabled={readingBusy}>
                    {readingBusy ? copy.loading : copy.generateReading}
                  </button>
                </form>
              ) : (
                <form className="form-grid" onSubmit={onLegalSubmit}>
                  <p className="muted">{copy.legalGateDesc}</p>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      required
                      checked={legalForm.age18Confirmed}
                      onChange={(event) =>
                        setLegalForm((prev) => ({ ...prev, age18Confirmed: event.target.checked }))
                      }
                    />
                    <span>{copy.confirmAge18}</span>
                  </label>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      required
                      checked={legalForm.entertainmentOnlyAccepted}
                      onChange={(event) =>
                        setLegalForm((prev) => ({
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
                      checked={legalForm.advisoryNoticeAccepted}
                      onChange={(event) =>
                        setLegalForm((prev) => ({ ...prev, advisoryNoticeAccepted: event.target.checked }))
                      }
                    />
                    <span>{copy.confirmAdviceLimits}</span>
                  </label>

                  <button type="submit" className="primary-btn" disabled={legalBusy}>
                    {legalBusy ? copy.loading : copy.legalGateAction}
                  </button>
                </form>
              )}
            </section>

            <section className="card result-card">
              <div className="section-head">
                <h3>{copy.latestReading}</h3>
              </div>

              {result ? (
                <article className="result-content">
                  <p className="result-meta">{typeLabel(result.type)} · {formatDate(result.createdAt, language)}</p>
                  <pre>{result.resultText}</pre>
                </article>
              ) : (
                <p className="muted">{copy.emptyReading}</p>
              )}

              <p className="result-hint">{copy.legalResultHint}</p>
            </section>

            <section className="card history-card">
              <div className="section-head">
                <h3>{copy.historyTitle}</h3>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={onClearHistory}
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

      <footer className="site-footer">
        <p>{copy.legalNoticeEntertainment}</p>
        <p>{copy.legalNoticeAdvice}</p>
        <p>{copy.legalNoticeAdults}</p>
        <p className="footer-line">{copy.footerLine}</p>
      </footer>

      {(booting || error || message) && (
        <div className={error ? 'status-bar error' : 'status-bar'}>{booting ? copy.loading : error || message}</div>
      )}

      {!hydrated && <div className="status-bar">Loading...</div>}
    </div>
  );
}
