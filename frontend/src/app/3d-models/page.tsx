'use client'

import React, { useState } from 'react'
import { RiInformationLine } from 'react-icons/ri'
import dynamic from 'next/dynamic'
import ClientOnly3D from '@/components/3d/ClientOnly3D'

// Dynamically import BasicScene with no SSR
const BasicScene = dynamic(() => import('@/components/3d/BasicScene'), { ssr: false })

// Example models you can showcase
const models = [
  {
    id: 'sculpture',
    name: 'Abstract Sculpture',
    path: '/models/sculpture.glb',
    description: 'An abstract 3D sculpture demonstrating complex geometry and materials.',
    environmentPreset: 'night' as const
  }
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState(models[0])

  return (
    <main className="py-16 pt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">3D Models Explorer</h1>
          
          {/* Info box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <RiInformationLine className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  This page demonstrates how 3D models can be integrated into your gallery website.
                  Interact with the models using mouse controls.
                </p>
              </div>
            </div>
          </div>
          
          {/* Model viewer */}
          <div className="mb-8">
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
              <ClientOnly3D>
                <BasicScene
                  modelPath={selectedModel.path}
                  className="h-full w-full"
                  environmentPreset={selectedModel.environmentPreset}
                />
              </ClientOnly3D>
            </div>
            <h2 className="text-xl font-bold mt-4">{selectedModel.name}</h2>
            <p className="text-gray-600 mt-2">{selectedModel.description}</p>
          </div>
          
          {/* Technical implementation information */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">How to Implement 3D Models</h2>
            <div className="prose max-w-none">
              <p>
                Adding 3D models to your website enhances visitor engagement and provides a more immersive experience for your gallery.
                Here's how you can implement 3D models in your art exhibitions:
              </p>
              
              <h3>1. Prepare your 3D models</h3>
              <p>
                Use glTF (.glb) format for your 3D models as it's optimized for web delivery. 
                You can create models using software like Blender, Maya, or 3D scan physical artworks.
              </p>
              
              <h3>2. Add models to your project</h3>
              <p>
                Place your .glb files in the <code>/public/models/</code> directory of your project.
              </p>
              
              <h3>3. Use the BasicScene component</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {`<ClientOnly3D>
  <BasicScene 
    modelPath="/models/your-model.glb"
    className="h-96 w-full" 
    environmentPreset="sunset"
    scale={1.5}
    showControls={true}
  />
</ClientOnly3D>`}
              </pre>
              
              <h3>4. Customize the viewer</h3>
              <p>
                You can customize the lighting, environment, controls, and more to match your gallery's aesthetic.
                The BasicScene component supports various props to adjust the presentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 