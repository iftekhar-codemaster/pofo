'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl border shadow-2xl transition-all animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'success'
              ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-300 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-slate-900/90 border-red-500/40 text-red-300 shadow-red-950/40'
              : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-cyan-950/40'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
          </div>

          <div className="flex-1 text-xs">
            <h4 className="font-semibold text-gray-100">{toast.title}</h4>
            {toast.message && <p className="mt-0.5 text-gray-300/80">{toast.message}</p>}
          </div>

          <button
            onClick={() => onClose(toast.id)}
            className="text-gray-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
