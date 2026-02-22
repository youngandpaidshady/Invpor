import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = signupSchema.parse(body);
    const sanitized = sanitizeObject(validatedData as unknown as Record<string, unknown>);

    const supabase = await createClient();

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: sanitized.email as string,
      password: sanitized.password as string,
      options: {
        data: {
          full_name: sanitized.full_name as string,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
      },
    });

    if (error) {
      // Handle specific error cases
      if (error.message.includes("already registered")) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // If user was created but needs email verification
    if (data.user && !data.session) {
      return NextResponse.json({
        success: true,
        message: "Please check your email to verify your account",
        requiresVerification: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
