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
    safe: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-destructive",
    progress: "bg-primary",
};

/**
 * Trading rules/objectives progress widget
 */
export function RulesProgress({ rules, className = "" }: RulesProgressProps) {
    return (
        <div className={`p-6 lg:p-8 bg-card border border-border ${className}`}>
            <h2 className="text-lg font-semibold font-serif mb-6">Trading Objectives</h2>

            <div className="space-y-6">
                {rules.map((rule, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">{rule.name}</span>
                            <span className="font-mono font-medium">
                                {rule.currentValue}{" "}
                                <span className="text-muted-foreground">/ {rule.limit}</span>
                            </span>
                        </div>
                        <div className="h-2.5 bg-muted overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${STATUS_COLORS[rule.status]}`}
                                style={{ width: `${Math.min(100, rule.percentage)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Challenge Ends</span>
                    <span className="font-medium text-foreground">Unlimited Time</span>
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
        <div className="p-6 lg:p-8 bg-card border border-border">
            <div className="h-6 bg-muted w-40 mb-6" />
            <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-4 bg-muted w-24" />
                            <div className="h-4 bg-muted w-16" />
                        </div>
                        <div className="h-2.5 bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}
