/**
 * NOWPayments API Client
 * 
 * Server-only module — uses NOWPAYMENTS_API_KEY.
 * API Docs: https://documenter.getpostman.com/view/7907941/2s93JwMgmb
 */

const API_BASE = "https://api.nowpayments.io/v1";

function getApiKey(): string {
    const key = process.env.NOWPAYMENTS_API_KEY;
    if (!key) throw new Error("NOWPAYMENTS_API_KEY is not set");
    return key;
}

// -------------------------------------------
// Types
// -------------------------------------------

export interface CreateInvoiceParams {
    /** Price in USD */
    price_amount: number;
    /** Currency code for pricing (e.g., "usd") */
    price_currency: string;
    /** Your internal order ID */
    order_id: string;
    /** Order description shown to customer */
    order_description: string;
    /** URL to redirect after successful payment */
    success_url: string;
    /** URL to redirect on cancel */
    cancel_url: string;
    /** Optional customer email for receipt */
    ipn_callback_url?: string;
}

export interface InvoiceResponse {
    id: string;
    order_id: string;
    order_description: string;
    price_amount: number;
    price_currency: string;
    invoice_url: string;
    created_at: string;
}

export interface PaymentStatus {
    payment_id: number;
    payment_status: string;
    pay_address: string;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    pay_currency: string;
    order_id: string;
    order_description: string;
    purchase_id: string;
    outcome_amount: number;
    outcome_currency: string;
}

// -------------------------------------------
// API Functions
// -------------------------------------------

/**
 * Check if the NOWPayments API is available.
 */
export async function checkApiStatus(): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE}/status`);
        const data = await res.json();
        return data.message === "OK";
    } catch {
        return false;
    }
}

/**
 * Create a payment invoice.
 * Returns an invoice URL that the customer can visit to complete payment.
 */
export async function createInvoice(
    params: CreateInvoiceParams
): Promise<InvoiceResponse> {
    const res = await fetch(`${API_BASE}/invoice`, {
        method: "POST",
        headers: {
            "x-api-key": getApiKey(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(
            `NOWPayments invoice creation failed: ${error.message || res.statusText}`
        );
    }

    return res.json();
}

/**
 * Get the payment status for a given payment ID.
 */
export async function getPaymentStatus(
    paymentId: string
): Promise<PaymentStatus> {
    const res = await fetch(`${API_BASE}/payment/${paymentId}`, {
        headers: {
            "x-api-key": getApiKey(),
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(
            `NOWPayments status check failed: ${error.message || res.statusText}`
        );
    }

    return res.json();
}

/**
 * Verify IPN (Instant Payment Notification) callback signature.
 * NOWPayments signs IPN callbacks with HMAC-SHA512.
 */
export function verifyIpnSignature(
    payload: Record<string, unknown>,
    receivedSignature: string
): boolean {
    const crypto = require("crypto");
    const secret = process.env.NOWPAYMENTS_IPN_SECRET;

    if (!secret) {
        console.error("[NOWPayments] IPN secret not configured");
        return false;
    }

    // Sort payload keys alphabetically and create the signature
    const sortedPayload = Object.keys(payload)
        .sort()
        .reduce((acc: Record<string, unknown>, key) => {
            acc[key] = payload[key];
            return acc;
        }, {});

    const hmac = crypto
        .createHmac("sha512", secret)
        .update(JSON.stringify(sortedPayload))
        .digest("hex");

    return hmac === receivedSignature;
}
