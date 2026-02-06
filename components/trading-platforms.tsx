"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Globe, Check } from "lucide-react";

const platforms = [
  {
    name: "MetaTrader 4",
    description: "Industry standard with expert advisors support",
    features: ["Expert Advisors", "Custom Indicators", "One-Click Trading"],
    popular: true,
  },
  {
    name: "MetaTrader 5",
    description: "Advanced charting and multi-asset trading",
    features: ["Depth of Market", "Economic Calendar", "Built-in Strategy Tester"],
  },
  {
    name: "cTrader",
    description: "Modern interface with advanced order types",
    features: ["Level II Pricing", "Copy Trading", "cAlgo Support"],
  },
  {
    name: "TradingView",
    description: "Web-based with powerful social features",
    features: ["Cloud-Based", "Social Trading", "Multi-Device Sync"],
    comingSoon: true,
  },
];

const tradableAssets = [
  "Forex (70+ pairs)",
  "Indices",
  "Commodities",
  "Crypto",
  "Metals",
  "Energies",
];

export function TradingPlatforms() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Trading{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Platforms
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Trade on your favorite platform with access to all major markets.
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all ${
                platform.popular
                  ? "bg-primary/10 border-primary/30"
                  : "bg-surface/50 border-white/10 hover:border-primary/30"
              }`}
            >
              {platform.popular && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-background text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              {platform.comingSoon && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-violet-500 text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
              <p className="text-sm text-foreground/60 mb-4">
                {platform.description}
              </p>

              <ul className="space-y-2">
                {platform.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-profit flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tradable Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Tradable Assets</h3>
            <p className="text-foreground/60">
              Access a wide range of markets with competitive spreads
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tradableAssets.map((asset, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium"
              >
                {asset}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Device Support */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-4 bg-surface/30 rounded-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Desktop</h4>
              <p className="text-sm text-foreground/60">Windows & macOS</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 p-4 bg-surface/30 rounded-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Mobile</h4>
              <p className="text-sm text-foreground/60">iOS & Android</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 p-4 bg-surface/30 rounded-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Web</h4>
              <p className="text-sm text-foreground/60">Any browser</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
