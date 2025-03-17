'use client';

import React, { useState, useEffect } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';

interface ScrollIndicatorProps {
  targetId: string;
}

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  
  useEffect(() => {
    // Create a blinking effect
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
      style={{ 
        transform: 'translateX(-50%) skew(-5deg)',
        border: '3px solid white',
        padding: '0.5rem 1.5rem',
        backgroundColor: isBlinking ? 'var(--color-primary)' : 'transparent',
        transition: 'background-color 0.3s ease'
      }}
    >
      <a 
        href={`#${targetId}`} 
        className="flex flex-col items-center" 
        onClick={handleClick}
        style={{ fontFamily: 'var(--font-archivo-black)' }}
      >
        <span className="mb-1 text-sm font-bold uppercase tracking-wider">
          SCROLL DOWN
        </span>
        <RiArrowDownLine className="text-3xl" />
      </a>
    </div>
  );
} 