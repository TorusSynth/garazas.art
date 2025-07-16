export interface Artist {
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  website?: string;
  social_links?: {
    instagram?: string;
    website?: string;
    twitter?: string;
  };
}

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  image_url?: string;
  artist_id: string;
  exhibition_id?: string;
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location?: string;
  image_url?: string;
  is_featured: boolean;
  status: 'upcoming' | 'current' | 'past';
  artists: Artist[];
  artworks: Artwork[];
  curator?: string;
  gallery_info?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  image_url?: string;
  is_featured: boolean;
  link?: string;
}

export interface OpenCallSubmission {
  id?: string;
  artist_name: string;
  email: string;
  phone?: string;
  artwork_title: string;
  artwork_description: string;
  artwork_medium: string;
  artwork_dimensions?: string;
  artwork_year: number;
  artist_statement: string;
  image_url?: string;
  submission_date?: string;
  status?: 'pending' | 'approved' | 'rejected';
} 