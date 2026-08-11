'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from '@/components/3d/HeroCanvas';
import { ArrowDown, Sparkles, Terminal, Rocket, Award, ExternalLink } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function HeroSection() {
  const bioTags = [
    { label: 'Web Developer', icon: Terminal, color: 'border-cyan-500/40 text-cyan-400' },
    { label: 'AI/ML Enthusiast', icon: Sparkles, color: 'border-purple-500/40 text-purple-400' },
    { label: 'CMO & Deputy CTO @ AmarEvents', icon: Rocket, color: 'border-blue-500/40 text-blue-400' },
    { label: '11.2K YouTube Creator', icon: ExternalLink, color: 'border-red-500/40 text-red-400' },
    { label: 'SCOUT Member', icon: Award, color: 'border-emerald-500/40 text-emerald-400' },
  ];

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050508] pt-20 pb-12">
      {/* 3D Canvas Background */}
      <HeroCanvas />

      {/* Radial Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050508]/70 to-[#050508] pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.15)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
          <span>Available for Hybrid Dev & Strategic Tech Roles</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
        >
          <span className="block text-zinc-300 text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Hello, I&apos;m
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] via-purple-400 to-[#9d00ff]">
            {identityData.personal.name}
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl text-lg sm:text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-8"
        >
          Webdev, AI/ML Enthusiast, CMO &amp; Deputy CTO @ <span className="text-white font-medium">AmarEvents</span>
        </motion.p>

        {/* Animated Bio Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl"
        >
          {bioTags.map((tag, idx) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border ${tag.color} text-xs font-medium backdrop-blur-md shadow-lg`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tag.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(157,0,255,0.6)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Explore Work
            <Rocket className="w-4 h-4 text-black" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-500/50 text-white font-semibold text-sm tracking-wide transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Smooth Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 z-20 flex flex-col items-center cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-zinc-800 bg-zinc-900/40 text-cyan-400"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
