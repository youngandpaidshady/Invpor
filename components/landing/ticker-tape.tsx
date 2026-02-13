"use client";

/**
 * TickerTape — Infinite-scroll crypto/forex ticker
 * Orange/White pairs with live simulated price changes
 */

const pairs = [
    { symbol: "BTCUSD", price: "97,245.80", change: "+2.41%", up: true },
    { symbol: "XAUUSD", price: "2,864.30", change: "+0.87%", up: true },
    { symbol: "EURUSD", price: "1.0412", change: "-0.23%", up: false },
    { symbol: "GBPUSD", price: "1.2534", change: "+0.15%", up: true },
    { symbol: "NAS100", price: "21,478.50", change: "+1.12%", up: true },
    { symbol: "US30", price: "44,892.00", change: "-0.34%", up: false },
    { symbol: "SPX500", price: "6,082.40", change: "+0.67%", up: true },
    { symbol: "ETHUSD", price: "3,241.60", change: "+3.18%", up: true },
    { symbol: "USDJPY", price: "154.82", change: "-0.12%", up: false },
    { symbol: "USOIL", price: "78.45", change: "+1.54%", up: true },
];

export function TickerTape() {
    return (
        <div className="relative w-full bg-[#111113] border-b border-[#27272A] overflow-hidden">
            <div className="flex animate-ticker whitespace-nowrap">
                {[...Array(2)].map((_, setIdx) => (
                    <div key={setIdx} className="flex">
                        {pairs.map((pair, i) => (
                            <div
                                key={`${setIdx}-${i}`}
                                className="flex items-center gap-3 px-6 py-2.5"
                            >
                                <span className="text-xs font-mono font-medium text-white">
                                    {pair.symbol}
                                </span>
                                <span className="text-xs font-mono text-[#F97316]">
                                    {pair.price}
                                </span>
                                <span
                                    className={`text-xs font-mono ${pair.up ? "text-[#00FF88]" : "text-[#FF3366]"
                                        }`}
                                >
                                    {pair.change}
                                </span>
                                <span className="text-[#3F3F46] text-xs">|</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
