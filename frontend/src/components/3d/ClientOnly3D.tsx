'use client'

import React, { useState, useEffect } from 'react'

interface ClientOnly3DProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * A wrapper component that only renders its children on the client side.
 * This prevents any server-side rendering of 3D components, which helps avoid
 * module resolution issues during build time.
 */
export default function ClientOnly3D({ 
  children, 
  fallback = <DefaultLoadingFallback />
}: ClientOnly3DProps) {
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false)

  // Effect runs only on the client after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Only render children on the client side
  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}

// Default loading component
function DefaultLoadingFallback() {
  return (
    <div className="bg-gray-800 flex items-center justify-center" style={{height: '100%', width: '100%'}}>
      <div className="text-center text-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4">Loading 3D experience...</p>
      </div>
    </div>
  )
} 