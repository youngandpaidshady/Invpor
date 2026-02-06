"use client";

import { motion } from "framer-motion";
import { Clock, Shield, Wallet, TrendingUp, Headphones, Globe } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "No Time Limits",
    description: "Take as long as you need to pass the evaluation. Trade at your own pace without pressure.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Clear drawdown rules to protect both you and our capital. No hidden restrictions.",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    description: "Request payouts anytime. We process withdrawals within 24 hours via bank or crypto.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Program",
    description: "Consistently profitable? We'll increase your account size up to $2 million.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Real humans available around the clock. Get help when you need it.",
  },
  {
    icon: Globe,
    title: "Trade Anywhere",
    description: "Access your account from any device. We support MT4, MT5, and cTrader.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Why Traders Choose Us
          </h2>
          <p className="text-foreground/60">
            Fair rules, fast payouts, and real support. Everything you need to succeed.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
