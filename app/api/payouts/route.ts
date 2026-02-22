import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { PayoutStatus } from "@/lib/types";

// GET /api/payouts - List user's payouts
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
    const status = searchParams.get("status") as PayoutStatus | null;
    const page = Math.max(parseInt(searchParams.get("page") || "1") || 1, 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10") || 10, 100);
    const offset = (page - 1) * limit;

    let query = supabase
      .from("payouts")
      .select("*, challenges(account_size, type)", { count: "exact" })
      .eq("user_id", user.id)
      .order("requested_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: payouts, error, count } = await query;

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
          summary: { pending: 0, total_withdrawn: 0 },
        });
      }
      throw error;
    }

    // Calculate summary
    const { data: allPayouts } = await supabase
      .from("payouts")
      .select("amount, status")
      .eq("user_id", user.id);

    const summary = {
      pending: allPayouts?.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0) || 0,
      total_withdrawn: allPayouts?.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0) || 0,
    };

    return NextResponse.json({
      success: true,
      data: payouts || [],
      total: count || 0,
      page,
      limit,
      has_more: (count || 0) > offset + limit,
      summary,
    });
  } catch (error) {
    console.error("Get payouts error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
