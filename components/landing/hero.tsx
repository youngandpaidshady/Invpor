"use client";

import Link from "next/link";

/**
 * Hero Section - Clean, No-Frills Design
 * Zero dynamic content, zero hydration issues
 */

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff6b35]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24">
        {/* Top stats */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/40 font-mono tracking-wider">47 funded today</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/30 tracking-wider mb-1">TOTAL PAID</div>
            <div className="text-xl font-mono text-white/80">$12,847,290</div>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center max-w-5xl mx-auto">
          <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-8">
            Proprietary Trading
          </p>

          <h1 className="mb-10">
            <span className="block text-[12vw] lg:text-[10vw] font-black text-white leading-[0.85] tracking-[-0.02em]">
              TRADE
            </span>
            <span className="block text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.02em]">
              <span className="text-[#ff6b35]">OUR</span>
              <span className="text-white"> CAPITAL</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Get funded up to <span className="text-white">$200,000</span>.
            Keep up to <span className="text-[#ff6b35]">90%</span> of profits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="px-10 py-5 bg-white text-black font-bold tracking-wider hover:bg-[#ff6b35] transition-colors"
            >
              GET FUNDED →
            </Link>
            <Link
              href="/how-it-works"
              className="px-10 py-5 border border-white/20 text-white/60 font-medium tracking-wider hover:text-white hover:border-white/40 transition-colors"
            >
              HOW IT WORKS
            </Link>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex justify-center gap-16 md:gap-24 mt-20">
          {[
            { value: "90%", label: "Profit Share" },
            { value: "$200K", label: "Max Capital" },
            { value: "24H", label: "Payouts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-light text-white/80">{stat.value}</div>
              <div className="text-xs text-white/30 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
