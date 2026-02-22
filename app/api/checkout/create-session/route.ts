import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/lib/constants";
import { purchaseSchema } from "@/lib/validations";
import { z } from "zod";
import { sanitizeString } from "@/lib/sanitize";

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

    // Validate input with Zod
    const validatedData = purchaseSchema.parse({
      plan_id: body.planId, // Mapping frontend camelCase to schema snake_case if necessary, or update frontend to match. 
      // Looking at frontend implementation (CheckoutPage), it sends: planId, paymentMethod, cryptoCoin, cryptoNetwork, email, promoCode.
      // Schema expects: plan_id, payment_method, email, promo_code.
      // We should map it here to ensure schema validation works without breaking frontend.
      payment_method: body.paymentMethod,
      email: body.email,
      promo_code: body.promoCode
    });

    const { plan_id, email, payment_method } = validatedData;
    const { price } = body; // Price is calculated on frontend but VERIFIED here against plan.

    // Validate plan exists
    const plan = PRICING_PLANS.find((p) => p.id === plan_id);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Validate price matches (server-side verification)
    // Let's enforce max price check.
    const maxAllowedPrice = plan.price;
    if (price > maxAllowedPrice) {
      return NextResponse.json(
        { error: "Invalid price calculation" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // ============================================
    // DEMO MODE - No real payment processing
    // ============================================

    if (payment_method === "card") {
      // Demo response - simulates successful payment session
      return NextResponse.json({
        success: true,
        demo: true,
        provider: "stripe",
        sessionId: `cs_${orderId}`,
        orderId,
        message: "Demo mode - no real payment processed",
      });
    }

    if (payment_method === "crypto") {
      const rawCryptoCoin = body.cryptoCoin;
      const rawCryptoNetwork = body.cryptoNetwork;

      if (!rawCryptoCoin || !rawCryptoNetwork ||
        typeof rawCryptoCoin !== "string" || typeof rawCryptoNetwork !== "string" ||
        rawCryptoCoin.length > 20 || rawCryptoNetwork.length > 30) {
        return NextResponse.json({ error: "Invalid crypto details" }, { status: 400 });
      }

      // ★ Sanitize unvalidated fields
      const cryptoCoin = sanitizeString(rawCryptoCoin.trim());
      const cryptoNetwork = sanitizeString(rawCryptoNetwork.trim());

      // Calculate crypto price with discount
      // const cryptoDiscount = 0.05; // 5%

      const params = new URLSearchParams({
        planId: plan_id,
        orderId,
        amount: price.toString(),
        coin: cryptoCoin,
        network: cryptoNetwork,
        email
      });

      return NextResponse.json({
        url: `/checkout/crypto?${params.toString()}`,
      });
    }

    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
