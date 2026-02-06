import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { payoutRequestSchema } from "@/lib/validations";
import { z } from "zod";

// POST /api/payouts/request - Request a payout
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = payoutRequestSchema.parse(body);
    
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify KYC is approved
    const { data: kyc } = await supabase
      .from("kyc_submissions")
      .select("status")
      .eq("user_id", user.id)
      .eq("status", "approved")
      .single();

    if (!kyc) {
      return NextResponse.json(
        { success: false, error: "KYC verification required before requesting payouts" },
        { status: 403 }
      );
    }

    // Verify challenge belongs to user and is funded
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", validatedData.challenge_id)
      .eq("user_id", user.id)
      .eq("status", "funded")
      .single();

    if (challengeError || !challenge) {
      return NextResponse.json(
        { success: false, error: "Challenge not found or not funded" },
        { status: 404 }
      );
    }

    // Calculate available profit
    const profit = challenge.current_balance - challenge.start_balance;
    const availableForPayout = profit * (challenge.profit_split / 100);

    if (validatedData.amount > availableForPayout) {
      return NextResponse.json(
        { success: false, error: `Maximum available payout is $${availableForPayout.toFixed(2)}` },
        { status: 400 }
      );
    }

    // Check for pending payouts on this challenge
    const { data: pendingPayouts } = await supabase
      .from("payouts")
      .select("id")
      .eq("challenge_id", validatedData.challenge_id)
      .eq("status", "pending");

    if (pendingPayouts && pendingPayouts.length > 0) {
      return NextResponse.json(
        { success: false, error: "You already have a pending payout for this challenge" },
        { status: 400 }
      );
    }

    // Create payout request
    const payoutData = {
      user_id: user.id,
      challenge_id: validatedData.challenge_id,
      amount: validatedData.amount,
      method: validatedData.method,
      wallet_address: validatedData.wallet_address,
      bank_details: validatedData.bank_details,
      status: "pending",
      requested_at: new Date().toISOString(),
    };

    const { data: payout, error } = await supabase
      .from("payouts")
      .insert(payoutData)
      .select()
      .single();

    if (error) {
      console.error("Create payout error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create payout request" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payout request submitted successfully",
      data: payout,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error("Request payout error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
