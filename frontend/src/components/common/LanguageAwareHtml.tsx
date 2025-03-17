'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface LanguageAwareHtmlProps {
  children: React.ReactNode;
  className?: string;
}

const LanguageAwareHtml: React.FC<LanguageAwareHtmlProps> = ({ children, className = '' }) => {
  const { language } = useLanguage();
  
  return (
    <html lang={language} className={className}>
      {children}
    </html>
  );
};

export default LanguageAwareHtml; 