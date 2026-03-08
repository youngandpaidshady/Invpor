import { DollarSign, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { EquityChart, StatsCard, RulesProgress, TradeTable } from "@/components/widgets";
import {
  fetchDashboardStats,
  fetchTradingRules,
  fetchRecentTrades,
  fetchEquityCurve,
  fetchActiveChallenge,
} from "@/lib/services/server";
import { createClient } from "@/lib/supabase/server";
import { DashboardActions } from "./_components/dashboard-actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [stats, rules, recentTrades, equityCurve, activeChallenge] =
    await Promise.all([
      fetchDashboardStats(),
      fetchTradingRules(),
      fetchRecentTrades(5),
      fetchEquityCurve("1M"),
      fetchActiveChallenge(),
    ]);

  // Derive display values from real data
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Trader";

  const phaseName = activeChallenge
    ? `Phase ${activeChallenge.phase} — ${activeChallenge.type} Challenge`
    : "No Active Challenge";

  const isFunded = activeChallenge?.status === "funded";

  const accountSize = activeChallenge?.account_size ?? 0;
  const balanceChange = stats.accountBalance - accountSize;
  const balanceChangePercent =
    accountSize > 0 ? ((balanceChange / accountSize) * 100).toFixed(1) : "0.0";

  const profitTargetLabel = activeChallenge
    ? `${activeChallenge.profit_target}.0%`
    : "—";

  const maxDrawdownLabel = `${stats.maxDrawdownUsed.toFixed(1)}%`;
  const maxDrawdownRemaining = `${stats.maxDrawdownRemaining.toFixed(1)}% remaining`;

  // Build stat cards from real fetched data
  const statsCards = [
    {
      label: "Account Balance",
      value: `$${stats.accountBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: `${balanceChange >= 0 ? "+" : ""}$${balanceChange.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      changePercent: `${balanceChange >= 0 ? "+" : ""}${balanceChangePercent}%`,
      positive: balanceChange >= 0,
      icon: <DollarSign className="w-5 h-5" />,
      gradient: "from-[rgba(34,197,94,0.3)] to-transparent",
      iconColor: "text-[#22C55E]",
    },
    {
      label: "Daily P&L",
      value: `${stats.dailyPnL >= 0 ? "+" : ""}$${stats.dailyPnL.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: "Today",
      changePercent: `${stats.dailyPnLPercent >= 0 ? "+" : ""}${stats.dailyPnLPercent}%`,
      positive: stats.dailyPnL >= 0,
      icon: <TrendingUp className="w-5 h-5" />,
      gradient:
        stats.dailyPnL >= 0
          ? "from-[rgba(199,162,87,0.3)] to-transparent"
          : "from-[#EF4444]/20 to-transparent",
      iconColor: stats.dailyPnL >= 0 ? "text-[#C7A257]" : "text-[#EF4444]",
    },
    {
      label: "Profit Target",
      value: profitTargetLabel,
      change: `$${stats.profitTargetRemaining.toLocaleString("en-US", { minimumFractionDigits: 2 })} to go`,
      changePercent: `${stats.profitTargetPercent}% reached`,
      positive: true,
      icon: <Target className="w-5 h-5" />,
      gradient: "from-[rgba(168,132,63,0.3)] to-transparent",
      iconColor: "text-[#A8843F]",
    },
    {
      label: "Max Drawdown",
      value: maxDrawdownLabel,
      change: maxDrawdownRemaining,
      changePercent: "",
      positive: stats.maxDrawdownUsed < 80,
      icon: <AlertTriangle className="w-5 h-5" />,
      gradient: "from-[#EF4444]/20 to-transparent",
      iconColor: "text-[#EF4444]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-display tracking-widest text-white mb-3 uppercase">
            Welcome back,{" "}
            <span className="text-[#C7A257] drop-shadow-[0_0_15px_rgba(199,162,87,0.4)]">{firstName}</span>
          </h1>
          <p className="text-[13px] text-[#A0A0A0] font-mono tracking-wide uppercase">
            Current Phase:{" "}
            <span className="text-white font-medium">{phaseName}</span>
          </p>
        </div>
        <DashboardActions isFunded={isFunded} />
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
