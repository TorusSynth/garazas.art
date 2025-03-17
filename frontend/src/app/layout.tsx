import type { Metadata } from 'next';
import { Space_Mono, Archivo_Black, VT323 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AppProvider } from '@/lib/context/AppContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import TranslatedMarquee from '@/components/common/TranslatedMarquee';
import LanguageAwareHtml from '@/components/common/LanguageAwareHtml';

// Define fonts for retro teletext design
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-archivo-black',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-vt323',
});

// Metadata for the site
export const metadata: Metadata = {
  title: {
    default: 'Garazas.art | Contemporary Art Exhibition Platform',
    template: '%s | Garazas.art',
  },
  description: 'Garazas.art is a contemporary art exhibition platform showcasing innovative artists and their work through curated exhibitions and open calls.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <LanguageAwareHtml className={`${spaceMono.variable} ${archivoBlack.variable} ${vt323.variable}`}>
        <body className="flex flex-col min-h-screen bg-gray-100">
          <ErrorBoundary>
            <AppProvider>
              <TranslatedMarquee />
              {/* Add top padding to accommodate the fixed marquee */}
              <div className="pt-[2.5rem]">
                <Header />
                <main className="flex-grow relative">{children}</main>
                <Footer />
              </div>
            </AppProvider>
          </ErrorBoundary>
        </body>
      </LanguageAwareHtml>
    </LanguageProvider>
  );
} 