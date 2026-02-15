'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function HomeSeoContent() {
  const { language, hydrated } = useLanguage();
  const activeLanguage = hydrated ? language : 'en';
  const t = (key) => translate(activeLanguage, key);

  return (
    <section className="seo-home-shell">
      <div className="seo-home-grid">
        <article className="seo-home-card">
          <h2>{t('homeSeoCard1Title')}</h2>
          <p>{t('homeSeoCard1Body')}</p>
        </article>
        <article className="seo-home-card">
          <h2>{t('homeSeoCard2Title')}</h2>
          <p>{t('homeSeoCard2Body')}</p>
          <Link href="/three-card-tarot-spread">{t('homeSeoCard2Link')}</Link>
        </article>
        <article className="seo-home-card">
          <h2>{t('homeSeoCard3Title')}</h2>
          <p>{t('homeSeoCard3Body')}</p>
          <Link href="/tarot-for-creators">{t('homeSeoCard3Link')}</Link>
        </article>
        <article className="seo-home-card">
          <h2>{t('homeSeoCard4Title')}</h2>
          <p>{t('homeSeoCard4Body')}</p>
          <Link href="/tarot-reading-online">{t('homeSeoCard4Link')}</Link>
        </article>
      </div>
    </section>
  );
}
