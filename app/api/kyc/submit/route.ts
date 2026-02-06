import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// POST /api/kyc/submit - Submit KYC for review
export async function POST() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get pending KYC submission
    const { data: kyc, error } = await supabase
      .from("kyc_submissions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .single();

    if (error || !kyc) {
      return NextResponse.json(
        { success: false, error: "No pending KYC submission found" },
        { status: 404 }
      );
    }

    // Verify all required documents are uploaded
    const requiredDocs = ["id_front_url", "id_back_url", "selfie_url", "address_proof_url"];
    const missingDocs = requiredDocs.filter((doc) => !kyc[doc]);

    if (missingDocs.length > 0) {
      const friendlyNames: Record<string, string> = {
        id_front_url: "ID Front",
        id_back_url: "ID Back",
        selfie_url: "Selfie",
        address_proof_url: "Address Proof",
      };
      const missing = missingDocs.map((doc) => friendlyNames[doc]).join(", ");
      return NextResponse.json(
        { success: false, error: `Missing documents: ${missing}` },
        { status: 400 }
      );
    }

    // Update status to submitted (under_review)
    const { error: updateError } = await supabase
      .from("kyc_submissions")
      .update({
        status: "under_review",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", kyc.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: "KYC submitted for review. You will be notified once verification is complete.",
    });
  } catch (error) {
    console.error("Submit KYC error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
