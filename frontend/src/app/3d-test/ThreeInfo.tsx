'use client'

import React, { useState, useEffect } from 'react'

// Client-only component to show Three.js version
export default function ThreeInfo() {
  const [threeVersion, setThreeVersion] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function loadThree() {
      try {
        const THREE = await import('three')
        setThreeVersion(THREE.REVISION)
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to load Three.js:', error)
        setIsLoaded(true)
      }
    }

    loadThree()
  }, [])

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 p-4 rounded mb-4 text-center">
        <p>Loading Three.js information...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h3 className="font-bold">Three.js Information</h3>
      <p>THREE.REVISION: {threeVersion || 'Not available'}</p>
      <p>Is THREE available: {threeVersion ? 'Yes' : 'No'}</p>
    </div>
  )
} 