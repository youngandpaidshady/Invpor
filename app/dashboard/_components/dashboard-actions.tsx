"use client";

import { Calendar } from "lucide-react";

interface DashboardActionsProps {
    isFunded: boolean;
}

export function DashboardActions({ isFunded }: DashboardActionsProps) {
    return (
        <div className="flex gap-3">
            <button
                type="button"
                onClick={() => {
                    // TODO: Wire up date-range filtering
                }}
                className="px-5 py-2.5 bg-background border border-border font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
                <Calendar className="w-4 h-4" />
                <span>Today</span>
            </button>
            <button
                type="button"
                disabled={!isFunded}
                onClick={() => {
                    if (isFunded) {
                        window.location.href = "/dashboard/payouts";
                    }
                }}
                className={`px-5 py-2.5 font-semibold transition-all ${isFunded
                        ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
            >
                Request Payout
            </button>
        </div>
    );
}
