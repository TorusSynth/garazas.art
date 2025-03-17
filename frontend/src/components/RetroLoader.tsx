'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

// Loading texts now defined in the component body to use translations
interface RetroLoaderProps {
  onLoadComplete: () => void;
}

const RetroLoader: React.FC<RetroLoaderProps> = ({ onLoadComplete }) => {
  const { language } = useLanguage();
  const [loadingStep, setLoadingStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  // Define loading texts directly with language-specific values
  // This avoids TypeScript issues with the translation system
  const logo = language === 'lt' ? 'GARAZAS.ART' : 'GARAZAS.ART';
  const loading = language === 'lt' ? 'KRAUNAMA' : 'LOADING';
  const ready = language === 'lt' ? 'PARUOŠTA' : 'READY';
  
  const loadingTexts = [
    `${loading} ${logo}...`,
    language === 'lt' ? 'KRAUNAMI MENO DUOMENYS...' : 'LOADING ART DATA...',
    language === 'lt' ? 'KALIBRUOJAMI PIKSELIAI...' : 'CALIBRATING PIXELS...',
    language === 'lt' ? 'UŽMEZGAMAS RYŠYS...' : 'ESTABLISHING CONNECTION...',
    language === 'lt' ? 'AKTYVUOJAMA GARAZAS.ART...' : 'ACTIVATING GARAZAS.ART...'
  ];
  
  const completeMessage = language === 'lt' 
    ? 'ĮKĖLIMAS BAIGTAS - PRIEINAMA PRIE SISTEMOS...' 
    : 'LOAD COMPLETE - ACCESSING SYSTEM...';

  useEffect(() => {
    // Log that the loader has been mounted
    console.log('RetroLoader mounted');
    
    const totalDuration = 4500; // 4.5 seconds (25% faster than 6 seconds)
    const stepDuration = totalDuration / (loadingTexts.length + 2); // +2 for initial and final states
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgressPercent(prev => {
        const newPercent = prev + 1;
        
        // Show "LOAD COMPLETE" message when reaching 100%
        if (newPercent >= 100 && !showCompletionMessage) {
          setShowCompletionMessage(true);
        }
        
        if (newPercent >= 100) {
          clearInterval(progressInterval);
          
          // Wait a bit at 100% so user can see the completed state
          setTimeout(() => {
            console.log('Calling onLoadComplete');
            onLoadComplete();
          }, 1000); // 1 second pause at 100%
          
          return 100;
        }
        return newPercent;
      });
    }, totalDuration / 100);
    
    // Text changes animation
    let currentStep = 0;
    const textInterval = setInterval(() => {
      if (currentStep < loadingTexts.length) {
        setLoadingStep(currentStep);
        currentStep++;
      } else {
        clearInterval(textInterval);
      }
    }, stepDuration);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCharacter(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearInterval(cursorInterval);
      console.log('RetroLoader unmounted');
    };
  }, [onLoadComplete, showCompletionMessage, loadingTexts]);

  return (
    <div 
      className="fixed inset-0 bg-[var(--color-primary)] z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ pointerEvents: 'none' }} // Make sure user can't interact with elements behind this
    >
      {/* Scanline effect */}
      <div className="retro-scanline"></div>
      
      {/* Random static noise dots - reduced quantity for less distraction */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div 
          key={index}
          className="absolute w-1 h-1 bg-white opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
        />
      ))}
      
      <div className="container max-w-md mx-auto px-4 text-center relative">
        {/* Logo */}
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-vt323)' }}
          >
            {logo}
          </h1>
        </div>
        
        {/* Loading text display without glitch effect */}
        <div 
          className="h-12 mb-6 text-white text-xl font-bold transition-all duration-200 overflow-hidden"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          {showCompletionMessage 
            ? completeMessage 
            : loadingStep < loadingTexts.length 
              ? loadingTexts[loadingStep] 
              : loadingTexts[loadingTexts.length - 1]
          }
          <span className="inline-block ml-1 w-3">{showCharacter ? '█' : ''}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-6 border-2 border-white mb-6 overflow-hidden">
          <div 
            className={`h-full bg-white transition-all duration-300 ${progressPercent >= 100 ? 'animate-pulse' : ''}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        {/* Retro loading animation - stabilized equalizer bars */}
        <div className="flex justify-center gap-3 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="w-3 bg-white"
              style={{
                opacity: progressPercent >= 100 ? 0.8 : (progressPercent % 5 === i) ? 1 : 0.3,
                height: `${30 + (i * 10)}px`, // Fixed heights instead of random
                transition: 'opacity 0.3s ease',
              }}
            ></div>
          ))}
        </div>
        
        <div className="text-white text-sm mt-4 font-mono">
          {progressPercent.toFixed(0)}% {loading}
          {progressPercent >= 100 && <span className="animate-pulse"> - {ready}</span>}
        </div>
      </div>
    </div>
  );
};

export default RetroLoader; 