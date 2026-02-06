// ===========================================
// Analytics & Event Tracking
// ===========================================

// Types
type EventParams = Record<string, string | number | boolean | undefined | EventParams[] | Record<string, unknown>>;

// ===========================================
// Google Analytics 4
// ===========================================

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set",
      targetId: string,
      config?: EventParams
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Track a page view
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
  
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  params?: EventParams
) {
  if (typeof window === "undefined" || !window.gtag) return;
  
  window.gtag("event", eventName, params);

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Event: ${eventName}`, params);
  }
}

// ===========================================
// Pre-defined Events
// ===========================================

/**
 * Track user signup
 */
export function trackSignup(method: "email" | "google" | "github" = "email") {
  trackEvent("sign_up", { method });
}

/**
 * Track user login
 */
export function trackLogin(method: "email" | "google" | "github" = "email") {
  trackEvent("login", { method });
}

/**
 * Track challenge purchase
 */
export function trackPurchase(params: {
  planId: string;
  planName: string;
  accountSize: number;
  price: number;
  currency?: string;
  promoCode?: string;
}) {
  trackEvent("purchase", {
    transaction_id: `TXN_${Date.now()}`,
    value: params.price,
    currency: params.currency || "USD",
    items: [{
      item_id: params.planId,
      item_name: params.planName,
      price: params.price,
      quantity: 1,
    }],
    coupon: params.promoCode,
  });
}

/**
 * Track checkout initiation
 */
export function trackBeginCheckout(params: {
  planId: string;
  planName: string;
  price: number;
  currency?: string;
}) {
  trackEvent("begin_checkout", {
    value: params.price,
    currency: params.currency || "USD",
    items: [{
      item_id: params.planId,
      item_name: params.planName,
      price: params.price,
      quantity: 1,
    }],
  });
}

/**
 * Track promo code application
 */
export function trackPromoCode(code: string, success: boolean, discount?: number) {
  trackEvent("apply_promo_code", {
    promo_code: code,
    success,
    discount_amount: discount,
  });
}

/**
 * Track payout request
 */
export function trackPayoutRequest(amount: number, method: "bank" | "crypto") {
  trackEvent("payout_request", {
    value: amount,
    method,
  });
}

/**
 * Track KYC submission
 */
export function trackKYCSubmission(status: "started" | "completed") {
  trackEvent("kyc_submission", { status });
}

/**
 * Track page scroll depth
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100) {
  trackEvent("scroll_depth", { percent_scrolled: depth });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean) {
  trackEvent("form_submission", {
    form_name: formName,
    success,
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  });
}

/**
 * Track error
 */
export function trackError(errorType: string, errorMessage: string) {
  trackEvent("error", {
    error_type: errorType,
    error_message: errorMessage.substring(0, 100),
  });
}

// ===========================================
// Analytics Provider Component Script
// ===========================================

export function getGoogleAnalyticsScript() {
  if (!GA_MEASUREMENT_ID) return null;
  
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
}

// ===========================================
// Usage with useEffect hook
// ===========================================
// 
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";
// import { trackPageView } from "@/lib/analytics";
// 
// export function usePageTracking() {
//   const pathname = usePathname();
//   
//   useEffect(() => {
//     trackPageView(pathname);
//   }, [pathname]);
// }
