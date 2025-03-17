'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/context/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import T from '@/components/translations/T';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Define header height for scroll offset calculations
  const HEADER_HEIGHT = 80; // 5rem (h-20) in pixels

  // Navigation items with translation keys
  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.events', href: '#events' },
    { key: 'nav.archive', href: '/archive' },
    { key: 'nav.openCall', href: '/open-call' },
    { key: 'nav.ethos', href: '/ethos' },
  ];

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll function with header offset
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If it's a hash link
    if (href.startsWith('#')) {
      // If we're on the home page, scroll to the section
      if (isHomePage) {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          // Get the element's position
          const elementPosition = element.getBoundingClientRect().top;
          // Get the current scroll position
          const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;
          
          // Scroll to the element with offset for the header height
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If we're not on home page, navigate to the home page first, then to the anchor
        router.push(`/${href}`);
      }
    } else {
      // For non-hash links, use router
      router.push(href);
    }
  };

  // Handle logo click - always go home
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHomePage) {
      // If on home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If not on home page, navigate to home
      router.push('/');
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 border-b-2 ${
        scrolled ? 'border-[var(--color-primary)] bg-transparent backdrop-blur-sm' : 'border-white bg-[var(--color-primary)]'
      }`}
      style={{ 
        fontFamily: 'var(--font-space-mono)',
      }}
    >
      <div className="w-full flex items-center justify-between h-20 px-4">
        <div className="flex items-center">
          {/* Logo with brutalist styling */}
          <a 
            href="#home" 
            onClick={handleLogoClick}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="flex items-center"
          >
            <div 
              className={`relative h-14 w-14 overflow-hidden border-2 transition-all duration-300 ${
                scrolled ? 'border-[var(--color-primary)]' : 'border-white'
              }`}
              style={{ 
                transform: isLogoHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Image
                src={isLogoHovered ? "/images/glow.gif" : "/images/party.gif"}
                alt="Garazas.art Logo"
                fill
                className="object-cover"
                sizes="56px"
                priority
                style={{ 
                  imageRendering: 'pixelated',
                  filter: isLogoHovered ? 'invert(1)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              />
            </div>
          </a>
        </div>

        <div className="flex items-center">
          {/* Navigation Items */}
          <nav className="flex items-center">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`font-bold text-sm uppercase px-4 py-2 transition-all ${
                  scrolled ? 'text-[var(--color-primary)] hover:text-[#3333ff]' : 'text-white hover:text-gray-200'
                }`}
                style={{
                  transition: 'transform 0.2s ease, color 0.3s ease',
                  transform: 'translateY(0)',
                }}
              >
                <T keyName={item.key as any} />
              </a>
            ))}
          </nav>
          
          {/* Language Switcher */}
          <div className="ml-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 