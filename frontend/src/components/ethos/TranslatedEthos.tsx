'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

const TranslatedEthos: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="ethos" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-primary)] inline-block border-b-4 border-[var(--color-primary)] pb-2">
            {t('ethos.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="teletext-box">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">
              {t('ethos.mission.title')}
            </h3>
            <p className="mb-4">
              {t('ethos.mission.text1')}
            </p>
            <p>
              {t('ethos.mission.text2')}
            </p>
          </div>
          
          <div className="teletext-box">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">
              {t('ethos.vision.title')}
            </h3>
            <p className="mb-4">
              {t('ethos.vision.text1')}
            </p>
            <p>
              {t('ethos.vision.text2')}
            </p>
          </div>
          
          <div className="teletext-box md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">
              {t('ethos.values.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-bold mb-2 text-[var(--color-primary)]">
                  {t('ethos.values.innovation.title')}
                </h4>
                <p>{t('ethos.values.innovation.text')}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-[var(--color-primary)]">
                  {t('ethos.values.inclusivity.title')}
                </h4>
                <p>{t('ethos.values.inclusivity.text')}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-[var(--color-primary)]">
                  {t('ethos.values.integrity.title')}
                </h4>
                <p>{t('ethos.values.integrity.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatedEthos; 