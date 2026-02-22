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
    private lastCleanup: number;
    private cleanupInterval: number;

    constructor(config: RateLimitConfig = {}) {
        this.tokenCache = new Map();
        this.uniqueTokenPerInterval = config.uniqueTokenPerInterval || 500;
        this.interval = config.interval || 60000; // Default 1 minute
        this.lastCleanup = Date.now();
        this.cleanupInterval = 60000; // Cleanup every 60 seconds
    }

    /**
     * Remove stale entries from the cache to prevent memory leaks.
     */
    private cleanup(now: number) {
        if (now - this.lastCleanup < this.cleanupInterval) return;
        this.lastCleanup = now;

        const windowStart = now - this.interval;
        const keysToDelete: string[] = [];

        for (const [key, timestamps] of this.tokenCache.entries()) {
            const active = timestamps.filter(t => t > windowStart);
            if (active.length === 0) {
                keysToDelete.push(key);
            } else {
                this.tokenCache.set(key, active);
            }
        }

        for (const key of keysToDelete) {
            this.tokenCache.delete(key);
        }
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

        // Periodic cleanup
        this.cleanup(now);

        let timestamps = this.tokenCache.get(token) || [];

        // Filter out timestamps outside the window
        timestamps = timestamps.filter(timestamp => timestamp > windowStart);

        const currentUsage = timestamps.length;
        const isRateLimited = currentUsage >= limit;
        const remaining = isRateLimited ? 0 : limit - currentUsage - 1;

        // Calculate reset time
        const oldestTimestamp = timestamps[0] || now;
        const reset = oldestTimestamp + this.interval;

        if (!isRateLimited) {
            timestamps.push(now);
            this.tokenCache.set(token, timestamps);

            // Hard cap on cache size
            if (this.tokenCache.size > this.uniqueTokenPerInterval) {
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
