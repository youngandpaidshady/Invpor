import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RateLimiter } from "@/lib/rate-limit";

// Define limiters
const limiters = {
  global: new RateLimiter({ interval: 60 * 1000 }), // 1 minute
  sensitive: new RateLimiter({ interval: 60 * 60 * 1000 }), // 1 hour for contact form
};

// Routes that require authentication
const protectedRoutes = ["/dashboard"];

// Routes that should redirect authenticated users
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  console.log("Middleware starting for:", request.nextUrl.pathname);
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Get client IP
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { pathname } = request.nextUrl;

  // Rate Limiting Logic
  if (pathname.startsWith("/api/")) {
    let limitResult;

    // Strict limit for Checkout: 10 req / min
    if (pathname.startsWith("/api/checkout")) {
      limitResult = limiters.global.check(ip + "_checkout", 10);
    }
    // Very strict limit for Contact: 5 req / hour
    else if (pathname.startsWith("/api/contact")) {
      limitResult = limiters.sensitive.check(ip + "_contact", 5);
    }
    // General API limit: 100 req / min
    else {
      limitResult = limiters.global.check(ip, 100);
    }

    if (!limitResult.success) {
      return new NextResponse(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": limitResult.limit.toString(),
          "X-RateLimit-Remaining": limitResult.remaining.toString(),
          "X-RateLimit-Reset": limitResult.reset.toString()
        },
      });
    }

    // Add Rate Limit headers to successful responses (optional but good practice)
    response.headers.set("X-RateLimit-Limit", limitResult.limit.toString());
    response.headers.set("X-RateLimit-Remaining", limitResult.remaining.toString());
  }

  // Create Supabase client
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

  // Refresh session if exists
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && user) {
    const redirect = request.nextUrl.searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  // Removed 'unsafe-eval' requirement if possible, but Next.js dev mode often needs it. 
  // keeping it for now to avoid breaking dev, but in prod ideally remove 'unsafe-eval'
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  );

  console.log("Middleware finishing for:", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
