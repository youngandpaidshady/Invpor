"use client";

/**
 * Partners/Platforms Section - Pure CSS
 * Zero framer-motion, bulletproof
 */

const platforms = [
  { name: "MetaTrader 4", abbr: "MT4" },
  { name: "MetaTrader 5", abbr: "MT5" },
  { name: "cTrader", abbr: "cT" },
  { name: "TradingView", abbr: "TV" },
  { name: "DXtrade", abbr: "DX" },
  { name: "Match-Trader", abbr: "MT" },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Crypto", "Bank Transfer", "Skrill"];

export function Partners() {
  return (
    <section className="py-12 lg:py-16 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <p className="text-center text-xs font-medium text-white/30 uppercase tracking-[0.2em]">
          Integrated With Leading Platforms
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />

        {/* CSS Marquee */}
        <div className="flex overflow-hidden">
          <div className="flex animate-platform-marquee">
            {[...platforms, ...platforms, ...platforms].map((platform, index) => (
              <div
                key={`${platform.name}-${index}`}
                className="flex-shrink-0 mx-4 flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#ff6b35]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center font-bold text-[#ff6b35] text-sm group-hover:scale-110 transition-transform">
                  {platform.abbr}
                </div>
                <span className="font-medium text-white/80 whitespace-nowrap">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="container mx-auto px-6 lg:px-12 mt-10">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span className="text-xs text-white/30 uppercase tracking-wider">
            Payment Methods:
          </span>
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="px-3 py-1.5 bg-white/[0.03] rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.05] transition-colors cursor-default"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
