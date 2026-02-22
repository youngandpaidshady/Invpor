import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomBytes, randomInt } from "crypto";

// ============================================
// STRIPE WEBHOOKS
// ============================================
// To enable real webhooks:
// 1. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env
// 2. Configure webhook URL in Stripe Dashboard

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") as string;

    let event;
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (stripeSecret && webhookSecret) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Stripe = require('stripe');
      const stripe = new Stripe(stripeSecret);
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`Webhook signature verification failed:`, message);
        return NextResponse.json(
          { error: "Webhook signature verification failed" },
          { status: 400 }
        );
      }
    } else {
      // ★ SECURITY: In production, reject unsigned webhooks entirely
      if (process.env.NODE_ENV === "production") {
        console.error("Stripe webhook secrets not configured in production — rejecting request");
        return NextResponse.json(
          { error: "Webhook not configured" },
          { status: 503 }
        );
      }

      // Development-only: allow unsigned JSON for testing
      try {
        event = JSON.parse(body);
      } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    }

    const supabase = await createClient();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const {
          orderId,
          // planId,
          // userId,
        } = session.metadata || {};

        if (orderId) {
          // 1. Update Order Status
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              payment_status: "paid",
              stripe_session_id: session.id,
              stripe_payment_intent: session.payment_intent,
            })
            .eq("id", orderId);

          if (updateError) console.error("Error updating order:", updateError);

          // 2. Fetch Order Details
          const { data: order } = await supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .single();

          if (order) {
            // 3. Create Challenge with secure credential generation
            const { error: challengeError } = await supabase
              .from("challenges")
              .insert({
                user_id: order.user_id,
                order_id: order.id,
                type: order.challenge_type || "2-step",
                account_size: order.account_size || 25000,
                status: "active",
                phase: 1,
                start_balance: order.account_size || 25000,
                current_balance: order.account_size || 25000,
                profit_target: 8,
                max_drawdown: 10,
                daily_drawdown: 5,
                trading_days: 0,
                // ★ SECURITY: Use crypto-secure random generation instead of Math.random()
                platform_login: `ACC${randomInt(100000, 999999)}`,
                platform_password: randomBytes(16).toString("hex"),
              });

            if (challengeError) console.error("Error creating challenge:", challengeError);
          }
        }
        break;
      }

      default:
        // Silently ignore unhandled event types in production
        if (process.env.NODE_ENV !== "production") {
          console.log(`Unhandled event type: ${event.type}`);
        }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Disable body parsing for webhook (needed for signature verification)
export const config = {
  api: {
    bodyParser: false,
  },
};
