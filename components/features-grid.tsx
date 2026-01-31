"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Globe,
  Headphones,
  BarChart3,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Funding",
    description: "Get funded within minutes of passing your evaluation. No waiting periods.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "No Risk Capital",
    description: "Trade with our money. Your only risk is the evaluation fee.",
    color: "text-profit",
    bg: "bg-profit/10",
  },
  {
    icon: TrendingUp,
    title: "Up to 90% Profit Split",
    description: "Keep the majority of your profits. You earned it.",
    color: "text-electric-violet",
    bg: "bg-electric-violet/10",
  },
  {
    icon: Clock,
    title: "No Time Limits",
    description: "Take your time. There's no deadline to pass the evaluation.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Trade Any Market",
    description: "Forex, indices, commodities, crypto—your strategy, your choice.",
    color: "text-profit",
    bg: "bg-profit/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help you succeed.",
    color: "text-electric-violet",
    bg: "bg-electric-violet/10",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track your performance with professional-grade dashboards.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    description: "Withdraw your profits within 24 hours. Crypto or bank transfer.",
    color: "text-profit",
    bg: "bg-profit/10",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Built for Serious Traders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed as a professional funded trader
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group glass rounded-xl p-6 hover:border-primary/30 border border-transparent transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
