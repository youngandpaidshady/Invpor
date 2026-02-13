"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/**
 * Pricing Preview — Magma Theme
 * Orange selected states, framer-motion entrance
 */

const plans = [
  { id: "10k", capital: "$10,000", price: "$99", target: "8%", drawdown: "5%", days: "∞" },
  { id: "25k", capital: "$25,000", price: "$199", target: "8%", drawdown: "5%", days: "∞" },
  { id: "50k", capital: "$50,000", price: "$299", target: "8%", drawdown: "5%", days: "∞", popular: true },
  { id: "100k", capital: "$100,000", price: "$499", target: "8%", drawdown: "5%", days: "∞" },
  { id: "200k", capital: "$200,000", price: "$999", target: "8%", drawdown: "5%", days: "∞" },
];

export function PricingPreview() {
  const [selectedPlan, setSelectedPlan] = useState("50k");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section bg-[#111113] border-y border-[#3F3F46]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <p className="eyebrow mb-4">PRICING</p>
            <h2 className="heading-lg text-white">
              CHOOSE YOUR<br />
              <span className="text-[#F97316]">CAPITAL</span>
            </h2>
          </div>
          <p className="text-sm text-[#A1A1AA] max-w-md lg:text-right">
            One-time payment. No monthly fees. No hidden charges.
            All accounts include instant funding after passing evaluation.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-[#3F3F46]"
        >
          {/* Table header */}
          <div className="hidden lg:grid grid-cols-6 gap-4 p-4 border-b border-[#3F3F46] bg-[#09090B]">
            <div className="text-[10px] uppercase tracking-wider text-[#71717A]">Capital</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A]">Price</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A]">Profit Target</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A]">Max Drawdown</div>
            <div className="text-[10px] uppercase tracking-wider text-[#71717A]">Trading Days</div>
            <div></div>
          </div>

          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`grid grid-cols-2 lg:grid-cols-6 gap-4 p-4 lg:p-6 border-b border-[#27272A] last:border-b-0 cursor-pointer transition-all duration-200 ${selectedPlan === plan.id
                  ? "bg-[#F97316]/5 border-l-2 border-l-[#F97316]"
                  : "hover:bg-white/[0.02]"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg text-white">{plan.capital}</span>
                {plan.popular && <span className="badge-success">POPULAR</span>}
              </div>
              <div className="font-mono text-[#A1A1AA]">{plan.price}</div>
              <div className="hidden lg:block font-mono text-[#A1A1AA]">{plan.target}</div>
              <div className="hidden lg:block font-mono text-[#A1A1AA]">{plan.drawdown}</div>
              <div className="hidden lg:block font-mono text-[#A1A1AA]">{plan.days}</div>
              <div className="col-span-2 lg:col-span-1 lg:text-right">
                <Link
                  href={`/checkout/${plan.id}`}
                  className={`inline-block text-xs uppercase tracking-wider transition-colors ${selectedPlan === plan.id
                      ? "text-[#F97316]"
                      : "text-[#71717A] hover:text-white"
                    }`}
                >
                  SELECT →
                </Link>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom info */}
        <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-[#71717A]">
            <span>90% profit split</span>
            <span className="text-[#3F3F46]">•</span>
            <span>24h payouts</span>
            <span className="text-[#3F3F46]">•</span>
            <span>No time limits</span>
          </div>
          <Link href="/pricing" className="text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-[#F97316] transition-colors">
            View full comparison →
          </Link>
        </div>
      </div>
    </section>
  );
}
