"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { PRICING_PLANS } from "@/lib/constants";
import { ChallengeType } from "@/lib/types";

const tabs: { id: ChallengeType; label: string; description: string }[] = [
  { id: "2-step", label: "2-Step", description: "Classic evaluation" },
  { id: "1-step", label: "1-Step", description: "Faster funding" },
  { id: "instant", label: "Instant", description: "No evaluation" },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<ChallengeType>("2-step");
  
  const filteredPlans = PRICING_PLANS.filter((plan) => plan.type === activeTab);

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-foreground/[0.02]">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-foreground/60">
            Choose the challenge type and account size that fits your trading style.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-foreground/5 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="block text-xs opacity-60">{tab.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-6 rounded-xl border transition-all ${
                plan.is_popular
                  ? "bg-primary/5 border-primary/30"
                  : "bg-background border-foreground/10 hover:border-foreground/20"
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Popular
                </div>
              )}

              {/* Account Size */}
              <div className="text-center mb-4">
                <div className="text-2xl font-display font-bold text-primary">
                  {formatCurrency(plan.account_size)}
                </div>
                <div className="text-sm text-foreground/50">{plan.name}</div>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-foreground/10">
                <div className="text-3xl font-bold">{formatCurrency(plan.price)}</div>
                <div className="text-xs text-foreground/50">One-time fee</div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Profit Target</span>
                  <span className="font-medium">
                    {plan.profit_target > 0 ? `${plan.profit_target}%` : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Max Drawdown</span>
                  <span className="font-medium">{plan.max_drawdown}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Daily Drawdown</span>
                  <span className="font-medium">{plan.daily_drawdown}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Profit Split</span>
                  <span className="font-medium text-primary">{plan.profit_split}%</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/checkout/${plan.id}`}
                className={`block w-full py-3 text-center text-sm font-semibold rounded-lg transition-colors ${
                  plan.is_popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                Select Plan
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-foreground/50 mt-8">
          All plans include free platform access, real-time market data, and 24/7 support.
        </p>
      </div>
    </section>
  );
}
