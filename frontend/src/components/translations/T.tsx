'use client';

import { useLanguage } from '@/lib/context/LanguageContext';
import { Translations } from '@/lib/context/LanguageContext';

// A simple component for inline translations
export default function T({ 
  keyName, 
  params = {} 
}: { 
  keyName: keyof Translations, 
  params?: Record<string, string | number> 
}) {
  const { t } = useLanguage();
  let text = t(keyName);
  
  // Replace parameters in the text if needed
  Object.entries(params).forEach(([key, value]) => {
    text = text.replace(`{${key}}`, String(value));
  });
  
  return <>{text}</>;
} 