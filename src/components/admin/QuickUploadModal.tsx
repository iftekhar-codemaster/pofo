'use client';

import React, { useState } from 'react';
import { Upload, X, Check, Copy, Image as ImageIcon, Loader2 } from 'lucide-react';

interface QuickUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickUploadModal({ isOpen, onClose }: QuickUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setUploadedUrl(data.url);
    } catch (err: any) {
      console.error('Quick upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setUploadedUrl(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f0f17] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-cyan-950/40 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-syne">Quick Image Asset Uploader</h3>
            <p className="text-xs text-gray-400 font-mono">Upload asset directly to /public/uploads</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {!uploadedUrl ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-6 text-center bg-slate-950/40 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="quick-file-input"
              />
              <label
                htmlFor="quick-file-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-gray-200">
                  {file ? file.name : 'Click or drag image file to select'}
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, WebP, GIF, SVG (up to 5MB)
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-slate-700 bg-black flex items-center justify-center">
                <img src={uploadedUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full">
                <label className="block text-[11px] text-gray-400 uppercase font-mono mb-1">Uploaded Asset URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={uploadedUrl}
                    className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(uploadedUrl)}
                    className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs rounded-lg flex items-center gap-1 hover:bg-cyan-500/30 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                Upload another file
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
