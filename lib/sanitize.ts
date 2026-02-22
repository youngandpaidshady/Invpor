// ===========================================
// Centralized Input Sanitization & Validation
// ===========================================

/**
 * Maximum allowed JSON body size in bytes (1 MB).
 * Prevents denial-of-service via oversized payloads.
 */
const MAX_BODY_BYTES = 1 * 1024 * 1024; // 1 MB

/**
 * Keys that must never appear in user-controlled objects.
 * Prevents prototype pollution attacks.
 */
const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

/**
 * Characters that trigger formula execution in spreadsheet software.
 * Used to prevent CSV injection.
 */
const CSV_INJECTION_CHARS = /^[=+\-@|\t\r]/;

// ===========================================
// HTML Entity Map
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

// ===========================================
// String Sanitization
// ===========================================

/**
 * Encode HTML special characters to prevent XSS.
 */
export function sanitizeString(input: string): string {
    return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Strip null bytes and other control characters (except newline/tab).
 */
export function stripControlChars(input: string): string {
    // eslint-disable-next-line no-control-regex
    return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

/**
 * Full sanitization pipeline for user-supplied strings.
 */
export function sanitizeInput(input: string): string {
    return sanitizeString(stripControlChars(input.trim()));
}

// ===========================================
// Object Sanitization
// ===========================================

/**
 * Recursively sanitize all string values in an object.
 * Also strips forbidden keys to prevent prototype pollution.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
        // Block prototype pollution
        if (FORBIDDEN_KEYS.has(key)) {
            continue;
        }

        if (typeof value === "string") {
            sanitized[key] = sanitizeInput(value);
        } else if (Array.isArray(value)) {
            sanitized[key] = value.map((item) =>
                typeof item === "string"
                    ? sanitizeInput(item)
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
// Request Body Guard
// ===========================================

/**
 * Safely parse JSON request body with size limit enforcement.
 * Returns the parsed body or throws an error.
 */
export async function parseAndGuardBody<T = Record<string, unknown>>(
    request: Request,
    maxBytes: number = MAX_BODY_BYTES
): Promise<T> {
    // Check Content-Length header first (fast reject)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > maxBytes) {
        throw new BodyTooLargeError(maxBytes);
    }

    const text = await request.text();

    // Verify actual body size
    if (new TextEncoder().encode(text).length > maxBytes) {
        throw new BodyTooLargeError(maxBytes);
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        throw new InvalidJsonError();
    }
}

export class BodyTooLargeError extends Error {
    constructor(maxBytes: number) {
        super(`Request body exceeds maximum size of ${Math.round(maxBytes / 1024)}KB`);
        this.name = "BodyTooLargeError";
    }
}

export class InvalidJsonError extends Error {
    constructor() {
        super("Invalid JSON in request body");
        this.name = "InvalidJsonError";
    }
}

// ===========================================
// Query Parameter Sanitization
// ===========================================

/**
 * Parse and clamp a numeric query parameter.
 */
export function sanitizeNumericParam(
    value: string | null,
    defaultValue: number,
    min: number,
    max: number
): number {
    if (value === null) return defaultValue;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return defaultValue;
    return Math.max(min, Math.min(max, parsed));
}

/**
 * Sanitize a string query parameter (trim + length limit + encode).
 */
export function sanitizeQueryString(
    value: string | null,
    maxLength: number = 255
): string | null {
    if (value === null) return null;
    const trimmed = value.trim().substring(0, maxLength);
    return stripControlChars(trimmed);
}

// ===========================================
// CSV Injection Prevention
// ===========================================

/**
 * Escape a cell value to prevent CSV injection (formula injection).
 * Prefixes dangerous leading characters with a single-quote.
 */
export function escapeCsvCell(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (CSV_INJECTION_CHARS.test(str)) {
        return `'${str}`;
    }
    return str;
}

// ===========================================
// URL / Redirect Validation
// ===========================================

/**
 * Validate a redirect path is safe (relative, no protocol, no double-slash).
 * Prevents open redirect attacks (CWE-601).
 */
export function isSafeRedirectPath(path: string): boolean {
    // Must start with exactly one /
    if (!path.startsWith("/")) return false;
    // Reject protocol-relative URLs (//evil.com)
    if (path.startsWith("//")) return false;
    // Reject any protocol schemes
    if (/^\/[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path)) return false;
    // Reject backslash tricks (\/evil.com)
    if (path.includes("\\")) return false;
    // Reject null bytes
    if (path.includes("\0")) return false;
    return true;
}
