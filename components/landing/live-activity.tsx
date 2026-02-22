"use client";

import { useEffect, useState } from "react";

/**
 * Live Activity Marquee - Pure CSS Animation
 * Zero framer-motion, bulletproof
 */

interface ActivityItem {
  id: number;
  type: "funded" | "payout" | "passed";
  user: string;
  amount: string;
  time: string;
  flag: string;
}

const initialActivities: ActivityItem[] = [
  { id: 1, type: "funded", user: "Alex K.", amount: "$50K", time: "2m ago", flag: "🇺🇸" },
  { id: 2, type: "payout", user: "Sam R.", amount: "$4,200", time: "5m ago", flag: "🇬🇧" },
  { id: 3, type: "passed", user: "Jordan T.", amount: "Phase 1", time: "8m ago", flag: "🇩🇪" },
  { id: 4, type: "funded", user: "Taylor M.", amount: "$100K", time: "12m ago", flag: "🇫🇷" },
  { id: 5, type: "payout", user: "Morgan L.", amount: "$8,500", time: "15m ago", flag: "🇦🇺" },
  { id: 6, type: "passed", user: "Casey J.", amount: "Phase 2", time: "18m ago", flag: "🇨🇦" },
  { id: 7, type: "funded", user: "Riley S.", amount: "$25K", time: "22m ago", flag: "🇪🇸" },
  { id: 8, type: "payout", user: "Jamie P.", amount: "$12,300", time: "25m ago", flag: "🇯🇵" },
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case "funded": return "Got Funded";
    case "payout": return "Withdrew";
    case "passed": return "Passed";
    default: return "";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "funded": return "text-emerald-400";
    case "payout": return "text-[#ff6b35]";
    case "passed": return "text-blue-400";
    default: return "text-white/50";
  }
};

export function LiveActivityMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="h-16 bg-[#0a0a0a] border-y border-white/5" />;
  }

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] border-y border-white/5 py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

      {/* CSS-based infinite scroll */}
      <div className="flex gap-6 animate-marquee">
        {[...initialActivities, ...initialActivities].map((activity, i) => (
          <div
            key={`${activity.id}-${i}`}
            className="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full whitespace-nowrap flex-shrink-0"
          >
            <span className="text-lg">{activity.flag}</span>
            <span className="text-sm text-white/70 font-medium">{activity.user}</span>
            <span className={`text-xs font-mono ${getTypeColor(activity.type)}`}>
              {getTypeLabel(activity.type)}
            </span>
            <span className="text-sm font-bold text-white">{activity.amount}</span>
            <span className="text-xs text-white/30">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Stats Marquee - Pure CSS Animation
 */
export function StatsMarquee() {
  const stats = [
    { label: "TRADERS FUNDED", value: "15,247" },
    { label: "TOTAL PAID", value: "$12M+" },
    { label: "COUNTRIES", value: "50+" },
    { label: "PROFIT SPLIT", value: "UP TO 90%" },
    { label: "MAX CAPITAL", value: "$200K" },
    { label: "PAYOUT SPEED", value: "24 HOURS" },
  ];

  return (
    <div className="relative overflow-hidden py-6 bg-white/[0.01]">
      <div className="flex gap-12 whitespace-nowrap animate-stats-marquee">
        {[...stats, ...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-white/30 uppercase tracking-wider">{stat.label}</span>
            <span className="text-sm font-bold text-white/80">{stat.value}</span>
            <span className="text-white/10">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
