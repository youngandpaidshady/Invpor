"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

// ===========================================
// Toast Types
// ===========================================

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

// ===========================================
// Toast Context
// ===========================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// ===========================================
// Toast Provider
// ===========================================

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { ...toast, id };
      
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove after duration
      const duration = toast.duration ?? (toast.type === "error" ? 6000 : 4000);
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "success", title, description });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "error", title, description });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "warning", title, description });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "info", title, description });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// ===========================================
// Toast Container
// ===========================================

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ===========================================
// Toast Item
// ===========================================

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const toastStyles: Record<ToastType, { bg: string; icon: typeof CheckCircle; iconColor: string }> = {
  success: {
    bg: "bg-emerald-900/90 border-emerald-700",
    icon: CheckCircle,
    iconColor: "text-emerald-400",
  },
  error: {
    bg: "bg-red-900/90 border-red-700",
    icon: AlertCircle,
    iconColor: "text-red-400",
  },
  warning: {
    bg: "bg-amber-900/90 border-amber-700",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
  },
  info: {
    bg: "bg-blue-900/90 border-blue-700",
    icon: Info,
    iconColor: "text-blue-400",
  },
};

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const style = toastStyles[toast.type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg",
        "animate-in slide-in-from-right-full fade-in duration-300",
        style.bg
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", style.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-sm text-zinc-300">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
      >
        <X className="h-4 w-4 text-zinc-400" />
      </button>
    </div>
  );
}

// ===========================================
// Standalone Toast Function (for API routes)
// ===========================================

export function showToast(type: ToastType, title: string, description?: string) {
  // This creates a temporary toast outside of React context
  // Useful for non-React code like API utilities
  const container = document.createElement("div");
  container.className = "fixed bottom-4 right-4 z-50";
  document.body.appendChild(container);

  const style = toastStyles[type];
  const iconSvg =
    type === "success"
      ? `<svg class="h-5 w-5 ${style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      : type === "error"
      ? `<svg class="h-5 w-5 ${style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      : `<svg class="h-5 w-5 ${style.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  container.innerHTML = `
    <div class="flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg max-w-sm ${style.bg} animate-in slide-in-from-right-full fade-in">
      ${iconSvg}
      <div class="flex-1">
        <p class="font-medium text-white">${title}</p>
        ${description ? `<p class="mt-1 text-sm text-zinc-300">${description}</p>` : ""}
      </div>
    </div>
  `;

  setTimeout(() => {
    container.classList.add("animate-out", "fade-out");
    setTimeout(() => container.remove(), 300);
  }, 4000);
}
