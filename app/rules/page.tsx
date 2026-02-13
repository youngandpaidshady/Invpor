"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Terminal,
  Cpu,
  Activity,
  ShieldAlert,
  Crosshair,
  TrendingUp,
  Zap,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  Globe,
  Server
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// --- Data Constants ---

const PROFIT_TARGETS = [
  { phase: "PHASE 1", target: "8%", condition: "EQUITY GROWTH", status: "ACTIVE" },
  { phase: "PHASE 2", target: "5%", condition: "EQUITY GROWTH", status: "PENDING" },
  { phase: "FUNDED", target: "—", condition: "PROFIT KEEP", status: "LOCKED" },
];

const DRAWDOWN_LIMITS = [
  { type: "MAX TRAILING", limit: "10%", reset: "NEVER", status: "HARD LIMIT", color: "text-signal-red" },
  { type: "DAILY LOSS", limit: "5%", reset: "00:00 UTC", status: "HARD LIMIT", color: "text-magma" },
];

const INSTRUMENTS = [
  { asset: "FOREX", leverage: "1:100", hours: "24/5", status: "ONLINE" },
  { asset: "INDICES", leverage: "1:50", hours: "MARKET", status: "ONLINE" },
  { asset: "COMMODITIES", leverage: "1:50", hours: "23/5", status: "ONLINE" },
  { asset: "CRYPTO", leverage: "1:10", hours: "24/7", status: "ONLINE" },
];

const PERMISSIONS = {
  allowed: [
    { code: "ALLOW_WEEKEND_HOLD", desc: "WEEKEND POSITIONS AUTHORIZED" },
    { code: "ALLOW_EA_BOTS", desc: "AUTOMATED TRADING SYSTEMS ACTIVE" },
    { code: "ALLOW_HEDGING", desc: "HEDGING STRATEGIES PERMITTED" },
    { code: "ALLOW_SCALPING", desc: "HIGH FREQUENCY SCALPING ENABLED" },
  ],
  prohibited: [
    { code: "ERR_MARTINGALE", desc: "MARTINGALE ALGORITHMS REJECTED" },
    { code: "ERR_TICK_SCALP", desc: "TICK SCALPING LATENCY ARBITRAGE" },
    { code: "ERR_COPY_TRADE", desc: "EXTERNAL ACCOUNT COPYING" },
  ],
};

// --- Components ---

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
    <div className="w-10 h-10 bg-magma/10 flex items-center justify-center border border-magma/20">
      <Icon className="w-5 h-5 text-magma" />
    </div>
    <div>
      <h2 className="text-xl font-mono font-bold tracking-tight">{title}</h2>
      <p className="text-xs text-white/40 font-mono uppercase tracking-wider">{subtitle}</p>
    </div>
  </div>
);

const TerminalCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white/[0.02] border border-white/10 p-6 relative overflow-hidden group hover:border-magma/30 transition-colors", className)}>
    <div className="absolute top-0 right-0 p-2 opacity-50">
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <div className="w-1 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
    {children}
  </div>
);

