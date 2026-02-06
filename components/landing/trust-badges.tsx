"use client";

/**
 * Trust Badges - Clean Stats Display
 * Zero framer-motion, pure CSS
 */

export function TrustBadges() {
  return (
    <section className="py-24 lg:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs text-white/30 uppercase tracking-[0.4em] font-mono">
            By the numbers
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {[
            { value: "$12M+", label: "Paid to Traders", color: "#ff6b35" },
            { value: "15,247", label: "Funded Accounts", color: "#ffffff" },
            { value: "4.9★", label: "Trustpilot Rating", color: "#fbbf24" },
            { value: "50+", label: "Countries", color: "#ffffff" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-mono font-light mb-4"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            <span className="text-xs text-white/20 uppercase tracking-wider">Trading Platforms</span>
            {["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView", "DXtrade"].map((platform) => (
              <span key={platform} className="text-sm text-white/40 font-medium hover:text-[#ff6b35] transition-colors cursor-default">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
