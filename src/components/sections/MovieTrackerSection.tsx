'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Film, Eye, Heart, Info, Search, ExternalLink, Sparkles, X } from 'lucide-react';
import { fallbackMovies } from '@/lib/mockData';

export interface Movie {
  id: string;
  title: string;
  tmdbId?: string;
  posterPath: string;
  rating: number;
  synopsis: string;
  category: 'watching' | 'watched' | 'favorites' | string;
}

export default function MovieTrackerSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const res = await fetch('/api/tmdb');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMovies(data);
          } else {
            setMovies(fallbackMovies);
          }
        } else {
          setMovies(fallbackMovies);
        }
      } catch (err) {
        console.warn('Failed to fetch TMDB movies, using fallback dataset:', err);
        setMovies(fallbackMovies);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesTab = activeTab === 'all' || movie.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'watching':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-[#00f3ff] border border-cyan-500/40">
            <Eye className="w-3 h-3" /> Watching
          </span>
        );
      case 'favorites':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 border border-pink-500/40">
            <Heart className="w-3 h-3 fill-pink-400" /> Favorite
          </span>
        );
      case 'watched':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-[#9d00ff] border border-purple-500/40">
            <Film className="w-3 h-3" /> Watched
          </span>
        );
    }
  };

  const categoryCounts = {
    all: movies.length,
    watching: movies.filter((m) => m.category.toLowerCase() === 'watching').length,
    watched: movies.filter((m) => m.category.toLowerCase() === 'watched').length,
    favorites: movies.filter((m) => m.category.toLowerCase() === 'favorites').length,
  };

  return (
    <section id="movies" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050508] text-white overflow-hidden">
      {/* Glow Ambient Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#00f3ff]/10 to-[#9d00ff]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[#00f3ff] text-xs font-mono mb-4 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TMDB API Integration</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Cinephile <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]">Movie Tracker</span>
            </h2>
            <p className="mt-3 text-zinc-400 max-w-xl text-base">
              A curated collection of film experiences, top recommendations, and currently watched titles directly powered by TMDB API.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-zinc-800/60 no-scrollbar">
          {[
            { id: 'all', label: 'All Cinema', count: categoryCounts.all },
            { id: 'watching', label: 'Currently Watching', count: categoryCounts.watching },
            { id: 'watched', label: 'Watched', count: categoryCounts.watched },
            { id: 'favorites', label: 'Favorites', count: categoryCounts.favorites },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-white bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-[#00f3ff]/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-[#00f3ff]/20 text-[#00f3ff]' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 animate-pulse p-4 flex flex-col justify-end">
                <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-800/60 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800/40 rounded-2xl">
            <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-lg">No movies found in this category.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#00f3ff]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,243,255,0.15)] flex flex-col cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  {/* Poster Image Container */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                      <p className="text-xs text-zinc-300 line-clamp-4 leading-relaxed font-sans mb-3">
                        {movie.synopsis}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#00f3ff] font-medium pt-2 border-t border-zinc-700/50">
                        <span className="flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" /> View Details
                        </span>
                        {movie.tmdbId && (
                          <span className="flex items-center gap-1 hover:underline">
                            TMDB <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div>{getCategoryBadge(movie.category)}</div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-400 font-mono text-xs font-bold shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{movie.rating ? Number(movie.rating).toFixed(1) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 bg-gradient-to-b from-zinc-900/90 to-zinc-950 flex-1 flex flex-col justify-between border-t border-zinc-800/40">
                    <h3 className="font-bold text-base text-white group-hover:text-[#00f3ff] transition-colors line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                      <span className="capitalize">{movie.category}</span>
                      <span className="font-mono text-zinc-500">
                        {movie.tmdbId ? `TMDB #${movie.tmdbId}` : 'Featured'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Selected Movie Modal */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedMovie(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={selectedMovie.posterPath}
                    alt={selectedMovie.title}
                    className="w-full sm:w-44 h-64 object-cover rounded-2xl shadow-xl flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryBadge(selectedMovie.category)}
                        <div className="flex items-center gap-1 text-amber-400 font-mono text-sm font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{selectedMovie.rating} / 10</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">{selectedMovie.title}</h3>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{selectedMovie.synopsis}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-mono">
                        {selectedMovie.tmdbId ? `TMDB ID: ${selectedMovie.tmdbId}` : 'Verified Entry'}
                      </span>
                      {selectedMovie.tmdbId && (
                        <a
                          href={`https://www.themoviedb.org/movie/${selectedMovie.tmdbId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-[#00f3ff] border border-cyan-500/30 hover:bg-cyan-500/20 text-xs font-semibold transition-all"
                        >
                          View on TMDB <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
