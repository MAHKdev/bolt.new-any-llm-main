'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Toast {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="alert shadow-lg max-w-sm w-full"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {toast.icon}
          <span>{toast.message}</span>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="btn btn-ghost btn-xs btn-circle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function ToastContainer() {
  return (
    <div className="toast toast-top toast-end z-50 p-4">
      <AnimatePresence mode="popLayout">
        {window.toasts?.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={(id) => window.dismissToast?.(id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Add types to window object
declare global {
  interface Window {
    toasts?: Toast[];
    showToast?: (toast: Omit<Toast, 'id'>) => void;
    dismissToast?: (id: string) => void;
  }
}

// Initialize toast system
if (typeof window !== 'undefined') {
  window.toasts = [];
  
  window.showToast = (toast) => {
    const id = Date.now().toString();
    window.toasts?.push({ ...toast, id });
    // Force re-render
    window.dispatchEvent(new CustomEvent('toast'));
  };
  
  window.dismissToast = (id) => {
    window.toasts = window.toasts?.filter((t) => t.id !== id);
    // Force re-render
    window.dispatchEvent(new CustomEvent('toast'));
  };
}