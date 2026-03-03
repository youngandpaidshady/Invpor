import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, type RateLimitTier } from "@/lib/rate-limit";
import { isSafeRedirectPath } from "@/lib/sanitize";

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
  // Rate Limiting (Upstash Redis)
  // ===========================================
  if (pathname.startsWith("/api/")) {
    let tier: RateLimitTier = "api";

    if (authApiPaths.some((p) => pathname.startsWith(p))) {
      tier = "auth";
    } else if (pathname.startsWith("/api/checkout") || pathname.startsWith("/api/purchase")) {
      tier = "checkout";
    }

    const limitResult = await checkRateLimit(`${ip}:${tier}`, tier);

    if (!limitResult.allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((limitResult.resetAt - Date.now()) / 1000).toString(),
            "X-RateLimit-Remaining": limitResult.remaining.toString(),
            "X-RateLimit-Reset": limitResult.resetAt.toString(),
          },
        }
      );
    }

    // Attach rate-limit info to successful responses
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
  // Security Headers (only headers not already in next.config.js)
  // X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  // Strict-Transport-Security are set in next.config.js headers().
  // ===========================================

  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );

  // CSP: remove unsafe-eval in production
  const isProduction = process.env.NODE_ENV === "production";
  const scriptSrc = isProduction
    ? "'self' 'unsafe-inline' https://embed.tawk.to"
    : "'self' 'unsafe-inline' 'unsafe-eval' https://embed.tawk.to";

  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://*.upstash.io https://nowpayments.io https://*.tawk.to wss://*.tawk.to; frame-src https://embed.tawk.to; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`
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
