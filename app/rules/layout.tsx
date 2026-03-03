import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trading Rules & Parameters",
    description: "Complete reference for BraxleyNevim trading rules: profit targets, drawdown limits, permitted strategies, and instrument specifications. Read before you start trading.",
    openGraph: {
        title: "Trading Rules | BraxleyNevim",
        description: "Profit targets, drawdown limits, permitted strategies. Everything you need to know before trading.",
    },
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
