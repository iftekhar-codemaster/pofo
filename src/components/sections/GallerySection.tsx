'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Eye, Info, Sliders, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeExifItem, setActiveExifItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'events', label: 'AmarEvents & Tech' },
    { id: 'scouting', label: 'Scouting & Leadership' },
    { id: 'gaming', label: 'Gaming & Media Setup' },
  ];

  const galleryItems = [
    {
      id: 'g1',
      title: 'AmarEvents Digital Strategy Keynote',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      caption: 'Presenting hybrid technology and automated marketing tools for Bangladeshi event hosts.',
      exif: {
        camera: 'Sony Alpha 7 IV',
        lens: 'FE 35mm F1.4 GM',
        aperture: 'f/1.8',
        shutter: '1/250s',
        iso: 'ISO 400',
        location: 'Thakurgaon, Bangladesh',
        date: 'Oct 2025'
      }
    },
    {
      id: 'g2',
      title: 'JOTA-JOTI Global Scouting Summit',
      category: 'scouting',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      caption: 'International digital scout gathering connecting thousands of scouts worldwide.',
      exif: {
        camera: 'Canon EOS R6',
        lens: 'RF 24-70mm F2.8L',
        aperture: 'f/2.8',
        shutter: '1/500s',
        iso: 'ISO 200',
        location: 'WOSM Digital Hub',
        date: 'Oct 2024'
      }
    },
    {
      id: 'g3',
      title: 'Draxy Gaming Streaming Workspace',
      category: 'gaming',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      caption: 'Dual-monitor gaming rig setup optimized for 60fps broadcasting and content editing.',
      exif: {
        camera: 'Fujifilm X-T4',
        lens: 'XF 16-55mm F2.8',
        aperture: 'f/2.0',
        shutter: '1/125s',
        iso: 'ISO 800',
        location: 'Creator Studio',
        date: 'Jan 2026'
      }
    },
    {
      id: 'g4',
      title: 'Generative AI Workbench & Code Debugging',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      caption: 'Testing custom prompt engineering pipelines and TypeScript web components.',
      exif: {
        camera: 'Sony Alpha 7 IV',
        lens: 'FE 50mm F1.2 GM',
        aperture: 'f/1.4',
        shutter: '1/320s',
        iso: 'ISO 100',
        location: 'Dev Studio',
        date: 'Jul 2026'
      }
    },
    {
      id: 'g5',
      title: 'Thakurgaon Govt. Boys High School Campus',
      category: 'scouting',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      caption: 'Academic campus environment for Science curriculum, Physics labs, and SCOUT meetings.',
      exif: {
        camera: 'Nikon Z6 II',
        lens: 'NIKKOR Z 24-120mm',
        aperture: 'f/4.0',
        shutter: '1/1000s',
        iso: 'ISO 100',
        location: 'Thakurgaon, Rajshahi',
        date: 'Mar 2025'
      }
    },
    {
      id: 'g6',
      title: 'Meet Dexter AI Assistant Architecture',
      category: 'gaming',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      caption: 'Custom PC & AI assistant showcase banner designed for YouTube video series.',
      exif: {
        camera: 'Digital Canvas GLSL',
        lens: 'Virtual 3D Camera',
        aperture: 'f/1.0',
        shutter: '1/60s',
        iso: 'ISO 50',
        location: 'Draxy Media Lab',
        date: 'May 2026'
      }
    }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-purple-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL GALLERY &amp; EXIF OVERLAYS &bull; SERGIO-AYALA INSPIRED</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Curated Visual Showcase
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Hover or tap any photo card to inspect EXIF metadata (camera, shutter, ISO, aperture, location).
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00f3ff] text-black font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveExifItem(item.id)}
                onMouseLeave={() => setActiveExifItem(null)}
                className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40 group cursor-pointer aspect-[4/3]"
              >
                {/* Background Image */}
                {/* eslint-disable-next-html-loader */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Always-visible Title & Caption */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                {/* EXIF Metadata Overlay (Revealed on Hover / Active State) */}
                <div
                  className={`absolute inset-0 bg-black/85 backdrop-blur-md p-6 flex flex-col justify-between z-20 transition-all duration-300 ${
                    activeExifItem === item.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                      <Camera className="w-4 h-4" />
                      <span>EXIF DATA</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                      RAW INSPECTION
                    </span>
                  </div>

                  {/* EXIF Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CAMERA</span>
                      <span className="text-white font-medium">{item.exif.camera}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">LENS</span>
                      <span className="text-white font-medium">{item.exif.lens}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">APERTURE</span>
                      <span className="text-cyan-400 font-bold">{item.exif.aperture}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">SHUTTER</span>
                      <span className="text-cyan-400 font-bold">{item.exif.shutter}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">ISO</span>
                      <span className="text-purple-400 font-bold">{item.exif.iso}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">DATE</span>
                      <span className="text-zinc-300">{item.exif.date}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {item.exif.location}
                    </span>
                    <span className="text-cyan-400 text-[10px]">sergio-ayala style</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
