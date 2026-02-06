"use client";

import { useState } from "react";

/**
 * FAQ - Clean Accordion
 * Zero framer-motion, pure CSS transitions
 */

const faqs = [
  {
    q: "How does the evaluation work?",
    a: "Two phases. Phase 1: hit 10% profit. Phase 2: hit 5% profit. Both with a 5% max drawdown. No time limits. Pass both, get funded with real capital.",
  },
  {
    q: "What's the profit split?",
    a: "80% to 90% depending on your account size. $100K accounts and above get the full 90% split from day one.",
  },
  {
    q: "How fast are payouts?",
    a: "24 hours or less. We support bank transfer, crypto (BTC, ETH, USDT), PayPal, and Skrill. Request anytime, paid same business day.",
  },
  {
    q: "Any trading restrictions?",
    a: "Trade how you want. Scalping, day trading, swing trading, news trading—all allowed. We don't micromanage your strategy.",
  },
  {
    q: "What if I hit drawdown?",
    a: "Challenge ends. Your loss is capped at the one-time fee you paid. Buy a new challenge whenever you're ready to try again.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-40 bg-white text-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-2">
            <span className="text-xs text-black/30 uppercase tracking-[0.4em] font-mono block mb-6">
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-8">
              Got<br />
              <span className="text-black/20">questions?</span>
            </h2>
            <p className="text-black/50 max-w-sm">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="lg:col-span-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between text-left group"
                >
                  <span className={`text-lg lg:text-xl font-bold pr-8 transition-colors ${open === i ? "text-[#ff6b35]" : "text-black group-hover:text-black/60"
                    }`}>
                    {faq.q}
                  </span>
                  <span className={`text-2xl font-light transition-transform ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}>
                  <p className="text-black/50 leading-relaxed max-w-xl">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
