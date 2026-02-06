import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/trades - List user's trades with pagination
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
    const challenge_id = searchParams.get("challenge_id");
    const symbol = searchParams.get("symbol");
    const status = searchParams.get("status"); // "open" or "closed"
    const from_date = searchParams.get("from_date");
    const to_date = searchParams.get("to_date");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // First, get user's challenge IDs for authorization
    const { data: userChallenges } = await supabase
      .from("challenges")
      .select("id")
      .eq("user_id", user.id);

    if (!userChallenges || userChallenges.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        page,
        limit,
        has_more: false,
      });
    }

    const challengeIds = userChallenges.map((c) => c.id);

    let query = supabase
      .from("trades")
      .select("*, challenges(account_size, type)", { count: "exact" })
      .in("challenge_id", challengeIds)
      .order("opened_at", { ascending: false });

    // Apply filters
    if (challenge_id) {
      query = query.eq("challenge_id", challenge_id);
    }
    if (symbol) {
      query = query.ilike("symbol", `%${symbol}%`);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (from_date) {
      query = query.gte("opened_at", from_date);
    }
    if (to_date) {
      query = query.lte("opened_at", to_date);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: trades, error, count } = await query;

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
      data: trades || [],
      total: count || 0,
      page,
      limit,
      has_more: (count || 0) > offset + limit,
    });
  } catch (error) {
    console.error("Get trades error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
