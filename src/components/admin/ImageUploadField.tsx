'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = 'https://... or click upload',
  error,
  required = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 font-syne">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>

      {/* URL Input & Trigger Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full bg-slate-900/80 border ${
              error ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
            } rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors font-mono`}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 p-1"
              title="Clear Image URL"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium rounded-lg transition-all disabled:opacity-50 flex-shrink-0"
        >
          {uploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Uploading...</span>
            </>
          ) : uploadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Uploaded!</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </>
          )}
        </button>
      </div>

      {/* Drag & Drop Dropzone / Preview Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative group border border-dashed border-slate-700/80 hover:border-cyan-500/50 rounded-xl p-3 bg-slate-950/40 transition-colors flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          {value ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
              {/* Image Preview */}
              <img
                src={value}
                alt="Upload preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <ImageIcon className="w-5 h-5 text-slate-500 absolute -z-10" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center flex-shrink-0 text-slate-600">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          <div>
            <p className="text-xs text-gray-300 font-medium">
              {value ? 'Image Attached' : 'Drag & drop image here'}
            </p>
            <p className="text-[11px] text-gray-500">
              Supports PNG, JPG, WebP, GIF, SVG (Max 5MB)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
        >
          Browse...
        </button>
      </div>

      {/* Error messages */}
      {uploadError && (
        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
          <span>⚠️</span> {uploadError}
        </p>
      )}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
