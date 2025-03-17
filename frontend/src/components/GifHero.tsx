import React from 'react';
import Image from 'next/image';
import { RiArrowRightLine } from 'react-icons/ri';

type GifHeroProps = {
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  gifSrc?: string;
  overlayOpacity?: number;
};

export default function GifHero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  gifSrc = '/images/hero-animation.gif',
  overlayOpacity = 0.4
}: GifHeroProps) {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* GIF Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        ></div>
        
        {/* GIF container with proper sizing */}
        <div className="relative h-full w-full">
          <Image
            src={gifSrc}
            alt="Gallery animation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      
      {/* Content - positioned at the bottom with padding */}
      <div className="container mx-auto px-4 relative z-20 text-center md:text-left pb-24 md:pb-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-white">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={primaryCta.href} 
              className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {primaryCta.text}
              <RiArrowRightLine />
            </a>
            <a 
              href={secondaryCta.href} 
              className="btn bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {secondaryCta.text}
              <RiArrowRightLine />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 