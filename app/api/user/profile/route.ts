import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const updateProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
  phone: z.string().optional(),
  avatar_url: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith(supabaseUrl),
      "Avatar URL must be from the application's storage"
    )
    .optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
});

// GET /api/user/profile - Get current user's profile
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Try to get profile from profiles table if it exists
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name || user.user_metadata?.full_name,
        phone: profile?.phone,
        avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
        country: profile?.country,
        timezone: profile?.timezone,
        created_at: user.created_at,
        email_verified: !!user.email_confirmed_at,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - Update current user's profile
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = updateProfileSchema.parse(body);
    // ★ Sanitize all user-supplied strings
    sanitizeObject(validatedData as unknown as Record<string, unknown>);

    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update user metadata
    if (validatedData.full_name || validatedData.avatar_url) {
      await supabase.auth.updateUser({
        data: {
          full_name: validatedData.full_name,
          avatar_url: validatedData.avatar_url,
        },
      });
    }

    // Update profile in profiles table if it exists
    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (profileError) {
      // If profiles table doesn't exist, just return success with auth data
      console.log("Profile table may not exist:", profileError.message);
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile || validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
