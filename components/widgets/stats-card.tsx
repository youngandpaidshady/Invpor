"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
    label: string;
    value: string;
    change?: string;
    changePercent?: string;
    positive?: boolean;
    icon: React.ReactNode;
    gradient: string;
    iconColor: string;
    index?: number;
}

/**
 * Stats card widget for dashboard metrics
 */
export function StatsCard({
    label,
    value,
    change,
    changePercent,
    positive = true,
    icon,
    gradient,
    iconColor,
    index = 0,
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 bg-card border border-border overflow-hidden hover:border-white/30 transition-all duration-300"
        >
            {/* Background Gradient */}
            <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity`}
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={`w-10 h-10 bg-background border border-border flex items-center justify-center ${iconColor}`}
                    >
                        {icon}
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-2xl font-bold mb-1 tracking-tight font-mono">
                    {value}
                </div>

                <div className="flex items-center gap-2 text-sm">
                    {changePercent && (
                        <span
                            className={`flex items-center gap-0.5 font-medium ${positive ? "text-emerald-500" : "text-destructive"
                                }`}
                        >
                            {positive ? (
                                <ArrowUpRight className="w-3 h-3" />
                            ) : (
                                <ArrowDownRight className="w-3 h-3" />
                            )}
                            {changePercent}
                        </span>
                    )}
                    {change && <span className="text-muted-foreground">{change}</span>}
                </div>

                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-4 opacity-60">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Stats card skeleton for loading states
 */
export function StatsCardSkeleton() {
    return (
        <div className="relative p-6 bg-card border border-border overflow-hidden">
            <div className="animate-pulse">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-muted" />
                    <div className="w-5 h-5 bg-muted" />
                </div>
                <div className="h-8 bg-muted w-24 mb-2" />
                <div className="h-4 bg-muted w-20 mb-4" />
                <div className="h-3 bg-muted w-28" />
            </div>
        </div>
    );
}
