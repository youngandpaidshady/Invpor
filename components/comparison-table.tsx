"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";

const plans = [
  { name: "Starter", price: "$49" },
  { name: "Standard", price: "$179" },
  { name: "Professional", price: "$499" },
];

const features = [
  { name: "Account Size", values: ["$5,000", "$25,000", "$100,000"] },
  { name: "Profit Target", values: ["8%", "8%", "8%"] },
  { name: "Max Drawdown", values: ["10%", "10%", "10%"] },
  { name: "Daily Drawdown", values: ["5%", "5%", "5%"] },
  { name: "Profit Split", values: ["80%", "85%", "90%"] },
  { name: "Free Retry", values: [true, true, true] },
  { name: "No Time Limit", values: [true, true, true] },
  { name: "Scaling Plan", values: [false, true, true] },
  { name: "Priority Support", values: [false, true, true] },
  { name: "Personal Manager", values: [false, false, true] },
  { name: "Same-day Payouts", values: [false, false, true] },
  { name: "Crypto Withdrawals", values: [true, true, true] },
];

export function ComparisonTable() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-surface/30">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Compare{" "}
            <span className="text-[#F97316]">
              Plans
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Find the perfect plan that matches your trading goals and experience
            level.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="sticky left-0 bg-surface/80 backdrop-blur-sm p-6 text-left font-semibold">
                  Features
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={plan.name}
                    className={`p-6 text-center ${index === 1 ? "bg-primary/10" : ""}`}
                  >
                    <div className="font-display font-bold text-xl mb-1">
                      {plan.name}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {plan.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr
                  key={feature.name}
                  className={`border-b border-white/5 ${featureIndex % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                >
                  <td className="sticky left-0 bg-surface/80 backdrop-blur-sm p-4 font-medium">
                    {feature.name}
                  </td>
                  {feature.values.map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      className={`p-4 text-center ${valueIndex === 1 ? "bg-primary/5" : ""}`}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="w-5 h-5 text-profit mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-foreground/30 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {plans.map((plan, planIndex) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: planIndex * 0.1 }}
              className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedFeature(
                    expandedFeature === plan.name ? null : plan.name
                  )
                }
                className="w-full p-6 flex items-center justify-between"
              >
                <div>
                  <div className="font-display font-bold text-xl">
                    {plan.name}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {plan.price}
                  </div>
                </div>
                <div
                  className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform ${expandedFeature === plan.name ? "rotate-180" : ""}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {expandedFeature === plan.name && (
                <div className="px-6 pb-6 space-y-3">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center justify-between py-2 border-b border-white/5"
                    >
                      <span className="text-foreground/60">{feature.name}</span>
                      <span className="font-semibold">
                        {typeof feature.values[planIndex] === "boolean" ? (
                          feature.values[planIndex] ? (
                            <Check className="w-5 h-5 text-profit" />
                          ) : (
                            <X className="w-5 h-5 text-foreground/30" />
                          )
                        ) : (
                          feature.values[planIndex]
                        )}
                      </span>
                    </div>
                  ))}
                  <button className="w-full mt-4 py-3 bg-primary text-background font-semibold rounded-xl">
                    Get Started
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
