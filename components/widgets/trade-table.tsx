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
                <span className="font-medium">{trade.symbol}</span>
            ),
        },
        {
            key: "type",
            header: "Type",
            sortable: true,
            render: (trade) => (
                <span
                    className={`text-xs px-2.5 py-1 font-medium ${trade.type === "buy"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-orange-500/10 text-orange-500"
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
                <span className="font-mono text-sm">{trade.lot_size}</span>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (trade) => (
                <span className="text-sm text-muted-foreground capitalize">
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
                        className={`font-mono font-medium ${pnl >= 0 ? "text-emerald-500" : "text-destructive"
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
                <span className="text-sm text-muted-foreground">
                    {trade.closed_at
                        ? format(new Date(trade.closed_at), "MMM d, HH:mm")
                        : "Open"}
                </span>
            ),
        },
    ];

    return (
        <div className={`p-6 lg:p-8 bg-card border border-border ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold font-serif">Recent Trades</h2>
                {showViewAll && (
                    <a
                        href="/dashboard/trades"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
