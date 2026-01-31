"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Globe, Zap } from "lucide-react";

const platforms = [
  { name: "MetaTrader 4", short: "MT4" },
  { name: "MetaTrader 5", short: "MT5" },
  { name: "cTrader", short: "cT" },
  { name: "TradingView", short: "TV" },
];

const features = [
  { icon: Monitor, text: "PC Web Terminals" },
  { icon: Smartphone, text: "Mobile (iOS / Android)" },
  { icon: Globe, text: "Trader Dashboard" },
  { icon: Zap, text: "Lightning Fast Execution" },
];

export default function TradingPlatforms() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
              Professional Tools
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Trade on Your
              <span className="block text-gradient">Favorite Platform</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              FX Pairs / Stocks / ETFs / Crypto Pairs — All on industry-leading platforms with raw spreads from 0.1 pips and $0 commissions on indices and cryptos.
            </p>

            {/* Platform badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {platform.short}
                  </div>
                  <span className="text-sm font-medium text-foreground">{platform.name}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.text} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl p-6 border border-border">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  My Dashboard
                </button>
                <button className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                  My Stats
                </button>
                <button className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                  Top Traders
                </button>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-surface/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Balance</p>
                  <p className="text-lg font-bold text-foreground">$52,450</p>
                </div>
                <div className="bg-surface/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Profit</p>
                  <p className="text-lg font-bold text-profit">+$2,450</p>
                </div>
                <div className="bg-surface/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Drawdown</p>
                  <p className="text-lg font-bold text-foreground">1.8%</p>
                </div>
              </div>

              {/* Trade list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇪🇺🇺🇸</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">EUR/USD</p>
                      <p className="text-xs text-muted-foreground">Buy • 0.5 lots</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-profit">+$245</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🥇</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">XAU/USD</p>
                      <p className="text-xs text-muted-foreground">Sell • 0.2 lots</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-profit">+$180</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇬🇧🇯🇵</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">GBP/JPY</p>
                      <p className="text-xs text-muted-foreground">Buy • 0.3 lots</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-500">-$45</span>
                </div>
              </div>
            </div>

            {/* Feature badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-2 border border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-muted-foreground">Raw Spreads</p>
              <p className="text-lg font-bold text-primary">0.1 pips</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
