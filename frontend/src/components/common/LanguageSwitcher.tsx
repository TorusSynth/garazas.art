'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { type Language } from '@/lib/context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    if (language !== newLanguage && !isChanging) {
      setIsChanging(true);
      setTimeout(() => {
        setLanguage(newLanguage);
        setIsChanging(false);
      }, 300);
    }
  };

  return (
    <div className={`flex items-center border-2 border-[var(--color-primary)] rounded ${isChanging ? 'animate-pulse' : ''}`}>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 text-xs font-bold transition-all ${
          language === 'en'
            ? 'text-white bg-[var(--color-primary)]'
            : 'text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)]/10'
        }`}
        aria-label="Switch to English"
        disabled={isChanging}
      >
        {t('language.en')}
      </button>
      <div className="h-4 w-[1px] bg-[var(--color-primary)]"></div>
      <button
        onClick={() => handleLanguageChange('lt')}
        className={`px-2 py-1 text-xs font-bold transition-all ${
          language === 'lt'
            ? 'text-white bg-[var(--color-primary)]'
            : 'text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)]/10'
        }`}
        aria-label="Switch to Lithuanian"
        disabled={isChanging}
      >
        {t('language.lt')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 