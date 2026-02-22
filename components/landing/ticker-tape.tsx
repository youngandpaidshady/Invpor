"use client";

import { motion } from "framer-motion";

/**
 * TickerTape — BraxleyNevim
 * Enhanced marquee with sparkline charts, hover-pause per item, and pulse glow.
 * Archetype: Enhanced marquee with micro-interactions (21st.dev)
 */

const pairs = [
    { symbol: "BTC/USD", price: "97,245.80", change: "+2.41%", up: true, spark: [30, 35, 28, 42, 50] },
    { symbol: "XAU/USD", price: "2,864.30", change: "+0.87%", up: true, spark: [40, 38, 42, 45, 48] },
    { symbol: "EUR/USD", price: "1.0412", change: "-0.23%", up: false, spark: [50, 48, 45, 43, 40] },
    { symbol: "GBP/USD", price: "1.2534", change: "+0.15%", up: true, spark: [35, 36, 34, 38, 40] },
    { symbol: "NAS100", price: "21,478.50", change: "+1.12%", up: true, spark: [20, 30, 25, 40, 50] },
    { symbol: "US30", price: "44,892.00", change: "-0.34%", up: false, spark: [50, 45, 48, 42, 38] },
    { symbol: "SPX500", price: "6,082.40", change: "+0.67%", up: true, spark: [30, 28, 35, 40, 45] },
    { symbol: "ETH/USD", price: "3,241.60", change: "+3.18%", up: true, spark: [15, 25, 20, 40, 55] },
    { symbol: "USD/JPY", price: "154.82", change: "-0.12%", up: false, spark: [45, 48, 44, 42, 40] },
    { symbol: "USOIL", price: "78.45", change: "+1.54%", up: true, spark: [25, 30, 28, 38, 48] },
];

/* Mini sparkline SVG — shows 5-point trend */
function Sparkline({ data, up }: { data: number[]; up: boolean }) {
    const h = 14;
    const w = 36;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data
        .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
        .join(" ");

    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            <polyline
                points={points}
                fill="none"
                stroke={up ? "#C7A257" : "#FF4444"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function TickerTape() {
    return (
        <div className="relative w-full bg-black border-b border-[#222222] overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A257]/30 to-transparent" />

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="flex animate-ticker whitespace-nowrap">
                {[...Array(3)].map((_, setIdx) => (
                    <div key={setIdx} className="flex">
                        {pairs.map((pair, i) => (
                            <motion.div
                                key={`${setIdx}-${i}`}
                                className="group flex items-center gap-3 px-5 py-2.5 border-r border-[#1a1a1a] cursor-default"
                                whileHover={{
                                    backgroundColor: "rgba(199, 162, 87, 0.04)",
                                    scale: 1.03,
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                                <span className="text-[11px] font-mono font-bold text-white/80 tracking-wider">
                                    {pair.symbol}
                                </span>
                                <span className="text-[11px] font-body text-white/40">
                                    {pair.price}
                                </span>
                                <Sparkline data={pair.spark} up={pair.up} />
                                <motion.span
                                    className={`text-[11px] font-mono font-semibold tracking-wider ${pair.up ? "text-[#C7A257]" : "text-red-500"
                                        }`}
                                    animate={
                                        pair.up
                                            ? { textShadow: ["0 0 0px transparent", "0 0 6px rgba(199,162,87,0.4)", "0 0 0px transparent"] }
                                            : {}
                                    }
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {pair.change}
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
