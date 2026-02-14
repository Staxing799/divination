'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function ThreeCardTarotContent() {
  const { language, hydrated } = useLanguage();
  const t = (key) => translate(language, key);

  if (!hydrated) {
    return null;
  }

  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>{t('spreadHeroTitle')}</h1>
        <p>{t('spreadHeroBody')}</p>
        <Link className="seo-cta" href="/">
          {t('spreadHeroCta')}
        </Link>
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
