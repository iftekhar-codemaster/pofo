'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Linkedin, Github, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function StickySocialBar() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('business.draxy@yahoo.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'YouTube (11.2K)',
      url: 'https://youtube.com/@Draxy.Gaming',
      icon: Youtube,
      hoverColor: 'hover:text-red-500 hover:border-red-500/50'
    },
    {
      name: 'LinkedIn Profile',
      url: identityData.personal.linkedin,
      icon: Linkedin,
      hoverColor: 'hover:text-blue-400 hover:border-blue-400/50'
    },
    {
      name: 'GitHub Repos',
      url: 'https://github.com/iftekhar-codemaster',
      icon: Github,
      hoverColor: 'hover:text-white hover:border-white/50'
    },
    {
      name: 'Discord Community',
      url: 'https://discord.gg/draxy',
      icon: MessageSquare,
      hoverColor: 'hover:text-indigo-400 hover:border-indigo-400/50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 sm:gap-4"
    >
      <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 border-r border-zinc-800 pr-3">
        Md Iftekhar Ferdous
      </span>

      <div className="flex items-center gap-2 sm:gap-3">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className={`p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all duration-300 ${s.hoverColor} hover:scale-110`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          title="Copy Email: business.draxy@yahoo.com"
          className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}
