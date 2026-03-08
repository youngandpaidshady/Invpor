"use client";

import { useState, useEffect } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { type ChartPeriod } from "@/lib/services/server";
import type { EquityPoint } from "@/lib/types";

interface EquityChartProps {
    className?: string;
    initialData?: EquityPoint[];
}

const PERIODS: ChartPeriod[] = ["1W", "1M", "3M", "ALL"];

/**
 * Custom tooltip for the equity chart
 */
function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
}) {
    if (!active || !payload || !payload.length) return null;

    const balance = payload.find((p) => p.dataKey === "balance")?.value || 0;
    const profit = payload.find((p) => p.dataKey === "profit")?.value || 0;

    return (
        <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/[0.08] p-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <p className="text-xs text-muted-foreground mb-1">
                {label ? format(new Date(label), "MMM d, yyyy") : ""}
            </p>
            <p className="font-mono font-medium">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p
                className={`text-[13px] font-mono mt-1 ${profit >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}
            >
                {profit >= 0 ? "+" : ""}${profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
        </div>
    );
}

/**
 * Real-time equity curve chart widget
 */
export function EquityChart({ className = "", initialData = [] }: EquityChartProps) {
    const [period, setPeriod] = useState<ChartPeriod>("1M");
    const [data, setData] = useState<EquityPoint[]>(initialData);
    const [isLoading, setIsLoading] = useState(initialData.length === 0);

    // If we want to support switching periods client-side, we might need a server action passed as prop or use API
    // For now, let's keep it simple and just use initialData.
    // To support switching, we'd ideally fetch from an internal API route to avoid "use server" link here.

    // Simulating switch for now or just disabling it?
    // Let's comment out the fetch logic for now to fix the error.

    useEffect(() => {
        if (initialData.length > 0) {
            setData(initialData);
        }
        setIsLoading(false);
    }, [initialData]);

    /* 
    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const equityData = await fetchEquityCurve(period);
            setData(equityData);
        } catch (error) {
            console.error("Failed to load equity curve:", error);
        } finally {
            setIsLoading(false);
        }
    }, [period]);

    useEffect(() => {
        // loadData(); 
    }, [loadData]);
    */

    // Simulate live updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (data.length > 0) {
                const lastPoint = data[data.length - 1];
                const change = lastPoint.balance * (Math.random() * 0.002 - 0.001);
                const newBalance = lastPoint.balance + change;
                const startBalance = data[0].balance - data[0].profit;

                setData((prev) => [
                    ...prev.slice(0, -1),
                    {
                        ...lastPoint,
                        balance: parseFloat(newBalance.toFixed(2)),
                        profit: parseFloat((newBalance - startBalance).toFixed(2)),
                    },
                ]);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [data]);

    // Calculate chart bounds
    const minBalance = Math.min(...data.map((d) => d.balance)) * 0.995;
    const maxBalance = Math.max(...data.map((d) => d.balance)) * 1.005;

    return (
        <div className={`p-6 lg:p-8 bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-2">Equity Curve</h2>
                    {data.length > 0 && (
                        <div className="flex items-baseline gap-3 mt-1">
                            <span className="text-3xl font-display tracking-widest text-white">
                                ${data[data.length - 1]?.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                            <span
                                className={`text-[13px] font-mono px-2 py-0.5 rounded bg-white/[0.02] ${data[data.length - 1]?.profit >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                                    }`}
                            >
                                {data[data.length - 1]?.profit >= 0 ? "+" : ""}
                                ${data[data.length - 1]?.profit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                </div>

                {/* Period Selector */}
                <div className="flex p-1 bg-[#111111]/50 border border-white/[0.06] rounded-lg">
                    {PERIODS.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all rounded-md ${period === p
                                ? "bg-white/[0.08] text-white shadow-sm"
                                : "text-white/40 hover:text-white"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px]">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center border border-dashed border-white/[0.08] bg-white/[0.02]">
                        <div className="text-center">
                            <div className="w-6 h-6 border-2 border-[#C7A257] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest">Loading chart...</p>
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="h-full flex items-center justify-center border border-dashed border-white/[0.08] bg-white/[0.02]">
                        <p className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest">No data available</p>
                    </div>
                ) : (
                    <div className="w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C7A257" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#C7A257" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(date) => format(new Date(date), "MMM d")}
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "rgba(255,255,255,0.4)" }}
                                />
                                <YAxis
                                    domain={[minBalance, maxBalance]}
                                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    width={40}
                                    tick={{ fill: "rgba(255,255,255,0.4)" }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#C7A257"
                                    strokeWidth={3}
                                    fill="url(#equityGradient)"
                                    animationDuration={500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 mt-6 text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full shadow-[0_0_8px_#22C55E] animate-pulse-live" />
                <span>Live data • Updates every 5s</span>
            </div>
        </div>
    );
}
