import type { Metadata } from 'next';
import './globals.css';

import SmoothScroll from '@/components/ui/SmoothScroll';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import AudioToggle from '@/components/ui/AudioToggle';
import Navbar from '@/components/ui/Navbar';
import StickySocialBar from '@/components/ui/StickySocialBar';

export const metadata: Metadata = {
  title: 'Md Iftekhar Ferdous — Creative Developer & CMO/Deputy CTO',
  description:
    'Personal Portfolio of Md Iftekhar Ferdous — CMO & Deputy CTO at AmarEvents, Web Developer, AI/ML Enthusiast, and 11.2K YouTube Content Creator.',
  keywords: [
    'Md Iftekhar Ferdous',
    'Creative Developer',
    'CMO',
    'Deputy CTO',
    'AmarEvents',
    'Draxy Gaming',
    'Web Developer',
    'AI/ML Enthusiast',
    'Next.js',
    'Three.js',
    'Portfolio'
  ],
  authors: [{ name: 'Md Iftekhar Ferdous', url: 'https://github.com/iftekhar-codemaster' }],
  creator: 'Md Iftekhar Ferdous',
  openGraph: {
    title: 'Md Iftekhar Ferdous — Creative Developer & CMO/Deputy CTO',
    description:
      'Personal Portfolio of Md Iftekhar Ferdous — CMO & Deputy CTO at AmarEvents, Web Developer, AI/ML Enthusiast, and 11.2K YouTube Content Creator.',
    url: 'https://iftekharferdous.dev',
    siteName: 'Md Iftekhar Ferdous Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Md Iftekhar Ferdous Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Iftekhar Ferdous — Creative Developer & CMO/Deputy CTO',
    description:
      'Personal Portfolio of Md Iftekhar Ferdous — CMO & Deputy CTO at AmarEvents, Web Developer, AI/ML Enthusiast, and 11.2K YouTube Content Creator.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050508] text-zinc-100 min-h-screen antialiased selection:bg-[#00f3ff] selection:text-black font-sans bg-noise">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <AudioToggle className="fixed bottom-6 right-4 sm:right-8 z-50 shadow-2xl" />
          <Navbar />
          {children}
          <StickySocialBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
