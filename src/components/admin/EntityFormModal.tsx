'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Plus, Sparkles } from 'lucide-react';
import ImageUploadField from './ImageUploadField';

interface EntityFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  entity: string;
  initialData?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

export default function EntityFormModal({
  isOpen,
  mode,
  entity,
  initialData,
  onSave,
  onClose,
  loading,
}: EntityFormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (mode === 'edit' && initialData) {
        setFormData({ ...initialData });
      } else {
        // Set default values based on entity type
        setFormData(getDefaultsForEntity(entity));
      }
    }
  }, [isOpen, mode, entity, initialData]);

  if (!isOpen) return null;

  const getDefaultsForEntity = (ent: string) => {
    switch (ent) {
      case 'projects':
        return { title: '', description: '', repoUrl: '', liveUrl: '', techStack: '', featured: false };
      case 'movies':
        return { title: '', tmdbId: '', posterPath: '', rating: 8.0, synopsis: '', category: 'watching' };
      case 'certificates':
        return { title: '', issuer: '', date: '', credentialId: '', skills: '', category: 'AI / Machine Learning', url: '' };
      case 'gallery':
        return { title: '', imageUrl: '', category: 'Photography', exifData: 'ISO 100 • 35mm • f/1.8' };
      case 'youtube':
        return { title: '', youtubeId: '', seriesTag: 'Midas SMP', views: '1.2K views', duration: '10:00', url: '', thumbnail: '' };
      case 'timeline':
        return { year: '2026', title: '', org: '', category: 'Career', description: '', order: 0 };
      case 'socials':
        return { platform: 'YouTube', handle: '', url: '', brandColor: '#00f3ff', followersCount: '', icon: 'youtube' };
      default:
        return {};
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (entity === 'projects') {
      if (!formData.title?.trim()) newErrors.title = 'Project title is required';
      if (!formData.description?.trim()) newErrors.description = 'Description is required';
      if (!formData.repoUrl?.trim()) newErrors.repoUrl = 'Repository URL is required';
    } else if (entity === 'movies') {
      if (!formData.title?.trim()) newErrors.title = 'Movie title is required';
      if (formData.rating !== undefined && (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10)) {
        newErrors.rating = 'Rating must be a number between 0 and 10';
      }
    } else if (entity === 'certificates') {
      if (!formData.title?.trim()) newErrors.title = 'Certificate title is required';
      if (!formData.issuer?.trim()) newErrors.issuer = 'Issuer is required';
    } else if (entity === 'gallery') {
      if (!formData.title?.trim()) newErrors.title = 'Gallery title is required';
      if (!formData.imageUrl?.trim()) newErrors.imageUrl = 'Image URL or file is required';
    } else if (entity === 'youtube') {
      if (!formData.title?.trim()) newErrors.title = 'Video title is required';
      if (!formData.youtubeId?.trim()) newErrors.youtubeId = 'YouTube Video ID is required';
    } else if (entity === 'timeline') {
      if (!formData.year?.trim()) newErrors.year = 'Year is required';
      if (!formData.title?.trim()) newErrors.title = 'Title is required';
      if (!formData.description?.trim()) newErrors.description = 'Description is required';
    } else if (entity === 'socials') {
      if (!formData.platform?.trim()) newErrors.platform = 'Platform name is required';
      if (!formData.url?.trim()) newErrors.url = 'Profile URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  const formatEntityTitle = (ent: string) => {
    const map: Record<string, string> = {
      projects: 'Project',
      movies: 'Movie',
      certificates: 'Certificate',
      gallery: 'Gallery Item',
      youtube: 'YouTube Video',
      timeline: 'Timeline Node',
      socials: 'Social Link',
    };
    return map[ent] || ent;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0f0f17] border border-cyan-500/30 rounded-3xl max-w-2xl w-full my-8 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-1 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400">
            {mode === 'add' ? <Plus className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-syne">
              {mode === 'add' ? `Create New ${formatEntityTitle(entity)}` : `Edit ${formatEntityTitle(entity)}`}
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Fill out fields to sync with production database
            </p>
          </div>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PROJECTS FIELDS */}
          {entity === 'projects' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. NextGen AI Portfolio"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                />
                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Comprehensive description of the project features, architecture, and tech stack..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                />
                {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    GitHub Repo URL *
                  </label>
                  <input
                    type="text"
                    value={formData.repoUrl || ''}
                    onChange={(e) => handleChange('repoUrl', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.repoUrl && <p className="text-xs text-red-400 mt-1">{errors.repoUrl}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={formData.liveUrl || ''}
                    onChange={(e) => handleChange('liveUrl', e.target.value)}
                    placeholder="https://my-demo-app.com"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack || ''}
                  onChange={(e) => handleChange('techStack', e.target.value)}
                  placeholder="Next.js, TypeScript, Three.js, Tailwind, Prisma"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={!!formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-medium text-gray-200 cursor-pointer">
                  Feature this project on hero/homepage highlight
                </label>
              </div>
            </>
          )}

          {/* MOVIES FIELDS */}
          {entity === 'movies' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Interstellar"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'watching'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors"
                  >
                    <option value="watching font-mono">Currently Watching</option>
                    <option value="watched">Watched</option>
                    <option value="favorites">All-Time Favorites</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    TMDB Movie ID
                  </label>
                  <input
                    type="text"
                    value={formData.tmdbId || ''}
                    onChange={(e) => handleChange('tmdbId', e.target.value)}
                    placeholder="e.g. 157336"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Rating (0 - 10)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating ?? 8.0}
                    onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono focus:outline-none transition-colors"
                  />
                  {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating}</p>}
                </div>
              </div>

              <ImageUploadField
                label="Poster Image (Upload or URL)"
                value={formData.posterPath || ''}
                onChange={(url) => handleChange('posterPath', url)}
                placeholder="/uploads/poster.jpg or https://image.tmdb.org/..."
              />

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Synopsis / Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.synopsis || ''}
                  onChange={(e) => handleChange('synopsis', e.target.value)}
                  placeholder="Brief synopsis or personal review of the movie..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          {/* CERTIFICATES FIELDS */}
          {entity === 'certificates' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Deep Learning Specialization"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.issuer || ''}
                    onChange={(e) => handleChange('issuer', e.target.value)}
                    placeholder="e.g. DeepLearning.AI / Coursera"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.issuer && <p className="text-xs text-red-400 mt-1">{errors.issuer}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Date Earned
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    placeholder="e.g. Jan 2026"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Credential ID / Verification Hash
                  </label>
                  <input
                    type="text"
                    value={formData.credentialId || ''}
                    onChange={(e) => handleChange('credentialId', e.target.value)}
                    placeholder="e.g. DL-884920-VERIFIED"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Category Filter
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="e.g. AI / Machine Learning, Cloud, Security"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Associated Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills || ''}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    placeholder="Neural Networks, PyTorch, Transformers"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Verification Link or Certificate Image Badge"
                value={formData.url || ''}
                onChange={(url) => handleChange('url', url)}
                placeholder="https://coursera.org/verify/... or upload badge image"
              />
            </>
          )}

          {/* GALLERY FIELDS */}
          {entity === 'gallery' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Cyberpunk Workspace Setup"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Photography'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Setup">Setup</option>
                    <option value="Graphics">Graphics & Art</option>
                    <option value="Event">Event Highlights</option>
                  </select>
                </div>
              </div>

              <ImageUploadField
                label="Gallery Image (Upload File or URL) *"
                value={formData.imageUrl || ''}
                onChange={(url) => handleChange('imageUrl', url)}
                error={errors.imageUrl}
                required
              />

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  EXIF Metadata Overlay Text
                </label>
                <input
                  type="text"
                  value={formData.exifData || ''}
                  onChange={(e) => handleChange('exifData', e.target.value)}
                  placeholder="ISO 100 • 35mm • f/1.8 • 1/1000s"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          {/* YOUTUBE FIELDS */}
          {entity === 'youtube' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Midas SMP Episode 1 - The Gold Empire"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    YouTube Video ID *
                  </label>
                  <input
                    type="text"
                    value={formData.youtubeId || ''}
                    onChange={(e) => handleChange('youtubeId', e.target.value)}
                    placeholder="e.g. dQw4w9WgXcQ"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.youtubeId && <p className="text-xs text-red-400 mt-1">{errors.youtubeId}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Series Tag
                  </label>
                  <select
                    value={formData.seriesTag || 'Midas SMP'}
                    onChange={(e) => handleChange('seriesTag', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors"
                  >
                    <option value="Midas SMP">Midas SMP</option>
                    <option value="Meet Dexter">Meet Dexter (AI)</option>
                    <option value="Minecraft">Minecraft</option>
                    <option value="Level Devil">Level Devil</option>
                    <option value="Mobile Legends">Mobile Legends</option>
                    <option value="General">General Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Views Counter
                  </label>
                  <input
                    type="text"
                    value={formData.views || ''}
                    onChange={(e) => handleChange('views', e.target.value)}
                    placeholder="12.4K views"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    placeholder="14:25"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Watch URL
                </label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>

              <ImageUploadField
                label="Custom Thumbnail Image (Upload or URL)"
                value={formData.thumbnail || ''}
                onChange={(url) => handleChange('thumbnail', url)}
                placeholder="/uploads/thumbnail.jpg or https://i.ytimg.com/..."
              />
            </>
          )}

          {/* TIMELINE FIELDS */}
          {entity === 'timeline' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Year / Date *
                  </label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => handleChange('year', e.target.value)}
                    placeholder="2025 - Present"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.year && <p className="text-xs text-red-400 mt-1">{errors.year}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Career'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors"
                  >
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                    <option value="Creator">Content Creation</option>
                    <option value="Certification">Certification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.order ?? 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Node Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. CMO & Deputy CTO"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.org || ''}
                    onChange={(e) => handleChange('org', e.target.value)}
                    placeholder="e.g. AmarEvents"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Key milestones, responsibilities, and achievements for this timeline node..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                />
                {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
              </div>
            </>
          )}

          {/* SOCIALS FIELDS */}
          {entity === 'socials' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Platform Name *
                  </label>
                  <input
                    type="text"
                    value={formData.platform || ''}
                    onChange={(e) => handleChange('platform', e.target.value)}
                    placeholder="e.g. YouTube, GitHub, LinkedIn"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                  />
                  {errors.platform && <p className="text-xs text-red-400 mt-1">{errors.platform}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Handle / Username *
                  </label>
                  <input
                    type="text"
                    value={formData.handle || ''}
                    onChange={(e) => handleChange('handle', e.target.value)}
                    placeholder="e.g. @Draxy.Gaming or iftekhar-codemaster"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                  Profile URL *
                </label>
                <input
                  type="text"
                  value={formData.url || ''}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                />
                {errors.url && <p className="text-xs text-red-400 mt-1">{errors.url}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Brand Color (Hex)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.brandColor || '#00f3ff'}
                      onChange={(e) => handleChange('brandColor', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.brandColor || ''}
                      onChange={(e) => handleChange('brandColor', e.target.value)}
                      placeholder="#FF0000"
                      className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-sm text-gray-100 font-mono focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Followers Count Text
                  </label>
                  <input
                    type="text"
                    value={formData.followersCount || ''}
                    onChange={(e) => handleChange('followersCount', e.target.value)}
                    placeholder="e.g. 11.2K subscribers"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 font-mono placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 font-syne">
                    Icon Identifier
                  </label>
                  <select
                    value={formData.icon || 'youtube'}
                    onChange={(e) => handleChange('icon', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="discord">Discord</option>
                    <option value="facebook">Facebook</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-gray-300 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Record...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{mode === 'add' ? 'Create Record' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
