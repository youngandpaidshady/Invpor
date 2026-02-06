"use client";

import { motion } from "framer-motion";
import { TrendingUp, Check, Star } from "lucide-react";

const scales = [
  { level: 1, account: "$25K", profitSplit: "85%", requirement: "Pass Challenge" },
  { level: 2, account: "$50K", profitSplit: "85%", requirement: "10% Profit" },
  { level: 3, account: "$100K", profitSplit: "90%", requirement: "10% Profit" },
  { level: 4, account: "$200K", profitSplit: "90%", requirement: "10% Profit" },
  { level: 5, account: "$400K", profitSplit: "90%", requirement: "10% Profit" },
  { level: 6, account: "$1M", profitSplit: "90%", requirement: "10% Profit", highlight: true },
  { level: 7, account: "$2M", profitSplit: "90%", requirement: "Elite Status", highlight: true },
];

export function ScalingProgram() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-surface/30">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,255,0,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Scale Up to $2M
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Scaling{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Program
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Consistently profitable? We&apos;ll increase your account size automatically.
            No extra fees, no re-challenges.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-6">
            {scales.map((scale, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-8 lg:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${
                    scale.highlight
                      ? "bg-primary shadow-lg shadow-primary/50"
                      : "bg-surface border-2 border-primary"
                  }`}
                />

                {/* Card */}
                <div
                  className={`ml-16 lg:ml-0 ${index % 2 === 0 ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"} lg:w-[calc(50%-2rem)]`}
                >
                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      scale.highlight
                        ? "bg-primary/10 border-primary/30"
                        : "bg-surface/50 border-white/10 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-medium text-foreground/60">
                        Level {scale.level}
                      </span>
                      {scale.highlight && (
                        <span className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                          <Star className="w-3 h-3" />
                          Elite
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-display font-bold text-primary">
                        {scale.account}
                      </span>
                      <span className="text-foreground/60">
                        {scale.profitSplit} split
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Check className="w-4 h-4 text-profit" />
                      <span>{scale.requirement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
