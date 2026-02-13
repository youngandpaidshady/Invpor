"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center font-bold text-background text-sm">
            A
          </div>
          <span className="font-bold text-lg">AlphaTrader</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <React.Suspense fallback={<div className="w-10 h-10 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin" />}>
          {children}
        </React.Suspense>
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 text-center text-sm text-foreground/50 border-t border-border/50">
        <p>© {new Date().getFullYear()} AlphaTrader. All rights reserved.</p>
      </footer>
    </div>
  );
}
