'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface BackgroundGifProps {
  gifSrc: string;
}

export default function BackgroundGif({ gifSrc }: BackgroundGifProps) {
  const [scrollY, setScrollY] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(0);
  
  useEffect(() => {
    // Handle scroll events to track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Random glitch effect that changes periodically
    const glitchInterval = setInterval(() => {
      setGlitchEffect(Math.floor(Math.random() * 5));
    }, 2000);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);
  
  // Brutalist styling - less blur, more raw effect
  const maxBlur = 1; // Minimal blur
  const scrollThreshold = 1000; // More gradual effect
  
  // Calculate effects based on scroll position
  const blurAmount = Math.min(scrollY / scrollThreshold * maxBlur, maxBlur);
  
  // Higher base opacity for brutalist style
  const opacityValue = Math.max(1 - (scrollY / scrollThreshold * 0.3), 0.7);
  
  // Glitch transforms based on random glitch effect
  const glitchTransforms = [
    'scale(1.02) skew(-1deg)',
    'scale(0.98) skew(1deg)',
    'scale(1) skew(0.5deg)',
    'scale(1.01) skew(-0.5deg)',
    'scale(0.99) skew(0deg)'
  ];
  
  return (
    <div 
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden"
      style={{ 
        filter: `blur(${blurAmount}px) contrast(1.2)`,
        opacity: opacityValue,
        transition: 'filter 0.8s, opacity 0.8s',
        mixBlendMode: 'normal',
      }}
    >
      {/* Pixelation effect container */}
      <div className="absolute inset-0" style={{ imageRendering: 'pixelated' }}>
        <Image
          src={gifSrc}
          alt="Background Animation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{
            transform: glitchTransforms[glitchEffect],
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />
      </div>
      
      {/* Overlay with grid pattern for brutalist effect */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,60,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,60,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3 + (scrollY / scrollThreshold * 0.1),
        }}
      />
      
      {/* Dark vignette */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          opacity: 0.15 + (scrollY / scrollThreshold * 0.15),
          background: 'radial-gradient(circle, transparent 40%, #000 100%)',
        }}
      />
    </div>
  );
} 