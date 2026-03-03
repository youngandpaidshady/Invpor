import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works — Get Funded in 3 Steps",
    description: "Pass our evaluation, verify your edge, and get funded up to $200K. No time limits, no hidden fees. BraxleyNevim makes the path to funded trading simple and transparent.",
    openGraph: {
        title: "How It Works | BraxleyNevim",
        description: "Three steps to a funded trading account. No time limits, no hidden fees.",
    },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
    return children;
}
