"use client";

import { useState } from "react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Download,
} from "lucide-react";

// Mock data - in production this would come from API
const challengeData = {
  id: "ch-001",
  name: "$25K Challenge",
  type: "2-step" as const,
  phase: 1,
  accountSize: 25000,
  balance: 26450,
  equity: 26380,
  profitTarget: 2000,
  currentProfit: 1450,
  maxDrawdown: 2500,
  dailyDrawdown: 1250,
  currentDrawdown: 600,
  currentDailyDrawdown: 200,
  tradingDays: 8,
  minTradingDays: 5,
  status: "active" as const,
  startDate: "2026-01-15",
  platform: "MetaTrader 5",
  server: "BraxleyNevim-Live",
  login: "50012345",
  password: "xK9#mP2$vL",
  trades: [
    {
      id: 1,
      symbol: "EUR/USD",
      type: "BUY",
      lots: 0.5,
      openPrice: 1.0825,
      closePrice: 1.0865,
      openTime: "2026-01-28 09:15",
      closeTime: "2026-01-28 14:30",
      profit: 200,
      pips: 40,
    },
    {
      id: 2,
      symbol: "GBP/JPY",
      type: "SELL",
      lots: 0.3,
      openPrice: 189.45,
      closePrice: 189.75,
      openTime: "2026-01-28 11:00",
      closeTime: "2026-01-28 13:45",
      profit: -90,
      pips: -30,
    },
    {
      id: 3,
      symbol: "XAU/USD",
      type: "BUY",
      lots: 0.1,
      openPrice: 2025.5,
      closePrice: 2032.2,
      openTime: "2026-01-27 10:30",
      closeTime: "2026-01-27 16:00",
      profit: 670,
      pips: 67,
    },
    {
      id: 4,
      symbol: "USD/CAD",
      type: "SELL",
      lots: 0.4,
      openPrice: 1.345,
      closePrice: 1.342,
      openTime: "2026-01-26 08:00",
      closeTime: "2026-01-26 12:30",
      profit: 120,
      pips: 30,
    },
    {
      id: 5,
      symbol: "EUR/GBP",
      type: "BUY",
      lots: 0.2,
      openPrice: 0.8545,
      closePrice: 0.8525,
      openTime: "2026-01-25 14:00",
      closeTime: "2026-01-25 17:30",
      profit: -40,
      pips: -20,
    },
  ],
};

const rules = [
  {
    name: "Profit Target",
    current: challengeData.currentProfit,
    target: challengeData.profitTarget,
    type: "profit",
    passed:
      challengeData.currentProfit >= challengeData.profitTarget,
    format: "currency",
  },
  {
    name: "Max Drawdown",
    current: challengeData.currentDrawdown,
    target: challengeData.maxDrawdown,
    type: "drawdown",
    passed: challengeData.currentDrawdown < challengeData.maxDrawdown,
    format: "currency",
  },
  {
    name: "Daily Drawdown",
    current: challengeData.currentDailyDrawdown,
    target: challengeData.dailyDrawdown,
    type: "drawdown",
    passed:
      challengeData.currentDailyDrawdown < challengeData.dailyDrawdown,
    format: "currency",
  },
  {
    name: "Minimum Trading Days",
    current: challengeData.tradingDays,
    target: challengeData.minTradingDays,
    type: "days",
    passed: challengeData.tradingDays >= challengeData.minTradingDays,
    format: "days",
  },
];

