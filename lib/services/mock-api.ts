// ===========================================
// Mock API Service Layer
// ===========================================

import type { Trade, Payout, PaginatedResponse } from "@/lib/types";
import {
    generateTrades,
    generateEquityCurve,
    generateDashboardStats,
    generateChallenge,
    generatePayouts,
    generateTradingRules,
    type EquityPoint,
    type DashboardStats,
    type TradingRule,
} from "./mock-data";

/**
 * Simulate API delay
 */
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Random delay between min and max ms
 */
function randomDelay(min: number = 200, max: number = 500): Promise<void> {
    return delay(Math.random() * (max - min) + min);
}

// ===========================================
// Dashboard APIs
// ===========================================

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
    await randomDelay();
    return generateDashboardStats();
}

/**
 * Fetch trading rules/objectives progress
 */
export async function fetchTradingRules(): Promise<TradingRule[]> {
    await randomDelay();
    return generateTradingRules();
}

/**
 * Fetch active challenge
 */
export async function fetchActiveChallenge() {
    await randomDelay();
    return generateChallenge();
}

// ===========================================
// Equity Chart APIs
// ===========================================

export type ChartPeriod = "1W" | "1M" | "3M" | "ALL";

const PERIOD_DAYS: Record<ChartPeriod, number> = {
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "ALL": 365,
};

/**
 * Fetch equity curve data for charting
 */
export async function fetchEquityCurve(period: ChartPeriod = "1M"): Promise<EquityPoint[]> {
    await randomDelay(300, 600);
    return generateEquityCurve(PERIOD_DAYS[period]);
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
    await randomDelay(250, 450);

    const { page = 1, limit = 20, sortBy = "date", sortOrder = "desc" } = options;

    // Generate more trades than needed for pagination simulation
    const allTrades = generateTrades(100);

    // Sort trades
    const sortedTrades = [...allTrades].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case "date":
                comparison = new Date(a.closed_at || a.opened_at).getTime() -
                    new Date(b.closed_at || b.opened_at).getTime();
                break;
            case "profit":
                comparison = (a.profit_loss || 0) - (b.profit_loss || 0);
                break;
            case "symbol":
                comparison = a.symbol.localeCompare(b.symbol);
                break;
        }
        return sortOrder === "asc" ? comparison : -comparison;
    });

    // Paginate
    const start = (page - 1) * limit;
    const paginatedTrades = sortedTrades.slice(start, start + limit);

    return {
        success: true,
        data: paginatedTrades,
        total: allTrades.length,
        page,
        limit,
        has_more: start + limit < allTrades.length,
    };
}

/**
 * Fetch recent trades (for dashboard widget)
 */
export async function fetchRecentTrades(count: number = 5): Promise<Trade[]> {
    await randomDelay();
    return generateTrades(count);
}

// ===========================================
// Payout APIs
// ===========================================

/**
 * Fetch payout history
 */
export async function fetchPayoutHistory(): Promise<Payout[]> {
    await randomDelay();
    return generatePayouts(5);
}

export interface PayoutRequest {
    amount: number;
    method: "bank" | "crypto";
}

/**
 * Request a new payout
 */
export async function requestPayout(data: PayoutRequest): Promise<{ success: boolean; message: string }> {
    await delay(1000); // Simulate longer processing

    // Simulate validation
    if (data.amount < 100) {
        return { success: false, message: "Minimum payout amount is $100" };
    }

    if (data.amount > 10000) {
        return { success: false, message: "Maximum single payout is $10,000" };
    }

    return {
        success: true,
        message: "Payout request submitted successfully. Processing within 24 hours."
    };
}

// ===========================================
// KYC APIs
// ===========================================

export type KYCStatus = "not_started" | "pending" | "in_review" | "approved" | "rejected";

export interface KYCState {
    status: KYCStatus;
    currentStep: number;
    totalSteps: number;
    submittedAt?: string;
    reviewedAt?: string;
}

/**
 * Fetch KYC status
 */
export async function fetchKYCStatus(): Promise<KYCState> {
    await randomDelay();
    return {
        status: "not_started",
        currentStep: 1,
        totalSteps: 3,
    };
}

export interface KYCSubmission {
    idType: "passport" | "drivers_license" | "national_id";
    idNumber: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}

/**
 * Submit KYC documents
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function submitKYC(data: KYCSubmission): Promise<{ success: boolean; message: string }> {
    await delay(1500); // Simulate upload time

    return {
        success: true,
        message: "KYC documents submitted. Verification typically takes 1-2 business days.",
    };
}
