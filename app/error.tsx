"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[30vw] font-black text-white/[0.02] leading-none tracking-tighter">
          ERROR
        </span>
      </div>

      <div className="text-center max-w-md relative z-10">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white">
          SOMETHING<br />
          <span className="text-[#ff6b35]">BROKE</span>
        </h1>

        <p className="text-white/40 mb-10 font-light">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-4 border border-white/10 text-white/60 font-mono text-sm uppercase tracking-wider hover:border-white/20 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
