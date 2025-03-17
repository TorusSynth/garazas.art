'use client';

import React, { useEffect, useState, useRef } from 'react';

const GlitchEffect: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [intensity, setIntensity] = useState(80);
  const [glitchId, setGlitchId] = useState(0);
  const [fadeOutActive, setFadeOutActive] = useState(false);
  
  // Use refs to keep track of timers and glitched elements for cleanup
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glitchedElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Function to handle clicks for glitch activation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Skip if the clicked element is a menu item or the logo
      if (isMenuItemOrLogo(target)) {
        // No longer activating glitch effect for menu items or logo
        return;
      }
      
      // Activate glitch for other elements if not already active
      if (!isGlitching) {
        setIsGlitching(true);
        document.body.classList.add('is-glitching');
        document.body.classList.add('extreme-glitch');
        
        // Generate new glitch ID for random positions
        setGlitchId(Math.random());
        
        // Apply the glitch effects
        applyExtremeChaosDisplacement();
        applyColorShift();
        
        // Set a timer to fade out the effect
        if (glitchTimerRef.current) {
          clearTimeout(glitchTimerRef.current);
        }
        
        startFadeOut();
      }
    };
    
    // Helper function to determine if an element is a menu item or logo
    // This is now used to exclude these elements from the glitch effect
    const isMenuItemOrLogo = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      
      // Check for header element
      if (element.tagName === 'HEADER' || element.closest('header')) {
        return true;
      }
      
      // Logo checks
      if (element.closest('a[href="#home"]')) {
        return true;
      }
      
      // Logo image checks
      if (element.tagName === 'IMG' && 
          (element.getAttribute('src')?.includes('glow.gif') || 
           element.getAttribute('src')?.includes('party.gif'))) {
        return true;
      }
      
      // Menu button check
      if (element.classList.contains('flex') && 
          element.classList.contains('items-center') && 
          element.textContent?.includes('MENU')) {
        return true;
      }
      
      // Navigation checks
      if (element.tagName === 'NAV' || element.closest('nav')) {
        return true;
      }
      
      // Nav item checks
      if (element.tagName === 'A' && element.closest('header')) {
        return true;
      }
      
      // Check parent element if this wasn't a match
      return element.parentElement ? isMenuItemOrLogo(element.parentElement) : false;
    };
    
    // Start the fade out effect
    const startFadeOut = () => {
      // Wait a bit for the glitch effect to play
      glitchTimerRef.current = setTimeout(() => {
        setFadeOutActive(true);
        
        // Set another timer to completely remove the effect
        glitchTimerRef.current = setTimeout(() => {
          setIsGlitching(false);
          setFadeOutActive(false);
          document.body.classList.remove('is-glitching');
          document.body.classList.remove('extreme-glitch');
          resetDisplacements();
          resetColorShift();
        }, 300); // Duration should match CSS transition
      }, 800); // Show effect for shorter time for brutalist style
    };
    
    // Apply monochrome color shift to the whole page for brutalist effect
    const applyColorShift = () => {
      document.documentElement.style.filter = `
        invert(${Math.random() > 0.5 ? '1' : '0'}) 
        contrast(${1 + Math.random() * 0.3})`; 
    };
    
    // Reset color shift
    const resetColorShift = () => {
      document.documentElement.style.filter = '';
    };
    
    // Apply brutalist displacement to elements - more angular and sharp
    const applyExtremeChaosDisplacement = (visibleOnly = false) => {
      // Clear previous tracked elements
      glitchedElementsRef.current = [];
      
      // More selective targeting - focus on visible, content-relevant elements
      // Exclude header, menu, and logo elements
      const selectors = [
        'h1:not(header h1)', 'h2:not(header h2)', 'h3:not(header h3)', 
        '.index-item', 
        '.exhibition-title', 
        'p:not(.small):not(header p)',
        'img:not(.icon):not(header img)',
        '.btn:not(header .btn)', 
        '.index-row', 
        '.index-category',
        'article', 
        'section > div'
      ];
      
      // Join selectors and query
      const elements = document.querySelectorAll(selectors.join(', '));
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        
        // Skip elements that are in the header/menu
        if (element.closest('header') || element.closest('nav')) {
          return;
        }
        
        // Skip elements that are not visible if visibleOnly is true
        if (visibleOnly) {
          const rect = element.getBoundingClientRect();
          const isInViewport = (
            rect.top >= -200 &&
            rect.left >= -100 &&
            rect.bottom <= (window.innerHeight + 200) &&
            rect.right <= (window.innerWidth + 100)
          );
          
          if (!isInViewport) return;
        }
        
        // Don't glitch fixed or absolute positioned elements that might be UI controls
        const position = window.getComputedStyle(element).position;
        if (position === 'fixed' || position === 'absolute') {
          return;
        }
        
        // Skip tiny elements
        if (element.offsetWidth < 10 || element.offsetHeight < 10) return;
        
        // Skip if already glitching
        if (element.dataset.glitching === "true") return;
        
        // Store original position and style
        element.dataset.originalTransform = element.style.transform;
        element.dataset.originalZIndex = element.style.zIndex;
        element.dataset.originalFilter = element.style.filter;
        
        // Store the original text content
        if (element.textContent && element.textContent.trim().length > 0) {
          element.dataset.text = element.textContent || '';
          element.dataset.originalText = element.textContent || '';
        }
        
        // Apply displacement - more angular for brutalist style
        const elementSize = Math.max(element.offsetWidth, element.offsetHeight);
        const displacementFactor = Math.min(1, elementSize / 200);
        
        // Use more angular, simpler transformations for brutalist effect
        // Simpler translation, more rotation and skew, less scaling
        const xOffset = Math.round((Math.random() - 0.5) * 150) * displacementFactor; 
        const yOffset = Math.round((Math.random() - 0.5) * 80) * displacementFactor;
        const rotation = Math.round((Math.random() - 0.5) * 30) * displacementFactor; 
        const skewX = Math.round((Math.random() - 0.5) * 40) * displacementFactor;
        const skewY = Math.round((Math.random() - 0.5) * 40) * displacementFactor;
        
        // Apply brutalist transform - more angular
        element.style.transform = `
          translate(${xOffset}px, ${yOffset}px) 
          rotate(${rotation}deg) 
          skew(${skewX}deg, ${skewY}deg)
        `;
        
        // Random z-index changes for overlap chaos
        element.style.zIndex = (Math.floor(Math.random() * 10) - 5).toString();
        
        // Simpler filter effects - just invert or grayscale for brutalist style
        element.style.filter = `
          ${Math.random() > 0.5 ? 'invert(1)' : 'grayscale(1)'}
          contrast(${1 + Math.random()})
        `;
        
        // Add glitch data attributes for CSS targeting
        element.dataset.glitching = 'true';
        
        // Track this element for cleanup
        glitchedElementsRef.current.push(element);
        
        // Extreme text distortion for text-heavy elements
        if (element.tagName === 'P' || element.tagName === 'H1' || 
            element.tagName === 'H2' || element.tagName === 'H3' || 
            element.classList.contains('index-item') || 
            element.classList.contains('exhibition-title')) {
          glitchText(element, Math.random() > 0.5); // 50% chance of extreme mode
        }
      });
    };
    
    // Glitch text content with more brutalist character choices
    const glitchText = (element: HTMLElement, extreme = false) => {
      const originalText = element.textContent || '';
      const glitchChars = '█▓▒░■□▪▫▬▭▮▯◊○●◘◙◦§«»½¼¾±≤≥×÷≠±√∛∜∞∟∠∡∢';
      
      if (!originalText || originalText.trim().length === 0) return;
      
      let glitchedText = '';
      
      // In extreme mode, replace up to 70% of characters
      const replacementThreshold = extreme ? 0.3 : 0.85;
      
      for (let i = 0; i < originalText.length; i++) {
        // In extreme mode, add random noise characters between normal characters
        if (extreme && Math.random() > 0.9) {
          glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        }
        
        if (Math.random() > replacementThreshold) {
          glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        } else {
          glitchedText += originalText.charAt(i);
        }
        
        // In extreme mode, randomly duplicate characters
        if (extreme && Math.random() > 0.9) {
          glitchedText += originalText.charAt(i);
          glitchedText += originalText.charAt(i);
        }
      }
      
      // In extreme mode, sometimes completely replace text with brutalist symbols
      if (extreme && Math.random() > 0.85) {
        glitchedText = '';
        const gibberishLength = Math.floor(originalText.length * (0.5 + Math.random()));
        for (let i = 0; i < gibberishLength; i++) {
          glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        }
      }
      
      // Store the original text for restoration if not already stored
      if (!element.dataset.originalText) {
        element.dataset.originalText = originalText;
      }
      
      // Apply the glitched text
      element.textContent = glitchedText;
    };
    
    // Reset all displacements - use tracked elements for better performance
    const resetDisplacements = () => {
      // First try to use our tracked elements ref for better performance
      if (glitchedElementsRef.current.length > 0) {
        glitchedElementsRef.current.forEach(element => {
          // Restore original transform
          if (element.dataset.originalTransform) {
            element.style.transform = element.dataset.originalTransform;
          } else {
            element.style.transform = '';
          }
          
          // Restore original z-index
          if (element.dataset.originalZIndex) {
            element.style.zIndex = element.dataset.originalZIndex;
          } else {
            element.style.zIndex = '';
          }
          
          // Restore original filter
          if (element.dataset.originalFilter) {
            element.style.filter = element.dataset.originalFilter;
          } else {
            element.style.filter = '';
          }
          
          // Restore original text if it was changed
          if (element.dataset.originalText) {
            element.textContent = element.dataset.originalText;
            element.removeAttribute('data-original-text');
          }
          
          // Remove glitch attribute
          element.removeAttribute('data-glitching');
        });
        
        // Clear the tracked elements
        glitchedElementsRef.current = [];
      } else {
        // Fallback to querying the DOM if tracking failed
        const glitchingElements = document.querySelectorAll('[data-glitching="true"]');
        glitchingElements.forEach((el) => {
          const element = el as HTMLElement;
          
          // Restore all properties
          if (element.dataset.originalTransform) {
            element.style.transform = element.dataset.originalTransform;
          } else {
            element.style.transform = '';
          }
          
          if (element.dataset.originalZIndex) {
            element.style.zIndex = element.dataset.originalZIndex;
          } else {
            element.style.zIndex = '';
          }
          
          if (element.dataset.originalFilter) {
            element.style.filter = element.dataset.originalFilter;
          } else {
            element.style.filter = '';
          }
          
          if (element.dataset.originalText) {
            element.textContent = element.dataset.originalText;
            element.removeAttribute('data-original-text');
          }
          
          element.removeAttribute('data-glitching');
        });
      }
    };

    // Add click event listener to trigger glitch on content clicks (not menu or logo)
    document.addEventListener('click', handleClick);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleClick);
      document.body.classList.remove('is-glitching');
      document.body.classList.remove('extreme-glitch');
      
      if (glitchTimerRef.current) {
        clearTimeout(glitchTimerRef.current);
      }
      
      resetDisplacements();
      resetColorShift();
      
      // Clear tracked elements
      glitchedElementsRef.current = [];
    };
  }, [isGlitching]);

  // Generate a brutalist glitch message 
  const getRandomGlitchMessage = () => {
    const messages = [
      "DATA ERROR ■■■■",
      "SYSTEM FAILURE",
      "CONNECTION LOST",
      "BUFFER OVERFLOW",
      "CRITICAL EXCEPTION",
      "SYNCHRONIZATION ERROR",
      "VISUAL ARTIFACT",
      "DATA CORRUPTION",
      "MEMORY ADDRESS 0xFFFF",
      "CATASTROPHIC FAILURE"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Don't render anything if not glitching
  if (!isGlitching) return null;
  
  // Fewer elements for brutalist style - more minimal
  const rgbSplitCount = Math.floor(Math.random() * 2) + 1; // 1-2 RGB splits
  const vertBarCount = Math.floor(Math.random() * 2) + 1; // 1-2 vertical bars
  const horizSliceCount = Math.random() > 0.5 ? 1 : 0; // 0-1 horizontal slices
  const messageCount = intensity > 70 ? 1 : 0; // Only show message at high intensity

  return (
    <div className={`glitch-container ${fadeOutActive ? 'fade-out' : ''}`}>
      {/* Main glitch overlay */}
      <div className="glitch-overlay" style={{opacity: intensity / 120}} />
      
      {/* RGB split layers - simpler, just black and white */}
      {Array.from({length: rgbSplitCount}).map((_, i) => (
        <React.Fragment key={`rgb-${i}-${glitchId}`}>
          <div 
            className="glitch-rgb-split cyan" 
            style={{
              opacity: 0.2,
              transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`,
              mixBlendMode: 'screen'
            }} 
          />
          <div 
            className="glitch-rgb-split magenta" 
            style={{
              opacity: 0.2,
              transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`,
              mixBlendMode: 'multiply'
            }} 
          />
        </React.Fragment>
      ))}
      
      {/* Scan lines - more pronounced for brutalist style */}
      <div className="glitch-scanlines" style={{
        backgroundSize: `100% ${2 + Math.random() * 2}px`, 
        opacity: 0.15
      }} />
      
      {/* Noise texture - subtle */}
      <div className="glitch-noise" style={{opacity: 0.05}} />
      
      {/* Vertical bars - simpler for brutalist style */}
      {Array.from({length: vertBarCount}).map((_, i) => (
        <div 
          key={`vbar-${i}-${glitchId}`}
          className="glitch-vert-bar" 
          style={{
            left: `${Math.round(Math.random() * 100)}%`,
            width: `${1}px`,
            opacity: 0.5
          }} 
        />
      ))}
      
      {/* Horizontal slices - simpler for brutalist style */}
      {Array.from({length: horizSliceCount}).map((_, i) => (
        <div 
          key={`hslice-${i}-${glitchId}`}
          className="glitch-horiz-slice" 
          style={{
            top: `${Math.round(Math.random() * 100)}%`,
            height: `1px`,
            opacity: 0.5
          }} 
        />
      ))}
      
      {/* Brutalist glitch text message */}
      {messageCount > 0 && (
        <div 
          className="glitch-text-scramble"
          style={{
            top: `${50}%`,
            left: `${50}%`,
            transform: `translate(-50%, -50%)`,
            opacity: 1
          }}
        >
          {getRandomGlitchMessage()}
        </div>
      )}
    </div>
  );
};

export default GlitchEffect; 