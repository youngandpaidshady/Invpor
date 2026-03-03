import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us — Our Story",
    description: "BraxleyNevim was founded by traders who got tired of prop firms designed to fail. We're bootstrapped, trader-owned, and committed to transparent funded trading.",
    openGraph: {
        title: "About BraxleyNevim — Our Story",
        description: "Founded by traders, for traders. Learn why we built a different kind of prop trading firm.",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
