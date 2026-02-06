"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  DollarSign,
  BarChart3,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type TradeType = "buy" | "sell";

interface Trade {
  id: string;
  symbol: string;
  type: TradeType;
  openPrice: number;
  closePrice: number;
  volume: number;
  profitLoss: number;
  openTime: string;
  closeTime: string;
  duration: string;
  pips: number;
  challengeId: string;
  challengeName: string;
}

const mockTrades: Trade[] = [
  {
    id: "tr-001",
    symbol: "EUR/USD",
    type: "buy",
    openPrice: 1.0845,
    closePrice: 1.0892,
    volume: 1.0,
    profitLoss: 470,
    openTime: "2026-01-30T09:15:00",
    closeTime: "2026-01-30T14:32:00",
    duration: "5h 17m",
    pips: 47,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-002",
    symbol: "GBP/USD",
    type: "sell",
    openPrice: 1.2715,
    closePrice: 1.2680,
    volume: 0.5,
    profitLoss: 175,
    openTime: "2026-01-30T08:00:00",
    closeTime: "2026-01-30T11:45:00",
    duration: "3h 45m",
    pips: 35,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-003",
    symbol: "XAU/USD",
    type: "buy",
    openPrice: 2025.5,
    closePrice: 2018.3,
    volume: 0.2,
    profitLoss: -144,
    openTime: "2026-01-29T13:20:00",
    closeTime: "2026-01-29T16:10:00",
    duration: "2h 50m",
    pips: -72,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
  {
    id: "tr-004",
    symbol: "USD/JPY",
    type: "sell",
    openPrice: 147.85,
    closePrice: 147.42,
    volume: 1.5,
    profitLoss: 430,
    openTime: "2026-01-29T04:30:00",
    closeTime: "2026-01-29T09:15:00",
    duration: "4h 45m",
    pips: 43,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
  {
    id: "tr-005",
    symbol: "EUR/GBP",
    type: "buy",
    openPrice: 0.8525,
    closePrice: 0.8548,
    volume: 0.8,
    profitLoss: 184,
    openTime: "2026-01-28T10:00:00",
    closeTime: "2026-01-28T15:30:00",
    duration: "5h 30m",
    pips: 23,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-006",
    symbol: "NAS100",
    type: "buy",
    openPrice: 17485.2,
    closePrice: 17612.8,
    volume: 0.5,
    profitLoss: 638,
    openTime: "2026-01-28T14:30:00",
    closeTime: "2026-01-28T20:00:00",
    duration: "5h 30m",
    pips: 127.6,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
  {
    id: "tr-007",
    symbol: "EUR/USD",
    type: "sell",
    openPrice: 1.0912,
    closePrice: 1.0858,
    volume: 1.2,
    profitLoss: 648,
    openTime: "2026-01-27T08:45:00",
    closeTime: "2026-01-27T16:20:00",
    duration: "7h 35m",
    pips: 54,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-008",
    symbol: "GBP/JPY",
    type: "buy",
    openPrice: 187.45,
    closePrice: 186.92,
    volume: 0.4,
    profitLoss: -212,
    openTime: "2026-01-27T02:15:00",
    closeTime: "2026-01-27T06:45:00",
    duration: "4h 30m",
    pips: -53,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
  {
    id: "tr-009",
    symbol: "US30",
    type: "sell",
    openPrice: 38245.5,
    closePrice: 38125.0,
    volume: 0.3,
    profitLoss: 361.5,
    openTime: "2026-01-26T15:00:00",
    closeTime: "2026-01-26T20:30:00",
    duration: "5h 30m",
    pips: 120.5,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-010",
    symbol: "AUD/USD",
    type: "buy",
    openPrice: 0.6585,
    closePrice: 0.6612,
    volume: 2.0,
    profitLoss: 540,
    openTime: "2026-01-26T00:30:00",
    closeTime: "2026-01-26T08:15:00",
    duration: "7h 45m",
    pips: 27,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
  {
    id: "tr-011",
    symbol: "USD/CAD",
    type: "sell",
    openPrice: 1.3542,
    closePrice: 1.3498,
    volume: 1.0,
    profitLoss: 325,
    openTime: "2026-01-25T12:00:00",
    closeTime: "2026-01-25T18:30:00",
    duration: "6h 30m",
    pips: 44,
    challengeId: "ch-001",
    challengeName: "$25K Challenge",
  },
  {
    id: "tr-012",
    symbol: "XAU/USD",
    type: "sell",
    openPrice: 2035.8,
    closePrice: 2042.5,
    volume: 0.3,
    profitLoss: -201,
    openTime: "2026-01-25T08:00:00",
    closeTime: "2026-01-25T13:45:00",
    duration: "5h 45m",
    pips: -67,
    challengeId: "ch-002",
    challengeName: "$50K Funded",
  },
];

const challenges = [
  { id: "all", name: "All Challenges" },
  { id: "ch-001", name: "$25K Challenge" },
  { id: "ch-002", name: "$50K Funded" },
];

const symbols = [
  "All Symbols",
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "XAU/USD",
  "NAS100",
  "US30",
  "EUR/GBP",
  "GBP/JPY",
  "AUD/USD",
  "USD/CAD",
];

const ITEMS_PER_PAGE = 8;

export default function TradesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("all");
  const [selectedSymbol, setSelectedSymbol] = useState("All Symbols");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  // Filter trades
  const filteredTrades = mockTrades.filter((trade) => {
    const matchesSearch =
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChallenge =
      selectedChallenge === "all" || trade.challengeId === selectedChallenge;
    const matchesSymbol =
      selectedSymbol === "All Symbols" || trade.symbol === selectedSymbol;
    const tradeDate = new Date(trade.closeTime);
    const matchesDateFrom = !dateFrom || tradeDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || tradeDate <= new Date(dateTo + "T23:59:59");
    return (
      matchesSearch &&
      matchesChallenge &&
      matchesSymbol &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTrades.length / ITEMS_PER_PAGE);
  const paginatedTrades = filteredTrades.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Stats
  const totalTrades = filteredTrades.length;
  const winningTrades = filteredTrades.filter((t) => t.profitLoss > 0).length;
  const totalProfit = filteredTrades.reduce((sum, t) => sum + t.profitLoss, 0);
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const averageTrade =
    totalTrades > 0 ? totalProfit / totalTrades : 0;

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Symbol",
      "Type",
      "Volume",
      "Open Price",
      "Close Price",
      "P/L",
      "Pips",
      "Open Time",
      "Close Time",
      "Duration",
      "Challenge",
    ];
    const rows = filteredTrades.map((t) => [
      t.id,
      t.symbol,
      t.type,
      t.volume,
      t.openPrice,
      t.closePrice,
      t.profitLoss,
      t.pips,
      t.openTime,
      t.closeTime,
      t.duration,
      t.challengeName,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trades_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedChallenge("all");
    setSelectedSymbol("All Symbols");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Trade History</h1>
          <p className="text-foreground/60">
            Review all your trading activity across challenges
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-foreground/5 transition-colors"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Total Trades</p>
          <p className="text-2xl font-bold">{totalTrades}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Win Rate</p>
          <p className="text-2xl font-bold text-green-400">
            {winRate.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-8 h-8 rounded-lg ${totalProfit >= 0 ? "bg-green-400/10" : "bg-red-400/10"} flex items-center justify-center`}
            >
              <DollarSign
                className={`w-4 h-4 ${totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}
              />
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Total P/L</p>
          <p
            className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {totalProfit >= 0 ? "+" : ""}${totalProfit.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-8 h-8 rounded-lg ${averageTrade >= 0 ? "bg-green-400/10" : "bg-red-400/10"} flex items-center justify-center`}
            >
              {averageTrade >= 0 ? (
                <TrendingUp
                  className={`w-4 h-4 ${averageTrade >= 0 ? "text-green-400" : "text-red-400"}`}
                />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>
          <p className="text-sm text-foreground/60 mb-1">Avg Trade</p>
          <p
            className={`text-2xl font-bold ${averageTrade >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {averageTrade >= 0 ? "+" : ""}${averageTrade.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-foreground/[0.02] border border-border rounded-xl p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by symbol or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Challenge Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <select
              value={selectedChallenge}
              onChange={(e) => {
                setSelectedChallenge(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-8 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer min-w-[160px]"
            >
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Symbol Filter */}
          <select
            value={selectedSymbol}
            onChange={(e) => {
              setSelectedSymbol(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer min-w-[140px]"
          >
            {symbols.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Date From */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Date To */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery ||
            selectedChallenge !== "all" ||
            selectedSymbol !== "All Symbols" ||
            dateFrom ||
            dateTo) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-foreground/[0.02] border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-foreground/60 border-b border-border bg-foreground/[0.02]">
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Volume</th>
                <th className="px-6 py-4 font-medium">Entry / Exit</th>
                <th className="px-6 py-4 font-medium">P/L</th>
                <th className="px-6 py-4 font-medium">Pips</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Challenge</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-foreground/30" />
                    </div>
                    <p className="text-foreground/60">No trades found</p>
                    <p className="text-sm text-foreground/40 mt-1">
                      Try adjusting your filters
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedTrades.map((trade) => (
                  <motion.tr
                    key={trade.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border/50 last:border-0 hover:bg-foreground/[0.02] cursor-pointer"
                    onClick={() => setSelectedTrade(trade)}
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold">{trade.symbol}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          trade.type === "buy"
                            ? "bg-green-400/20 text-green-400"
                            : "bg-red-400/20 text-red-400"
                        }`}
                      >
                        {trade.type === "buy" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">{trade.volume}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p>{trade.openPrice}</p>
                        <p className="text-foreground/60">{trade.closePrice}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${trade.profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {trade.profitLoss >= 0 ? "+" : ""}$
                        {trade.profitLoss.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          trade.pips >= 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {trade.pips >= 0 ? "+" : ""}
                        {trade.pips}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p>
                          {new Date(trade.closeTime).toLocaleDateString()}
                        </p>
                        <p className="text-foreground/60">{trade.duration}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">
                      {trade.challengeName}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-foreground/60">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredTrades.length)} of{" "}
              {filteredTrades.length} trades
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trade Detail Modal */}
      <AnimatePresence>
        {selectedTrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedTrade(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold">{selectedTrade.symbol}</h2>
                  <p className="text-sm text-foreground/60">
                    Trade ID: {selectedTrade.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTrade(null)}
                  className="w-8 h-8 rounded-lg hover:bg-foreground/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Type and P/L */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full ${
                      selectedTrade.type === "buy"
                        ? "bg-green-400/20 text-green-400"
                        : "bg-red-400/20 text-red-400"
                    }`}
                  >
                    {selectedTrade.type === "buy" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {selectedTrade.type.toUpperCase()}
                  </span>
                  <span
                    className={`text-2xl font-bold ${selectedTrade.profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {selectedTrade.profitLoss >= 0 ? "+" : ""}$
                    {selectedTrade.profitLoss.toLocaleString()}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-foreground/[0.02] rounded-lg p-4">
                    <p className="text-sm text-foreground/60 mb-1">Volume</p>
                    <p className="font-semibold">{selectedTrade.volume} lots</p>
                  </div>
                  <div className="bg-foreground/[0.02] rounded-lg p-4">
                    <p className="text-sm text-foreground/60 mb-1">Pips</p>
                    <p
                      className={`font-semibold ${selectedTrade.pips >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {selectedTrade.pips >= 0 ? "+" : ""}
                      {selectedTrade.pips}
                    </p>
                  </div>
                  <div className="bg-foreground/[0.02] rounded-lg p-4">
                    <p className="text-sm text-foreground/60 mb-1">Entry Price</p>
                    <p className="font-semibold">{selectedTrade.openPrice}</p>
                  </div>
                  <div className="bg-foreground/[0.02] rounded-lg p-4">
                    <p className="text-sm text-foreground/60 mb-1">Exit Price</p>
                    <p className="font-semibold">{selectedTrade.closePrice}</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="bg-foreground/[0.02] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-foreground/60" />
                    <span className="font-medium">Trade Duration</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground/60 mb-1">Opened</p>
                      <p className="font-medium">
                        {new Date(selectedTrade.openTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground/60 mb-1">Closed</p>
                      <p className="font-medium">
                        {new Date(selectedTrade.closeTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-foreground/60 text-sm">
                      Duration: <span className="font-medium text-foreground">{selectedTrade.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="flex items-center justify-between text-sm bg-foreground/[0.02] rounded-lg p-4">
                  <span className="text-foreground/60">Challenge</span>
                  <span className="font-medium">{selectedTrade.challengeName}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
