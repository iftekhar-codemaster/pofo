'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Youtube, Sparkles, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { mockTimeline } from '@/lib/mockData';

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineItems = [
    {
      id: 't1',
      date: 'Sep 2025 – Present',
      title: 'Chief Marketing Officer & Deputy CTO',
      org: 'AmarEvents',
      location: 'Thakurgaon, Rajshahi, Bangladesh (Hybrid)',
      type: 'Executive & Tech Leadership',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      glow: 'shadow-[0_0_25px_rgba(0,243,255,0.4)]',
      highlights: [
        'Directing digital marketing strategy & search engine optimization (SEO)',
        'Modernizing Bangladesh event management industry with web tools',
        'Bridging executive marketing vision with PHP/Software technical execution'
      ]
    },
    {
      id: 't2',
      date: 'Jul 2026',
      title: '10 Verified Generative AI & Ethics Certifications',
      org: 'Microsoft, NASBA, PMI & LinkedIn',
      location: 'Verified Online Credentials',
      type: 'Technical Certifications',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      glow: 'shadow-[0_0_25px_rgba(157,0,255,0.4)]',
      highlights: [
        'Prompt Engineering & Generative AI Tools (Microsoft & LinkedIn)',
        'Responsible AI & Ethics in AI (NASBA Credential & PMI Verified)',
        'Microsoft 365 Copilot for Business & AI Productivity'
      ]
    },
    {
      id: 't3',
      date: '2024 – Present',
      title: 'Draxy Gaming Channel Growth to 11.2K Subs',
      org: 'Draxy Gaming Network',
      location: 'YouTube Media & Content Creation',
      type: 'Media & Audience Building',
      icon: Youtube,
      color: 'from-red-500 to-rose-600',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.4)]',
      highlights: [
        'Expanded main channel to 11,200+ subscribers and 199+ videos',
        'Launched sub-channels DRAXY ML (520 subs) & XxHyper (2.17K subs)',
        'Produced Minecraft Midas SMP, Level Devil, and Meet Dexter AI showcases'
      ]
    },
    {
      id: 't4',
      date: 'Oct 2024',
      title: 'JOTA-JOTI 2024 Scout Participation',
      org: 'World Organization of the Scout Movement (WOSM)',
      location: 'Global Digital Event',
      type: 'Scouting Leadership',
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.4)]',
      highlights: [
        'Earned official WOSM digital scout participation credential',
        'Fostered global digital literacy, teamwork, and sustainability',
        'Applied scout principles to software team collaboration'
      ]
    },
    {
      id: 't5',
      date: '2018 – May 2026',
      title: 'Secondary School Certificate (SSC), Science',
      org: "Thakurgaon Govt. Boys' High School",
      location: 'Thakurgaon, Bangladesh',
      type: 'Academic Foundation',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-600',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]',
      highlights: [
        'Grade 10 Science specialization in Physics & Higher Mathematics',
        'Active member of SCOUT Movement and Bookworm Society',
        'Established foundational computational & mathematical skills'
      ]
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="relative py-28 bg-[#050508] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE TIMELINE &bull; REQUIREMENT R7</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Journey &amp; Key Milestones
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Scroll-driven chronological path tracing education, content creation, certifications, and executive leadership.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Central Animated Line (Desktop / Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-zinc-800/80 rounded-full">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#00f3ff] via-purple-500 to-[#9d00ff] shadow-[0_0_15px_#00f3ff]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-950 border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(0,243,255,0.5)]"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1">
                      
                      {/* Top Bar */}
                      <div className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-cyan-400 font-mono text-xs flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-purple-950/40 text-purple-300 text-xs font-mono border border-purple-500/20">
                          {item.type}
                        </span>
                      </div>

                      {/* Title & Org */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className={`flex flex-wrap items-center gap-2 text-sm text-zinc-400 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="font-semibold text-zinc-200">{item.org}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      {/* Highlights Bullet List */}
                      <ul className="space-y-2 mt-4 text-sm text-zinc-300 text-left">
                        {item.highlights.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