export default function ChallengeDetailPage() {
  // TODO: Use params.id to fetch challenge data from API
  // const params = useParams(); // TODO: Use params.id to fetch challenge data from API
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const profitPercent =
    (challengeData.currentProfit / challengeData.profitTarget) * 100;
  const drawdownPercent =
    (challengeData.currentDrawdown / challengeData.maxDrawdown) * 100;
  const dailyDrawdownPercent =
    (challengeData.currentDailyDrawdown / challengeData.dailyDrawdown) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link
          href="/dashboard/challenges"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Challenges
        </Link>
      </div>

      {/* Challenge Info Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 bg-foreground/[0.02] border border-border rounded-xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{challengeData.name}</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-400/20 text-blue-400">
              Phase {challengeData.phase}
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-400/20 text-green-400 capitalize">
              {challengeData.status}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Started {new Date(challengeData.startDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {challengeData.tradingDays} trading days
            </span>
            <span className="capitalize">{challengeData.type}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => alert("Exporting report...")} className="px-4 py-2 border border-border rounded-lg hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <Link href="/dashboard/payouts" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Request Payout
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Current Balance</p>
          <p className="text-2xl font-bold">
            ${challengeData.balance.toLocaleString()}
          </p>
          <p
            className={`text-sm mt-1 ${challengeData.currentProfit >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {challengeData.currentProfit >= 0 ? "+" : ""}$
            {challengeData.currentProfit.toLocaleString()} (
            {((challengeData.currentProfit / challengeData.accountSize) * 100).toFixed(
              2
            )}
            %)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Profit Target</p>
          <p className="text-2xl font-bold">{Math.round(profitPercent)}%</p>
          <p className="text-sm text-foreground/60 mt-1">
            ${challengeData.currentProfit.toLocaleString()} / $
            {challengeData.profitTarget.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Max Drawdown</p>
          <p className="text-2xl font-bold">{drawdownPercent.toFixed(1)}%</p>
          <p className="text-sm text-foreground/60 mt-1">
            ${challengeData.currentDrawdown.toLocaleString()} / $
            {challengeData.maxDrawdown.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Daily Drawdown</p>
          <p className="text-2xl font-bold">
            {dailyDrawdownPercent.toFixed(1)}%
          </p>
          <p className="text-sm text-foreground/60 mt-1">
            ${challengeData.currentDailyDrawdown.toLocaleString()} / $
            {challengeData.dailyDrawdown.toLocaleString()}
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rules Compliance */}
        <div className="lg:col-span-2 p-6 bg-foreground/[0.02] border border-border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Rules Compliance</h2>
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rule.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="font-medium">{rule.name}</span>
                  </div>
                  <span className="text-sm text-foreground/60">
                    {rule.format === "currency"
                      ? `$${rule.current.toLocaleString()} / $${rule.target.toLocaleString()}`
                      : `${rule.current} / ${rule.target} days`}
                  </span>
                </div>
                <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${rule.type === "profit"
                      ? rule.passed
                        ? "bg-green-400"
                        : "bg-blue-400"
                      : rule.type === "drawdown"
                        ? rule.passed
                          ? "bg-green-400"
                          : "bg-red-400"
                        : rule.passed
                          ? "bg-green-400"
                          : "bg-amber-400"
                      }`}
                    style={{
                      width: `${Math.min((rule.current / rule.target) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Credentials */}
        <div className="p-6 bg-foreground/[0.02] border border-border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Platform Credentials</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Platform</p>
              <p className="font-medium">{challengeData.platform}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-1">Server</p>
              <p className="font-medium">{challengeData.server}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-1">Login</p>
              <div className="flex items-center gap-2">
                <p className="font-medium font-mono">{challengeData.login}</p>
                <button
                  onClick={() =>
                    copyToClipboard(challengeData.login, "login")
                  }
                  className="p-1 hover:bg-foreground/10 rounded transition-colors"
                >
                  {copied === "login" ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-foreground/40" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-1">Password</p>
              <div className="flex items-center gap-2">
                <p className="font-medium font-mono">
                  {showPassword ? challengeData.password : "••••••••••"}
                </p>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 hover:bg-foreground/10 rounded transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-foreground/40" />
                  ) : (
                    <Eye className="w-4 h-4 text-foreground/40" />
                  )}
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(challengeData.password, "password")
                  }
                  className="p-1 hover:bg-foreground/10 rounded transition-colors"
                >
                  {copied === "password" ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-foreground/40" />
                  )}
                </button>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
            >
              Download {challengeData.platform}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Trade History */}
      <div className="p-6 bg-foreground/[0.02] border border-border rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Trades</h2>
          <Link
            href="/dashboard/trades"
            className="text-sm text-primary hover:underline"
          >
            View All Trades
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-foreground/60 border-b border-border">
                <th className="pb-3 font-medium">Symbol</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Lots</th>
                <th className="pb-3 font-medium">Open Price</th>
                <th className="pb-3 font-medium">Close Price</th>
                <th className="pb-3 font-medium">Pips</th>
                <th className="pb-3 font-medium text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {challengeData.trades.map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="py-3 font-medium">{trade.symbol}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trade.type === "BUY"
                        ? "bg-green-400/20 text-green-400"
                        : "bg-red-400/20 text-red-400"
                        }`}
                    >
                      {trade.type === "BUY" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-3">{trade.lots}</td>
                  <td className="py-3 font-mono text-sm">{trade.openPrice}</td>
                  <td className="py-3 font-mono text-sm">{trade.closePrice}</td>
                  <td
                    className={`py-3 ${trade.pips >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {trade.pips >= 0 ? "+" : ""}
                    {trade.pips}
                  </td>
                  <td
                    className={`py-3 text-right font-medium ${trade.profit >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {trade.profit >= 0 ? "+" : ""}${Math.abs(trade.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
