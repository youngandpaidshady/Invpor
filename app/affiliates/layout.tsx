import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Affiliate Program",
    description: "Earn commissions by referring traders to BraxleyNevim. Share your link, track referrals, and get paid for every signup.",
    openGraph: {
        title: "Affiliate Program | BraxleyNevim",
        description: "Earn commissions by referring traders. Track referrals and get paid.",
    },
};

export default function AffiliatesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
