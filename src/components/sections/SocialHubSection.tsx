'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Youtube,
  Linkedin,
  Github,
  Mail,
  Instagram,
  Facebook,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Users,
  Copy,
  Check
} from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function SocialHubSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('business.draxy@yahoo.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const socialPlatforms = [
    {
      id: 'youtube-main',
      platform: 'YouTube (Main)',
      handle: '@Draxy.Gaming',
      stats: '11.2K Subscribers',
      subtext: '199+ Gaming & Tech Videos',
      url: 'https://youtube.com/@Draxy.Gaming',
      brandColor: 'from-red-600 to-rose-700',
      glowColor: 'shadow-[0_0_30px_rgba(239,68,68,0.35)]',
      borderColor: 'border-red-500/40',
      icon: Youtube,
      channels: [
        { name: 'DRAXY ML', subs: '520 subs' },
        { name: 'XxHyper', subs: '2.17K subs' }
      ]
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      handle: 'MD Iftekhar Ferdous',
      stats: '500+ Connections',
      subtext: 'CMO & Deputy CTO Profile',
      url: identityData.personal.linkedin,
      brandColor: 'from-blue-600 to-cyan-700',
      glowColor: 'shadow-[0_0_30px_rgba(10,102,194,0.35)]',
      borderColor: 'border-blue-500/40',
      icon: Linkedin
    },
    {
      id: 'github',
      platform: 'GitHub',
      handle: 'iftekhar-codemaster',
      stats: 'Open Source Repos',
      subtext: 'nexacraft, dxbazar & more',
      url: 'https://github.com/iftekhar-codemaster',
      brandColor: 'from-zinc-700 to-zinc-900',
      glowColor: 'shadow-[0_0_30px_rgba(255,255,255,0.2)]',
      borderColor: 'border-zinc-500/40',
      icon: Github
    },
    {
      id: 'email',
      platform: 'Business Email',
      handle: 'business.draxy@yahoo.com',
      stats: 'Direct Inquiries',
      subtext: 'Click to copy address',
      url: 'mailto:business.draxy@yahoo.com',
      brandColor: 'from-cyan-600 to-teal-700',
      glowColor: 'shadow-[0_0_30px_rgba(0,243,255,0.35)]',
      borderColor: 'border-cyan-500/40',
      icon: Mail,
      isEmail: true
    },
    {
      id: 'discord',
      platform: 'Discord',
      handle: 'Draxy Community',
      stats: 'Gaming & Tech Lounge',
      subtext: 'Join creator server',
      url: 'https://discord.gg/draxy',
      brandColor: 'from-indigo-600 to-purple-700',
      glowColor: 'shadow-[0_0_30px_rgba(99,102,241,0.35)]',
      borderColor: 'border-indigo-500/40',
      icon: MessageSquare
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      handle: '@draxy.gaming',
      stats: 'Visual Clips & Stories',
      subtext: 'Gaming highlights',
      url: 'https://instagram.com/draxy.gaming',
      brandColor: 'from-pink-600 to-purple-700',
      glowColor: 'shadow-[0_0_30px_rgba(236,72,153,0.35)]',
      borderColor: 'border-pink-500/40',
      icon: Instagram
    },
    {
      id: 'facebook',
      platform: 'Facebook',
      handle: 'Md Iftekhar Ferdous',
      stats: 'Official Page',
      subtext: 'Community updates',
      url: 'https://facebook.com/iftekhar.ferdous',
      brandColor: 'from-blue-700 to-indigo-800',
      glowColor: 'shadow-[0_0_30px_rgba(59,130,246,0.35)]',
      borderColor: 'border-blue-600/40',
      icon: Facebook
    }
  ];

  return (
    <section id="socials" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE SOCIAL HUB &bull; REQUIREMENT R8</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Connect Across All Platforms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Explore live channel metrics, developer profiles, creator communities, and direct business contacts.
          </motion.p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPlatforms.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-zinc-900/50 border ${item.borderColor} backdrop-blur-md transition-all duration-300 flex flex-col justify-between group hover:${item.glowColor}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${item.brandColor} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.isEmail ? (
                      <button
                        onClick={copyEmail}
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-cyan-400 flex items-center gap-1.5 transition-colors"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Title & Handle */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {item.platform}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mb-3">{item.handle}</p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-xs font-semibold text-white mb-2">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.stats}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{item.subtext}</p>
                </div>

                {/* Sub-Channels list for YouTube Main */}
                {item.channels && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                    {item.channels.map((ch) => (
                      <span key={ch.name} className="px-2 py-0.5 rounded bg-zinc-950 text-red-300 border border-red-500/20">
                        {ch.name}: {ch.subs}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
