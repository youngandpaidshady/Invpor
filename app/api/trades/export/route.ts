import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/trades/export - Export trades as CSV
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
    const from_date = searchParams.get("from_date");
    const to_date = searchParams.get("to_date");

    // Get user's challenge IDs
    const { data: userChallenges } = await supabase
      .from("challenges")
      .select("id")
      .eq("user_id", user.id);

    if (!userChallenges || userChallenges.length === 0) {
      return new NextResponse("No trades found", { status: 404 });
    }

    const challengeIds = userChallenges.map((c) => c.id);

    let query = supabase
      .from("trades")
      .select("*")
      .in("challenge_id", challengeIds)
      .order("opened_at", { ascending: false });

    if (challenge_id) {
      query = query.eq("challenge_id", challenge_id);
    }
    if (from_date) {
      query = query.gte("opened_at", from_date);
    }
    if (to_date) {
      query = query.lte("opened_at", to_date);
    }

    const { data: trades, error } = await query;

    if (error) {
      throw error;
    }

    if (!trades || trades.length === 0) {
      return new NextResponse("No trades found", { status: 404 });
    }

    // Generate CSV
    const headers = [
      "ID",
      "Challenge ID",
      "Symbol",
      "Type",
      "Lot Size",
      "Entry Price",
      "Exit Price",
      "Profit/Loss",
      "Status",
      "Opened At",
      "Closed At",
    ];

    const rows = trades.map((trade) => [
      trade.id,
      trade.challenge_id,
      trade.symbol,
      trade.type,
      trade.lot_size,
      trade.entry_price,
      trade.exit_price || "",
      trade.profit_loss || "",
      trade.status,
      trade.opened_at,
      trade.closed_at || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="trades-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export trades error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
