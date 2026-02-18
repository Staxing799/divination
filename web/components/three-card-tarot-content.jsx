'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function ThreeCardTarotContent() {
  const { language, hydrated } = useLanguage();
  const activeLanguage = hydrated ? language : 'en';
  const t = (key) => translate(activeLanguage, key);

  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>{t('spreadHeroTitle')}</h1>
        <p>{t('spreadHeroBody')}</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/">
            {t('spreadHeroCta')}
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-card-meanings">
            {t('cardMeaningsEntry')}
          </Link>
        </div>
      </section>

      <section className="seo-section">
        <h2>{t('spreadSection1Title')}</h2>
        <p>{t('spreadSection1Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('spreadSection2Title')}</h2>
        <p>{t('spreadSection2Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('spreadSection3Title')}</h2>
        <p>{t('spreadSection3Body')}</p>
      </section>
    </main>
  );
}
