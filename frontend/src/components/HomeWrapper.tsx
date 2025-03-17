'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import RetroLoader from './RetroLoader';

interface HomeWrapperProps {
  children: React.ReactNode;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Default to showing loader
  const [loaderInitialized, setLoaderInitialized] = useState(false);
  const pathname = usePathname();
  
  // Function to reset the visited flag (for testing)
  const resetVisitedFlag = () => {
    localStorage.removeItem('hasVisitedGarazas');
    window.location.reload();
  };
  
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    // Only show the loader if we're on the main home page
    const isHomePage = pathname === '/';
    
    if (!isHomePage) {
      setLoading(false);
      return; // Don't show loader on other pages
    }
    
    // Only run this initialization logic once
    if (loaderInitialized) return;
    setLoaderInitialized(true);

    try {
      // Check if this is the first load of the home page
      const hasVisitedBefore = localStorage.getItem('hasVisitedGarazas');
      
      if (hasVisitedBefore) {
        // Not first visit, don't show loader
        setLoading(false);
      } else {
        // First visit, show loader
        setLoading(true);
        // Set flag in localStorage to track that user has visited before
        localStorage.setItem('hasVisitedGarazas', 'true');
        
        // For debugging - you can remove this when it's working
        console.log('Showing loader for first visit');
      }
    } catch (e) {
      // In case of private browsing mode where localStorage might fail
      console.log('localStorage error, showing loader anyway');
      setLoading(true);
    }
  }, [pathname, loaderInitialized]);
  
  const handleLoadComplete = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading && <RetroLoader onLoadComplete={handleLoadComplete} />}
      <div className={loading ? 'invisible' : 'visible'}>
        {children}
      </div>
      
      {/* Hidden developer button - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetVisitedFlag}
          className="fixed bottom-4 right-4 bg-gray-200 text-xs text-gray-700 px-2 py-1 opacity-20 hover:opacity-100 z-50"
          title="Reset loader state (dev only)"
        >
          Reset Loader
        </button>
      )}
    </>
  );
};

export default HomeWrapper; 