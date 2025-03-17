import { Metadata } from 'next';
import React from 'react';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Events | Garazas.art',
  description: 'Discover upcoming exhibitions, artist talks, workshops and events at Garazas.art.',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 