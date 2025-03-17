'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Environment, Html } from '@react-three/drei'
import { Suspense } from 'react'
import { Group, Vector3 } from 'three'
import ModelControls from './ModelControls'

// Model component that loads and displays the 3D model
function Model({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0],
  autoRotate = true
}: { 
  modelPath: string; 
  scale?: number; 
  position?: [number, number, number];
  autoRotate?: boolean;
}) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(modelPath)
  
  // Rotation animation
  useFrame((state) => {
    if (group.current && autoRotate) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={group} dispose={null} position={new Vector3(...position)} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

// Camera controls with refs for external control
function ControlledCamera({ 
  controlsRef,
  autoRotate = true
}: { 
  controlsRef: React.RefObject<any>;
  autoRotate?: boolean;
}) {
  const { viewport } = useThree()
  
  useEffect(() => {
    // Adjust camera position based on viewport width
    if (viewport.width < 5) { // mobile
      if (controlsRef.current) {
        controlsRef.current.object.position.z = 7
      }
    } else { // desktop
      if (controlsRef.current) {
        controlsRef.current.object.position.z = 5
      }
    }
  }, [viewport.width, controlsRef])
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      rotateSpeed={0.5}
      autoRotate={autoRotate}
      autoRotateSpeed={1}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      zoomSpeed={0.5}
    />
  )
}

// Loading indicator
function Loader() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2">Loading 3D model...</p>
      </div>
    </Html>
  )
}

type ModelViewerProps = {
  modelPath: string
  className?: string
  scale?: number
  position?: [number, number, number]
  autoRotate?: boolean
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
  showControls?: boolean
}

export default function ModelViewer({ 
  modelPath,
  className = '',
  scale = 1, 
  position = [0, 0, 0],
  autoRotate = true,
  environmentPreset = 'sunset',
  showControls = true
}: ModelViewerProps) {
  const [isRotating, setIsRotating] = useState(autoRotate)
  const [currentPreset, setCurrentPreset] = useState(environmentPreset)
  const controlsRef = useRef<any>(null)
  
  // Handle control actions
  const handleRotateToggle = () => {
    setIsRotating(prev => !prev)
  }
  
  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset?.()
    }
  }
  
  const handleZoomIn = () => {
    if (controlsRef.current && controlsRef.current.object?.position) {
      controlsRef.current.object.position.z -= 0.5
    }
  }
  
  const handleZoomOut = () => {
    if (controlsRef.current && controlsRef.current.object?.position) {
      controlsRef.current.object.position.z += 0.5
    }
  }
  
  const handleLightingChange = (preset: string) => {
    setCurrentPreset(preset as any)
  }
  
  return (
    <div className={`relative ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <Stage environment={currentPreset} intensity={0.5} shadows>
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              position={position} 
              autoRotate={isRotating} 
            />
          </Stage>
          <Environment preset={currentPreset} />
          <ControlledCamera controlsRef={controlsRef} autoRotate={isRotating} />
        </Suspense>
      </Canvas>
      
      {showControls && (
        <ModelControls 
          onRotateToggle={handleRotateToggle}
          onReset={handleReset}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLightingChange={handleLightingChange}
          isRotating={isRotating}
        />
      )}
    </div>
  )
}

// Preload the model to avoid waterfall loading
useGLTF.preload('/models/sculpture.glb') 