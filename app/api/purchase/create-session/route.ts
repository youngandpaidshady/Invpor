import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, paymentMethod } = body;

    // Sanitize inputs
    const sanitizedChallengeId = String(challengeId).toLowerCase().trim();
    const sanitizedPaymentMethod = String(paymentMethod).toLowerCase();

    // Validate payment method
    if (!["stripe", "crypto"].includes(sanitizedPaymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Create Stripe checkout session or Coinbase Commerce invoice
    // 2. Store the session in your database
    // 3. Return the session URL

    // Mock response
    const mockSessionUrl = `/checkout?session=mock_${Date.now()}`;

    return NextResponse.json({ sessionUrl: mockSessionUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
