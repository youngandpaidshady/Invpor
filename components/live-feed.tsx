"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface Trade {
  id: number;
  trader: string;
  pair: string;
  type: "buy" | "sell";
  profit: number;
  time: string;
}

const initialTrades: Trade[] = [
  { id: 1, trader: "Mike T.", pair: "EUR/USD", type: "buy", profit: 450, time: "2m ago" },
  { id: 2, trader: "Sarah K.", pair: "GBP/JPY", type: "sell", profit: 890, time: "5m ago" },
  { id: 3, trader: "David L.", pair: "XAU/USD", type: "buy", profit: 1250, time: "8m ago" },
  { id: 4, trader: "Emma R.", pair: "USD/CAD", type: "sell", profit: 320, time: "12m ago" },
  { id: 5, trader: "James W.", pair: "EUR/GBP", type: "buy", profit: 670, time: "15m ago" },
];

const pairs = ["EUR/USD", "GBP/JPY", "XAU/USD", "USD/CAD", "EUR/GBP", "AUD/USD", "NZD/USD", "USD/CHF"];
const names = ["Mike T.", "Sarah K.", "David L.", "Emma R.", "James W.", "Lisa P.", "Robert H.", "Anna G."];

export function LiveFeed() {
  const [trades, setTrades] = useState<Trade[]>(initialTrades);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: Trade = {
        id: Date.now(),
        trader: names[Math.floor(Math.random() * names.length)],
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        type: Math.random() > 0.5 ? "buy" : "sell",
        profit: Math.floor(Math.random() * 2000) + 100,
        time: "Just now",
      };

      setTrades((prev) => [newTrade, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-profit/10 border border-profit/20 rounded-full mb-6">
            <Activity className="w-4 h-4 text-profit" />
            <span className="text-sm font-medium text-profit">Live Trading Activity</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
            Watch Traders{" "}
            <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Win Live
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real-time feed of profitable trades from our funded community.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {trades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary/30 transition-colors"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  trade.type === "buy"
                    ? "bg-profit/20 text-profit"
                    : "bg-violet-500/20 text-violet-400"
                }`}
              >
                {trade.type === "buy" ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>

              {/* Trader & Pair */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{trade.trader}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      trade.type === "buy"
                        ? "bg-profit/20 text-profit"
                        : "bg-violet-500/20 text-violet-400"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-foreground/60">{trade.pair}</div>
              </div>

              {/* Profit */}
              <div className="text-right">
                <div className="font-bold text-profit">+${trade.profit.toLocaleString()}</div>
                <div className="text-xs text-foreground/60">{trade.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
