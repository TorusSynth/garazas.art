'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { RiArrowRightLine, RiCalendarLine, RiTimeLine, RiExternalLinkLine } from 'react-icons/ri';

// Define the Event type to match your existing data structure
interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  end_time: string;
  location: string;
  image_url: string;
  is_featured: boolean;
  link?: string;
}

interface TranslatedEventsProps {
  events: Event[];
}

const TranslatedEvents: React.FC<TranslatedEventsProps> = ({ events }) => {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-20 bg-gray-100/90">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-4 border-[var(--color-primary)] pb-4">
          <h2 className="text-4xl font-bold text-[var(--color-primary)]">{t('events.title')}</h2>
          <Link href="/events" className="text-[var(--color-primary)] hover:text-blue-800 flex items-center gap-2 mt-4 md:mt-0 font-bold uppercase">
            {t('events.viewAll')}
            <RiArrowRightLine className="text-xl" />
          </Link>
        </div>
        
        <div className="text-center mb-4 text-gray-600 text-sm italic">
          {t('events.hover')}
        </div>
        
        <div>
          {/* Show only the first event */}
          {events.slice(0, 1).map((event, index) => (
            <div 
              key={event.id}
              className="index-row group teletext-box border-2 border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
            >
              <div className="index-row-content">
                <div className="flex flex-col md:flex-row md:items-center py-6 px-2 index-item">
                  <div className="flex items-baseline mb-3 md:mb-0 md:w-1/3 lg:w-1/4">
                    <h3 className="text-2xl md:text-3xl font-bold mr-3 text-[var(--color-primary)] group-hover:underline transition-colors">{event.title}</h3>
                    <span className="index-number text-[var(--color-primary)]">EVT-{String(index + 1).padStart(3, '0')}</span>
                  </div>
                  
                  <div className="md:w-auto lg:w-auto mb-3 md:mb-0 font-mono text-gray-600 text-sm flex items-center">
                    <RiCalendarLine className="mr-2 text-[var(--color-primary)]" />
                    {event.start_date}
                  </div>
                  
                  <div className="md:ml-6 md:w-auto lg:w-auto mb-3 md:mb-0 font-mono text-gray-600 text-sm flex items-center">
                    <RiTimeLine className="mr-2 text-[var(--color-primary)]" />
                    {event.start_time}
                  </div>
                  
                  <div className="md:ml-auto flex justify-between items-center">
                    <div className="hidden md:block text-[var(--color-primary)] text-sm font-medium group-hover:opacity-100 opacity-60 transition-opacity">
                      {t('archive.viewDetails')}
                    </div>
                    <div className="flex items-center">
                      <span className="ml-4 px-3 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] text-xs uppercase font-bold">
                        {event.is_featured ? t('events.featured') : t('events.upcoming')}
                      </span>
                      <RiArrowRightLine className="ml-4 text-[var(--color-primary)] transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional content that appears on hover */}
              <div className="exhibition-detail-panel opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-96">
                <div className="exhibition-detail-inner">
                  <div className="border-l-4 border-[var(--color-primary)] pl-4 bg-white p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <div className="text-gray-600 uppercase text-xs mb-1 font-mono">{t('events.date')} & {t('events.time')}</div>
                        <div className="text-[var(--color-primary)] font-bold">{event.start_date}</div>
                        <div className="text-gray-800">{event.start_time} - {event.end_time}</div>
                        
                        <div className="text-gray-600 uppercase text-xs mt-4 mb-1 font-mono">{t('events.location')}</div>
                        <div className="text-gray-800">{event.location}</div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className="text-gray-600 uppercase text-xs mb-1 font-mono">{t('events.about')}</div>
                        <p className="text-gray-800 mb-4">{event.description}</p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                          {event.link ? (
                            <a 
                              href={event.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="teletext-button px-4 py-2 inline-flex items-center"
                            >
                              {t('events.register')} <RiExternalLinkLine className="ml-2" />
                            </a>
                          ) : (
                            <span className="text-[var(--color-primary)] font-bold uppercase text-sm">
                              {event.is_featured ? t('events.featured') : t('events.upcoming')} →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TranslatedEvents; 