"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Plan {
  name: string;
  accountSize: string;
  price: string;
  profitTarget: string;
  maxDrawdown: string;
  profitSplit: string;
  timeLimit: string;
  tradingDays: string;
  scaling: boolean;
  resetOption: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    accountSize: "$5,000",
    price: "$49",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitSplit: "Up to 80%",
    timeLimit: "Unlimited",
    tradingDays: "5 minimum",
    scaling: false,
    resetOption: true,
  },
  {
    name: "Professional",
    accountSize: "$25,000",
    price: "$199",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitSplit: "Up to 90%",
    timeLimit: "Unlimited",
    tradingDays: "5 minimum",
    scaling: true,
    resetOption: true,
  },
  {
    name: "Elite",
    accountSize: "$100,000",
    price: "$699",
    profitTarget: "8%",
    maxDrawdown: "5%",
    profitSplit: "Up to 90%",
    timeLimit: "Unlimited",
    tradingDays: "5 minimum",
    scaling: true,
    resetOption: true,
  },
];

const features = [
  { key: "accountSize", label: "Account Size" },
  { key: "price", label: "Price" },
  { key: "profitTarget", label: "Profit Target" },
  { key: "maxDrawdown", label: "Max Drawdown" },
  { key: "profitSplit", label: "Profit Split" },
  { key: "timeLimit", label: "Time Limit" },
  { key: "tradingDays", label: "Minimum Trading Days" },
  { key: "scaling", label: "Account Scaling" },
  { key: "resetOption", label: "Reset Option" },
];

export default function ComparisonTable() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Plan Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare all plans side-by-side to find the perfect fit for your trading style
          </p>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="w-full">
              <thead className="sticky top-0 z-10 glass-strong border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.name}
                      className={`text-center p-4 font-semibold ${
                        index === 1 ? "bg-primary/10 text-primary" : "text-foreground"
                      }`}
                    >
                      <div>
                        <div className="text-xl font-bold">{plan.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{plan.accountSize}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, rowIndex) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-border ${
                      rowIndex % 2 === 0 ? "bg-surface/50" : "bg-background"
                    }`}
                  >
                    <td className="p-4 font-medium text-foreground">{feature.label}</td>
                    {plans.map((plan) => {
                      const value = plan[feature.key as keyof Plan];
                      return (
                        <td key={plan.name} className="p-4 text-center text-muted-foreground">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="h-5 w-5 text-profit mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                            )
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              className="glass rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === planIndex ? null : planIndex)}
                className={`w-full p-4 flex items-center justify-between ${
                  planIndex === 1 ? "bg-primary/10" : ""
                }`}
              >
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground">{plan.name}</div>
                  <div className="text-sm text-muted-foreground">{plan.accountSize}</div>
                </div>
                <motion.div
                  animate={{ rotate: openAccordion === planIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === planIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3 border-t border-border">
                      {features.map((feature) => {
                        const value = plan[feature.key as keyof Plan];
                        return (
                          <div key={feature.key} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                              {feature.label}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check className="h-4 w-4 text-profit" />
                                ) : (
                                  <X className="h-4 w-4 text-muted-foreground/50" />
                                )
                              ) : (
                                value
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
