'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function TarotReadingOnlineContent() {
  const { language, hydrated } = useLanguage();
  const activeLanguage = hydrated ? language : 'en';
  const t = (key) => translate(activeLanguage, key);

  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>{t('onlineHeroTitle')}</h1>
        <p>{t('onlineHeroBody')}</p>
        <Link className="seo-cta" href="/">
          {t('onlineHeroCta')}
        </Link>
      </section>

      <section className="seo-section">
        <h2>{t('onlineSection1Title')}</h2>
        <p>{t('onlineSection1Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('onlineSection2Title')}</h2>
        <p>{t('onlineSection2Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('onlineSection3Title')}</h2>
        <p>{t('onlineSection3Body')}</p>
      </section>
    </main>
  );
}
