'use client';

import React from 'react';
import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri';
import { useLanguage } from '@/lib/context/LanguageContext';

const TranslatedHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center bg-transparent border-none">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="teletext-box max-w-4xl mx-auto bg-gray-100 py-12 px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-vt323)' }}>
            GARAZAS.ART
          </h1>
          <div className="w-full h-1 bg-[var(--color-primary)] mb-6"></div>
          <h2 className="text-2xl md:text-3xl mb-6 text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-vt323)' }}>
            {t('home.hero.subtitle')}
          </h2>
          <p className="text-xl mb-10 text-[var(--color-primary)] font-light max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-space-mono)' }}>
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#events" 
              className="teletext-button inline-flex items-center justify-center gap-2 cursor-pointer px-6 py-3"
            >
              {t('events.title')}
              <RiArrowRightLine />
            </a>
            <Link 
              href="/archive" 
              className="teletext-button teletext-button-outline inline-flex items-center justify-center gap-2 cursor-pointer px-6 py-3"
            >
              {t('exhibitions.viewAll')}
              <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatedHero; 