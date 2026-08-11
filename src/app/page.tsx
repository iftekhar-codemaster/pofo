import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import MovieTrackerSection from '@/components/sections/MovieTrackerSection';
import YoutubeShowcase from '@/components/sections/YoutubeShowcase';
import CertificateSection from '@/components/sections/CertificateSection';
import GallerySection from '@/components/sections/GallerySection';
import SocialHubSection from '@/components/sections/SocialHubSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-[#00f3ff] selection:text-black overflow-x-hidden">
      {/* 1. Hero Section (3D Particle Field / Mobile Fallback) */}
      <HeroSection />

      {/* 2. About Section (Bio & Credentials) */}
      <AboutSection />

      {/* 3. Experience Timeline (R7 Scroll-Driven Animated Paths) */}
      <ExperienceTimeline />

      {/* 4. Verified Skills Matrix (29 Skills across 4 Buckets) */}
      <SkillsSection />

      {/* 5. Projects Section (GitHub Repositories) */}
      <ProjectsSection />

      {/* 6. Movie Tracker Section (R2 TMDB API / Mock Fallback) */}
      <MovieTrackerSection />

      {/* 7. YouTube Showcase (R6 Draxy Gaming 11.2K Subs & Series Filters) */}
      <YoutubeShowcase />

      {/* 8. Certificate Showcase (R3 10 Verified Certs with Hashes) */}
      <CertificateSection />

      {/* 9. Visual & Photo Gallery (R5 EXIF Photo Hover Overlays) */}
      <GallerySection />

      {/* 10. Social Media Hub (R8 Platform Cards & Subscriber Stats) */}
      <SocialHubSection />

      {/* 11. Contact Section (Interactive Form & Direct Links) */}
      <ContactSection />

      {/* Site Footer */}
      <footer className="py-8 border-t border-zinc-800/80 bg-zinc-950 text-center text-xs text-zinc-400 font-mono pb-24 sm:pb-8">
        <p>&copy; {new Date().getFullYear()} Md Iftekhar Ferdous. All rights reserved.</p>
        <p className="text-zinc-500 mt-1">CMO &amp; Deputy CTO @ AmarEvents &bull; Webdev &amp; AI/ML Enthusiast</p>
      </footer>
    </main>
  );
}
