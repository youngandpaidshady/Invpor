"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CreditCard, RefreshCw } from "lucide-react";

const guarantees = [
  {
    icon: Shield,
    title: "100% Payout Guarantee",
    description: "Every payout is guaranteed. We've never missed a single payment.",
  },
  {
    icon: Clock,
    title: "24-Hour Processing",
    description: "Withdrawals processed within 24 hours. No waiting, no excuses.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Withdraw via bank transfer, crypto, or your preferred method.",
  },
  {
    icon: RefreshCw,
    title: "Free Retry Policy",
    description: "Hit profit target but broke a rule? Get a free retry on us.",
  },
];

export function RewardGuarantee() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/10 via-transparent to-[#F97316]/10" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Our{" "}
            <span className="text-[#F97316]">
              Guarantees
            </span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Your success is our priority. That&apos;s why we back every account with
            iron-clad guarantees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-foreground/60">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-semibold text-primary">
              $12M+ Paid to Traders - Zero Missed Payments
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
