"use client";

import { useState, useEffect } from "react";
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
import { createClient } from "@/lib/supabase/client";

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

// Convert DB trade to UI trade format
function mapApiTrade(apiTrade: {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  lot_size: number;
  entry_price: number;
  exit_price?: number;
  profit_loss?: number;
  opened_at: string;
  closed_at?: string;
  challenge_id?: string;
}): Trade {
  const openTime = new Date(apiTrade.opened_at);
  const closeTime = apiTrade.closed_at ? new Date(apiTrade.closed_at) : openTime;
  const duration = Math.floor((closeTime.getTime() - openTime.getTime()) / 60000);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;

  return {
    id: apiTrade.id,
    symbol: apiTrade.symbol,
    type: apiTrade.type,
    openPrice: apiTrade.entry_price,
    closePrice: apiTrade.exit_price || apiTrade.entry_price,
    volume: apiTrade.lot_size,
    profitLoss: apiTrade.profit_loss || 0,
    openTime: apiTrade.opened_at,
    closeTime: apiTrade.closed_at || apiTrade.opened_at,
    duration: `${hours}h ${mins}m`,
    pips: Math.round((apiTrade.profit_loss || 0) / (apiTrade.lot_size * 10)),
    challengeId: apiTrade.challenge_id || "unknown",
    challengeName: "Challenge",
  };
}

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
  const [trades, setTrades] = useState<Trade[]>([]);
  const [, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("all");
  const [selectedSymbol, setSelectedSymbol] = useState("All Symbols");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  // Load trades from Supabase
  useEffect(() => {
    const loadTrades = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from("trades")
          .select("*")
          .eq("user_id", user.id)
          .order("opened_at", { ascending: false })
          .limit(100);

        if (data) {
          setTrades(data.map(mapApiTrade));
        }
      } catch (error) {
        console.error("Failed to load trades:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTrades();
  }, []);

  // Filter trades
  const filteredTrades = trades.filter((trade: Trade) => {
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
  const winningTrades = filteredTrades.filter((t: Trade) => t.profitLoss > 0).length;
  const totalProfit = filteredTrades.reduce((sum: number, t: Trade) => sum + t.profitLoss, 0);
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
    const rows = filteredTrades.map((t: Trade) => [
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

    const csvContent = [headers.join(","), ...rows.map((r: (string | number)[]) => r.join(","))].join(
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
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${trade.type === "buy"
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
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
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
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full ${selectedTrade.type === "buy"
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
