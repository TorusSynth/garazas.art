'use client'

import React, { useState } from 'react'
import { RiRefreshLine, RiZoomInLine, RiZoomOutLine, RiRestartLine, RiLightbulbLine } from 'react-icons/ri'

type ModelControlsProps = {
  onRotateToggle: () => void
  onReset: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onLightingChange: (preset: string) => void
  isRotating: boolean
}

export default function ModelControls({
  onRotateToggle,
  onReset,
  onZoomIn, 
  onZoomOut,
  onLightingChange,
  isRotating
}: ModelControlsProps) {
  const [isLightingOpen, setIsLightingOpen] = useState(false)
  
  const lightingPresets = [
    { name: 'Sunset', value: 'sunset' },
    { name: 'Night', value: 'night' },
    { name: 'Studio', value: 'studio' },
    { name: 'Warehouse', value: 'warehouse' },
    { name: 'Forest', value: 'forest' }
  ]
  
  return (
    <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={onRotateToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isRotating ? 'bg-primary-600 text-white' : 'bg-white/70 backdrop-blur-sm text-gray-800'
          } hover:bg-primary-600 hover:text-white transition-colors`}
          title={isRotating ? "Pause Rotation" : "Resume Rotation"}
        >
          <RiRefreshLine className="text-lg" />
        </button>
        
        <button
          onClick={onZoomIn}
          className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors"
          title="Zoom In"
        >
          <RiZoomInLine className="text-lg" />
        </button>
        
        <button
          onClick={onZoomOut}
          className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors"
          title="Zoom Out"
        >
          <RiZoomOutLine className="text-lg" />
        </button>
        
        <button
          onClick={onReset}
          className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors"
          title="Reset View"
        >
          <RiRestartLine className="text-lg" />
        </button>
        
        <div className="relative">
          <button
            onClick={() => setIsLightingOpen(!isLightingOpen)}
            className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-colors"
            title="Change Lighting"
          >
            <RiLightbulbLine className="text-lg" />
          </button>
          
          {isLightingOpen && (
            <div className="absolute bottom-12 right-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 w-40">
              <div className="text-sm font-medium text-gray-700 mb-2">Lighting</div>
              <div className="flex flex-col gap-1">
                {lightingPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      onLightingChange(preset.value)
                      setIsLightingOpen(false)
                    }}
                    className="text-left text-sm py-1 px-2 hover:bg-primary-100 rounded transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 