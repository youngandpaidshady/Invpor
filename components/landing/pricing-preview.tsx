"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Pricing Preview - Clean Interactive
 * Zero framer-motion, pure CSS transitions
 */

const plans = [
  { size: 10000, price: 89, split: 80 },
  { size: 25000, price: 179, split: 85 },
  { size: 50000, price: 299, split: 85 },
  { size: 100000, price: 499, split: 90 },
  { size: 200000, price: 999, split: 90 },
];

export function PricingPreview() {
  const [selected, setSelected] = useState(2);
  const currentPlan = plans[selected];

  return (
    <section className="py-24 lg:py-40 bg-white text-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="text-xs text-black/30 uppercase tracking-[0.4em] font-mono block mb-6">
            Simple Pricing
          </span>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight">
            One payment.<br />
            <span className="text-black/20">Forever.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Selector & Price */}
          <div>
            <div className="mb-10">
              <div className="text-sm text-black/40 uppercase tracking-wider mb-6">Account Size</div>
              <div className="flex flex-wrap gap-3">
                {plans.map((plan, i) => (
                  <button
                    key={plan.size}
                    onClick={() => setSelected(i)}
                    className={`px-6 py-4 text-lg font-bold transition-all ${selected === i
                        ? "bg-black text-white"
                        : "bg-transparent text-black/40 border border-black/10 hover:border-black/30"
                      }`}
                  >
                    ${plan.size / 1000}K
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <span className="text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter">
                ${currentPlan.price}
              </span>
              <span className="text-xl text-black/30 ml-2">one-time</span>
            </div>

            <Link
              href={`/checkout?size=${currentPlan.size}`}
              className="inline-block px-12 py-5 bg-black text-white font-bold tracking-wider hover:bg-[#ff6b35] transition-colors"
            >
              START CHALLENGE →
            </Link>
          </div>

          {/* Right - Details */}
          <div>
            {[
              { label: "Account Size", value: `$${currentPlan.size.toLocaleString()}` },
              { label: "Profit Split", value: `${currentPlan.split}%`, highlight: true },
              { label: "Profit Target", value: "10%" },
              { label: "Daily Drawdown", value: "5%" },
              { label: "Max Drawdown", value: "10%" },
              { label: "Time Limit", value: "None" },
              { label: "Free Retry", value: "Yes" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-5 border-b border-black/5">
                <span className="text-black/50">{item.label}</span>
                <span className={`font-bold ${item.highlight ? "text-[#ff6b35] text-xl" : "text-black"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
