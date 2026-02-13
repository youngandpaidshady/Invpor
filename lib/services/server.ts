"use server";

import { createClient } from "@/lib/supabase/server";
import {
    Trade,
    Payout,
    PaginatedResponse,
    DashboardStats,
    TradingRule,
    EquityPoint,
    Challenge
} from "@/lib/types";

// Helper to simulate delay is NOT needed in real app, but we might want some error handling

// ===========================================
// Dashboard APIs
// ===========================================

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Get active challenge
    const { data: challenge } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

    if (!challenge) {
        // Return empty/default stats if no active challenge
        return {
            accountBalance: 0,
            dailyPnL: 0,
            dailyPnLPercent: 0,
            profitTargetPercent: 0,
            profitTargetRemaining: 0,
            maxDrawdownUsed: 0,
            maxDrawdownRemaining: 100,
            tradingDays: 0,
            winRate: 0,
            totalTrades: 0,
        };
    }

    // Calculate stats based on challenge data
    const startBalance = challenge.start_balance;
    const currentBalance = challenge.current_balance;
    const profitTarget = startBalance * (challenge.profit_target / 100);
    const currentProfit = currentBalance - startBalance;

    // Calculate daily PnL (simplified: fetch trades for today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: todayTrades } = await supabase
        .from("trades")
        .select("profit_loss")
        .eq("challenge_id", challenge.id)
        .gte("closed_at", today.toISOString());

    const dailyPnL = todayTrades?.reduce((acc, t) => acc + (t.profit_loss || 0), 0) || 0;
    const dailyPnLPercent = (dailyPnL / startBalance) * 100;

    // Calculate Win Rate & Total Trades
    const { count, data: trades } = await supabase
        .from("trades")
        .select("profit_loss", { count: "exact" })
        .eq("challenge_id", challenge.id)
        .not("profit_loss", "is", null);

    const totalTrades = count || 0;
    const winningTrades = trades?.filter(t => (t.profit_loss || 0) > 0).length || 0;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    // Drawdown calculations
    const maxDrawdownAmount = startBalance * (challenge.max_drawdown / 100);
    const currentDrawdown = challenge.current_drawdown || 0; // Assuming this is updated by a backend process or trigger
    const maxDrawdownUsed = (currentDrawdown / maxDrawdownAmount) * 100;

    return {
        accountBalance: currentBalance,
        dailyPnL: dailyPnL,
        dailyPnLPercent: parseFloat(dailyPnLPercent.toFixed(2)),
        profitTargetPercent: Math.min(100, parseFloat(((currentProfit / profitTarget) * 100).toFixed(0))),
        profitTargetRemaining: Math.max(0, profitTarget - currentProfit),
        maxDrawdownUsed: parseFloat(maxDrawdownUsed.toFixed(1)),
        maxDrawdownRemaining: parseFloat((100 - maxDrawdownUsed).toFixed(1)),
        tradingDays: challenge.trading_days || 0,
        winRate: parseFloat(winRate.toFixed(1)),
        totalTrades: totalTrades,
    };
}

/**
 * Fetch trading rules/objectives progress
 */
export async function fetchTradingRules(): Promise<TradingRule[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: challenge } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

    if (!challenge) return [];

    const startBalance = challenge.start_balance;
    const currentBalance = challenge.current_balance;
    const maxDrawdownLimit = challenge.max_drawdown; // e.g. 10%
    const dailyDrawdownLimit = challenge.daily_drawdown; // e.g. 5%

    // Calculate current percentages
    // Note: These should ideally be calculated from reliable backend sources or recent trades
    const currentDrawdownPercent = (challenge.current_drawdown / startBalance) * 100;
    const currentDailyDrawdownPercent = (challenge.current_daily_drawdown / startBalance) * 100;

    const profitTargetPercent = (challenge.profit_target);
    const currentProfitPercent = ((currentBalance - startBalance) / startBalance) * 100;

    return [
        {
            name: "Daily Drawdown",
            status: currentDailyDrawdownPercent >= dailyDrawdownLimit ? "danger" : "safe",
            currentValue: `${currentDailyDrawdownPercent.toFixed(2)}%`,
            limit: `${dailyDrawdownLimit}%`,
            percentage: (currentDailyDrawdownPercent / dailyDrawdownLimit) * 100,
        },
        {
            name: "Max Drawdown",
            status: currentDrawdownPercent >= maxDrawdownLimit ? "danger" : "safe",
            currentValue: `${currentDrawdownPercent.toFixed(2)}%`,
            limit: `${maxDrawdownLimit}%`,
            percentage: (currentDrawdownPercent / maxDrawdownLimit) * 100,
        },
        {
            name: "Profit Target",
            status: "progress",
            currentValue: `${currentProfitPercent.toFixed(2)}%`,
            limit: `${profitTargetPercent}%`,
            percentage: (currentProfitPercent / profitTargetPercent) * 100,
        },
        {
            name: "Min Trading Days",
            status: (challenge.trading_days || 0) >= (challenge.min_trading_days || 0) ? "safe" : "progress",
            currentValue: `${challenge.trading_days}`,
            limit: `${challenge.min_trading_days}`,
            percentage: Math.min(100, ((challenge.trading_days || 0) / (challenge.min_trading_days || 1)) * 100),
        },
    ];
}

/**
 * Fetch active challenge
 */
export async function fetchActiveChallenge(): Promise<Challenge | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

    return data;
}

// ===========================================
// Equity Chart APIs
// ===========================================

