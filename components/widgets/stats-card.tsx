"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
            className="group relative p-6 bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] overflow-hidden hover:border-[#C7A257]/30 hover:shadow-[0_0_30px_rgba(199,162,87,0.1)] transition-all duration-500"
        >
            {/* Background Gradient */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
            />
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                    <div
                        className={`w-10 h-10 rounded-lg bg-[#111]/50 border border-white/[0.08] shadow-inner flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-500`}
                    >
                        {icon}
                    </div>
                    <button className="text-white/30 hover:text-[#C7A257] transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-3xl font-display tracking-widest text-white mb-2">
                    {value}
                </div>

                <div className="flex items-center gap-2 text-[13px] font-body">
                    {changePercent && (
                        <span
                            className={`flex items-center gap-1 font-medium px-2 py-0.5 rounded ${positive ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#EF4444]/10 text-[#EF4444]"
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
                    {change && <span className="text-white/50">{change}</span>}
                </div>

                <div className="text-[10px] text-[#A0A0A0] font-mono uppercase tracking-[0.2em] mt-5 group-hover:text-[#C7A257]/70 transition-colors">
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
        <div className="relative p-6 bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] overflow-hidden rounded-none">
            <div className="animate-pulse">
                <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 bg-white/[0.05] rounded-lg" />
                    <div className="w-5 h-5 bg-white/[0.05] rounded" />
                </div>
                <div className="h-8 bg-white/[0.05] w-24 mb-3 rounded" />
                <div className="h-4 bg-white/[0.05] w-32 mb-5 rounded" />
                <div className="h-3 bg-white/[0.05] w-20 rounded" />
            </div>
        </div>
    );
}
