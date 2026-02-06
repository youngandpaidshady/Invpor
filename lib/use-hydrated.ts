"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to safely handle client-only rendering
 * Returns true only after hydration is complete
 */
export function useHydrated() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return hydrated;
}

/**
 * Returns a stable value during SSR and the dynamic value after hydration
 */
export function useClientValue<T>(serverValue: T, clientValue: T): T {
    const hydrated = useHydrated();
    return hydrated ? clientValue : serverValue;
}