export type ChartPeriod = "1W" | "1M" | "3M" | "ALL";

/**
 * Fetch equity curve data for charting
 */
export async function fetchEquityCurve(period: ChartPeriod = "1M"): Promise<EquityPoint[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: challenge } = await supabase
        .from("challenges")
        .select("id, start_balance, created_at")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

    if (!challenge) return [];

    // Determine date range
    const endDate = new Date();
    const startDate = new Date();
    if (period === "1W") startDate.setDate(endDate.getDate() - 7);
    else if (period === "1M") startDate.setDate(endDate.getDate() - 30);
    else if (period === "3M") startDate.setDate(endDate.getDate() - 90);
    else startDate.setTime(new Date(challenge.created_at).getTime());

    // Fetch all closed trades within range
    const { data: trades } = await supabase
        .from("trades")
        .select("closed_at, profit_loss")
        .eq("challenge_id", challenge.id)
        .gte("closed_at", startDate.toISOString())
        .lte("closed_at", endDate.toISOString())
        .order("closed_at", { ascending: true });

    if (!trades || trades.length === 0) return [];

    // Aggregate trades by day to build equity curve
    // This is a simplified reconstruction. In production, snapshot the balance daily.
    const points: EquityPoint[] = [];

    // Create map of date -> total profit for that day
    const dailyProfits = new Map<string, number>();

    trades.forEach(trade => {
        if (!trade.closed_at) return;
        const dateStr = trade.closed_at.split('T')[0];
        const profit = trade.profit_loss || 0;
        dailyProfits.set(dateStr, (dailyProfits.get(dateStr) || 0) + profit);
    });

    // Sort dates
    const sortedDates = Array.from(dailyProfits.keys()).sort();

    // If no trades, just return start point
    if (sortedDates.length === 0) {
        return [{
            date: startDate.toISOString().split('T')[0],
            balance: challenge.start_balance,
            profit: 0
        }];
    }

    // NOTE: This assumes running balance starts at start_balance and accumulates.
    // Ideally we should know the balance at startDate.
    // For now, prompt accumulation from start of challenge if period is ALL?
    // Let's simplified: just return value points for days we have. (A real chart needs continuous data)

    let accumulatedProfit = 0;

    sortedDates.forEach(date => {
        const dayProfit = dailyProfits.get(date) || 0;
        accumulatedProfit += dayProfit;
        points.push({
            date,
            balance: challenge.start_balance + accumulatedProfit,
            profit: accumulatedProfit
        });
    });

    return points;
}

// ===========================================
// Trade History APIs
// ===========================================

export interface TradeHistoryOptions {
    page?: number;
    limit?: number;
    sortBy?: "date" | "profit" | "symbol";
    sortOrder?: "asc" | "desc";
}

/**
 * Fetch paginated trade history
 */
export async function fetchTradeHistory(
    options: TradeHistoryOptions = {}
): Promise<PaginatedResponse<Trade>> {
    const { page = 1, limit = 20, sortBy = "date", sortOrder = "desc" } = options;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, data: [], total: 0, page, limit, has_more: false };
    }

    // Get active challenge ID
    const { data: challenge } = await supabase
        .from("challenges")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

    if (!challenge) {
        return { success: true, data: [], total: 0, page, limit, has_more: false };
    }

    let query = supabase
        .from("trades")
        .select("*", { count: "exact" })
        .eq("challenge_id", challenge.id);

    // Sorting
    if (sortBy === "date") query = query.order("closed_at", { ascending: sortOrder === "asc" });
    else if (sortBy === "profit") query = query.order("profit_loss", { ascending: sortOrder === "asc" });
    else if (sortBy === "symbol") query = query.order("symbol", { ascending: sortOrder === "asc" });

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
        console.error("Error fetching trades:", error);
        return { success: false, data: [], total: 0, page, limit, has_more: false };
    }

    return {
        success: true,
        data: data as Trade[],
        total: count || 0,
        page,
        limit,
        has_more: (count || 0) > to + 1,
    };
}

/**
 * Fetch recent trades (for dashboard widget)
 */
export async function fetchRecentTrades(count: number = 5): Promise<Trade[]> {
    const navData = await fetchTradeHistory({ limit: count });
    return navData.data || [];
}

// ===========================================
// Payout APIs
// ===========================================

/**
 * Fetch payout history
 */
export async function fetchPayoutHistory(): Promise<Payout[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from("payouts")
        .select("*")
        .eq("user_id", user.id)
        .order("requested_at", { ascending: false });

    return data as Payout[] || [];
}

export interface PayoutRequest {
    amount: number;
    method: "bank" | "crypto";
}

/**
 * Request a new payout
 */
export async function requestPayout(data: PayoutRequest): Promise<{ success: boolean; message: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    // Check if user has active challenge and meets criteria
    const { data: challenge } = await supabase
        .from("challenges")
        .select("id, current_balance, start_balance")
        .eq("user_id", user.id)
        .eq("status", "funded") // Only funded accounts can request payout? Or maybe "active" if it's phase 2 -> Funded?
        // Assuming 'funded' status for payout eligibility per schema
        .single();

    if (!challenge) {
        return { success: false, message: "No eligible funded account found." };
    }

    // Insert payout request
    const { error } = await supabase.from("payouts").insert({
        user_id: user.id,
        challenge_id: challenge.id,
        amount: data.amount,
        method: data.method,
        status: "pending"
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: "Payout requested successfully" };
}
