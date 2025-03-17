import { Metadata } from 'next';
import React from 'react';

// Static metadata for the Archive page
export const metadata: Metadata = {
  title: 'Archive | Garazas.art',
  description: 'Explore the archive of past exhibitions and projects at Garazas.art gallery.',
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 