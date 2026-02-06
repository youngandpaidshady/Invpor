// ===========================================
// Security Utilities
// ===========================================

import { createHmac, randomBytes } from "crypto";

// ===========================================
// CSRF Token Management
// ===========================================

const CSRF_SECRET = process.env.CSRF_SECRET || "default-csrf-secret-change-in-production";

/**
 * Generate a CSRF token
 */
export function generateCsrfToken(): string {
  const token = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", CSRF_SECRET)
    .update(`${token}:${timestamp}`)
    .digest("hex");
  return `${token}:${timestamp}:${signature}`;
}

/**
 * Verify a CSRF token
 */
export function verifyCsrfToken(token: string, maxAge = 3600000): boolean {
  try {
    const [tokenValue, timestamp, signature] = token.split(":");
    
    if (!tokenValue || !timestamp || !signature) {
      return false;
    }

    // Check if token is expired (default 1 hour)
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (tokenAge > maxAge) {
      return false;
    }

    // Verify signature
    const expectedSignature = createHmac("sha256", CSRF_SECRET)
      .update(`${tokenValue}:${timestamp}`)
      .digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

// ===========================================
// XSS Sanitization
// ===========================================

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;",
  "=": "&#x3D;",
};

/**
 * Sanitize string to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize object values recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeHtml(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string"
          ? sanitizeHtml(item)
          : typeof item === "object" && item !== null
          ? sanitizeObject(item as Record<string, unknown>)
          : item
      );
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

// ===========================================
// Input Validation Helpers
// ===========================================

/**
 * Check if string contains potential SQL injection patterns
 */
export function hasSqlInjectionPatterns(input: string): boolean {
  const patterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i,
    /(--)|(\/\*)|(\*\/)/,
    /(;|\||&&)/,
    /(\bOR\b|\bAND\b)\s*\d+\s*=\s*\d+/i,
    /'\s*(OR|AND)\s*'?\d/i,
  ];
  
  return patterns.some((pattern) => pattern.test(input));
}

/**
 * Sanitize filename to prevent path traversal
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/\.{2,}/g, ".")
    .substring(0, 255);
}

// ===========================================
// Request Logging
// ===========================================

export interface RequestLog {
  timestamp: string;
  method: string;
  path: string;
  ip: string;
  userAgent: string;
  userId?: string;
  statusCode?: number;
  duration?: number;
}

/**
 * Create a request log entry
 */
export function createRequestLog(
  request: Request,
  userId?: string
): RequestLog {
  const url = new URL(request.url);
  
  return {
    timestamp: new Date().toISOString(),
    method: request.method,
    path: url.pathname,
    ip: request.headers.get("x-forwarded-for") || 
        request.headers.get("x-real-ip") || 
        "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
    userId,
  };
}

/**
 * Log request to console (in production, send to logging service)
 */
export function logRequest(log: RequestLog): void {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[${log.timestamp}] ${log.method} ${log.path} - IP: ${log.ip}${
        log.userId ? ` - User: ${log.userId}` : ""
      }${log.statusCode ? ` - Status: ${log.statusCode}` : ""}${
        log.duration ? ` - ${log.duration}ms` : ""
      }`
    );
  }
  
  // In production, you would send to a logging service like:
  // - Datadog
  // - LogRocket
  // - Sentry
  // - CloudWatch
  // await loggingService.log(log);
}

// ===========================================
// Environment Validation
// ===========================================

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const PRODUCTION_ENV_VARS = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "CSRF_SECRET",
];

/**
 * Validate required environment variables
 */
export function validateEnvVars(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  // In production, check additional vars
  if (process.env.NODE_ENV === "production") {
    for (const envVar of PRODUCTION_ENV_VARS) {
      if (!process.env[envVar]) {
        missing.push(envVar);
      }
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

// ===========================================
// Password Strength Checker
// ===========================================

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score++;
  else feedback.push("Use at least 8 characters");
  
  if (password.length >= 12) score++;
  
  if (/[A-Z]/.test(password)) score++;
  else feedback.push("Add uppercase letters");
  
  if (/[0-9]/.test(password)) score++;
  else feedback.push("Add numbers");
  
  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push("Add special characters");
  
  // Check for common patterns
  if (/^[a-z]+$/i.test(password) || /^[0-9]+$/.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push("Avoid using only letters or numbers");
  }
  
  return {
    score: Math.min(4, score),
    feedback,
  };
}
