"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}

type SortOrder = "asc" | "desc" | null;

/**
 * Generic sortable, paginated data table component
 */
export function DataTable<T extends object>({
    data,
    columns,
    pageSize = 10,
    loading = false,
    emptyMessage = "No data available",
    className = "",
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Handle column sort
    const handleSort = (key: string) => {
        if (sortKey === key) {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortKey(null);
                setSortOrder(null);
            } else {
                setSortOrder("asc");
            }
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    };

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const aVal = (a as Record<string, unknown>)[sortKey];
            const bVal = (b as Record<string, unknown>)[sortKey];

            if (aVal === bVal) return 0;
            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            let comparison = 0;
            if (typeof aVal === "string" && typeof bVal === "string") {
                comparison = aVal.localeCompare(bVal);
            } else if (typeof aVal === "number" && typeof bVal === "number") {
                comparison = aVal - bVal;
            } else {
                comparison = String(aVal).localeCompare(String(bVal));
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });
    }, [data, sortKey, sortOrder]);

    // Paginate data
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    // Render sort indicator
    const renderSortIndicator = (key: string) => {
        if (sortKey !== key) {
            return <ChevronUp className="w-4 h-4 opacity-30" />;
        }
        return sortOrder === "asc" ? (
            <ChevronUp className="w-4 h-4" />
        ) : (
            <ChevronDown className="w-4 h-4" />
        );
    };

    if (loading) {
        return <DataTableSkeleton columns={columns.length} rows={pageSize} />;
    }

    if (data.length === 0) {
        return (
            <div className={`bg-card border border-border ${className}`}>
                <div className="p-12 text-center">
                    <p className="text-muted-foreground">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-card border border-border ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className={`px-4 py-4 ${col.className || ""} ${col.sortable ? "cursor-pointer hover:text-foreground transition-colors" : ""
                                        }`}
                                    onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                                >
                                    <div className="flex items-center gap-1">
                                        <span>{col.header}</span>
                                        {col.sortable && renderSortIndicator(String(col.key))}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {paginatedData.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="group hover:bg-muted/30 transition-colors"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={String(col.key)}
                                        className={`px-4 py-4 ${col.className || ""}`}
                                    >
                                        {col.render
                                            ? col.render(item)
                                            : String(item[col.key as keyof T] ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * pageSize + 1} to{" "}
                        {Math.min(currentPage * pageSize, data.length)} of {data.length} results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium px-3">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Data table skeleton for loading states
 */
function DataTableSkeleton({ columns, rows }: { columns: number; rows: number }) {
    return (
        <div className="bg-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            {Array.from({ length: columns }).map((_, i) => (
                                <th key={i} className="px-4 py-4">
                                    <div className="h-4 bg-muted w-20 animate-pulse" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-4">
                                        <div className="h-4 bg-muted w-24 animate-pulse" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
