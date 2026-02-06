"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
        <span className="text-[40vw] font-black text-white/[0.02] leading-none tracking-tighter">
          404
        </span>
      </div>

      <div className="text-center max-w-md relative z-10">
        <h1 className="text-[20vw] lg:text-[15vw] font-black leading-none tracking-tighter mb-4">
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #ff6b35 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            404
          </span>
        </h1>

        <h2 className="text-2xl font-black mb-4 text-white tracking-tight">
          PAGE NOT FOUND
        </h2>

        <p className="text-white/40 mb-10 font-light">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-4 border border-white/10 text-white/60 font-mono text-sm uppercase tracking-wider hover:border-white/20 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
