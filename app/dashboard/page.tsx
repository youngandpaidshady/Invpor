"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Target,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

const stats = [
  {
    label: "Account Balance",
    value: "$26,450.00",
    change: "+$1,450",
    changePercent: "+5.8%",
    positive: true,
    icon: DollarSign,
    gradient: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-500",
  },
  {
    label: "Daily P&L",
    value: "+$380.50",
    change: "Today",
    changePercent: "+1.5%",
    positive: true,
    icon: TrendingUp,
    gradient: "from-primary/20 to-transparent",
    iconColor: "text-primary",
  },
  {
    label: "Profit Target",
    value: "72%",
    change: "$1,800 to go",
    changePercent: "",
    positive: true,
    icon: Target,
    gradient: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-500",
  },
  {
    label: "Max Drawdown",
    value: "2.4%",
    change: "7.6% remaining",
    changePercent: "",
    positive: true,
    icon: AlertTriangle,
    gradient: "from-amber-500/20 to-transparent",
    iconColor: "text-amber-500",
  },
];

const recentTrades = [
  { pair: "EUR/USD", type: "BUY", profit: 245.50, time: "2 hours ago", status: "Closed" },
  { pair: "GBP/JPY", type: "SELL", profit: -89.20, time: "4 hours ago", status: "Closed" },
  { pair: "XAU/USD", type: "BUY", profit: 567.00, time: "6 hours ago", status: "Closed" },
  { pair: "USD/CAD", type: "SELL", profit: 123.80, time: "Yesterday", status: "Closed" },
];

const rules = [
  { name: "Daily Drawdown", status: "safe", value: "2.4%", limit: "5%" },
  { name: "Max Drawdown", status: "safe", value: "2.4%", limit: "10%" },
  { name: "Profit Target", status: "progress", value: "72%", limit: "100%" },
  { name: "Min Trading Days", status: "safe", value: "8", limit: "5" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">
            Welcome back, <span className="text-primary">John</span>
          </h1>
          <p className="text-muted-foreground">
            Your trading performance overview for today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-background border border-border rounded-xl font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </button>
          <button className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all">
            Request Payout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center ${stat.iconColor}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="text-2xl font-bold mb-1 tracking-tight">{stat.value}</div>

              <div className="flex items-center gap-2 text-sm">
                {stat.changePercent && (
                  <span className={`flex items-center gap-0.5 font-medium ${stat.positive ? "text-emerald-500" : "text-destructive"}`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.changePercent}
                  </span>
                )}
                <span className="text-muted-foreground">{stat.change}</span>
              </div>

              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-4 opacity-60">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Equity Curve Placeholder */}
        <div className="lg:col-span-2 p-6 lg:p-8 bg-card border border-border rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold font-serif">Equity Curve</h2>
            <div className="flex p-1 bg-muted/50 rounded-lg">
              {['1W', '1M', '3M', 'ALL'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${period === '1M' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-xl bg-muted/20">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">Chart Visualization</div>
              <div className="text-xs text-muted-foreground/60">Integrate Recharts or Lightweight Charts here</div>
            </div>
          </div>
        </div>

        {/* Active Rules */}
        <div className="p-6 lg:p-8 bg-card border border-border rounded-2xl">
          <h2 className="text-lg font-semibold font-serif mb-6">Trading Objectives</h2>
          <div className="space-y-6">
            {rules.map((rule, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">{rule.name}</span>
                  <span className="font-mono font-medium">
                    {rule.value} <span className="text-muted-foreground">/ {rule.limit}</span>
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${rule.status === "safe"
                        ? "bg-emerald-500"
                        : rule.status === "progress"
                          ? "bg-primary"
                          : "bg-destructive"
                      }`}
                    style={{
                      width: rule.status === "progress"
                        ? rule.value
                        : `${(parseFloat(rule.value) / parseFloat(rule.limit)) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Challenge Ends</span>
              <span className="font-medium text-foreground">Unlimited Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="p-6 lg:p-8 bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold font-serif">Recent History</h2>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                <th className="pb-4 pl-4">Pair</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Profit/Loss</th>
                <th className="pb-4 text-right pr-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTrades.map((trade, index) => (
                <tr key={index} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-4 pl-4 font-medium">{trade.pair}</td>
                  <td className="py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${trade.type === "BUY"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-orange-500/10 text-orange-500"
                        }`}
                    >
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{trade.status}</td>
                  <td
                    className={`py-4 font-mono font-medium ${trade.profit >= 0 ? "text-emerald-500" : "text-destructive"}`}
                  >
                    {trade.profit >= 0 ? "+" : ""}${Math.abs(trade.profit).toFixed(2)}
                  </td>
                  <td className="py-4 text-right pr-4 text-sm text-muted-foreground">{trade.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
