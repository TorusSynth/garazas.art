'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { RiCalendarLine, RiListUnordered, RiMapPinLine, RiTimeLine, RiExternalLinkLine } from 'react-icons/ri';
import { CardSkeleton } from '@/components/ui/Skeleton';

// Mock event data - would come from API in real implementation
const eventsMockData = [
  {
    id: '1',
    title: 'Artist Talk: Contemporary Sculpture',
    description: 'Join us for an evening discussion with renowned sculptor Maria Jensen about her creative process, influences, and the current state of contemporary sculpture in Eastern Europe.',
    start_date: '2023-12-15',
    start_time: '18:00',
    end_time: '20:00',
    location: 'Garazas Art Gallery, Main Hall',
    image_url: '/images/event-1.jpg',
    is_featured: true,
  },
  {
    id: '2',
    title: 'Workshop: Mixed Media Techniques',
    description: 'A hands-on workshop exploring contemporary mixed media approaches. All materials will be provided. Suitable for beginners and intermediate levels.',
    start_date: '2023-12-22',
    start_time: '14:00',
    end_time: '17:00',
    location: 'Garazas Art Gallery, Workshop Space',
    image_url: '/images/event-2.jpg',
    is_featured: false,
    link: 'https://forms.garazas.art/workshop-registration',
  },
  {
    id: '3',
    title: 'Exhibition Opening: New Horizons',
    description: 'Celebrate the opening of our newest exhibition featuring works from emerging Lithuanian artists. Light refreshments will be served.',
    start_date: '2024-01-05',
    start_time: '19:00',
    end_time: '22:00',
    location: 'Garazas Art Gallery, Main Exhibition Hall',
    image_url: '/images/event-3.jpg',
    is_featured: true,
  },
  {
    id: '4',
    title: 'Art Film Screening: "The Creative Process"',
    description: 'A screening of the award-winning documentary about contemporary art creation, followed by a discussion panel with local artists.',
    start_date: '2024-01-12',
    start_time: '18:30',
    end_time: '21:00',
    location: 'Garazas Art Gallery, Media Room',
    image_url: '/images/event-4.jpg',
    is_featured: false,
  },
  {
    id: '5',
    title: 'Children\'s Art Workshop',
    description: 'A fun and engaging art workshop designed for children ages 7-12. Participants will create their own mixed media artwork to take home.',
    start_date: '2024-01-20',
    start_time: '10:00',
    end_time: '12:00',
    location: 'Garazas Art Gallery, Workshop Space',
    image_url: '/images/event-5.jpg',
    is_featured: false,
    link: 'https://forms.garazas.art/childrens-workshop',
  },
  {
    id: '6',
    title: 'Photography Exhibition: "Urban Landscapes"',
    description: 'An exhibition showcasing urban landscape photography from artists across the Baltic region. Opening night includes a meet and greet with the photographers.',
    start_date: '2024-01-28',
    start_time: '19:00',
    end_time: '21:30',
    location: 'Garazas Art Gallery, Photography Wing',
    image_url: '/images/event-6.jpg',
    is_featured: true,
  },
];

const EventsPage = () => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  // This would be a real API call in production
  // const { events, loading, error } = useEvents();
  const events = eventsMockData;

  // View toggler
  const toggleView = (mode: 'list' | 'calendar') => {
    setViewMode(mode);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Upcoming Events</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Discover artist talks, workshops, exhibition openings, and other events happening at Garazas.art.
          </p>
        </div>
      </div>

      {/* View toggle and filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <div className="inline-flex rounded-md shadow-sm bg-white">
              <button 
                onClick={() => toggleView('list')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  viewMode === 'list' 
                    ? 'bg-primary-50 text-primary-700 border-primary-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <RiListUnordered className="inline mr-2" />
                List View
              </button>
              <button 
                onClick={() => toggleView('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                  viewMode === 'calendar' 
                    ? 'bg-primary-50 text-primary-700 border-primary-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <RiCalendarLine className="inline mr-2" />
                Calendar View
              </button>
            </div>
          </div>
          
          {/* Filter options would go here */}
          <div className="text-sm text-gray-600">
            Showing {events.length} upcoming events
          </div>
        </div>

        {/* Events display */}
        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          // List view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="relative h-48">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white py-1 px-3 rounded-full text-sm">
                    {format(parseISO(event.start_date), 'MMM d')}
                  </div>
                  {event.is_featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white py-1 px-3 rounded-full text-xs">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="text-sm text-gray-500 space-y-2 mb-4">
                    <div className="flex items-center">
                      <RiTimeLine className="mr-2 flex-shrink-0" />
                      {event.start_time} - {event.end_time}
                    </div>
                    <div className="flex items-center">
                      <RiMapPinLine className="mr-2 flex-shrink-0" />
                      {event.location}
                    </div>
                  </div>
                  
                  {event.link ? (
                    <div className="flex justify-between items-center">
                      <Link href={`/events/${event.id}`} className="text-primary-600 hover:text-primary-700">
                        Details
                      </Link>
                      <a 
                        href={event.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Register
                        <RiExternalLinkLine className="ml-1" />
                      </a>
                    </div>
                  ) : (
                    <Link 
                      href={`/events/${event.id}`} 
                      className="text-primary-600 hover:text-primary-700"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Calendar view (simplified)
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center py-8">
              Calendar view is under development. Please use list view for now.
            </p>
            {/* In a real app, we would implement a full calendar component here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage; 