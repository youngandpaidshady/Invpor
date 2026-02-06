"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$8M+", label: "Paid to Traders" },
  { value: "10,000+", label: "Funded Accounts" },
  { value: "90%", label: "Max Profit Split" },
  { value: "24h", label: "Payout Processing" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-foreground/[0.02] border-y border-foreground/5">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
