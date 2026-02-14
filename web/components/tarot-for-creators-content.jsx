'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function TarotForCreatorsContent() {
  const { language, hydrated } = useLanguage();
  const t = (key) => translate(language, key);

  if (!hydrated) {
    return null;
  }

  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>{t('creatorsHeroTitle')}</h1>
        <p>{t('creatorsHeroBody')}</p>
        <Link className="seo-cta" href="/">
          {t('creatorsHeroCta')}
        </Link>
      </section>

      <section className="seo-section">
        <h2>{t('creatorsSection1Title')}</h2>
        <p>{t('creatorsSection1Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('creatorsSection2Title')}</h2>
        <p>{t('creatorsSection2Body')}</p>
      </section>

      <section className="seo-section">
        <h2>{t('creatorsSection3Title')}</h2>
        <p>{t('creatorsSection3Body')}</p>
      </section>
    </main>
  );
}
