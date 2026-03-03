import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Challenge Types",
    description: "Compare BraxleyNevim challenge types: 2-Step, 1-Step, and Instant Funding. Choose the evaluation that suits your trading style.",
};

export default function ChallengesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
