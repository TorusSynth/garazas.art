import { Exhibition } from '@/lib/types/models';

// Mock data for exhibitions
const mockExhibitions: Exhibition[] = [
  {
    id: '1',
    title: 'Digital Metamorphosis',
    description: 'An exploration of how digital technology transforms contemporary art practices and viewer experiences.',
    start_date: '2023-11-15',
    end_date: '2024-01-30',
    location: 'Garazas Art Gallery',
    image_url: '/images/exhibition-1.jpg',
    is_featured: true,
    status: 'current',
    artists: [
      {
        id: '1',
        name: 'Maria Volkovska',
        bio: 'Contemporary digital artist exploring the intersection of technology and human emotion.',
        image_url: '/images/artist-1.jpg'
      }
    ],
    artworks: [],
    curator: 'Dr. Elena Petrova',
    gallery_info: 'Main Gallery Space, Second Floor'
  },
  {
    id: '2',
    title: 'Urban Fragments',
    description: 'A collection of works examining the evolving landscape of modern cities through various artistic mediums.',
    start_date: '2023-10-01',
    end_date: '2023-12-15',
    location: 'Garazas Art Gallery',
    image_url: '/images/exhibition-2.jpg',
    is_featured: false,
    status: 'current',
    artists: [
      {
        id: '2',
        name: 'Jonas Rimkus',
        bio: 'Lithuanian photographer and installation artist.',
        image_url: '/images/artist-2.jpg'
      }
    ],
    artworks: [],
    curator: 'Rasa Andriuškevičienė'
  },
  {
    id: '3',
    title: 'Memory Traces',
    description: 'An intimate exploration of personal and collective memory through contemporary artistic practices.',
    start_date: '2024-02-01',
    end_date: '2024-04-15',
    location: 'Garazas Art Gallery',
    image_url: '/images/exhibition-3.jpg',
    is_featured: true,
    status: 'upcoming',
    artists: [
      {
        id: '3',
        name: 'Agnė Narušytė',
        bio: 'Conceptual artist working with video, performance, and installation.',
        image_url: '/images/artist-3.jpg'
      }
    ],
    artworks: [],
    curator: 'Vytautas Michelkevičius'
  }
];

export async function getFeaturedExhibitions(): Promise<Exhibition[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions.filter(exhibition => exhibition.is_featured);
}

export async function getAllExhibitions(): Promise<Exhibition[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions;
}

export async function getExhibitionById(id: string): Promise<Exhibition | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions.find(exhibition => exhibition.id === id) || null;
}

export async function getCurrentExhibitions(): Promise<Exhibition[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions.filter(exhibition => exhibition.status === 'current');
}

export async function getUpcomingExhibitions(): Promise<Exhibition[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions.filter(exhibition => exhibition.status === 'upcoming');
}

export async function getPastExhibitions(): Promise<Exhibition[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockExhibitions.filter(exhibition => exhibition.status === 'past');
} 