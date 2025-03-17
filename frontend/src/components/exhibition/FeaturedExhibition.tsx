import Image from 'next/image';
import Link from 'next/link';
import { Exhibition } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface FeaturedExhibitionProps {
  exhibition: Exhibition;
}

export default function FeaturedExhibition({ exhibition }: FeaturedExhibitionProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform hover:scale-[1.02]">
      <div className="relative h-48 w-full">
        {exhibition.featured_image_url ? (
          <Image
            src={exhibition.featured_image_url}
            alt={exhibition.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">No Image</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{exhibition.title}</h3>
        
        <div className="mb-4 text-sm text-gray-500">
          <p>{formatDate(exhibition.start_date)} - {formatDate(exhibition.end_date)}</p>
          <p>{exhibition.location}</p>
        </div>
        
        <p className="text-gray-700 mb-6 line-clamp-3">
          {exhibition.description}
        </p>
        
        <Link
          href={`/exhibition/${exhibition.id}`}
          className="mt-auto btn-primary inline-block text-center"
        >
          View Exhibition
        </Link>
      </div>
    </div>
  );
} 