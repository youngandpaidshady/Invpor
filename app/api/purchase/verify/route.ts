import { NextRequest, NextResponse } from "next/server";

// This would typically query your database
// For now, using a mock verification
const CHALLENGES = {
  "5k": { price: 49 },
  "25k": { price: 199 },
  "100k": { price: 699 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, price } = body;

    // Sanitize inputs
    const sanitizedChallengeId = String(challengeId).toLowerCase().trim();
    const sanitizedPrice = Number(price);

    // Validate challenge exists
    const challenge = CHALLENGES[sanitizedChallengeId as keyof typeof CHALLENGES];
    if (!challenge) {
      return NextResponse.json(
        { error: "Invalid challenge" },
        { status: 400 }
      );
    }

    // Verify price matches (prevent client-side manipulation)
    if (challenge.price !== sanitizedPrice) {
      return NextResponse.json(
        { error: "Price verification failed" },
        { status: 400 }
      );
    }

    // Additional security checks would go here:
    // - User authentication
    // - Rate limiting
    // - Fraud detection

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
