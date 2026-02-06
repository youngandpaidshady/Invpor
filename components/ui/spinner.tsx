"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-zinc-600 border-t-emerald-500",
        sizeClasses[size],
        className
      )}
    />
  );
}

// ===========================================
// Loading Button Content
// ===========================================

interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function LoadingButton({
  loading,
  children,
  loadingText = "Loading...",
}: LoadingButtonProps) {
  if (loading) {
    return (
      <span className="flex items-center gap-2">
        <Spinner size="sm" />
        <span>{loadingText}</span>
      </span>
    );
  }
  return <>{children}</>;
}

// ===========================================
// Full Page Loading
// ===========================================

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-zinc-400 animate-pulse">{message}</p>
    </div>
  );
}

// ===========================================
// Inline Loading
// ===========================================

export function InlineLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-zinc-400", className)}>
      <Spinner size="sm" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}
