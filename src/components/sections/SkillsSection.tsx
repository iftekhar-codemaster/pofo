'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, Megaphone, BookOpen, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Domains (29)', icon: Layers },
    { id: 'ai', label: 'AI & Emerging Tech (10)', icon: Cpu },
    { id: 'dev', label: 'Software & Dev (10)', icon: Code },
    { id: 'marketing', label: 'Marketing & Leadership (9)', icon: Megaphone },
    { id: 'academics', label: 'Academics & Science (4)', icon: BookOpen },
  ];

  const skillItems = [
    // AI & Emerging Tech (10)
    { name: 'Prompt Engineering', cat: 'ai', level: 95, desc: 'Advanced LLM prompting & zero-shot orchestration' },
    { name: 'Generative AI', cat: 'ai', level: 92, desc: 'Architecting GenAI workflows & API integrations' },
    { name: 'Generative AI Tools', cat: 'ai', level: 90, desc: 'Copilot, ChatGPT Enterprise, Midjourney, Claude' },
    { name: 'AI Literacy', cat: 'ai', level: 94, desc: 'Understanding machine learning paradigms & foundational AI' },
    { name: 'AI Productivity', cat: 'ai', level: 95, desc: 'Workflow optimization & automation tools' },
    { name: 'AI for Business', cat: 'ai', level: 88, desc: 'Transforming enterprise processes with AI' },
    { name: 'Microsoft Copilot', cat: 'ai', level: 92, desc: 'Microsoft 365 Copilot work suite execution' },
    { name: 'Responsible AI', cat: 'ai', level: 90, desc: 'Governance, safety, bias mitigation & compliance' },
    { name: 'Computer Ethics', cat: 'ai', level: 88, desc: 'Ethical frameworks in computational systems' },
    { name: 'AI Ethics', cat: 'ai', level: 92, desc: 'Certified NASBA & PMI AI Ethics frameworks' },

    // Software & Dev (10)
    { name: 'PHP', cat: 'dev', level: 88, desc: 'Server-side web development & CMS backends' },
    { name: 'Software Industry', cat: 'dev', level: 85, desc: 'SDLC, modular design & software delivery' },
    { name: 'Search Engine Optimization (SEO)', cat: 'dev', level: 94, desc: 'Technical SEO, keyword strategy & analytics' },
    { name: 'Digital Strategy', cat: 'dev', level: 92, desc: 'Full-funnel digital architecture & web strategy' },
    { name: 'Microsoft Office', cat: 'dev', level: 90, desc: 'Advanced document & data processing' },
    { name: 'TypeScript', cat: 'dev', level: 90, desc: 'Strict static typing & modern web application structures' },
    { name: 'React', cat: 'dev', level: 92, desc: 'Component architecture, state hooks & ecosystem' },
    { name: 'Next.js', cat: 'dev', level: 90, desc: 'App router, SSR, SSG & Server Actions' },
    { name: 'Tailwind CSS', cat: 'dev', level: 95, desc: 'Utility-first modern styling & glassmorphism' },
    { name: 'Three.js', cat: 'dev', level: 85, desc: '3D WebGL particle fields & R3F canvas scenes' },

    // Marketing & Leadership (9)
    { name: 'Strategic Marketing Management', cat: 'marketing', level: 94, desc: 'CMO level campaign execution @ AmarEvents' },
    { name: 'Market Research', cat: 'marketing', level: 90, desc: 'Audience analysis, competitor mapping & positioning' },
    { name: 'Creative Marketer', cat: 'marketing', level: 92, desc: 'Brand narrative creation & visual engagement' },
    { name: 'Digital Literacy', cat: 'marketing', level: 95, desc: 'Cross-platform media & content ecosystem fluency' },
    { name: 'Teamwork', cat: 'marketing', level: 95, desc: 'Collaborative team leadership & scout dynamics' },
    { name: 'Life Skills', cat: 'marketing', level: 90, desc: 'Problem solving, adaptability & resilience' },
    { name: 'Community Engagement', cat: 'marketing', level: 92, desc: '11.2K subscriber community management' },
    { name: 'Sustainable Development', cat: 'marketing', level: 88, desc: 'WOSM & JOTA-JOTI sustainability initiatives' },
    { name: 'International Relations', cat: 'marketing', level: 86, desc: 'Global scout movement & cross-border networking' },

    // Academics & Science (4)
    { name: 'Physics', cat: 'academics', level: 92, desc: 'Classical mechanics, optics & physical principles' },
    { name: 'Mathematics', cat: 'academics', level: 94, desc: 'Algebra, calculus, statistics & analytical logic' },
    { name: 'Bangla', cat: 'academics', level: 98, desc: 'Native linguistic command & communication' },
    { name: 'English', cat: 'academics', level: 92, desc: 'Professional fluency & technical writing' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skillItems
    : skillItems.filter((s) => s.cat === activeCategory);

  return (
    <section id="skills" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00f3ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#9d00ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED COMPETENCY MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            29 Verified Skills Across 4 Domains
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Synthesized from verified LinkedIn skill endorsements, certifications, software development, and executive leadership.
          </motion.p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-black font-bold shadow-[0_0_20px_rgba(0,243,255,0.4)] scale-105'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {skill.desc}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
