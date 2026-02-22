import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";

// Zod schema for purchase creation (this route lacked proper validation)
const createSessionSchema = z.object({
  challengeType: z.string().trim().min(1).max(50),
  accountSize: z.string().trim().min(1).max(20),
  price: z.number().positive().max(100000),
  paymentMethod: z.enum(["card", "crypto"]),
  email: z.string().trim().toLowerCase().email().max(254),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ★ Validate input with Zod (previously had no schema validation)
    const validatedData = createSessionSchema.parse(body);

    // ★ Sanitize all string fields
    sanitizeObject(validatedData as unknown as Record<string, unknown>);

    // In production, integrate with Stripe or Coinbase Commerce
    if (validatedData.paymentMethod === "card") {
      return NextResponse.json({
        success: true,
        provider: "stripe",
        sessionId: `stripe_session_${Date.now()}`,
        url: `https://checkout.stripe.com/placeholder`,
      });
    } else if (validatedData.paymentMethod === "crypto") {
      return NextResponse.json({
        success: true,
        provider: "coinbase",
        chargeId: `coinbase_charge_${Date.now()}`,
        url: `https://commerce.coinbase.com/placeholder`,
      });
    }

    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Purchase create-session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
