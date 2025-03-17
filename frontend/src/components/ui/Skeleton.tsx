'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  inline?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  count = 1,
  width = '100%',
  height = '1.2rem',
  circle = false,
  inline = false,
}) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => {
    const skeletonStyles = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: circle ? '50%' : '4px',
    };

    return (
      <div
        key={index}
        className={`animate-pulse bg-gray-200 ${inline ? 'inline-block mr-2' : 'block mb-2'} ${className}`}
        style={skeletonStyles}
        aria-hidden="true"
      />
    );
  });

  return <>{skeletonItems}</>;
};

// Predefined skeletons for common UI elements
export const TextSkeleton: React.FC<{ lines?: number; width?: string | number }> = ({ 
  lines = 3, 
  width = '100%'
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton 
          key={index} 
          width={index === lines - 1 && typeof width === 'string' ? '70%' : width} 
          height="0.8rem" 
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Skeleton height={200} className="mb-4" />
      <Skeleton width="70%" height="1.5rem" className="mb-2" />
      <TextSkeleton lines={2} />
      <Skeleton width={100} height="2rem" className="mt-4" />
    </div>
  );
};

export const AvatarSkeleton: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return <Skeleton width={size} height={size} circle />;
};

export default Skeleton; 