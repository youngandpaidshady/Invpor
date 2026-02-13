/**
 * Simple in-memory rate limiter using a sliding window algorithm.
 * 
 * Note: In a production serverless environment (like Vercel), this in-memory cache
 * will be reset frequently. For robust rate limiting across multiple lambdas,
 * use Redis (e.g., Upstash).
 */

interface RateLimitConfig {
    uniqueTokenPerInterval?: number; // Max number of unique IPs to track
    interval?: number; // Window size in ms
}

export class RateLimiter {
    private tokenCache: Map<string, number[]>;
    private uniqueTokenPerInterval: number;
    private interval: number;

    constructor(config: RateLimitConfig = {}) {
        this.tokenCache = new Map();
        this.uniqueTokenPerInterval = config.uniqueTokenPerInterval || 500;
        this.interval = config.interval || 60000; // Default 1 minute
    }

    /**
     * Check if a token (IP) has exceeded the limit.
     * @param token Unique identifier (e.g., IP address)
     * @param limit Max requests allowed in the interval
     * @returns { success: boolean, limit: number, remaining: number, reset: number }
     */
    check(token: string, limit: number) {
        const now = Date.now();
        const windowStart = now - this.interval;

        let timestamps = this.tokenCache.get(token) || [];

        // Filter out timestamps outside the window
        timestamps = timestamps.filter(timestamp => timestamp > windowStart);

        const currentUsage = timestamps.length;
        const isRateLimited = currentUsage >= limit;
        const remaining = isRateLimited ? 0 : limit - currentUsage - 1;

        // Calculate reset time (time until the oldest request expires)
        // If no requests, reset is now. If maxed out, reset is when oldest expires.
        const oldestTimestamp = timestamps[0] || now;
        const reset = oldestTimestamp + this.interval;

        if (!isRateLimited) {
            timestamps.push(now);
            this.tokenCache.set(token, timestamps);

            // Cleanup cache if too big
            if (this.tokenCache.size > this.uniqueTokenPerInterval) {
                // Simple eviction: remove the oldest entry encountered (or just clear specific one if we tracked LRU, but this is simple)
                // For now, just clear a chunk or the current one to prevent memory leak is handled by map limitation logic usually
                // but here we just accept the potential slight memory growth in short term or clear all?
                // Let's just clear the oldest key if we could, but Map preserves order.
                const firstKey = this.tokenCache.keys().next().value;
                if (firstKey) this.tokenCache.delete(firstKey);
            }
        }

        return {
            success: !isRateLimited,
            limit,
            remaining,
            reset
        };
    }
}

// Singleton instances for different use cases if needed, 
// but usually instantiated where used or exported as a helper.
export const globalRateLimiter = new RateLimiter({ interval: 60 * 1000 }); // 1 minute window
