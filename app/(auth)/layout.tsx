"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C7A257] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      {children}
    </React.Suspense>
  );
}
