'use client'

import React, { useRef, useState, useEffect } from 'react'

interface Props {
  modelPath: string
  className?: string
  scale?: number
  environmentPreset?: string
  showControls?: boolean
}

export default function BasicScene({
  modelPath,
  className = '',
  scale = 1,
  environmentPreset = 'sunset',
  showControls = true
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(false)

  // Use a single useEffect to setup the scene
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let mounted = true
    let animationFrameId: number | null = null
    let cleanupFn: (() => void) | null = null
    
    // This runtime-evaluated function completely hides the imports from build-time analysis
    const setupScene = async () => {
      try {
        // Use indirect evaluation to hide the imports from the build system
        // This is necessary to prevent Next.js from trying to resolve these modules during build
        const dynamicImport = new Function('modulePath', 'return import(modulePath)');
        
        // Load Three.js using indirect dynamic import
        const THREE = await dynamicImport('three');
        
        // Create a scene manually without using other libraries
        if (!containerRef.current || !mounted) return;
        
        // Create basic Three.js elements
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75, 
          containerRef.current.clientWidth / containerRef.current.clientHeight, 
          0.1, 
          1000
        );
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        
        // Clear container and add canvas
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
        
        // Create a pink cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff1493 });
        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(scale, scale, scale);
        scene.add(cube);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        // Position camera
        camera.position.z = 5;
        
        // Set up controls if requested
        let controls = null;
        if (showControls) {
          try {
            // Try to load OrbitControls from three-stdlib
            const threeStdLib = await dynamicImport('three-stdlib');
            if (threeStdLib.OrbitControls) {
              controls = new threeStdLib.OrbitControls(camera, renderer.domElement);
              controls.enableDamping = true;
            }
          } catch (controlsErr) {
            console.warn('Could not load OrbitControls:', controlsErr);
            // Continue without controls
          }
        }
        
        // Handle window resize
        const handleResize = () => {
          if (!containerRef.current) return;
          
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          
          renderer.setSize(width, height);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Animation loop
        const animate = () => {
          if (!containerRef.current || !mounted) return;
          
          animationFrameId = requestAnimationFrame(animate);
          
          // Rotate the cube
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          
          // Update controls
          if (controls && controls.update) {
            controls.update();
          }
          
          renderer.render(scene, camera);
        };
        
        // Start animation
        animate();
        
        if (mounted) {
          setIsRendering(true);
        }
        
        // Prepare cleanup function
        cleanupFn = () => {
          window.removeEventListener('resize', handleResize);
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
          if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          geometry.dispose();
          material.dispose();
        };
      } catch (err) {
        console.error('Error setting up 3D scene:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    };
    
    // Start the setup process
    setupScene();
    
    // Clean up on unmount
    return () => {
      mounted = false;
      if (cleanupFn) cleanupFn();
    };
  }, [scale, environmentPreset, showControls, modelPath]);
  
  if (error) {
    return (
      <div className={`${className} bg-red-900 text-white p-4 flex items-center justify-center`}>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">3D Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className={`${className} relative bg-gray-800`} style={{ minHeight: '300px' }}>
      {!isRendering && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4">Initializing 3D scene...</p>
          </div>
        </div>
      )}
    </div>
  );
} 