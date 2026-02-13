import { DollarSign, TrendingUp, Target, AlertTriangle, Calendar } from "lucide-react";
import { EquityChart, StatsCard, RulesProgress, TradeTable } from "@/components/widgets";
import { fetchDashboardStats, fetchTradingRules, fetchRecentTrades, fetchEquityCurve } from "@/lib/services/server";

import { MOCK_USER_STATE } from "@/lib/mock-data";

export default async function DashboardPage() {
  const [stats, rules, recentTrades, equityCurve] = await Promise.all([
    fetchDashboardStats(),
    fetchTradingRules(),
    fetchRecentTrades(5),
    fetchEquityCurve("1M")
  ]);

  // Build stats cards from fetched data
  const statsCards = [
    {
      label: "Account Balance",
      value: `$${MOCK_USER_STATE.account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: `+$${(MOCK_USER_STATE.account.balance - MOCK_USER_STATE.account.accountSize).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      changePercent: `+${(((MOCK_USER_STATE.account.balance - MOCK_USER_STATE.account.accountSize) / MOCK_USER_STATE.account.accountSize) * 100).toFixed(1)}%`,
      positive: true,
      icon: <DollarSign className="w-5 h-5" />,
      gradient: "from-emerald-500/20 to-transparent",
      iconColor: "text-emerald-500",
    },
    {
      label: "Daily P&L",
      value: `${MOCK_USER_STATE.stats.dailyPnL >= 0 ? "+" : ""}$${MOCK_USER_STATE.stats.dailyPnL.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: "Today",
      changePercent: `${MOCK_USER_STATE.stats.dailyPnLPercent >= 0 ? "+" : ""}${MOCK_USER_STATE.stats.dailyPnLPercent}%`,
      positive: MOCK_USER_STATE.stats.dailyPnL >= 0,
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: MOCK_USER_STATE.stats.dailyPnL >= 0 ? "from-primary/20 to-transparent" : "from-destructive/20 to-transparent",
      iconColor: MOCK_USER_STATE.stats.dailyPnL >= 0 ? "text-primary" : "text-destructive",
    },
    {
      label: "Profit Target",
      value: "8.0%", // Hardcoded for challenge phase example
      change: "$800.00 to go",
      changePercent: "",
      positive: true,
      icon: <Target className="w-5 h-5" />,
      gradient: "from-blue-500/20 to-transparent",
      iconColor: "text-blue-500",
    },
    {
      label: "Max Drawdown",
      value: "0.0%",
      change: "10% remaining",
      changePercent: "",
      positive: true,
      icon: <AlertTriangle className="w-5 h-5" />,
      gradient: "from-amber-500/20 to-transparent",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">
            Welcome back, <span className="text-primary">{MOCK_USER_STATE.profile.name.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">
            Current Phase: <span className="text-foreground font-semibold">{MOCK_USER_STATE.account.phaseName}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-background border border-border font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </button>
          <form action={async () => {
            "use server";
            // Placeholder for server action or redirect
          }}>
            <button
              disabled={MOCK_USER_STATE.account.status !== 'funded'}
              className={`px-5 py-2.5 font-semibold transition-all ${MOCK_USER_STATE.account.status === 'funded'
                ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
            >
              Request Payout
            </button>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Chart + Rules Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Equity Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <EquityChart initialData={equityCurve} />
        </div>

        {/* Trading Rules */}
        <RulesProgress rules={rules} />
      </div>

      {/* Recent Trades */}
      <TradeTable limit={5} showViewAll initialTrades={recentTrades} />
    </div>
  );
}
