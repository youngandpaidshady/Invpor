import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/challenges/[id] - Get single challenge with trades
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get challenge
    const { data: challenge, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Challenge not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    // Get recent trades for this challenge
    const { data: trades } = await supabase
      .from("trades")
      .select("*")
      .eq("challenge_id", id)
      .order("opened_at", { ascending: false })
      .limit(50);

    // Calculate statistics
    const stats = {
      total_trades: trades?.length || 0,
      winning_trades: trades?.filter((t) => (t.profit_loss || 0) > 0).length || 0,
      losing_trades: trades?.filter((t) => (t.profit_loss || 0) < 0).length || 0,
      total_profit: trades?.reduce((sum, t) => sum + (t.profit_loss || 0), 0) || 0,
      win_rate: 0,
    };
    
    if (stats.total_trades > 0) {
      stats.win_rate = Math.round((stats.winning_trades / stats.total_trades) * 100);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...challenge,
        trades: trades || [],
        stats,
      },
    });
  } catch (error) {
    console.error("Get challenge error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
