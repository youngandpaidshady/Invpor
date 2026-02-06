import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/trades/[id] - Get single trade detail
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

    // Get trade with challenge info
    const { data: trade, error } = await supabase
      .from("trades")
      .select("*, challenges(id, user_id, account_size, type, status)")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Trade not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    // Verify ownership through challenge
    if (trade.challenges?.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "Trade not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: trade,
    });
  } catch (error) {
    console.error("Get trade error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
