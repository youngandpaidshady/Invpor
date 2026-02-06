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

export async function POST(request: Request) {
  try {
    const body = await request.text();

    // Demo mode - just log and acknowledge
    console.log("[DEMO] Stripe webhook received (not processed)");

    // Parse the event (in demo mode, we skip signature verification)
    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON", demo: true },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        
        // Extract metadata
        const {
          orderId,
          planId,
          challengeType,
          accountSize,
          promoCode,
        } = session.metadata || {};

        const customerEmail = session.customer_email;
        const amountPaid = session.amount_total / 100; // Convert from cents

        console.log("Payment successful:", {
          orderId,
          planId,
          challengeType,
          accountSize,
          customerEmail,
          amountPaid,
          promoCode,
        });

        // In production, do the following:
        // 1. Create order record in database
        // 2. Create challenge/account record
        // 3. Generate trading credentials
        // 4. Send confirmation email with credentials
        // 5. Update promo code usage count

        /*
        // Example database operations:
        await db.orders.create({
          data: {
            id: orderId,
            userId: session.client_reference_id,
            planId,
            challengeType,
            accountSize: parseInt(accountSize),
            amount: amountPaid,
            promoCode,
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
            status: 'completed',
          },
        });

        const challenge = await db.challenges.create({
          data: {
            orderId,
            userId: session.client_reference_id,
            type: challengeType,
            accountSize: parseInt(accountSize),
            balance: parseInt(accountSize),
            status: 'active',
            phase: 1,
          },
        });

        // Send email with credentials
        await sendEmail({
          to: customerEmail,
          subject: 'Your AlphaTrader Challenge is Ready!',
          template: 'challenge-credentials',
          data: {
            challengeId: challenge.id,
            // ... credentials
          },
        });
        */

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        console.log("Checkout session expired:", session.id);
        
        // Optionally send abandoned cart email
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);
        
        // Log failure for analytics
        // Optionally notify customer
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        console.log("Charge refunded:", charge.id);
        
        // In production:
        // 1. Update order status to refunded
        // 2. Deactivate associated challenge
        // 3. Send refund confirmation email
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        // Handle subscription events if you have recurring billing
        const subscription = event.data.object;
        console.log(`Subscription ${event.type}:`, subscription.id);
        break;
      }

      default:
        console.log(`[DEMO] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true, demo: true });
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
