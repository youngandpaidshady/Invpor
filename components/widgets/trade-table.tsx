"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DataTable, type Column } from "@/components/ui/data-table";
// import { fetchRecentTrades } from "@/lib/services/mock-api";
import type { Trade } from "@/lib/types";

interface TradeTableProps {
    limit?: number;
    showViewAll?: boolean;
    className?: string;
    initialTrades?: Trade[];
}

/**
 * Trade history table widget
 */
export function TradeTable({
    limit = 5,
    showViewAll = true,
    className = "",
    initialTrades = [],
}: TradeTableProps) {
    const [trades] = useState<Trade[]>(initialTrades);
    const [loading, setLoading] = useState(initialTrades.length === 0);

    useEffect(() => {
        if (initialTrades.length > 0) return;

        const loadTrades = async () => {
            setLoading(true);
            try {
                // Determine which fetch function to use. 
                // Since this is a client component, we should probably pass the fetcher or use a server action.
                // For now, if no initialTrades, we might not be able to fetch if mock-api is gone.
                // But let's assume we want to keep it working for other pages if they don't pass data.
                // We'll leave the import from mock-api (which we plan to refactor or aliased).

                // Ideally, we shouldn't fetch here if we are moving to server data passing.
                // But to be safe:
                // const data = await fetchRecentTrades(limit);
                // setTrades(data);
                console.warn("TradeTable: No initialTrades provided and client-side fetching is deprecated.");
            } catch (error) {
                console.error("Failed to load trades:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTrades();
    }, [limit, initialTrades.length]);

    const columns: Column<Trade>[] = [
        {
            key: "symbol",
            header: "Pair",
            sortable: true,
            render: (trade) => (
                <span className="font-mono text-[13px] tracking-wide text-white">{trade.symbol}</span>
            ),
        },
        {
            key: "type",
            header: "Type",
            sortable: true,
            render: (trade) => (
                <span
                    className={`text-[10px] px-2.5 py-1 font-mono uppercase tracking-widest rounded ${trade.type === "buy"
                        ? "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30"
                        : "bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30"
                        }`}
                >
                    {trade.type.toUpperCase()}
                </span>
            ),
        },
        {
            key: "lot_size",
            header: "Lots",
            sortable: true,
            render: (trade) => (
                <span className="font-mono text-[13px] text-[#A0A0A0]">{trade.lot_size}</span>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (trade) => (
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/50">
                    {trade.status}
                </span>
            ),
        },
        {
            key: "profit_loss",
            header: "P/L",
            sortable: true,
            render: (trade) => {
                const pnl = trade.profit_loss || 0;
                return (
                    <span
                        className={`font-mono text-[13px] ${pnl >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"
                            }`}
                    >
                        {pnl >= 0 ? "+" : ""}${Math.abs(pnl).toFixed(2)}
                    </span>
                );
            },
        },
        {
            key: "closed_at",
            header: "Time",
            sortable: true,
            className: "text-right",
            render: (trade) => (
                <span className="text-[12px] font-mono text-[#A0A0A0]">
                    {trade.closed_at
                        ? format(new Date(trade.closed_at), "MMM d, HH:mm")
                        : "Open"}
                </span>
            ),
        },
    ];

    return (
        <div className={`p-6 lg:p-8 bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] ${className}`}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#C7A257] uppercase">Recent Trades</h2>
                {showViewAll && (
                    <a
                        href="/dashboard/trades"
                        className="text-[10px] font-mono tracking-widest uppercase text-[#A0A0A0] hover:text-[#C7A257] transition-colors"
                    >
                        View All History
                    </a>
                )}
            </div>

            <DataTable
                data={trades}
                columns={columns}
                loading={loading}
                pageSize={limit}
                emptyMessage="No trades yet"
                className="border-0"
            />
        </div>
    );
}
