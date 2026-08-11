'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, Copy, Check, ExternalLink, Search, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string | string[];
  category: string;
  url: string;
}

export default function CertificateSection() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      setLoading(true);
      try {
        const res = await fetch('/api/certificates');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCertificates(data);
          } else {
            setCertificates(identityData.certificates);
          }
        } else {
          setCertificates(identityData.certificates);
        }
      } catch (err) {
        console.warn('Failed to fetch certificates from API, using fallback data:', err);
        setCertificates(identityData.certificates);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const parseSkills = (skills: string | string[]): string[] => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  const categories = [
    { id: 'all', label: 'All Certifications' },
    { id: 'Generative AI', label: 'Generative AI' },
    { id: 'AI Ethics', label: 'AI Ethics & Governance' },
    { id: 'AI Productivity', label: 'AI Productivity' },
    { id: 'Scouting & Leadership', label: 'Leadership & Community' },
  ];

  const filteredCerts = certificates.filter((cert) => {
    const matchesCategory =
      activeCategory === 'all' || cert.category.toLowerCase() === activeCategory.toLowerCase();
    const skillsList = parseSkills(cert.skills).join(' ').toLowerCase();
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skillsList.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050508] text-white overflow-hidden border-t border-zinc-800/40">
      {/* Background Neon Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00f3ff]/10 via-[#9d00ff]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-[#00f3ff] text-xs font-mono mb-4 tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-[#00f3ff]" />
              <span>10 Verified Qualifications</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Verified <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]">Certifications</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl text-base leading-relaxed">
              Professional credentials issued by Microsoft, LinkedIn, NASBA, PMI, and WOSM in Prompt Engineering, AI Ethics, Copilot, and Leadership.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title, org, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-zinc-800/60 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-950 to-purple-950 text-white border border-[#00f3ff]/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80 hover:bg-zinc-900'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                {cat.id === 'all'
                  ? certificates.length
                  : certificates.filter((c) => c.category.toLowerCase() === cat.id.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid with Entrance Reveal Animations */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-3xl bg-zinc-900/50 border border-zinc-800 animate-pulse p-6" />
            ))}
          </div>
        ) : filteredCerts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800/40 rounded-3xl">
            <Award className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-base">No certificates matching filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, index) => {
                const skillsArr = parseSkills(cert.skills);
                const isLongHash = cert.credentialId && cert.credentialId.length > 20;

                return (
                  <motion.div
                    key={cert.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#00f3ff]/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,243,255,0.12)]"
                  >
                    <div>
                      {/* Issuer & Date Row */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00f3ff]" />
                          {cert.issuer}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">{cert.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00f3ff] transition-colors leading-snug mb-3">
                        {cert.title}
                      </h3>

                      {/* Credential ID section (display hashes like 2de1c85e..., 811168be..., 52fa441d...) */}
                      <div className="mb-5 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-0.5">
                            Verified Credential ID
                          </span>
                          <span className="text-xs font-mono text-cyan-400 truncate block">
                            {isLongHash
                              ? `${cert.credentialId.slice(0, 16)}...${cert.credentialId.slice(-8)}`
                              : cert.credentialId}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(cert.credentialId, cert.id || String(index))}
                          title="Copy Credential ID"
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
                        >
                          {copiedId === (cert.id || String(index)) ? (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                              <Check className="w-3.5 h-3.5" /> Copied
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {skillsArr.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/60 text-zinc-300 border border-zinc-700/50"
                          >
                            <Tag className="w-2.5 h-2.5 text-[#00f3ff]" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Verify Link */}
                    <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-mono capitalize">
                        Category: {cert.category}
                      </span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/30 text-xs font-semibold transition-all"
                        >
                          Verify Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
