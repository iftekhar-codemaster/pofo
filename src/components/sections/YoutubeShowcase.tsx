'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Play, Eye, Clock, ExternalLink, Sparkles, X, Users, Video } from 'lucide-react';
import { mockYouTubeData } from '@/lib/mockData';

export interface YouTubeChannel {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  videoCount: string;
  avatar: string;
  banner: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtubeId: string;
  seriesTag: string;
  views: string;
  duration: string;
  url: string;
  thumbnail: string;
}

export default function YoutubeShowcase() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSeries, setActiveSeries] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    async function fetchYouTubeData() {
      setLoading(true);
      try {
        const res = await fetch('/api/youtube');
        if (res.ok) {
          const data = await res.json();
          if (data.channels && data.channels.length > 0) {
            setChannels(data.channels);
          } else {
            setChannels(mockYouTubeData.channels);
          }
          if (data.videos && data.videos.length > 0) {
            setVideos(data.videos);
          } else {
            setVideos(mockYouTubeData.videos);
          }
        } else {
          setChannels(mockYouTubeData.channels);
          setVideos(mockYouTubeData.videos);
        }
      } catch (err) {
        console.warn('Failed to fetch YouTube API, falling back to mock data:', err);
        setChannels(mockYouTubeData.channels);
        setVideos(mockYouTubeData.videos);
      } finally {
        setLoading(false);
      }
    }
    fetchYouTubeData();
  }, []);

  const seriesTabs = [
    { id: 'all', label: 'All Series' },
    { id: 'minecraft', label: 'Minecraft (Midas SMP)' },
    { id: 'nerf world', label: 'Nerf World' },
    { id: 'level devil', label: 'Level Devil' },
    { id: 'mobile legends', label: 'Mobile Legends' },
    { id: 'meet dexter', label: 'Meet Dexter (AI Assistant)' },
  ];

  const filteredVideos = videos.filter((v) => {
    if (activeSeries === 'all') return true;
    const tagLower = v.seriesTag.toLowerCase();
    const activeLower = activeSeries.toLowerCase();
    return tagLower.includes(activeLower) || activeLower.includes(tagLower);
  });

  return (
    <section id="youtube" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050508] text-white overflow-hidden border-t border-zinc-800/40">
      {/* Background Glow Elements */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00f3ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono mb-4 tracking-wider uppercase">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Content Creator Ecosystem</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            YouTube <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-[#00f3ff] to-[#9d00ff]">Showcase</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Exploring gaming, speedruns, and custom AI tech builds across my main channel <strong className="text-white">Draxy Gaming (11.2K subs)</strong> and sub-channels.
          </p>
        </div>

        {/* Channels Grid (R6 Requirement: Draxy Gaming 11.2K, DRAXY ML 520, XxHyper 2.17K) */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-zinc-200 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            Featured Creator Channels
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <motion.div
                key={channel.id}
                whileHover={{ y: -5 }}
                className="group relative bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col justify-between"
              >
                {/* Channel Banner */}
                <div className="h-28 w-full relative overflow-hidden bg-zinc-950">
                  <img
                    src={channel.banner}
                    alt={channel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                {/* Channel Details */}
                <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between -mt-10">
                  <div>
                    {/* Avatar & Title */}
                    <div className="flex items-end gap-4 mb-4">
                      <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-800 group-hover:border-red-500 shadow-lg relative z-10 bg-zinc-900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                          {channel.name}
                        </h4>
                        <p className="text-xs font-mono text-zinc-400">{channel.handle}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/60">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-zinc-500 block">Subscribers</span>
                        <span className="text-lg font-extrabold text-[#00f3ff] font-mono">{channel.subscribers}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-zinc-500 block">Uploads</span>
                        <span className="text-lg font-extrabold text-purple-400 font-mono">{channel.videoCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Action Link */}
                  <a
                    href={`https://youtube.com/${channel.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 hover:border-red-500/60 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    Visit Channel <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Series Filter Tabs */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-zinc-200 flex items-center gap-2">
              <Video className="w-5 h-5 text-[#00f3ff]" />
              Featured Series & Videos
            </h3>
            <span className="text-xs text-zinc-400 font-mono">
              Showing {filteredVideos.length} video{filteredVideos.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-zinc-800/60">
            {seriesTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSeries(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeSeries === tab.id
                    ? 'bg-gradient-to-r from-red-950 to-purple-950 text-white border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-pulse p-4" />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/20 border border-zinc-800/40 rounded-2xl">
            <p className="text-zinc-400 text-sm">No videos found for this series tag.</p>
            <button
              onClick={() => setActiveSeries('all')}
              className="mt-3 px-4 py-2 bg-zinc-800 text-xs rounded-lg text-zinc-300 hover:bg-zinc-700"
            >
              Show All Videos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#00f3ff]/50 transition-all duration-300 shadow-lg flex flex-col cursor-pointer"
                onClick={() => setActiveVideoModal(video)}
              >
                {/* Thumbnail & Hover Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform group-hover:bg-red-600">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-zinc-300 font-semibold backdrop-blur-sm">
                    {video.duration}
                  </div>

                  {/* Series Tag Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[#00f3ff] text-[10px] font-mono uppercase font-bold">
                    {video.seriesTag}
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-base text-white group-hover:text-[#00f3ff] transition-colors line-clamp-2 mb-3">
                    {video.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-3 border-t border-zinc-800/50">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Eye className="w-3.5 h-3.5 text-zinc-500" /> {video.views} views
                    </span>
                    <span className="text-red-400 hover:underline flex items-center gap-1">
                      Watch <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        <AnimatePresence>
          {activeVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setActiveVideoModal(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-950">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono">
                      {activeVideoModal.seriesTag}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{activeVideoModal.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative aspect-video w-full bg-black">
                  {activeVideoModal.youtubeId && activeVideoModal.youtubeId !== 'dQw4w9WgXcQ' ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                      title={activeVideoModal.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-950 to-zinc-900">
                      <Youtube className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                      <h4 className="text-xl font-bold text-white mb-2">{activeVideoModal.title}</h4>
                      <p className="text-sm text-zinc-400 max-w-md mb-6">
                        Watch directly on YouTube or visit channel Draxy Gaming for full series playlists.
                      </p>
                      <a
                        href={activeVideoModal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
                      >
                        Open on YouTube <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
