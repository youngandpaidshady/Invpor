// ===========================================
// Mock Data Generators
// ===========================================

import type { Trade, Challenge, Payout } from "@/lib/types";

// Trading pairs
const FOREX_PAIRS = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "EUR/GBP"];
const CRYPTO_PAIRS = ["BTC/USD", "ETH/USD", "XAU/USD"];
const ALL_PAIRS = [...FOREX_PAIRS, ...CRYPTO_PAIRS];

/**
 * Generate a random number between min and max
 */
function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Generate random trade data
 */
export function generateTrades(count: number, challengeId: string = "ch_demo"): Trade[] {
    const trades: Trade[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const isProfit = Math.random() > 0.4; // 60% win rate
        const profitLoss = isProfit
            ? randomBetween(50, 800)
            : -randomBetween(30, 400);

        const openedAt = new Date(now.getTime() - i * 3600000 * randomBetween(1, 8));
        const closedAt = new Date(openedAt.getTime() + randomBetween(300000, 7200000));

        trades.push({
            id: `trade_${i + 1}`,
            challenge_id: challengeId,
            symbol: ALL_PAIRS[Math.floor(Math.random() * ALL_PAIRS.length)],
            type: Math.random() > 0.5 ? "buy" : "sell",
            lot_size: parseFloat((randomBetween(0.1, 2.0)).toFixed(2)),
            entry_price: parseFloat((randomBetween(1.0, 2000)).toFixed(5)),
            exit_price: parseFloat((randomBetween(1.0, 2000)).toFixed(5)),
            profit_loss: parseFloat(profitLoss.toFixed(2)),
            status: "closed",
            opened_at: openedAt.toISOString(),
            closed_at: closedAt.toISOString(),
        });
    }

    return trades;
}

/**
 * Equity curve point for charting
 */
export interface EquityPoint {
    date: string;
    balance: number;
    profit: number;
}

/**
 * Generate equity curve data for charting
 */
export function generateEquityCurve(days: number, startBalance: number = 25000): EquityPoint[] {
    const points: EquityPoint[] = [];
    let balance = startBalance;
    const now = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 86400000);

        // Random daily change between -2% and +3%
        const dailyChange = balance * randomBetween(-0.02, 0.03);
        balance += dailyChange;

        // Don't go below 80% of start (simulate drawdown limit)
        balance = Math.max(balance, startBalance * 0.8);

        points.push({
            date: date.toISOString().split("T")[0],
            balance: parseFloat(balance.toFixed(2)),
            profit: parseFloat((balance - startBalance).toFixed(2)),
        });
    }

    return points;
}

/**
 * Dashboard stats interface
 */
export interface DashboardStats {
    accountBalance: number;
    dailyPnL: number;
    dailyPnLPercent: number;
    profitTargetPercent: number;
    profitTargetRemaining: number;
    maxDrawdownUsed: number;
    maxDrawdownRemaining: number;
    tradingDays: number;
    winRate: number;
    totalTrades: number;
}

/**
 * Generate dashboard statistics
 */
export function generateDashboardStats(startBalance: number = 25000): DashboardStats {
    const currentBalance = startBalance + randomBetween(500, 2500);
    const dailyPnL = randomBetween(-300, 600);
    const profitTarget = startBalance * 0.08; // 8% target
    const currentProfit = currentBalance - startBalance;
    const maxDrawdown = startBalance * 0.10; // 10% max DD
    const usedDrawdown = randomBetween(0, maxDrawdown * 0.4);

    return {
        accountBalance: parseFloat(currentBalance.toFixed(2)),
        dailyPnL: parseFloat(dailyPnL.toFixed(2)),
        dailyPnLPercent: parseFloat(((dailyPnL / startBalance) * 100).toFixed(2)),
        profitTargetPercent: Math.min(100, parseFloat(((currentProfit / profitTarget) * 100).toFixed(0))),
        profitTargetRemaining: parseFloat((profitTarget - currentProfit).toFixed(2)),
        maxDrawdownUsed: parseFloat(((usedDrawdown / maxDrawdown) * 100).toFixed(1)),
        maxDrawdownRemaining: parseFloat(((maxDrawdown - usedDrawdown) / startBalance * 100).toFixed(1)),
        tradingDays: Math.floor(randomBetween(5, 20)),
        winRate: parseFloat(randomBetween(55, 72).toFixed(1)),
        totalTrades: Math.floor(randomBetween(25, 100)),
    };
}

/**
 * Generate mock challenge data
 */
export function generateChallenge(userId: string = "user_demo"): Challenge {
    const accountSize = 25000;
    const startBalance = accountSize;
    const currentBalance = startBalance + randomBetween(500, 2000);

    return {
        id: "ch_demo_001",
        user_id: userId,
        type: "2-step",
        account_size: accountSize,
        status: "active",
        phase: 1,
        start_balance: startBalance,
        current_balance: parseFloat(currentBalance.toFixed(2)),
        profit_target: 8,
        max_drawdown: 10,
        daily_drawdown: 5,
        trading_days: Math.floor(randomBetween(5, 15)),
        min_trading_days: 5,
        created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
        updated_at: new Date().toISOString(),
    };
}

/**
 * Generate mock payout history
 */
export function generatePayouts(count: number, userId: string = "user_demo"): Payout[] {
    const payouts: Payout[] = [];
    const statuses: Payout["status"][] = ["completed", "completed", "completed", "processing", "pending"];

    for (let i = 0; i < count; i++) {
        const requestedAt = new Date(Date.now() - i * 86400000 * randomBetween(7, 30));
        const status = statuses[Math.min(i, statuses.length - 1)];

        payouts.push({
            id: `payout_${i + 1}`,
            user_id: userId,
            challenge_id: "ch_demo_001",
            amount: parseFloat((randomBetween(500, 5000)).toFixed(2)),
            method: Math.random() > 0.5 ? "bank" : "crypto",
            status,
            requested_at: requestedAt.toISOString(),
            processed_at: status === "completed"
                ? new Date(requestedAt.getTime() + 86400000 * 2).toISOString()
                : undefined,
        });
    }

    return payouts;
}

/**
 * Trading rule status
 */
export interface TradingRule {
    name: string;
    status: "safe" | "warning" | "danger" | "progress";
    currentValue: string;
    limit: string;
    percentage: number;
}

/**
 * Generate trading rules progress
 */
export function generateTradingRules(): TradingRule[] {
    return [
        {
            name: "Daily Drawdown",
            status: "safe",
            currentValue: "2.1%",
            limit: "5%",
            percentage: 42,
        },
        {
            name: "Max Drawdown",
            status: "safe",
            currentValue: "3.8%",
            limit: "10%",
            percentage: 38,
        },
        {
            name: "Profit Target",
            status: "progress",
            currentValue: "72%",
            limit: "100%",
            percentage: 72,
        },
        {
            name: "Min Trading Days",
            status: "safe",
            currentValue: "8",
            limit: "5",
            percentage: 100,
        },
    ];
}
