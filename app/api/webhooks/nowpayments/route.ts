import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyIpnSignature } from "@/lib/nowpayments";

/**
 * NOWPayments IPN (Instant Payment Notification) Webhook
 *
 * Called by NOWPayments when a payment status changes.
 * Verifies the HMAC-SHA512 signature and provisions
 * the challenge on successful payment.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const signature = request.headers.get("x-nowpayments-sig");

        // 1. Verify signature
        if (!signature || !verifyIpnSignature(body, signature)) {
            console.error("[NowPayments Webhook] Invalid signature");
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        const {
            payment_status,
            order_id,
            price_amount,
            price_currency,
            pay_amount,
            pay_currency,
            payment_id,
        } = body;

        console.log(
            `[NowPayments Webhook] Payment ${payment_id}: ${payment_status} for order ${order_id}`
        );

        // 2. Only process confirmed/finished payments
        if (
            payment_status !== "finished" &&
            payment_status !== "confirmed"
        ) {
            // Acknowledge but don't provision yet
            return NextResponse.json({ received: true, status: payment_status });
        }

        // 3. Parse order metadata from order_id
        // Format: "PLAN_ID|EMAIL|CHALLENGE_TYPE"
        const [planId, email, challengeType] = (order_id || "").split("|");

        if (!planId || !email) {
            console.error("[NowPayments Webhook] Missing order metadata in order_id:", order_id);
            return NextResponse.json(
                { error: "Invalid order_id format" },
                { status: 400 }
            );
        }

        // 4. Create the challenge in Supabase
        const supabase = await createClient();

        // ★ Idempotency guard — prevent duplicate challenges from replayed webhooks
        const { data: existing } = await supabase
            .from("challenges")
            .select("id")
            .eq("payment_id", String(payment_id))
            .limit(1);

        if (existing && existing.length > 0) {
            console.log(`[NowPayments Webhook] Already provisioned for payment ${payment_id}, skipping`);
            return NextResponse.json({ success: true, duplicate: true });
        }

        // Look up user by email
        const { data: users } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .limit(1);

        const userId = users?.[0]?.id;

        if (!userId) {
            console.error("[NowPayments Webhook] User not found for email:", email);
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Determine challenge parameters from plan
        const accountSizeMatch = planId.match(/(\d+)k?$/i);
        const accountSize = accountSizeMatch
            ? parseInt(accountSizeMatch[1]) * (planId.toLowerCase().includes("k") ? 1000 : 1)
            : 10000;

        const { error: insertError } = await supabase.from("challenges").insert({
            user_id: userId,
            type: challengeType || "2-step",
            phase: 1,
            status: "active",
            account_size: accountSize,
            start_balance: accountSize,
            current_balance: accountSize,
            profit_target: 8,
            max_drawdown: 10,
            daily_drawdown: 5,
            trading_days: 0,
            min_trading_days: 5,
            payment_method: "crypto",
            payment_amount: price_amount,
            payment_currency: `${pay_currency} (${pay_amount})`,
            payment_id: String(payment_id),
        });

        if (insertError) {
            console.error("[NowPayments Webhook] Failed to create challenge:", insertError);
            return NextResponse.json(
                { error: "Failed to create challenge" },
                { status: 500 }
            );
        }

        console.log(
            `[NowPayments Webhook] ✅ Challenge created for ${email}, plan: ${planId}, amount: $${price_amount}`
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[NowPayments Webhook] Unhandled error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
