import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scaling Program",
    description: "Scale your funded account up to $2M with BraxleyNevim. Earn higher profit splits and unlock larger capital as you prove consistent performance.",
    openGraph: {
        title: "Scaling Program | BraxleyNevim",
        description: "Scale your funded account up to $2M. Higher profit splits, larger capital.",
    },
};

export default function ScalingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
