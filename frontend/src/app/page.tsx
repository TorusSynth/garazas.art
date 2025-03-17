import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getFeaturedExhibitions } from '@/lib/api/apiService';
import BackgroundGif from '@/components/BackgroundGif';
import { Exhibition, Artist, Artwork } from '@/lib/types/models';
import HomeWrapper from '@/components/HomeWrapper';
import TranslatedHero from '@/components/translations/TranslatedHero';
import TranslatedEvents from '@/components/events/TranslatedEvents';
import TranslatedExhibitions from '@/components/exhibitions/TranslatedExhibitions';
import TranslatedEthos from '@/components/ethos/TranslatedEthos';

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'Garazas.art | Contemporary Art Exhibition Platform',
  description: 'Discover contemporary art exhibitions, participate in events, and submit your work to open calls.',
};

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
];

// Mock exhibition data for a more diverse index
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
    artists: [{ name: 'Maria Kovács', bio: '', website: '', id: 'artist1', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Collective TERRA', bio: '', website: '', id: 'artist2', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Thomas Berg', bio: '', website: '', id: 'artist3', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Elena Woolf', bio: '', website: '', id: 'artist4', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Akira Tanaka', bio: '', website: '', id: 'artist5', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Various Artists', bio: '', website: '', id: 'artist6', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
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
    artists: [{ name: 'Sarah Chen', bio: '', website: '', id: 'artist7', work_samples: [] }] as Artist[],
    artworks: [] as Artwork[]
  }
];

export default async function Home() {
  // Fetch featured exhibitions from API
  let exhibitions = await getFeaturedExhibitions();
  
  // If no exhibitions from API, use our mock data
  if (!exhibitions || exhibitions.length === 0) {
    exhibitions = mockExhibitions;
  }
  
  return (
    <HomeWrapper>
      {/* Main content that will be shown after loading */}
      <main>
        {/* Fixed Background GIF that stays visible during scrolling */}
        <BackgroundGif gifSrc="/images/glow2.gif" />
        
        {/* Redesigned Hero Section with teletext-inspired styling - Now using a client component for translations */}
        <TranslatedHero />
        
        {/* Content sections with semi-transparent backgrounds */}
        <div className="relative z-10 mt-2">
          {/* Events Section */}
          <TranslatedEvents events={eventsMockData} />
          
          {/* Featured Exhibitions */}
          <TranslatedExhibitions exhibitions={exhibitions} />
          
          {/* Ethos Section */}
          <TranslatedEthos />
        </div>
      </main>
    </HomeWrapper>
  );
} 