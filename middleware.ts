import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RateLimiter } from "@/lib/rate-limit";
import { isSafeRedirectPath } from "@/lib/sanitize";

// ===========================================
// Rate Limiters
// ===========================================

const limiters = {
  global: new RateLimiter({ interval: 60 * 1000 }),           // 1 min window
  auth: new RateLimiter({ interval: 60 * 1000 }),             // 1 min window (strict)
  sensitive: new RateLimiter({ interval: 60 * 60 * 1000 }),   // 1 hour window
};

// ===========================================
// Route Definitions
// ===========================================

/** Routes that require authentication */
const protectedRoutes = ["/dashboard"];

/** Routes that should redirect authenticated users */
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

/** Auth API routes subject to strict brute-force limiting */
const authApiPaths = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
];

// ===========================================
// Middleware
// ===========================================

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Get client IP (first entry of x-forwarded-for, or x-real-ip)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { pathname } = request.nextUrl;

  // ===========================================
  // Rate Limiting
  // ===========================================
  if (pathname.startsWith("/api/")) {
    let limitResult;

    // ★ Strict auth brute-force limiter: 5 req / min
    if (authApiPaths.some((p) => pathname.startsWith(p))) {
      limitResult = limiters.auth.check(ip + "_auth", 5);
    }
    // Checkout: 10 req / min
    else if (pathname.startsWith("/api/checkout")) {
      limitResult = limiters.global.check(ip + "_checkout", 10);
    }
    // Contact: 5 req / hour
    else if (pathname.startsWith("/api/contact")) {
      limitResult = limiters.sensitive.check(ip + "_contact", 5);
    }
    // KYC upload: 20 req / min
    else if (pathname.startsWith("/api/kyc/upload")) {
      limitResult = limiters.global.check(ip + "_kyc_upload", 20);
    }
    // Sensitive user actions: 10 req / min
    else if (
      pathname.startsWith("/api/user/change-password") ||
      pathname.startsWith("/api/user/change-email") ||
      pathname.startsWith("/api/user/account")
    ) {
      limitResult = limiters.global.check(ip + "_user_sensitive", 10);
    }
    // General API: 100 req / min
    else {
      limitResult = limiters.global.check(ip, 100);
    }

    if (!limitResult.success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((limitResult.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": limitResult.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": limitResult.reset.toString(),
          },
        }
      );
    }

    // Attach rate-limit info to successful responses
    response.headers.set("X-RateLimit-Limit", limitResult.limit.toString());
    response.headers.set("X-RateLimit-Remaining", limitResult.remaining.toString());
  }

  // ===========================================
  // Supabase Auth Session
  // ===========================================
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ===========================================
  // Route Protection
  // ===========================================

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  // ★ Validate redirect parameter to prevent open redirect (CWE-601)
  if (isAuthRoute && user) {
    const rawRedirect = request.nextUrl.searchParams.get("redirect") || "/dashboard";
    const safeRedirect = isSafeRedirectPath(rawRedirect) ? rawRedirect : "/dashboard";
    return NextResponse.redirect(new URL(safeRedirect, request.url));
  }

  // ===========================================
  // Security Headers
  // ===========================================

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // CSP: remove unsafe-eval in production
  const isProduction = process.env.NODE_ENV === "production";
  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";

  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
