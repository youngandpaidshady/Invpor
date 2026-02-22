import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);
    const sanitized = sanitizeObject(validatedData as unknown as Record<string, unknown>);

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      sanitized.email as string,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`,
      }
    );

    if (error) {
      // Don't reveal if email exists or not for security
      console.error("Password reset error:", error);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, you will receive a password reset link",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
