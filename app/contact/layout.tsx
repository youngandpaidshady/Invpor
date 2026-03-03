import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with BraxleyNevim support. We respond within 2 hours. Available 24/7 via email and live chat for all your funded trading questions.",
    openGraph: {
        title: "Contact Us | BraxleyNevim",
        description: "Reach our support team 24/7. We respond within 2 hours.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
