"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  LineChart,
  Shield,
  Clock,
  TrendingUp,
  Headphones,
  Globe,
  Zap,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Instant Payouts",
    description:
      "Get your profits within 24 hours. No waiting, no hassle. Crypto and bank transfers available.",
  },
  {
    icon: LineChart,
    title: "Real Market Data",
    description:
      "Trade with live market conditions. Experience real spreads and execution speeds.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Built-in drawdown protection and risk tools to help you trade responsibly.",
  },
  {
    icon: Clock,
    title: "No Time Limits",
    description:
      "Take your time to pass the challenge. No pressure, no rushing. Trade at your own pace.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Program",
    description:
      "Scale your account up to $2M based on consistent performance and profitability.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our expert team is available around the clock to help you with any questions.",
  },
  {
    icon: Globe,
    title: "Trade Anywhere",
    description:
      "Access your account from anywhere in the world. Mobile-friendly dashboard included.",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description:
      "Lightning-fast order execution with minimal slippage on all major pairs.",
  },
  {
    icon: Award,
    title: "Up to 90% Profit",
    description:
      "Keep up to 90% of your trading profits. One of the highest splits in the industry.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-background" />

      <div className="container mx-auto px-4 lg:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              AlphaTrader
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We provide everything you need to succeed as a funded trader.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-6 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/30 transition-all"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
