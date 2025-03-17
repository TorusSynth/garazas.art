'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import ClientOnly3D from '@/components/3d/ClientOnly3D'

// Import the three.js library directly to test if it's available
// But wrap it in a client-only component to prevent build errors
const ThreeInfo = dynamic(() => import('./ThreeInfo'), { ssr: false })

// Dynamically import BasicScene with no SSR
const BasicScene = dynamic(() => import('@/components/3d/BasicScene'), { ssr: false })

export default function TestPage() {
  return (
    <main className="py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">3D Test Page</h1>
        
        <ClientOnly3D>
          <ThreeInfo />
        </ClientOnly3D>
        
        <div className="h-96 bg-gray-100 rounded overflow-hidden mb-8">
          <ClientOnly3D>
            <BasicScene 
              modelPath="/models/sculpture.glb"
              environmentPreset="night"
              showControls={true}
            />
          </ClientOnly3D>
        </div>
        
        <p className="text-gray-600">This is a simple test page to verify that Three.js and React Three Fiber are working correctly.</p>
      </div>
    </main>
  )
} 