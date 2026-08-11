'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Compass, BookOpen, Cpu, ShieldCheck, Zap, Award } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function AboutSection() {
  const credentials = [
    {
      title: 'Chief Marketing Officer & Deputy CTO',
      org: 'AmarEvents',
      period: 'Sep 2025 – Present',
      location: 'Thakurgaon, Rajshahi, Bangladesh (Hybrid)',
      icon: Briefcase,
      color: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30',
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      description:
        'Directing digital marketing strategies while spearheading technical advancements as Deputy CTO, engineering user-friendly solutions to digitize and elevate event management across Bangladesh.',
      skills: ['SEO', 'Digital Strategy', 'PHP', 'Software Engineering', 'Creative Marketing']
    },
    {
      title: 'Secondary School Certificate (SSC), Science',
      org: "Thakurgaon Govt. Boys' High School",
      period: '2018 – May 2026 (Grade 10)',
      location: 'Thakurgaon, Bangladesh',
      icon: GraduationCap,
      color: 'from-purple-500/20 to-pink-600/20 border-purple-500/30',
      tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      description:
        'Specializing in Physics and Higher Mathematics. Active participant in extracurricular activities, combining scientific analytical thinking with creative web development.',
      skills: ['Physics', 'Mathematics', 'Bangla', 'English']
    }
  ];

  const extracurriculars = [
    {
      title: 'SCOUT Movement Leadership',
      role: 'Active SCOUT & JOTA-JOTI 2024 Participant',
      icon: Compass,
      org: 'World Organization of the Scout Movement (WOSM)',
      desc: 'Participated in international digital scouting events focusing on community engagement, digital literacy, teamwork, and sustainable development goals.',
      badge: 'Certified JOTA-JOTI 2024'
    },
    {
      title: 'Bookworm Society & Knowledge Pursuits',
      role: 'Literary & Technical Reader',
      icon: BookOpen,
      org: "Thakurgaon Govt. Boys' High School",
      desc: 'Dedicated to continuous self-improvement in web architectures, artificial intelligence, ethical technology, and analytical literature.',
      badge: 'Continuous Learner'
    }
  ];

  const highlights = [
    { label: 'Verified Certifications', value: '10+', icon: ShieldCheck, color: 'text-cyan-400' },
    { label: 'YouTube Subscribers', value: '11.2K', icon: Zap, color: 'text-red-400' },
    { label: 'Verified Skill Items', value: '29', icon: Cpu, color: 'text-purple-400' },
    { label: 'Leadership Roles', value: '2', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18182415_1px,transparent_1px),linear-gradient(to_bottom,#18182415_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>EXECUTIVE &amp; ACADEMIC OVERVIEW</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
          >
            Driven by Technology, Strategic Marketing &amp; Innovation
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed"
          >
            {identityData.summary}
          </motion.p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md flex flex-col items-center text-center group hover:border-zinc-700 transition-all"
              >
                <Icon className={`w-6 h-6 mb-2 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-zinc-400 font-medium">{item.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Core Credentials Section */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-zinc-200 flex items-center gap-3">
            <span className="w-2 h-8 rounded-full bg-[#00f3ff]" />
            Core Credentials &amp; Leadership
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`p-8 rounded-2xl bg-gradient-to-br ${cred.color} border backdrop-blur-md flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-zinc-950/80 text-cyan-400 border border-zinc-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono border ${cred.tagColor}`}>
                        {cred.period}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-1">{cred.title}</h4>
                    <p className="text-cyan-400 text-sm font-medium mb-3">{cred.org}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{cred.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                    {cred.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Extracurriculars & Scouting */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-zinc-200 flex items-center gap-3">
            <span className="w-2 h-8 rounded-full bg-[#9d00ff]" />
            SCOUT &amp; Extracurricular Leadership
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extracurriculars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-purple-500/40 backdrop-blur-md transition-all flex gap-5"
                >
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-400 shrink-0 h-fit">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-xs font-medium text-zinc-400 mb-2">{item.org}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
