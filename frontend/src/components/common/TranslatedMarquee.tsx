'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

const TranslatedMarquee: React.FC = () => {
  const { language } = useLanguage();
  
  // Define the marquee text based on the selected language
  const marqueeText = language === 'lt' 
    ? 'GARAZAS.ART • ŠIUOLAIKINIO MENO PARODŲ PLATFORMA • '
    : 'GARAZAS.ART • CONTEMPORARY ART EXHIBITION PLATFORM • ';
  
  return (
    <div className="teletext-marquee">
      <div className="teletext-marquee-inner">
        {/* Repeating content for seamless loop */}
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} className="teletext-marquee-content">
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TranslatedMarquee; 