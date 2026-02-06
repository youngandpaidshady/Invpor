import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/lib/constants";

// ============================================
// STRIPE INTEGRATION DISABLED
// ============================================
// To enable Stripe, uncomment the imports below and set environment variables:
// STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_APP_URL
//
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      planId,
      price,
      paymentMethod,
      email,
    } = body;

    // Validate required fields
    if (!planId || !paymentMethod || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate plan exists
    const plan = PRICING_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Validate price matches (with discount consideration)
    // In production, recalculate price server-side to prevent manipulation
    const maxAllowedPrice = plan.price;
    if (price > maxAllowedPrice) {
      return NextResponse.json(
        { error: "Invalid price" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // ============================================
    // DEMO MODE - No real payment processing
    // ============================================
    // All payments are simulated. To enable real payments:
    // 1. Set up Stripe/Coinbase accounts
    // 2. Add API keys to environment variables
    // 3. Uncomment the integration code below

    if (paymentMethod === "card" || paymentMethod === "crypto") {
      // Demo response - simulates successful payment session
      return NextResponse.json({
        success: true,
        demo: true,
        provider: paymentMethod === "card" ? "stripe" : "coinbase",
        sessionId: paymentMethod === "card" ? `cs_${orderId}` : `cb_${orderId}`,
        orderId,
        message: "Demo mode - no real payment processed",
      });
    }

    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
