import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { challengeType, accountSize, price, paymentMethod, email } = body;

    // Validate required fields
    if (!challengeType || !accountSize || !price || !paymentMethod || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // In production, integrate with Stripe or Coinbase Commerce
    // This is a placeholder response
    if (paymentMethod === "card") {
      // Create Stripe Checkout Session
      // const session = await stripe.checkout.sessions.create({...});
      
      return NextResponse.json({
        success: true,
        provider: "stripe",
        sessionId: `stripe_session_${Date.now()}`,
        url: `https://checkout.stripe.com/placeholder`,
      });
    } else if (paymentMethod === "crypto") {
      // Create Coinbase Commerce Charge
      // const charge = await coinbaseCommerce.createCharge({...});
      
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
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
