'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, FolderGit2, Star, GitFork } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'nexacraft',
      description: 'Modular Web Application Architecture built with TypeScript. Implements scalable design patterns and component structures for high-performance frontend interfaces.',
      tags: ['TypeScript', 'React', 'Component Architecture', 'Tailwind CSS'],
      github: 'https://github.com/iftekhar-codemaster/nexacraft',
      demo: 'https://iftekhar-codemaster.github.io/nexacraft',
      stars: 14,
      forks: 5,
      featured: true,
      category: 'Frontend Engineering'
    },
    {
      title: 'Comapny-Landing-page',
      description: 'Corporate SaaS Product Landing Page template hosted on GitHub Pages. Features cinematic hero sections, interactive service cards, and fully responsive layouts.',
      tags: ['HTML5/CSS3', 'JavaScript', 'Responsive Design', 'SaaS UI'],
      github: 'https://github.com/iftekhar-codemaster/Comapny-Landing-page.github.io',
      demo: 'https://iftekhar-codemaster.github.io/Comapny-Landing-page.github.io',
      stars: 19,
      forks: 7,
      featured: true,
      category: 'Web Design & Landing Page'
    },
    {
      title: 'dxbazar',
      description: 'E-commerce Storefront UI project ("DX Bazar"). Features interactive product grids, category filtering, cart state management, and modern dark-mode aesthetic.',
      tags: ['TypeScript', 'React', 'Tailwind CSS', 'E-Commerce'],
      github: 'https://github.com/iftekhar-codemaster/dxbazar',
      demo: 'https://iftekhar-codemaster.github.io/dxbazar',
      stars: 11,
      forks: 3,
      featured: true,
      category: 'E-Commerce Application'
    },
    {
      title: 'aponananna.github.io',
      description: '"My Simple Web" personal web layout and template hosted on GitHub Pages. Focuses on lightweight DOM manipulation and clean minimalist layout principles.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'GitHub Pages'],
      github: 'https://github.com/iftekhar-codemaster/aponananna.github.io',
      demo: 'https://iftekhar-codemaster.github.io/aponananna.github.io',
      stars: 8,
      forks: 2,
      featured: false,
      category: 'Web Template'
    },
    {
      title: 'modern-javascript-starter-files',
      description: 'Comprehensive JavaScript application starter codebase with ES6+ syntax patterns, modular bundlers, and asynchronous API handling exercises.',
      tags: ['JavaScript (ES6+)', 'Async/Await', 'Starter Kit'],
      github: 'https://github.com/iftekhar-codemaster/modern-javascript-starter-files',
      stars: 16,
      forks: 4,
      featured: false,
      category: 'Developer Utilities'
    },
    {
      title: 'My-Web-Learning-Progress',
      description: 'Milestone tracker documenting web development DOM exercises, JavaScript algorithms, and interactive web layout progress.',
      tags: ['DOM Manipulation', 'Web Fundamentals', 'JavaScript'],
      github: 'https://github.com/iftekhar-codemaster/My-Web-Learning-Progress',
      stars: 9,
      forks: 1,
      featured: false,
      category: 'Learning & Docs'
    }
  ];

  return (
    <section id="projects" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>GITHUB REPOSITORIES &amp; PROJECTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Featured Web &amp; Software Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Open-source repositories, e-commerce storefronts, corporate landing pages, and web architecture frameworks.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/50 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,243,255,0.1)]"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-cyan-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      {project.forks}
                    </span>
                  </div>
                </div>

                {/* Category & Title */}
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-xs font-medium text-cyan-400 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
