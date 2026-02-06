"use client";

import Link from "next/link";

/**
 * Final CTA - Clean Closing Section
 * Zero framer-motion, pure CSS
 */

export function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-48 bg-[#050505] overflow-hidden">
      {/* Static gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6b35]/10 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-white/30 uppercase tracking-[0.4em] font-mono block mb-8">
            Your Move
          </span>

          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-10">
            <span className="text-white">STOP</span>
            <br />
            <span className="text-[#ff6b35]">WAITING.</span>
          </h2>

          <p className="text-xl lg:text-2xl text-white/40 max-w-2xl mx-auto mb-14 font-light">
            15,000+ traders already took the leap.<br />
            Your funded account is a few clicks away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="px-14 py-6 bg-white text-black font-bold text-lg tracking-wider hover:bg-[#ff6b35] transition-colors"
            >
              GET FUNDED NOW →
            </Link>
            <Link
              href="/contact"
              className="px-10 py-6 border border-white/20 text-white/60 font-medium tracking-wider hover:text-white hover:border-white/40 transition-colors"
            >
              TALK TO US
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {["Instant Access", "24H Payouts", "No Hidden Fees", "Free Retry Policy"].map((text) => (
              <span key={text} className="text-xs text-white/20 uppercase tracking-widest">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
