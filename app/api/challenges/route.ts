import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { PRICING_PLANS } from "@/lib/constants";
import type { ChallengeType, ChallengeStatus } from "@/lib/types";

const createChallengeSchema = z.object({
  order_id: z.string().min(1, "Order ID is required"),
  plan_id: z.string().min(1, "Plan ID is required"),
});

// GET /api/challenges - List user's challenges
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ChallengeStatus | null;
    const type = searchParams.get("type") as ChallengeType | null;
    const page = Math.max(parseInt(searchParams.get("page") || "1") || 1, 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10") || 10, 100);
    const offset = (page - 1) * limit;

    let query = supabase
      .from("challenges")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }
    if (type) {
      query = query.eq("type", type);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: challenges, error, count } = await query;

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === "42P01") {
        return NextResponse.json({
          success: true,
          data: [],
          total: 0,
          page,
          limit,
          has_more: false,
        });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: challenges || [],
      total: count || 0,
      page,
      limit,
      has_more: (count || 0) > offset + limit,
    });
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// POST /api/challenges - Create challenge from order
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createChallengeSchema.parse(body);

    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the plan
    const plan = PRICING_PLANS.find((p) => p.id === validatedData.plan_id);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Create the challenge
    const challengeData = {
      user_id: user.id,
      order_id: validatedData.order_id,
      type: plan.type,
      account_size: plan.account_size,
      status: "pending" as ChallengeStatus,
      phase: 1,
      start_balance: plan.account_size,
      current_balance: plan.account_size,
      profit_target: plan.profit_target,
      max_drawdown: plan.max_drawdown,
      daily_drawdown: plan.daily_drawdown,
      trading_days: 0,
      min_trading_days: 5,
      profit_split: plan.profit_split,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: challenge, error } = await supabase
      .from("challenges")
      .insert(challengeData)
      .select()
      .single();

    if (error) {
      console.error("Create challenge error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Challenge created successfully",
      data: challenge,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create challenge error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
