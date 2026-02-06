"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Trophy,
  Clock,
  AlertTriangle,
  ChevronRight,
  Calendar,
  DollarSign,
} from "lucide-react";

type ChallengeStatus = "active" | "passed" | "failed" | "funded";

interface Challenge {
  id: string;
  name: string;
  type: "2-step" | "1-step" | "instant";
  phase: number;
  accountSize: number;
  balance: number;
  profitTarget: number;
  currentProfit: number;
  maxDrawdown: number;
  currentDrawdown: number;
  tradingDays: number;
  minTradingDays: number;
  status: ChallengeStatus;
  startDate: string;
  endDate?: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "ch-001",
    name: "$25K Challenge",
    type: "2-step",
    phase: 1,
    accountSize: 25000,
    balance: 26450,
    profitTarget: 2000,
    currentProfit: 1450,
    maxDrawdown: 2500,
    currentDrawdown: 600,
    tradingDays: 8,
    minTradingDays: 5,
    status: "active",
    startDate: "2026-01-15",
  },
  {
    id: "ch-002",
    name: "$50K Funded",
    type: "2-step",
    phase: 3,
    accountSize: 50000,
    balance: 54230,
    profitTarget: 0,
    currentProfit: 4230,
    maxDrawdown: 5000,
    currentDrawdown: 0,
    tradingDays: 22,
    minTradingDays: 0,
    status: "funded",
    startDate: "2025-12-01",
  },
  {
    id: "ch-003",
    name: "$10K Instant",
    type: "instant",
    phase: 1,
    accountSize: 10000,
    balance: 8500,
    profitTarget: 1000,
    currentProfit: -1500,
    maxDrawdown: 1000,
    currentDrawdown: 1500,
    tradingDays: 3,
    minTradingDays: 0,
    status: "failed",
    startDate: "2026-01-20",
    endDate: "2026-01-23",
  },
  {
    id: "ch-004",
    name: "$100K Challenge",
    type: "1-step",
    phase: 1,
    accountSize: 100000,
    balance: 110500,
    profitTarget: 10000,
    currentProfit: 10500,
    maxDrawdown: 10000,
    currentDrawdown: 0,
    tradingDays: 12,
    minTradingDays: 5,
    status: "passed",
    startDate: "2025-11-10",
    endDate: "2025-11-22",
  },
];

const statusConfig: Record<
  ChallengeStatus,
  { label: string; color: string; bgColor: string; icon: typeof Trophy }
> = {
  active: {
    label: "Active",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    icon: Clock,
  },
  passed: {
    label: "Passed",
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    icon: Trophy,
  },
  failed: {
    label: "Failed",
    color: "text-red-400",
    bgColor: "bg-red-400/20",
    icon: AlertTriangle,
  },
  funded: {
    label: "Funded",
    color: "text-amber-400",
    bgColor: "bg-amber-400/20",
    icon: DollarSign,
  },
};

const filterOptions: { value: ChallengeStatus | "all"; label: string }[] = [
  { value: "all", label: "All Challenges" },
  { value: "active", label: "Active" },
  { value: "funded", label: "Funded" },
  { value: "passed", label: "Passed" },
  { value: "failed", label: "Failed" },
];

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ChallengeStatus | "all">(
    "all"
  );

  const filteredChallenges = mockChallenges.filter((challenge) => {
    const matchesSearch = challenge.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || challenge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockChallenges.length,
    active: mockChallenges.filter((c) => c.status === "active").length,
    funded: mockChallenges.filter((c) => c.status === "funded").length,
    passed: mockChallenges.filter((c) => c.status === "passed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">My Challenges</h1>
          <p className="text-foreground/60">
            Track and manage your trading challenges
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Start New Challenge
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <p className="text-sm text-foreground/60 mb-1">Total Challenges</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <p className="text-sm text-foreground/60 mb-1">Active</p>
          <p className="text-2xl font-bold text-blue-400">{stats.active}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <p className="text-sm text-foreground/60 mb-1">Funded</p>
          <p className="text-2xl font-bold text-amber-400">{stats.funded}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-foreground/[0.02] border border-border rounded-xl"
        >
          <p className="text-sm text-foreground/60 mb-1">Pass Rate</p>
          <p className="text-2xl font-bold text-green-400">
            {stats.total > 0
              ? Math.round(
                  ((stats.passed + stats.funded) / stats.total) * 100
                )
              : 0}
            %
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-2.5 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ChallengeStatus | "all")
            }
            className="pl-10 pr-8 py-2.5 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12 bg-foreground/[0.02] border border-border rounded-xl">
            <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-foreground/30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No challenges found</h3>
            <p className="text-foreground/60 mb-4">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Start your first challenge today"}
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Get Started
            </Link>
          </div>
        ) : (
          filteredChallenges.map((challenge, index) => {
            const status = statusConfig[challenge.status];
            const StatusIcon = status.icon;
            const profitPercent =
              challenge.profitTarget > 0
                ? (challenge.currentProfit / challenge.profitTarget) * 100
                : 0;
            const drawdownPercent =
              (challenge.currentDrawdown / challenge.maxDrawdown) * 100;

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/dashboard/challenges/${challenge.id}`}
                  className="block p-5 bg-foreground/[0.02] border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Challenge Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {challenge.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bgColor} ${status.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        {challenge.type !== "instant" && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-foreground/10 text-foreground/60">
                            Phase {challenge.phase}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />$
                          {challenge.accountSize.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Started{" "}
                          {new Date(challenge.startDate).toLocaleDateString()}
                        </span>
                        <span className="capitalize">{challenge.type}</span>
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex items-center gap-6">
                      {/* Balance */}
                      <div className="text-right">
                        <p className="text-sm text-foreground/60">Balance</p>
                        <p
                          className={`text-lg font-bold ${challenge.currentProfit >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          ${challenge.balance.toLocaleString()}
                        </p>
                      </div>

                      {/* Profit Progress */}
                      {challenge.status === "active" &&
                        challenge.profitTarget > 0 && (
                          <div className="w-32">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-foreground/60">Target</span>
                              <span className="text-green-400">
                                {Math.round(profitPercent)}%
                              </span>
                            </div>
                            <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-400 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(profitPercent, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}

                      {/* Drawdown */}
                      {challenge.status === "active" && (
                        <div className="w-32">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Drawdown</span>
                            <span
                              className={
                                drawdownPercent > 70
                                  ? "text-red-400"
                                  : drawdownPercent > 50
                                    ? "text-amber-400"
                                    : "text-green-400"
                              }
                            >
                              {challenge.currentDrawdown.toFixed(0)}% used
                            </span>
                          </div>
                          <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                drawdownPercent > 70
                                  ? "bg-red-400"
                                  : drawdownPercent > 50
                                    ? "bg-amber-400"
                                    : "bg-green-400"
                              }`}
                              style={{
                                width: `${Math.min(drawdownPercent, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
