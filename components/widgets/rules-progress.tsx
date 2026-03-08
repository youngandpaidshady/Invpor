"use client";

interface TradingRule {
    name: string;
    status: "safe" | "warning" | "danger" | "progress";
    currentValue: string;
    limit: string;
    percentage: number;
}

interface RulesProgressProps {
    rules: TradingRule[];
    className?: string;
}

const STATUS_COLORS = {
    safe: "bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    warning: "bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.5)]",
    danger: "bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    progress: "bg-[#C7A257] shadow-[0_0_10px_rgba(199,162,87,0.5)]",
};

/**
 * Trading rules/objectives progress widget
 */
export function RulesProgress({ rules, className = "" }: RulesProgressProps) {
    return (
        <div className={`p-6 lg:p-8 bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] flex flex-col justify-between ${className}`}>
            <div>
                <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#C7A257] uppercase mb-8">Trading Objectives</h2>

                <div className="space-y-6">
                    {rules.map((rule, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-[13px] font-body">
                                <span className="text-white/60 font-medium">{rule.name}</span>
                                <span className="font-mono font-medium text-white">
                                    {rule.currentValue}{" "}
                                    <span className="text-white/40">/ {rule.limit}</span>
                                </span>
                            </div>
                            <div className="h-2 bg-white/[0.04] overflow-hidden rounded-full">
                                <div
                                    className={`h-full transition-all duration-1000 ${STATUS_COLORS[rule.status]}`}
                                    style={{ width: `${Math.min(100, rule.percentage)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase">
                        <span className="text-[#A0A0A0]">Challenge Ends</span>
                        <span className="font-medium text-[#C7A257]">Unlimited Time</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Rules progress skeleton for loading states
 */
export function RulesProgressSkeleton() {
    return (
        <div className="p-6 lg:p-8 bg-[#050505]/40 border border-white/[0.06] backdrop-blur-xl">
            <div className="h-6 bg-white/[0.05] w-40 mb-8 rounded" />
            <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-4 bg-white/[0.05] w-24 rounded" />
                            <div className="h-4 bg-white/[0.05] w-16 rounded" />
                        </div>
                        <div className="h-2 bg-white/[0.05] rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
