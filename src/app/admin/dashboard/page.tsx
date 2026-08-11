'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderGit2,
  Film,
  Award,
  Image as ImageIcon,
  Youtube,
  Clock,
  Share2,
  LogOut,
  Plus,
  Search,
  LayoutGrid,
  List,
  Upload,
  RefreshCw,
  Edit,
  Trash2,
  ExternalLink,
  Shield,
  Loader2,
  Menu,
  X,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

import ToastContainer, { ToastMessage } from '@/components/admin/ToastContainer';
import EntityFormModal from '@/components/admin/EntityFormModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import QuickUploadModal from '@/components/admin/QuickUploadModal';

type EntityType =
  | 'projects'
  | 'movies'
  | 'certificates'
  | 'gallery'
  | 'youtube'
  | 'timeline'
  | 'socials';

interface EntityConfig {
  id: EntityType;
  label: string;
  singular: string;
  icon: React.ElementType;
  description: string;
}

const ENTITIES: EntityConfig[] = [
  { id: 'projects', label: 'Projects', singular: 'Project', icon: FolderGit2, description: 'Manage portfolio software repositories & showcases' },
  { id: 'movies', label: 'Movies Tracker', singular: 'Movie', icon: Film, description: 'Manage TMDB movies watchlist and ratings' },
  { id: 'certificates', label: 'Certificates', singular: 'Certificate', icon: Award, description: 'Manage verified credentials and skill badges' },
  { id: 'gallery', label: 'Gallery Items', singular: 'Gallery Item', icon: ImageIcon, description: 'Manage photography and visual showcase items' },
  { id: 'youtube', label: 'YouTube Videos', singular: 'YouTube Video', icon: Youtube, description: 'Manage channel video uploads and series tags' },
  { id: 'timeline', label: 'Timeline Nodes', singular: 'Timeline Node', icon: Clock, description: 'Manage career journey and milestone events' },
  { id: 'socials', label: 'Social Links', singular: 'Social Link', icon: Share2, description: 'Manage social platform hubs and follower counts' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Active Entity Selection
  const [activeEntity, setActiveEntity] = useState<EntityType>('projects');
  const [items, setItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [isQuickUploadOpen, setIsQuickUploadOpen] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  // Toast feedback state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Guard
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          router.replace('/admin');
          return;
        }
        const data = await res.json();
        if (!data.authenticated) {
          router.replace('/admin');
          return;
        }
        setUser(data.user);
      } catch (err) {
        console.error('Auth verification error:', err);
        router.replace('/admin');
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [router]);

  // Fetch Items when active entity changes
  const fetchEntityItems = useCallback(async (entity: EntityType) => {
    setLoadingItems(true);
    try {
      const res = await fetch(`/api/admin/${entity}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${entity}`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setItems(data.data);
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.error(`Error loading ${entity}:`, err);
      addToast('error', `Failed to load ${entity}`, err.message);
      setItems([]);
    } finally {
      setLoadingItems(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (!checkingAuth) {
      fetchEntityItems(activeEntity);
    }
  }, [activeEntity, checkingAuth, fetchEntityItems]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      addToast('info', 'Logged Out', 'Redirecting to login...');
      setTimeout(() => {
        router.replace('/admin');
      }, 500);
    } catch (err) {
      console.error('Logout error:', err);
      router.replace('/admin');
    }
  };

  // CRUD Actions
  const handleOpenAddModal = () => {
    setFormMode('add');
    setSelectedItem(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setFormMode('edit');
    setSelectedItem(item);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = async (formData: any) => {
    setSubmittingForm(true);
    try {
      const isEdit = formMode === 'edit' && selectedItem?.id;
      const url = isEdit
        ? `/api/admin/${activeEntity}/${selectedItem.id}`
        : `/api/admin/${activeEntity}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Failed to ${formMode} record`);
      }

      addToast(
        'success',
        isEdit ? 'Record Updated' : 'Record Created',
        `Successfully saved "${formData.title || formData.name || formData.platform || 'item'}"`
      );

      setIsFormModalOpen(false);
      fetchEntityItems(activeEntity);
    } catch (err: any) {
      console.error('Save error:', err);
      addToast('error', 'Operation Failed', err.message || 'Could not save record');
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleOpenDeleteModal = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete?.id) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/${activeEntity}/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete record');
      }

      addToast(
        'success',
        'Record Deleted',
        `Successfully removed item from ${activeConfig?.label}`
      );
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      fetchEntityItems(activeEntity);
    } catch (err: any) {
      console.error('Delete error:', err);
      addToast('error', 'Delete Failed', err.message || 'Could not delete item');
    } finally {
      setDeleting(false);
    }
  };

  // Filter Items by Search Query
  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const searchString = Object.values(item)
      .filter((v) => typeof v === 'string' || typeof v === 'number')
      .join(' ')
      .toLowerCase();
    return searchString.includes(query);
  });

  const activeConfig = ENTITIES.find((e) => e.id === activeEntity);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050508] to-[#050508]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <p className="text-sm font-mono text-cyan-400/80 tracking-widest uppercase">
            Loading CMS Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 flex flex-col lg:flex-row font-inter selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* MOBILE TOP NAVIGATION BAR */}
      <div className="lg:hidden bg-[#0f0f17] border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white font-syne">POFO CMS Studio</h1>
            <p className="text-[10px] text-cyan-400 font-mono">@{user?.username || 'admin'}</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0a0a10]/95 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0a0a10] rounded-[14px] flex items-center justify-center text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white tracking-tight font-syne flex items-center gap-1.5">
                POFO Studio <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </h2>
              <span className="text-[11px] text-gray-400 font-mono">Admin CMS Dashboard</span>
            </div>
          </div>
        </div>

        {/* User Badge */}
        <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-300 font-mono truncate max-w-[140px]">
              Logged in as <strong className="text-cyan-400">{user?.username || 'admin'}</strong>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 no-scrollbar">
          <div className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-syne">
            Dynamic Entities (7)
          </div>

          {ENTITIES.map((ent) => {
            const Icon = ent.icon;
            const isActive = activeEntity === ent.id;

            return (
              <button
                key={ent.id}
                onClick={() => {
                  setActiveEntity(ent.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-transparent border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-950/40'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  <span className="font-medium">{ent.label}</span>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer / Quick Upload & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => setIsQuickUploadOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/40 text-cyan-300 text-xs font-medium transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image Asset</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-950/30 border border-red-500/30 hover:bg-red-900/40 text-red-300 text-xs font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header Controls Bar */}
        <header className="bg-[#0c0c14]/90 backdrop-blur-md border-b border-slate-800/80 p-4 sm:p-6 sticky top-0 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-syne">
                {activeConfig?.label}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300 text-[11px] font-mono">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{activeConfig?.description}</p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeConfig?.label}...`}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-100 placeholder-gray-500 focus:outline-none transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchEntityItems(activeEntity)}
              disabled={loadingItems}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingItems ? 'animate-spin text-cyan-400' : ''}`} />
            </button>

            {/* Add New Button */}
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add {activeConfig?.singular}</span>
            </button>
          </div>
        </header>

        {/* Table / Grid Content Section */}
        <div className="p-4 sm:p-6 flex-1">
          {loadingItems ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-cyan-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-xs font-mono">Fetching records from SQLite database...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-950/40 border border-dashed border-slate-800 flex flex-col items-center justify-center max-w-md mx-auto my-12">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-500 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-syne">No {activeConfig?.label} Found</h3>
              <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
                {searchQuery
                  ? `No matching records found for "${searchQuery}". Try clearing your search.`
                  : `There are currently no ${activeConfig?.label.toLowerCase()} in the database.`}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Clear Search Filter
                </button>
              ) : (
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-xs font-semibold text-white hover:bg-cyan-400 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First {activeConfig?.singular}</span>
                </button>
              )}
            </div>
          ) : viewMode === 'table' ? (

            /* TABLE VIEW */
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0f0f17]/60 backdrop-blur-xl shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-syne">
                    <th className="py-3.5 px-4">Record Info</th>
                    <th className="py-3.5 px-4">Primary Details</th>
                    <th className="py-3.5 px-4">Category / Tags</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-xs">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors group">
                      
                      {/* Column 1: Record Info / Image Thumbnail */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {/* Image preview if exists */}
                          {item.posterPath || item.imageUrl || item.thumbnail || item.avatar || item.url?.startsWith('/') ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-black flex-shrink-0">
                              <img
                                src={item.posterPath || item.imageUrl || item.thumbnail || item.avatar || item.url}
                                alt="thumb"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-500 flex-shrink-0 font-mono text-xs">
                              {activeConfig?.singular[0]}
                            </div>
                          )}

                          <div>
                            <div className="font-bold text-gray-100 group-hover:text-cyan-300 transition-colors font-syne">
                              {item.title || item.platform || item.year || item.name || 'Untitled'}
                            </div>
                            <div className="text-[11px] text-gray-500 font-mono">
                              ID: {item.id ? `${item.id.substring(0, 8)}...` : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Primary Details */}
                      <td className="py-3.5 px-4 max-w-xs truncate text-gray-300">
                        {activeEntity === 'projects' && (
                          <div>
                            <p className="truncate">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-cyan-400">
                              {item.repoUrl && <span>Repo: {item.repoUrl}</span>}
                            </div>
                          </div>
                        )}
                        {activeEntity === 'movies' && (
                          <div>
                            <p className="truncate text-gray-300">{item.synopsis || 'No synopsis'}</p>
                            <span className="text-[11px] text-amber-400 font-mono font-semibold">
                              ★ {item.rating ?? 'N/A'} / 10
                            </span>
                          </div>
                        )}
                        {activeEntity === 'certificates' && (
                          <div>
                            <p className="font-semibold text-gray-200">{item.issuer}</p>
                            <p className="text-[11px] text-gray-400 font-mono">Earned: {item.date}</p>
                          </div>
                        )}
                        {activeEntity === 'gallery' && (
                          <div>
                            <p className="font-mono text-[11px] text-gray-400">{item.exifData || 'No EXIF'}</p>
                          </div>
                        )}
                        {activeEntity === 'youtube' && (
                          <div>
                            <p className="font-mono text-[11px] text-cyan-400">ID: {item.youtubeId}</p>
                            <p className="text-[11px] text-gray-400 font-mono">{item.views} &bull; {item.duration}</p>
                          </div>
                        )}
                        {activeEntity === 'timeline' && (
                          <div>
                            <p className="font-semibold text-gray-200">{item.org}</p>
                            <p className="truncate text-gray-400 text-[11px]">{item.description}</p>
                          </div>
                        )}
                        {activeEntity === 'socials' && (
                          <div>
                            <p className="font-mono text-cyan-400">{item.handle}</p>
                            <p className="text-[11px] text-gray-400 font-mono truncate">{item.url}</p>
                          </div>
                        )}
                      </td>

                      {/* Column 3: Category / Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {item.category && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[11px] font-mono">
                              {item.category}
                            </span>
                          )}
                          {item.seriesTag && (
                            <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-[11px] font-mono">
                              {item.seriesTag}
                            </span>
                          )}
                          {item.featured && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[11px] font-mono flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                            </span>
                          )}
                          {item.techStack && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-gray-300 text-[11px] font-mono truncate max-w-[150px]">
                              {item.techStack}
                            </span>
                          )}
                          {item.followersCount && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[11px] font-mono">
                              {item.followersCount}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 4: Quick Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 transition-colors"
                            title="Edit Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(item)}
                            className="p-1.5 rounded-lg bg-red-950/50 border border-red-800/40 hover:bg-red-900/60 text-red-300 hover:text-red-200 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (

            /* GRID CARDS VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0f0f17]/70 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:-translate-y-0.5"
                >
                  <div>
                    {/* Cover image if available */}
                    {item.posterPath || item.imageUrl || item.thumbnail || item.avatar ? (
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-3 border border-slate-800 bg-black relative">
                        <img
                          src={item.posterPath || item.imageUrl || item.thumbnail || item.avatar}
                          alt="cover"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base text-white font-syne group-hover:text-cyan-300 transition-colors">
                        {item.title || item.platform || item.year || item.name || 'Untitled'}
                      </h3>
                      {item.rating !== undefined && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-mono font-bold">
                          ★ {item.rating}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-3 mb-3 leading-relaxed">
                      {item.description || item.synopsis || item.skills || item.exifData || item.url || 'No details provided.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.category && (
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 text-[10px] font-mono">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(item)}
                        className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900/60 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* DYNAMIC MODALS */}
      <EntityFormModal
        isOpen={isFormModalOpen}
        mode={formMode}
        entity={activeEntity}
        initialData={selectedItem}
        onSave={handleSaveForm}
        onClose={() => setIsFormModalOpen(false)}
        loading={submittingForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        itemTitle={itemToDelete?.title || itemToDelete?.platform || itemToDelete?.name || 'Item'}
        entityName={activeConfig?.label || 'Entity'}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        loading={deleting}
      />

      <QuickUploadModal
        isOpen={isQuickUploadOpen}
        onClose={() => setIsQuickUploadOpen(false)}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
