import { NextResponse } from "next/server";
import { z } from "zod";

// Zod schema (previously had no schema validation)
const verifySchema = z.object({
  challengeType: z.string().trim().min(1).max(50),
  accountSize: z.string().trim().min(1).max(20),
  clientPrice: z.number().positive().max(100000),
});

// Simulated challenge prices (in production, fetch from database)
const challengePrices: Record<string, Record<string, number>> = {
  "2-step": {
    "$5,000": 49,
    "$25,000": 179,
    "$100,000": 499,
  },
  "1-step": {
    "$10,000": 99,
    "$50,000": 299,
    "$200,000": 999,
  },
  instant: {
    "$5,000": 199,
    "$25,000": 699,
    "$50,000": 1299,
  },
  blitz: {
    "$10,000": 79,
    "$50,000": 249,
    "$100,000": 449,
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ★ Validate with Zod schema
    const validatedData = verifySchema.parse(body);

    const { challengeType, accountSize, clientPrice } = validatedData;

    // Verify challenge type exists
    if (!challengePrices[challengeType]) {
      return NextResponse.json(
        { error: "Invalid challenge type" },
        { status: 400 }
      );
    }

    // Verify account size exists
    const serverPrice = challengePrices[challengeType][accountSize];
    if (!serverPrice) {
      return NextResponse.json(
        { error: "Invalid account size" },
        { status: 400 }
      );
    }

    // Verify price matches server price (prevent client-side manipulation)
    if (clientPrice !== serverPrice) {
      return NextResponse.json(
        { error: "Price mismatch detected. Please refresh and try again." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      price: serverPrice,
      challengeType,
      accountSize,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Purchase verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
