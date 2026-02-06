import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/kyc/status - Get user's KYC verification status
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get KYC submission
    const { data: kyc, error } = await supabase
      .from("kyc_submissions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // No submission found
      if (error.code === "PGRST116") {
        return NextResponse.json({
          success: true,
          data: {
            status: "not_submitted",
            can_submit: true,
          },
        });
      }
      // Table might not exist
      if (error.code === "42P01") {
        return NextResponse.json({
          success: true,
          data: {
            status: "not_submitted",
            can_submit: true,
          },
        });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: kyc.id,
        status: kyc.status,
        submitted_at: kyc.created_at,
        reviewed_at: kyc.reviewed_at,
        rejection_reason: kyc.rejection_reason,
        can_submit: kyc.status === "rejected",
        documents: {
          id_front: !!kyc.id_front_url,
          id_back: !!kyc.id_back_url,
          selfie: !!kyc.selfie_url,
          address_proof: !!kyc.address_proof_url,
        },
      },
    });
  } catch (error) {
    console.error("Get KYC status error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
