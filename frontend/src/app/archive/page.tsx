'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiFilter2Line, RiSearchLine, RiTimeLine, RiMapPinLine, RiArrowRightLine } from 'react-icons/ri';
import { getArchivedExhibitions } from '@/lib/api/apiService';
import { Exhibition } from '@/lib/types/models';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';

// Temporary mock data - would come from API in real implementation
const yearOptions = [2023, 2022, 2021, 2020, 2019];
const categoryOptions = ['Solo Exhibition', 'Group Exhibition', 'Installation', 'Performance', 'Workshop'];

// Teletext-styled mock data for exhibitions
const mockExhibitions: Exhibition[] = [
  {
    id: 'ex1',
    title: 'FRAGMENTS OF TIME',
    description: 'A photography exhibition exploring the concept of time through urban landscapes.',
    start_date: '2023-11-15',
    end_date: '2023-12-30',
    type: 'Photography',
    artist: 'Maria Kovács',
    location: 'Main Gallery',
    featured_image_url: '/images/exhibition-1.jpg',
    details: 'This exhibition presents 24 large-format photographs capturing transitional moments in urban environments. Kovács uses long exposure techniques to transform everyday scenes into ethereal landscapes that question our perception of time.',
    is_featured: true,
    is_archived: false,
    artists: [{ name: 'Maria Kovács', bio: '', website: '', id: 'artist1', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex2',
    title: 'SYNTHETIC NATURE',
    description: 'An interdisciplinary exploration of artificial environments and their relationship to natural ecosystems.',
    start_date: '2024-01-20',
    end_date: '2024-03-15',
    type: 'Interdisciplinary',
    artist: 'Collective TERRA',
    location: 'Project Space',
    featured_image_url: '/images/exhibition-2.jpg',
    details: 'SYNTHETIC NATURE combines installations, digital media, and biological specimens to examine how technology mimics, replaces, and coexists with natural systems. The exhibition features contributions from six artists and three scientists working at the intersection of art and ecology.',
    is_featured: true,
    is_archived: false,
    artists: [{ name: 'Collective TERRA', bio: '', website: '', id: 'artist2', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex3',
    title: 'DIGITAL MEMORIES',
    description: 'A video art installation examining the fragility of digital memory in contemporary society.',
    start_date: '2023-09-05',
    end_date: '2023-10-30',
    type: 'Video Art',
    artist: 'Thomas Berg',
    location: 'Black Box',
    featured_image_url: '/images/exhibition-3.jpg',
    details: 'Through a series of interconnected video installations, Berg examines how digital archives both preserve and distort personal and collective memories. The exhibition features a central 12-channel video installation and several smaller interactive pieces.',
    is_featured: false,
    is_archived: false,
    artists: [{ name: 'Thomas Berg', bio: '', website: '', id: 'artist3', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex4',
    title: 'CHROMATIC FIELDS',
    description: 'A solo painting exhibition featuring large-scale abstract works exploring color theory and spatial perception.',
    start_date: '2024-02-10',
    end_date: '2024-04-05',
    type: 'Painting',
    artist: 'Elena Woolf',
    location: 'Main Gallery',
    featured_image_url: '/images/exhibition-4.jpg',
    details: `Woolf's monumental canvases employ a systematic approach to color, creating immersive fields that challenge viewers' spatial awareness. The exhibition includes 14 new works created specifically for the gallery space, arranged as a single continuous experience.`,
    is_featured: true,
    is_archived: false,
    artists: [{ name: 'Elena Woolf', bio: '', website: '', id: 'artist4', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex5',
    title: 'SOUND SCULPTURES',
    description: 'An exhibition of sound art installations that transform acoustic experiences into physical forms.',
    start_date: '2023-12-01',
    end_date: '2024-01-15',
    type: 'Sound Art',
    artist: 'Akira Tanaka',
    location: 'Project Space',
    featured_image_url: '/images/exhibition-5.jpg',
    details: 'SOUND SCULPTURES presents five room-scale installations that visualize and materialize sound waves through kinetic sculptures, responsive environments, and precise spatial audio. Visitors are encouraged to interact with the works, altering their sonic and physical properties.',
    is_featured: false,
    is_archived: false,
    artists: [{ name: 'Akira Tanaka', bio: '', website: '', id: 'artist5', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex6',
    title: 'MATERIAL TENSIONS',
    description: 'A group exhibition exploring the physical and conceptual properties of diverse materials in contemporary sculpture.',
    start_date: '2024-03-15',
    end_date: '2024-05-10',
    type: 'Sculpture',
    artist: 'Various Artists',
    location: 'Main Gallery & Garden',
    featured_image_url: '/images/exhibition-6.jpg',
    details: 'Featuring works by twelve international artists, MATERIAL TENSIONS investigates how materials carry cultural significance and embody political, environmental, and social tensions. The exhibition extends into the gallery garden with site-specific outdoor installations.',
    is_featured: false,
    is_archived: false,
    artists: [{ name: 'Various Artists', bio: '', website: '', id: 'artist6', work_samples: [] }],
    artworks: []
  },
  {
    id: 'ex7',
    title: 'ALGORITHMIC LANDSCAPES',
    description: 'An exhibition exploring the intersection of artificial intelligence and landscape representation.',
    start_date: '2024-04-01',
    end_date: '2024-06-15',
    type: 'Digital Art',
    artist: 'Sarah Chen',
    location: 'Tech Lab',
    featured_image_url: '/images/exhibition-7.jpg',
    details: `Chen's work uses machine learning algorithms trained on historical landscape paintings and contemporary satellite imagery to generate new forms of landscape representation. The exhibition includes real-time generative projections and high-resolution prints that blur the line between artificial creation and human artistic intention.`,
    is_featured: true,
    is_archived: false,
    artists: [{ name: 'Sarah Chen', bio: '', website: '', id: 'artist7', work_samples: [] }],
    artworks: []
  }
];

const ArchivePage = () => {
  const [loading, setLoading] = useState(true);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState<Exhibition[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('index'); // Default to index view
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real implementation, fetch data from API
        // const data = await getArchivedExhibitions();
        // setExhibitions(data);
        
        // Using mock data for now
        setTimeout(() => {
          setExhibitions(mockExhibitions);
          setFilteredExhibitions(mockExhibitions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching archived exhibitions:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...exhibitions];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        exhibition =>
          exhibition.title.toLowerCase().includes(query) ||
          exhibition.description.toLowerCase().includes(query) ||
          exhibition.artists.some(artist => 
            artist.name.toLowerCase().includes(query)
          )
      );
    }
    
    // Apply year filter
    if (selectedYear) {
      result = result.filter(exhibition => {
        const exhibitionYear = new Date(exhibition.start_date).getFullYear();
        return exhibitionYear === selectedYear;
      });
    }
    
    // Apply category filter - in a real implementation, this would filter by category
    // For now, we'll just simulate it
    if (selectedCategory) {
      // Filter by the type field
      result = result.filter(exhibition => exhibition.type === selectedCategory);
    }
    
    setFilteredExhibitions(result);
  }, [searchQuery, selectedYear, selectedCategory, exhibitions]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear(null);
    setSelectedCategory(null);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      {/* Header - Teletext Style */}
      <div className="bg-[var(--color-primary)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 inline-block border-b-4 border-white pb-2">EXHIBITION ARCHIVE</h1>
          <p className="text-xl max-w-3xl">
            Explore our past and current exhibitions, documenting the history of contemporary art at Garazas.art.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section - Teletext Style */}
      <div className="container mx-auto px-4 py-8">
        <div className="teletext-box mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            {/* Search input */}
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search exhibitions or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--color-primary)] rounded-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
              <RiSearchLine className="absolute left-3 top-2.5 text-[var(--color-primary)]" />
            </div>
            
            {/* View toggle */}
            <div className="flex gap-4 items-center mb-4 md:mb-0">
              <button
                onClick={() => setViewMode('index')}
                className={`px-4 py-2 ${viewMode === 'index' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)] border border-[var(--color-primary)]'}`}
              >
                Index View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)] border border-[var(--color-primary)]'}`}
              >
                Grid View
              </button>
            </div>
            
            {/* Filter toggle on mobile */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-[var(--color-primary)] font-medium"
              >
                <RiFilter2Line className="mr-2" />
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
          
          {/* Filters - Visible on desktop or when toggled on mobile */}
          <div className={`md:flex gap-4 ${isFilterOpen || 'hidden md:flex'}`}>
            {/* Year filter */}
            <div className="mb-4 md:mb-0">
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                className="px-4 py-2 border border-[var(--color-primary)] rounded-none text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              >
                <option value="">All Years</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Category filter */}
            <div className="mb-4 md:mb-0">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-2 border border-[var(--color-primary)] rounded-none text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              >
                <option value="">All Categories</option>
                <option value="Photography">Photography</option>
                <option value="Painting">Painting</option>
                <option value="Video Art">Video Art</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Interdisciplinary">Interdisciplinary</option>
                <option value="Installation">Installation</option>
              </select>
            </div>
            
            {/* Reset button */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-[var(--color-primary)]">
            {loading ? 'Loading exhibitions...' : `Showing ${filteredExhibitions.length} exhibitions`}
            {(selectedYear || selectedCategory || searchQuery) && ' with applied filters'}
          </p>
        </div>
        
        {/* Exhibition Display - Toggle between Grid and Index views */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : filteredExhibitions.length > 0 ? (
          viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExhibitions.map((exhibition) => (
                <div key={exhibition.id} className="teletext-box hover:border-[var(--color-primary)] transition-colors">
                  <div className="relative h-56">
                    <Image
                      src={exhibition.featured_image_url || '/images/placeholder.jpg'}
                      alt={exhibition.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 to-transparent"></div>
                  </div>
                  <div className="p-6 bg-gray-100">
                    <h3 className="text-2xl font-bold mb-3 text-[var(--color-primary)] hover:underline">{exhibition.title}</h3>
                    <p className="text-gray-800 mb-4 line-clamp-2">{exhibition.description}</p>
                    
                    <div className="flex items-center gap-2 mb-2 text-gray-800">
                      <RiTimeLine className="text-[var(--color-primary)]" />
                      <span>{exhibition.start_date} - {exhibition.end_date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-gray-800">
                      <RiMapPinLine className="text-[var(--color-primary)]" />
                      <span>{exhibition.location}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-[var(--color-primary)]">{exhibition.type}</span>
                      <Link 
                        href={`/archive/${exhibition.id}`} 
                        className="text-[var(--color-primary)] hover:underline font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Index View (Teletext Style)
            <div>
              {filteredExhibitions.map((exhibition, index) => (
                <div 
                  key={exhibition.id}
                  className="index-row group"
                >
                  <div className="index-row-content">
                    <Link 
                      href={`/archive/${exhibition.id}`}
                      className="flex flex-col md:flex-row md:items-end py-6 px-2 index-item"
                    >
                      <div className="flex items-baseline mb-3 md:mb-0 md:w-1/3 lg:w-1/4">
                        <h3 className="text-2xl md:text-3xl font-bold mr-3 text-[var(--color-primary)] group-hover:underline transition-colors">{exhibition.title}</h3>
                        <span className="index-number text-[var(--color-primary)]">GRZ-{String(index + 1).padStart(3, '0')}</span>
                      </div>
                      
                      <div className="md:w-1/6 lg:w-1/8 mb-3 md:mb-0">
                        <div className="index-category" data-type={exhibition.type}>
                          {exhibition.type}
                        </div>
                      </div>
                      
                      <div className="md:w-1/6 lg:w-1/8 mb-3 md:mb-0 font-mono text-gray-600 text-sm">
                        {exhibition.start_date.split('-')[0]}
                      </div>
                      
                      <div className="md:w-1/3 lg:w-1/2 flex justify-between items-center">
                        <p className="text-gray-800 text-sm md:text-base line-clamp-1 mr-4">
                          {exhibition.description.substring(0, 100)}...
                        </p>
                        <RiArrowRightLine className="ml-4 text-[var(--color-primary)] transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                  
                  {/* Additional content that appears on hover */}
                  <div className="exhibition-detail-panel opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-96">
                    <div className="exhibition-detail-inner">
                      <div className="border-l-4 border-[var(--color-primary)] pl-4 bg-white p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="md:col-span-1">
                            <div className="text-gray-600 uppercase text-xs mb-1 font-mono">Artist</div>
                            <div className="text-[var(--color-primary)] font-bold">{exhibition.artist}</div>
                            
                            <div className="text-gray-600 uppercase text-xs mt-4 mb-1 font-mono">Location</div>
                            <div className="text-gray-800">{exhibition.location}</div>
                            
                            <div className="text-gray-600 uppercase text-xs mt-4 mb-1 font-mono">Dates</div>
                            <div className="text-gray-800">{exhibition.start_date} — {exhibition.end_date}</div>
                          </div>
                          
                          <div className="md:col-span-3">
                            <div className="text-gray-600 uppercase text-xs mb-1 font-mono">About this exhibition</div>
                            <p className="text-gray-800">{exhibition.details}</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                              <span className="text-[var(--color-primary)] font-bold uppercase text-sm">View Exhibition Detail →</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="teletext-box text-center py-12">
            <p className="text-[var(--color-primary)] mb-4">No exhibitions found with the selected filters.</p>
            <button
              onClick={resetFilters}
              className="teletext-button"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivePage; 