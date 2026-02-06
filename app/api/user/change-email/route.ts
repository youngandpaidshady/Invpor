import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const changeEmailSchema = z.object({
  new_email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required to confirm this action"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = changeEmailSchema.parse(body);
    
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || !user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: validatedData.password,
    });

    if (verifyError) {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 400 }
      );
    }

    // Update email (this will send a confirmation email to the new address)
    const { error: updateError } = await supabase.auth.updateUser({
      email: validatedData.new_email,
    });

    if (updateError) {
      if (updateError.message.includes("already registered")) {
        return NextResponse.json(
          { success: false, error: "This email is already in use" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification email sent to your new address. Please confirm to complete the change.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error("Change email error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
