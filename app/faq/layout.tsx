import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ — Frequently Asked Questions",
    description: "Find answers about BraxleyNevim funded trading challenges, evaluation rules, payout methods, account sizes, and more. Get support 24/7.",
    openGraph: {
        title: "FAQ | BraxleyNevim",
        description: "Everything you need to know about evaluations, funded accounts, trading rules, and payouts.",
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
