import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";
import { resetPasswordSchema } from "@/lib/validations";

// Pick only the password field — this route doesn't receive confirmPassword
const routeSchema = resetPasswordSchema.innerType().pick({ password: true });


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = routeSchema.parse(body);
    const sanitized = sanitizeObject(validatedData as unknown as Record<string, unknown>);

    const supabase = await createClient();

    // User must be authenticated via the reset link
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired reset link" },
        { status: 401 }
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: sanitized.password as string,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
