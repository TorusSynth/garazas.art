'use client'

import React from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import ClientOnly3D from './ClientOnly3D'
import dynamic from 'next/dynamic'

// Dynamically import BasicScene with no SSR
const BasicScene = dynamic(() => import('./BasicScene'), { ssr: false })

// Simplified version with no dynamic imports
type HeroModelProps = {
  title: string
  subtitle: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta: {
    text: string
    href: string
  }
  modelPath?: string
}

export default function HeroModel({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  modelPath = '/models/sculpture.glb'
}: HeroModelProps) {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 3D Model Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        
        {/* Wrap the 3D scene in ClientOnly3D to ensure it only renders on the client */}
        <ClientOnly3D>
          <BasicScene 
            modelPath={modelPath} 
            className="h-full w-full" 
            scale={2.5}
            environmentPreset="night"
            showControls={true}
          />
        </ClientOnly3D>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center md:text-left">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-white">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={primaryCta.href} 
              className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {primaryCta.text}
              <RiArrowRightLine />
            </a>
            <a 
              href={secondaryCta.href} 
              className="btn bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {secondaryCta.text}
              <RiArrowRightLine />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 