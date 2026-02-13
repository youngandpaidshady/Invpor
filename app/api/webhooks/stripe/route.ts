import { NextResponse } from "next/server";

// ============================================
// STRIPE WEBHOOKS DISABLED
// ============================================
// This endpoint is currently in demo mode.
// To enable real webhooks:
// 1. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env
// 2. Configure webhook URL in Stripe Dashboard
// 3. Uncomment the verification code below
//
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") as string;

    let event;
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (stripeSecret && webhookSecret) {
      const Stripe = require('stripe');
      const stripe = new Stripe(stripeSecret);
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error(`Webhook signature verification failed.`, err.message);
        return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
      }
    } else {
      // Fallback to basic JSON parse if no secrets (DEMO MODE)
      // In production this should be disallowed
      try {
        event = JSON.parse(body);
      } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      }
    }

    const supabase = await createClient();

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // Extract metadata
        const {
          orderId,
          planId,
          userId,
          //   challengeType,
          //   accountSize,
          //   promoCode,
        } = session.metadata || {};

        console.log("Processing completed session for order:", orderId);

        if (orderId) {
          // 1. Update Order Status
          const { error: updateError } = await supabase
            .from("orders")
            .update({
              payment_status: "paid",
              stripe_session_id: session.id,
              stripe_payment_intent: session.payment_intent
            })
            .eq("id", orderId);

          if (updateError) console.error("Error updating order:", updateError);

          // 2. Fetch Order Details to create Challenge
          const { data: order } = await supabase.from("orders").eq("id", orderId).single();

          if (order) {
            // 3. Create Challenge
            // We need to determine challenge parameters based on plan
            // For now, we use what's in the order record or defaults

            const { error: challengeError } = await supabase
              .from("challenges")
              .insert({
                user_id: order.user_id, // If null (guest), we might need to create user first? Or user created account during checkout?
                // Assuming user_id is present. If guest checkout, this might fail or we assign to a temp user.
                order_id: order.id,
                type: order.challenge_type || "2-step",
                account_size: order.account_size || 25000,
                status: "active",
                phase: 1,
                start_balance: order.account_size || 25000,
                current_balance: order.account_size || 25000,
                profit_target: 8, // Default
                max_drawdown: 10, // Default
                daily_drawdown: 5, // Default
                trading_days: 0,
                platform_login: `ACC${Math.floor(Math.random() * 1000000)}`,
                platform_password: Math.random().toString(36).slice(-8),
              });

            if (challengeError) console.error("Error creating challenge:", challengeError);
            else console.log("Challenge created successfully for order:", orderId);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
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
