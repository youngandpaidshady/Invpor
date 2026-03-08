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
                className="px-5 py-2.5 bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-lg font-body text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-2"
            >
                <Calendar className="w-4 h-4 text-[#C7A257]" />
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
                className={`px-6 py-2.5 rounded-lg font-mono text-[12px] font-bold uppercase tracking-widest transition-all ${isFunded
                    ? "bg-gradient-to-r from-[#C7A257] to-[#B8933E] text-black hover:shadow-[0_0_20px_rgba(199,162,87,0.3)]"
                    : "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.08]"
                    }`}
            >
                Request Payout
            </button>
        </div>
    );
}
