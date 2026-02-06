import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const uploadSchema = z.object({
  document_type: z.enum(["id_front", "id_back", "selfie", "address_proof"]),
  file_data: z.string().min(1, "File data is required"), // Base64 encoded
  file_name: z.string().min(1, "File name is required"),
  file_type: z.string().refine(
    (type) => ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(type),
    "Invalid file type. Allowed: JPEG, PNG, WebP, PDF"
  ),
});

// POST /api/kyc/upload - Upload a KYC document
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = uploadSchema.parse(body);
    
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user already has approved KYC
    const { data: existingKyc } = await supabase
      .from("kyc_submissions")
      .select("status")
      .eq("user_id", user.id)
      .eq("status", "approved")
      .single();

    if (existingKyc) {
      return NextResponse.json(
        { success: false, error: "KYC already approved" },
        { status: 400 }
      );
    }

    // Decode base64 file
    const base64Data = validatedData.file_data.replace(/^data:[^;]+;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, "base64");
    
    // Check file size (max 5MB)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Generate unique file path
    const fileExtension = validatedData.file_name.split(".").pop() || "jpg";
    const filePath = `kyc/${user.id}/${validatedData.document_type}_${Date.now()}.${fileExtension}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, fileBuffer, {
        contentType: validatedData.file_type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: "Failed to upload document" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    // Update or create KYC submission
    const columnName = `${validatedData.document_type}_url`;
    
    // First, try to get existing submission
    const { data: existing } = await supabase
      .from("kyc_submissions")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["pending", "rejected"])
      .single();

    if (existing) {
      // Update existing
      await supabase
        .from("kyc_submissions")
        .update({ 
          [columnName]: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      // Create new
      await supabase
        .from("kyc_submissions")
        .insert({
          user_id: user.id,
          [columnName]: publicUrl,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
    }

    return NextResponse.json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        document_type: validatedData.document_type,
        url: publicUrl,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error("Upload KYC error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