export default function RulesPage() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").split(".")[0] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-magma/30">
      <Navbar />

      {/* Header / Status Bar */}
      <div className="pt-32 pb-8 border-b border-white/10 bg-white/[0.01]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-magma mb-2">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-wider">SYSTEM_ROOT // RULES_ENGINE</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-mono font-black tracking-tight uppercase">
                Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-magma to-orange-400">Protocols</span>
              </h1>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs text-white/60 text-right">
              <div className="flex items-center justify-end gap-2">
                <Clock className="w-3 h-3" />
                <span>{time || "INITIALIZING..."}</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-emerald-500">
                <Server className="w-3 h-3" />
                <span>SYSTEM STATUS: OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-magma">
                <Globe className="w-3 h-3" />
                <span>LATENCY: 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16">

        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-mono mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN_TO_BASE</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: PRIMARY DATA */}
          <div className="lg:col-span-8 space-y-12">

            {/* 1. PROFIT OBJECTIVES */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SectionHeader
                icon={Crosshair}
                title="OPERATIONAL OBJECTIVES"
                subtitle="Profit Targets & Phasing"
              />

              <div className="grid md:grid-cols-3 gap-4">
                {PROFIT_TARGETS.map((item, i) => (
                  <TerminalCard key={i} className="flex flex-col justify-between h-48">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1">{item.phase}</span>
                      <Activity className={cn("w-4 h-4", i === 2 ? "text-blue-500" : "text-magma")} />
                    </div>
                    <div>
                      <div className="text-4xl font-mono font-black tracking-tighter mb-1">{item.target}</div>
                      <div className="text-xs font-mono text-white/60">{item.condition}</div>
                    </div>
                    <div className="w-full bg-white/5 h-1 mt-4 overflow-hidden">
                      <div className={cn("h-0.5 w-full", i === 2 ? "bg-blue-500" : "bg-magma")} />
                    </div>
                  </TerminalCard>
                ))}
              </div>
            </motion.section>

            {/* 2. RISK PROTOCOLS */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SectionHeader
                icon={ShieldAlert}
                title="RISK PROTOCOLS"
                subtitle="Automatic Liquidation Levels"
              />

              <div className="grid md:grid-cols-2 gap-4">
                {DRAWDOWN_LIMITS.map((item, i) => (
                  <TerminalCard key={i} className="border-l-2 border-l-red-500/50">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className={cn("font-mono font-bold text-lg", item.color)}>{item.type}</h3>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-mono font-black text-white">{item.limit}</span>
                      <span className="text-xs font-mono text-white/40 uppercase">Reset: {item.reset}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs font-mono text-red-500">
                        <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                        BREACH ACTION: IMMEDIATE LIQUIDATION
                      </div>
                    </div>
                  </TerminalCard>
                ))}
              </div>
            </motion.section>

            {/* 3. EXECUTION PERMISSIONS */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SectionHeader
                icon={Cpu}
                title="EXECUTION PARAMETERS"
                subtitle="Allowed vs Prohibited Strategies"
              />

              <div className="grid md:grid-cols-2 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.01]">

                {/* ALLOWED */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Unlock className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-mono font-bold text-emerald-500">PERMITTED_ACTIONS</span>
                  </div>
                  <ul className="space-y-4 font-mono text-xs">
                    {PERMISSIONS.allowed.map((item, i) => (
                      <li key={i} className="flex gap-3 text-white/70">
                        <span className="text-emerald-500/50">[{i.toString().padStart(2, '0')}]</span>
                        <span className="uppercase">{item.desc}</span>
                        <span className="ml-auto text-emerald-500 opacity-50">✓</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PROHIBITED */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-mono font-bold text-red-500">RESTRICTED_ACTIONS</span>
                  </div>
                  <ul className="space-y-4 font-mono text-xs">
                    {PERMISSIONS.prohibited.map((item, i) => (
                      <li key={i} className="flex gap-3 text-white/70">
                        <span className="text-red-500/50">[{i.toString().padStart(2, '0')}]</span>
                        <span className="uppercase decoration-red-500/30 line-through-">{item.desc}</span>
                        <span className="ml-auto text-red-500 opacity-50">DENY</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.section>

          </div>

          {/* RIGHT COLUMN: SECONDARY DATA */}
          <div className="lg:col-span-4 space-y-8">

            {/* ASSET DATABASE */}
            <div className="border border-white/10 bg-white/[0.01]">
              <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                <h3 className="font-mono font-bold text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-magma" />
                  ASSET_DATABASE
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {INSTRUMENTS.map((inst, i) => (
                  <div key={i} className="p-4 flex flex-col gap-1 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm tracking-wide">{inst.asset}</span>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5">
                        {inst.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono text-white/40">
                      <span>LEV: {inst.leverage}</span>
                      <span>HRS: {inst.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRADING DAYS */}
            <div className="border border-white/10 bg-white/[0.01] p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="text-4xl font-mono font-black mb-2">05</div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
                Minimum Trading Days
              </div>
              <div className="h-1 w-full bg-white/10 flex">
                <div className="h-full w-1/5 bg-blue-500" />
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 border border-magma/30 bg-magma/5 text-center">
              <Zap className="w-8 h-8 text-magma mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">SYSTEM READY</h3>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                PROTOCOLS UNDERSTOOD? <br />
                INITIATE FUNDING SEQUENCE.
              </p>
              <Link
                href="/pricing"
                className="block w-full py-4 bg-magma text-black font-mono font-bold hover:bg-orange-400 transition-colors uppercase tracking-wider"
              >
                Initiate_Challenge
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
