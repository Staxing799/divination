'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { normalizeLanguage } from '../lib/locale';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [manualChoice, setManualChoice] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasManualChoice = localStorage.getItem('oracle_locale_manual') === '1';
    const savedLanguage = localStorage.getItem('oracle_locale');
    const preferredLanguage = hasManualChoice && savedLanguage
      ? savedLanguage
      : (navigator.languages?.[0] || navigator.language || 'en');
    setLanguage(normalizeLanguage(preferredLanguage));
    setManualChoice(hasManualChoice);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }
    if (manualChoice) {
      localStorage.setItem('oracle_locale', language);
      localStorage.setItem('oracle_locale_manual', '1');
      return;
    }
    localStorage.removeItem('oracle_locale');
    localStorage.removeItem('oracle_locale_manual');
  }, [hydrated, language, manualChoice]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage, options = {}) => {
        const { manual = true } = options;
        setLanguage(normalizeLanguage(nextLanguage));
        setManualChoice(Boolean(manual));
      },
      hydrated
    }),
    [language, hydrated]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
