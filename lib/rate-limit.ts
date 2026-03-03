import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ===========================================
// Upstash Redis Rate Limiter
// ===========================================
// Persistent across serverless cold starts.
// Free tier: 10,000 commands/day — more than enough for rate limiting.

const redis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })
        : null;

// Different rate limit tiers
const limiters = {
    /**
     * Auth endpoints (login, signup, reset-password): 5 requests per 60s
     */
    auth: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(5, "60 s"),
            prefix: "rl:auth",
            analytics: true,
        })
        : null,

    /**
     * General API: 30 requests per 60s
     */
    api: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(30, "60 s"),
            prefix: "rl:api",
            analytics: true,
        })
        : null,

    /**
     * Checkout: 3 requests per 60s (prevent spamming payment creation)
     */
    checkout: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(3, "60 s"),
            prefix: "rl:checkout",
            analytics: true,
        })
        : null,
};

export type RateLimitTier = keyof typeof limiters;

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt: number; // Unix timestamp (ms)
}

/**
 * Check if a request is allowed under the rate limit.
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param tier - Which rate limit tier to apply (default: "api")
 * @returns RateLimitResult with allowed status, remaining requests, and reset time
 */
export async function checkRateLimit(
    identifier: string,
    tier: RateLimitTier = "api"
): Promise<RateLimitResult> {
    const limiter = limiters[tier];

    // If Redis is not configured (dev mode), allow all requests
    if (!limiter) {
        return {
            allowed: true,
            remaining: 999,
            resetAt: Date.now() + 60_000,
        };
    }

    try {
        const result = await limiter.limit(identifier);

        return {
            allowed: result.success,
            remaining: result.remaining,
            resetAt: result.reset,
        };
    } catch (error) {
        // If Redis is down, fail open (allow the request) rather than blocking users
        console.error("[RateLimit] Redis error, failing open:", error);
        return {
            allowed: true,
            remaining: 0,
            resetAt: Date.now() + 60_000,
        };
    }
}
