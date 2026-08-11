'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Copy, Check, Sparkles, MessageSquare, Linkedin, Github, Youtube } from 'lucide-react';
import { identityData } from '@/lib/mockData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('business.draxy@yahoo.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050508] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#00f3ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Let&apos;s Build Something Extraordinary
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg"
          >
            Open for hybrid developer roles, AI/ML consultation, content collaborations, and event technology partnerships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md flex flex-col justify-between space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Direct Contact Info</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Feel free to reach out via email for business inquiries, sponsorship opportunities, or technical inquiries.
              </p>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Business Email</span>
                    <span className="text-sm font-semibold font-mono text-white truncate block">
                      business.draxy@yahoo.com
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-cyan-400 hover:text-white transition-colors shrink-0 ml-2"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Primary Location</span>
                  <span className="text-sm font-semibold text-white">
                    Thakurgaon, Rajshahi, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-4">
                Primary Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={identityData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/iftekhar-codemaster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://youtube.com/@Draxy.Gaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-zinc-300">
                  Thank you for reaching out, Md Iftekhar Ferdous will respond to your email at <span className="text-cyan-400 font-mono">business.draxy@yahoo.com</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Sponsorship / Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your proposal or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-black font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(157,0,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
