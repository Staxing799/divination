'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function TarotForCreatorsContent() {
  const { language, hydrated } = useLanguage();
  const activeLanguage = hydrated ? language : 'en';
  const t = (key) => translate(activeLanguage, key);

  return (
    <main className="seo-page">
      <section className="seo-hero">
        <h1>{t('creatorsHeroTitle')}</h1>
        <p>{t('creatorsHeroBody')}</p>
        <div className="seo-cta-row">
          <Link className="seo-cta" href="/">
            {t('creatorsHeroCta')}
          </Link>
          <Link className="seo-cta seo-cta-secondary" href="/tarot-card-meanings">
            {t('cardMeaningsEntry')}
          </Link>
        </div>
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
