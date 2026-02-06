import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Fallback promo codes (used when database is not configured)
const FALLBACK_PROMO_CODES: Record<string, { discount: number; validUntil: Date | null }> = {
  WELCOME10: { discount: 10, validUntil: new Date("2026-12-31") },
  TRADER20: { discount: 20, validUntil: new Date("2026-06-30") },
  VIP25: { discount: 25, validUntil: new Date("2026-03-31") },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Promo code is required" },
        { status: 400 }
      );
    }

    const upperCode = code.toUpperCase().trim();

    // Try database first
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .rpc("verify_promo_code", { code_input: upperCode });

      if (!error && data && data.length > 0) {
        const result = data[0];
        
        if (result.is_valid) {
          return NextResponse.json({
            valid: true,
            code: upperCode,
            discount: result.discount_percent,
            message: `${result.discount_percent}% discount applied!`,
          });
        } else {
          return NextResponse.json({
            valid: false,
            error: result.error_message || "Invalid promo code",
          });
        }
      }
    } catch (dbError) {
      // Database not configured, fall through to fallback
      console.log("Database promo check failed, using fallback:", dbError);
    }

    // Fallback to hardcoded promo codes
    const promo = FALLBACK_PROMO_CODES[upperCode];

    if (!promo) {
      return NextResponse.json({
        valid: false,
        error: "Invalid promo code",
      });
    }

    // Check if code has expired
    if (promo.validUntil && new Date() > promo.validUntil) {
      return NextResponse.json({
        valid: false,
        error: "This promo code has expired",
      });
    }

    // Promo code is valid
    return NextResponse.json({
      valid: true,
      code: upperCode,
      discount: promo.discount,
      message: `${promo.discount}% discount applied!`,
    });
  } catch (error) {
    console.error("Promo verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
