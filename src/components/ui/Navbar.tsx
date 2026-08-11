'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Terminal } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certs', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Movies', href: '#movies' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Social Hub', href: '#socials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/80 backdrop-blur-xl border-b border-zinc-800/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo / Monogram */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f3ff] to-[#9d00ff] p-0.5 shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400 font-extrabold text-sm">
              IF
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
              {identityData.personal.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              CMO &amp; Deputy CTO @ AmarEvents
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-black font-bold text-xs shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:scale-105 transition-all"
          >
            <span>Let&apos;s Talk</span>
            <Rocket className="w-3.5 h-3.5 text-black" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050508]/95 border-b border-zinc-800 backdrop-blur-2xl overflow-hidden px-4 py-6"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-cyan-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-zinc-800">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-black font-bold text-sm text-center block shadow-lg"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
