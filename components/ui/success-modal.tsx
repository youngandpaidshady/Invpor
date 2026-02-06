"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, X, PartyPopper } from "lucide-react";

// ===========================================
// Success Modal
// ===========================================

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  showConfetti?: boolean;
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  description,
  action,
  showConfetti = false,
}: SuccessModalProps) {
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    if (isOpen && showConfetti) {
      setConfettiVisible(true);
      const timer = setTimeout(() => setConfettiVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showConfetti]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti */}
      {confettiVisible && <Confetti />}

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full mx-4 animate-in zoom-in-95 fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
            {showConfetti ? (
              <PartyPopper className="h-8 w-8 text-emerald-400" />
            ) : (
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

          {description && (
            <p className="text-zinc-400 mb-6">{description}</p>
          )}

          <div className="flex flex-col gap-2">
            {action && (
              <button
                onClick={action.onClick}
                className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
              >
                {action.label}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Confetti Component
// ===========================================

function Confetti() {
  const colors = [
    "bg-emerald-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
  ];

  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={cn(
            "absolute rounded-sm animate-confetti-fall",
            piece.color
          )}
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
            "--confetti-duration": `${piece.duration}s`,
            "--confetti-delay": `${piece.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ===========================================
// Confirmation Modal
// ===========================================

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const variants = {
    danger: {
      icon: "bg-red-500/20",
      iconColor: "text-red-400",
      button: "bg-red-600 hover:bg-red-500",
    },
    warning: {
      icon: "bg-amber-500/20",
      iconColor: "text-amber-400",
      button: "bg-amber-600 hover:bg-amber-500",
    },
    default: {
      icon: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      button: "bg-emerald-600 hover:bg-emerald-500",
    },
  };

  const style = variants[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="text-center">
          <div
            className={cn(
              "inline-flex items-center justify-center w-12 h-12 rounded-full mb-4",
              style.icon
            )}
          >
            <svg
              className={cn("h-6 w-6", style.iconColor)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 mb-6">{description}</p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={cn(
                "flex-1 px-4 py-2.5 text-white rounded-lg font-medium transition-colors disabled:opacity-50",
                style.button
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
