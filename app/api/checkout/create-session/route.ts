import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/lib/constants";
import { purchaseSchema } from "@/lib/validations";
import { z } from "zod";
import { sanitizeString } from "@/lib/sanitize";
import { randomBytes } from "crypto";
import { createInvoice } from "@/lib/nowpayments";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validatedData = purchaseSchema.parse({
      plan_id: body.planId,
      payment_method: body.paymentMethod,
      email: body.email,
      promo_code: body.promoCode,
    });

    const { plan_id, email, payment_method } = validatedData;

    // Validate plan exists
    const plan = PRICING_PLANS.find((p) => p.id === plan_id);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // ★ Server-authoritative price
    const price = plan.price;
    const orderId = `ORD-${randomBytes(8).toString("hex").toUpperCase()}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // ============================================
    // CRYPTO PAYMENTS — NOWPayments
    // ============================================
    if (payment_method === "crypto") {
      // Apply 5% crypto discount
      const cryptoPrice = price * 0.95;

      // Encode order metadata in order_id (plan|email|challengeType)
      const orderMetadata = `${plan_id}|${email}|${body.challengeType || "2-step"}`;

      const invoice = await createInvoice({
        price_amount: cryptoPrice,
        price_currency: "usd",
        order_id: orderMetadata,
        order_description: `${plan.name} - $${plan.account_size.toLocaleString()} Challenge Account`,
        success_url: `${appUrl}/checkout/success?orderId=${orderId}`,
        cancel_url: `${appUrl}/pricing`,
        ipn_callback_url: `${appUrl}/api/webhooks/nowpayments`,
      });

      return NextResponse.json({
        success: true,
        provider: "nowpayments",
        orderId,
        url: invoice.invoice_url,
        invoiceId: invoice.id,
      });
    }

    // ============================================
    // CARD PAYMENTS — NOWPayments invoice (supports fiat)
    // ============================================
    if (payment_method === "card") {
      // NOWPayments invoice page also supports card payments via third-party
      // For a fully hosted card experience, use the same invoice flow
      const orderMetadata = `${plan_id}|${email}|${body.challengeType || "2-step"}`;

      const invoice = await createInvoice({
        price_amount: price,
        price_currency: "usd",
        order_id: orderMetadata,
        order_description: `${plan.name} - $${plan.account_size.toLocaleString()} Challenge Account`,
        success_url: `${appUrl}/checkout/success?orderId=${orderId}`,
        cancel_url: `${appUrl}/pricing`,
        ipn_callback_url: `${appUrl}/api/webhooks/nowpayments`,
      });

      return NextResponse.json({
        success: true,
        provider: "nowpayments",
        orderId,
        url: invoice.invoice_url,
        invoiceId: invoice.id,
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
