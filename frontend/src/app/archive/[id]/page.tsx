'use client';

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { RiArrowLeftLine, RiTimeLine, RiMapPinLine, RiUserLine, RiExternalLinkLine } from 'react-icons/ri';
import { getExhibition } from '@/lib/api/apiService';
import { Exhibition } from '@/lib/types/models';
import { formatDate } from '@/lib/utils';

// This would normally be added in a Server Component
// export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
//   const exhibition = await getExhibition(params.id);
//   return {
//     title: exhibition ? `${exhibition.title} | Archive | Garazas.art` : 'Exhibition | Garazas.art',
//     description: exhibition?.description || 'View details about this past exhibition at Garazas.art gallery.',
//   };
// };

// Mock data for a single exhibition - would come from API in real implementation
const mockExhibition: Exhibition = {
  id: '1',
  title: 'Urban Fragments',
  description: 'An exploration of urban environments through mixed media works by five contemporary artists. This exhibition examines the relationship between urban spaces and their inhabitants, highlighting the fragments of everyday life that often go unnoticed. Through various media including photography, sculpture, and installation, the artists invite viewers to reconsider their perception of urban landscapes and the social dynamics within them.',
  start_date: '2022-09-15',
  end_date: '2022-10-30',
  location: 'Main Gallery',
  curator: 'Elena Vasiliev',
  featured_image_url: '/images/archive-1.jpg',
  is_featured: false,
  is_archived: true,
  artists: [
    { 
      id: '1a', 
      name: 'Marco Chen', 
      bio: 'Marco Chen is a photographer and mixed media artist based in Vilnius. His work explores urban decay and regeneration.',
      website: 'https://marcochen.example.com',
      image_url: '/images/artists/marco-chen.jpg',
      work_samples: ['/images/artwork/marco-chen-1.jpg', '/images/artwork/marco-chen-2.jpg'] 
    },
    { 
      id: '2a', 
      name: 'Laura Kim', 
      bio: 'Laura Kim creates installations that investigate the intersection of public and private spaces in urban environments.',
      image_url: '/images/artists/laura-kim.jpg',
      work_samples: ['/images/artwork/laura-kim-1.jpg'] 
    },
  ],
  artworks: [
    {
      id: 'a1',
      title: 'City Fragments #3',
      artist_id: '1a',
      year: 2022,
      medium: 'Mixed media on canvas',
      dimensions: '120 x 80 cm',
      description: 'Part of an ongoing series examining urban textures and patterns.',
      image_url: '/images/artwork/marco-chen-1.jpg'
    },
    {
      id: 'a2',
      title: 'Transition Spaces',
      artist_id: '2a',
      year: 2021,
      medium: 'Site-specific installation, mixed materials',
      dimensions: 'Variable dimensions',
      description: 'An installation exploring liminal spaces in urban environments.',
      image_url: '/images/artwork/laura-kim-1.jpg'
    },
    {
      id: 'a3',
      title: 'Urban Memory',
      artist_id: '1a',
      year: 2022,
      medium: 'Photography, digital print on archival paper',
      dimensions: '60 x 40 cm (each), series of 5',
      description: 'Documenting forgotten spaces in rapidly changing neighborhoods.',
      image_url: '/images/artwork/marco-chen-2.jpg'
    }
  ]
};

const ExhibitionDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  
  const [loading, setLoading] = useState(true);
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        setLoading(true);
        // In a real implementation, fetch the specific exhibition from API
        // const data = await getExhibition(id as string);
        // setExhibition(data);
        
        // Using mock data for now with a delay to simulate API call
        setTimeout(() => {
          setExhibition(mockExhibition);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching exhibition details:', err);
        setError('Failed to load exhibition details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchExhibition();
  }, [id]);
  
  // Handle back navigation
  const goBack = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !exhibition) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              {error || 'Exhibition not found'}
            </h1>
            <p className="text-gray-500 mb-8">
              The exhibition you're looking for might have been removed or is temporarily unavailable.
            </p>
            <button 
              onClick={goBack}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Back to Archive
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <RiArrowLeftLine className="mr-2" />
            Back to Archive
          </button>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[500px]">
        <Image
          src={exhibition.featured_image_url || '/images/placeholder.jpg'}
          alt={exhibition.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
          <div className="container mx-auto px-4 py-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{exhibition.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-200 text-sm">
                <div className="flex items-center">
                  <RiTimeLine className="mr-2" />
                  {formatDate(exhibition.start_date)} - {formatDate(exhibition.end_date)}
                </div>
                <div className="flex items-center">
                  <RiMapPinLine className="mr-2" />
                  {exhibition.location}
                </div>
                {exhibition.curator && (
                  <div className="flex items-center">
                    <RiUserLine className="mr-2" />
                    Curator: {exhibition.curator}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Exhibition Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-display font-bold mb-6">About the Exhibition</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{exhibition.description}</p>
              </div>
            </div>
            
            {/* Artworks Section */}
            {exhibition.artworks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Featured Artworks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {exhibition.artworks.map(artwork => (
                    <div key={artwork.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="relative h-60">
                        <Image
                          src={artwork.image_url || '/images/placeholder.jpg'}
                          alt={artwork.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{artwork.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {exhibition.artists.find(a => a.id === artwork.artist_id)?.name}, {artwork.year}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{artwork.medium}</p>
                        {artwork.dimensions && (
                          <p className="text-sm text-gray-600 mb-2">{artwork.dimensions}</p>
                        )}
                        {artwork.description && (
                          <p className="text-sm text-gray-700 mt-3">{artwork.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Artists Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">Featured Artists</h2>
              <div className="space-y-8">
                {exhibition.artists.map(artist => (
                  <div key={artist.id} className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={artist.image_url || '/images/placeholder-avatar.jpg'}
                          alt={artist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{artist.name}</h3>
                        {artist.website && (
                          <a 
                            href={artist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center"
                          >
                            Website <RiExternalLinkLine className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                    {artist.bio && (
                      <p className="text-sm text-gray-600 mb-4">{artist.bio}</p>
                    )}
                    {artist.work_samples.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {artist.work_samples.map((sample, index) => (
                          <div key={index} className="relative h-20 rounded overflow-hidden">
                            <Image
                              src={sample || '/images/placeholder.jpg'}
                              alt={`Work sample by ${artist.name}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Related Exhibitions would go here */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Explore More</h3>
                <Link 
                  href="/archive" 
                  className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded-md transition-colors"
                >
                  View All Past Exhibitions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetailPage; 