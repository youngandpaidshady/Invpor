"use client";

import { usePathname } from "next/navigation";

export function CanonicalTag() {
    const pathname = usePathname();
    // Using the new app domain instead of hardcoded dev url
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://braxleynevimalphatrade.com";

    // Remove trailing slash if present, unless it's just "/"
    const cleanPathname = pathname === "/" ? "" : pathname.replace(/\/$/, "");
    const canonicalUrl = `${baseUrl}${cleanPathname}`;

    return <link rel="canonical" href={canonicalUrl} />;
}
