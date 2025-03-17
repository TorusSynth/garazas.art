'use client';

import React from 'react';
import { RiFacebookFill, RiInstagramLine } from 'react-icons/ri';
import T from '@/components/translations/T';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: <RiFacebookFill />, href: 'https://facebook.com/garazas.art' },
    { name: 'Instagram', icon: <RiInstagramLine />, href: 'https://instagram.com/garazas.art' },
  ];

  return (
    <footer className="bg-gray-100 text-[var(--color-primary)]">
      <div className="container mx-auto px-4 py-6">
        {/* Simplified footer with just copyright and social links */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm mb-4 sm:mb-0">
            <T keyName="footer.copyright" params={{ year: currentYear }} />
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:opacity-70 transition-opacity"
                aria-label={link.name}
              >
                <span className="text-xl">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 