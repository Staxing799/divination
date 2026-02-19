'use client';

import Link from 'next/link';
import { translate } from '../lib/locale';
import { useLanguage } from './language-provider';

export default function HomeSeoContent() {
  const { language, hydrated } = useLanguage();
  const activeLanguage = hydrated ? language : 'en';
  const t = (key) => translate(activeLanguage, key);
  const methodologyTitle = activeLanguage === 'zh' ? '如何解读三张牌结果' : 'How We Read 3-Card Results';
  const methodologyBody = activeLanguage === 'zh'
    ? '查看我们如何从牌位、正逆位和行动框架输出可执行建议，避免只停留在情绪描述。'
    : 'See how position, orientation, and action framing are combined to produce practical guidance.';
  const methodologyLink = activeLanguage === 'zh' ? '查看解读方法论' : 'Read methodology';
  const top10Title = activeLanguage === 'zh' ? '牌义 Top 10 入门清单' : 'Card Meaning Top 10';
  const top10Body = activeLanguage === 'zh'
    ? '按真实检索场景整理的 10 篇优先阅读文章，适合从零开始快速建立理解框架。'
    : 'Start with the 10 highest-priority card meaning pages grouped by real search intent.';
  const top10Link = activeLanguage === 'zh' ? '查看 Top 10 清单' : 'See Top 10 list';

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
        <article className="seo-home-card">
          <h2>{methodologyTitle}</h2>
          <p>{methodologyBody}</p>
          <Link href="/tarot-reading-methodology">{methodologyLink}</Link>
        </article>
        <article className="seo-home-card">
          <h2>{top10Title}</h2>
          <p>{top10Body}</p>
          <Link href="/tarot-card-meanings/top-10">{top10Link}</Link>
        </article>
      </div>
    </section>
  );
}
