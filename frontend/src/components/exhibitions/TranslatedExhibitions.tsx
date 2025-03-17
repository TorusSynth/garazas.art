'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { RiArrowRightLine } from 'react-icons/ri';
import { Exhibition } from '@/lib/types/models';

interface TranslatedExhibitionsProps {
  exhibitions: Exhibition[];
}

const TranslatedExhibitions: React.FC<TranslatedExhibitionsProps> = ({ exhibitions }) => {
  const { t } = useLanguage();

  return (
    <section id="archive" className="py-20 bg-gray-100/90 backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-4 border-[var(--color-primary)] pb-4">
          <h2 className="text-4xl font-bold text-[var(--color-primary)]">{t('exhibitions.title')}</h2>
          <Link href="/archive" className="text-[var(--color-primary)] hover:text-blue-800 flex items-center gap-2 mt-4 md:mt-0 font-bold uppercase">
            {t('exhibitions.viewAll')}
            <RiArrowRightLine className="text-xl" />
          </Link>
        </div>
        
        {exhibitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {exhibitions.slice(0, 3).map((exhibition, index) => (
              <div key={exhibition.id} className="teletext-box hover:border-[var(--color-primary)] transition-colors">
                <div className="relative h-64">
                  <div className="absolute top-0 right-0 bg-[var(--color-primary)] text-white font-mono font-bold px-3 py-1 z-10">
                    GRZ-{String(index + 1).padStart(3, '0')}
                  </div>
                  <Image
                    src={exhibition.featured_image_url || '/images/exhibition-placeholder.jpg'}
                    alt={exhibition.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 to-transparent"></div>
                </div>
                <div className="p-6 bg-gray-100">
                  <h3 className="text-2xl font-bold mb-3 text-[var(--color-primary)] hover:underline">{exhibition.title}</h3>
                  <div className="flex justify-between items-end">
                    <p className="text-black line-clamp-2">{exhibition.description.substring(0, 100)}...</p>
                    <Link href={`/archive/${exhibition.id}`} className="ml-4 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                      <RiArrowRightLine className="text-2xl" />
                    </Link>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-white/30 font-mono text-sm text-white/60">
                    {exhibition.start_date} — {exhibition.end_date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-4 border-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">NO EXHIBITIONS FOUND</h3>
            <p className="text-white/80">Check back soon for new content.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TranslatedExhibitions; 