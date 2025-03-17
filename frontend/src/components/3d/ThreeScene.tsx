'use client'

import React, { useRef, useState, useEffect } from 'react'

// Interface for the component props
interface ThreeSceneProps {
  modelPath: string
  className?: string
  scale?: number
  environmentPreset?: string
  showControls?: boolean
}

// This is the outer component that handles dynamic imports and state
export default function ThreeScene(props: ThreeSceneProps) {
  const { className = '' } = props
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [threeModules, setThreeModules] = useState<any>(null)

  // Dynamic import and setup of Three.js
  useEffect(() => {
    // Flag to prevent memory leaks if component unmounts during loading
    let isMounted = true

    const loadModules = async () => {
      try {
        // Import all libraries in parallel for better performance
        const [THREE, Fiber, Drei] = await Promise.all([
          import('three'),
          import('@react-three/fiber'),
          import('@react-three/drei')
        ])

        // If component is still mounted, save the modules and mark as loaded
        if (isMounted) {
          console.log('Three.js libraries loaded successfully:', THREE.REVISION)
          setThreeModules({ THREE, Fiber, Drei })
          setIsLoaded(true)
        }
      } catch (err) {
        console.error('Error loading Three.js libraries:', err)
        if (isMounted) {
          setHasError(true)
          setErrorMessage(err instanceof Error ? err.message : 'Unknown error loading 3D libraries')
        }
      }
    }

    loadModules()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [])

  // Error state
  if (hasError) {
    return (
      <div className={`${className} bg-red-900 text-white p-4 flex items-center justify-center`} style={{minHeight: '300px'}}>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">3D Loading Error</h3>
          <p className="text-sm opacity-80 mb-3">There was a problem loading the 3D libraries.</p>
          {errorMessage && (
            <div className="bg-black bg-opacity-20 p-3 rounded text-xs max-w-md mx-auto overflow-auto">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Loading state
  if (!isLoaded || !threeModules) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`} style={{minHeight: '300px'}}>
        <div className="text-center text-white">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4">Loading 3D libraries...</p>
          <p className="text-xs mt-2 text-gray-400">This may take a moment</p>
        </div>
      </div>
    )
  }

  // When libraries are loaded, render the actual 3D content
  return <ActualScene modules={threeModules} {...props} />
}

// This inner component receives the loaded modules and renders the 3D scene
function ActualScene({ modules, modelPath, className = '', scale = 1, environmentPreset = 'sunset', showControls = true }: ThreeSceneProps & { modules: any }) {
  const { THREE, Fiber, Drei } = modules
  const { Canvas } = Fiber
  const { Environment, OrbitControls } = Drei
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`${className} relative`}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* A simple box to show that 3D rendering is working */}
        <mesh scale={scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        
        {showControls && <OrbitControls />}
        <Environment preset={environmentPreset as any} />
      </Canvas>
      
      {/* Overlay with model path info */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded">
        <p>Model: {modelPath}</p>
        <p>Environment: {environmentPreset}</p>
      </div>
    </div>
  )
} 