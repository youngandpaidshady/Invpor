import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing & Challenge Plans",
    description: "Choose your funded trading challenge. Account sizes from $5K to $200K. One-time fee, no recurring charges. Up to 90% profit split. Start trading with BraxleyNevim capital.",
    openGraph: {
        title: "Pricing & Challenge Plans | BraxleyNevim",
        description: "Choose your funded trading challenge. Account sizes from $5K to $200K. Up to 90% profit split.",
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
